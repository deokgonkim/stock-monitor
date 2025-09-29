import { getStockPrice } from "./lib";

export const run = async (event: any = {}): Promise<any> => {
  console.log('Beginning stock monitor backend function');
  const ticker = 'AAPL';
  const quote = await getStockPrice(ticker);
  console.log('AAPL Quote:', JSON.stringify(quote, null, 2));
  return { message: "Hello from stock-monitor-backend!" };
}
