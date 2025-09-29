import { getStockPrice } from "../src/lib";
import { saveJson } from "../src/util";

export async function main() {
  if (process.argv.length < 3) {
    console.error('Usage: ts-node getStockPrice.ts <TICKER>');
    process.exit(1);
  }
  const ticker = process.argv[2] || 'AAPL';
  const quote = await getStockPrice(ticker);
  console.log(`${ticker} Quote:`, JSON.stringify(quote, null, 2));
  saveJson(quote, `./output/${ticker}-quote.json`);
}

main().catch(console.error);
