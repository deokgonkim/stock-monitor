import YahooFinance from 'yahoo-finance2';
import { QuoteSummaryResult } from 'yahoo-finance2/modules/quoteSummary-iface';

const yahooFinance = new YahooFinance();

export async function getStockPrice(ticker: string): Promise<QuoteSummaryResult> {
  try {
    const quote = await yahooFinance.quoteSummary(ticker);

    // console.log(`Quote`, JSON.stringify(quote, null, 2));

    return quote;
  } catch (error) {
    console.error(`Error fetching stock price for ${ticker}:`, error);
    throw error;
  }
}
