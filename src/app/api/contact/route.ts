import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// In-memory rate limiter (resets on serverless cold start — fine for our scale)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not set');
    return false;
  }

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token, remoteip: ip }),
  });

  const data = await res.json() as { success: boolean };
  return data.success === true;
}

function sanitizeString(input: unknown, maxLen: number): string {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .slice(0, maxLen)
    .replace(/[\r\n\t]/g, ' '); // prevent header injection
}

export async function POST(req: NextRequest) {
  // Content-Type guard
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 415 });
  }

  // Rate limit
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait 5 minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;

  // Honeypot check — bots fill hidden fields, humans don't
  if (payload.website) {
    // Silently succeed to not reveal bot detection
    return NextResponse.json({ success: true });
  }

  // Turnstile verification
  const turnstileToken = sanitizeString(payload.turnstileToken, 2048);
  if (!turnstileToken) {
    return NextResponse.json({ error: 'CAPTCHA token missing' }, { status: 400 });
  }

  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ error: 'CAPTCHA verification failed. Please try again.' }, { status: 400 });
  }

  // Sanitize and validate inputs
  const name = sanitizeString(payload.name, 100);
  const email = sanitizeString(payload.email, 254);
  const message = sanitizeString(payload.message, 5000);

  if (name.length < 2) {
    return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
  }

  // Send email via Gmail SMTP
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error('Gmail credentials are not configured');
    return NextResponse.json({ error: 'Mail service not configured.' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: gmailUser, pass: gmailPass },
  });

  const mailOptions = {
    from: `"Utilixi Contact" <${gmailUser}>`,
    to: 'okk1mind@gmail.com',
    replyTo: `"${name}" <${email}>`,
    subject: `[Utilixi] New message from ${name}`,
    text: [
      '=== NEW CONTACT MESSAGE ===',
      '',
      `Name:    ${name}`,
      `Email:   ${email}`,
      `IP:      ${ip}`,
      `Date:    ${new Date().toISOString()}`,
      '',
      '--- MESSAGE ---',
      '',
      message,
      '',
      '=== utilixi.com ===',
    ].join('\n'),
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Mail send error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
