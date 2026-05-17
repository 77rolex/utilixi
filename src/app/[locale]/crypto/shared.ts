export type CoinData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

export async function getCryptoRates(): Promise<CoinData[]> {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) throw new Error('CoinGecko error');
    return await res.json() as CoinData[];
  } catch {
    return [];
  }
}

export async function getFiatRates(): Promise<Record<string, number>> {
  const apiKey = process.env.EXCHANGERATE_API_KEY;
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`,
      { next: { revalidate: 21600 } },
    );
    if (!res.ok) throw new Error('ExchangeRate error');
    const data = await res.json();
    return data.conversion_rates as Record<string, number>;
  } catch {
    return {};
  }
}
