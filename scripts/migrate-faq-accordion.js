const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/app/[locale]');

function findPageFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findPageFiles(fullPath));
    } else if (item === 'page.tsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('faq__item')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function getContentVar(fileContent) {
  const match = fileContent.match(/const (content|c) = CONTENT\[/);
  return match ? match[1] : 'content';
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already migrated
  if (content.includes('FaqSection')) {
    console.log(`SKIP (already done): ${filePath}`);
    return;
  }

  const contentVar = getContentVar(content);

  // Match the entire FAQ section (non-greedy)
  const faqSectionRegex = /<section className=\{styles\.faq\}>[\s\S]*?<\/section>/;

  if (!faqSectionRegex.test(content)) {
    console.log(`SKIP (no match): ${filePath}`);
    return;
  }

  const replacement = `<FaqSection title={${contentVar}.faqTitle} faqs={${contentVar}.faqs} />`;
  content = content.replace(faqSectionRegex, replacement);

  // Add import before styles import
  if (!content.includes("import FaqSection from '@/components/ui/FaqSection'")) {
    content = content.replace(
      "import styles from './page.module.scss';",
      "import FaqSection from '@/components/ui/FaqSection';\nimport styles from './page.module.scss';"
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`UPDATED [${contentVar}]: ${path.relative(baseDir, filePath)}`);
}

const files = findPageFiles(baseDir);
console.log(`\nFound ${files.length} files with FAQ sections\n`);
files.forEach(processFile);
console.log(`\nDone.`);
