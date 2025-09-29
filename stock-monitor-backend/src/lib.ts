import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

export async function getStockPrice(ticker: string) {
  try {
    const quote = await yahooFinance.quoteSummary(ticker);

    // console.log(`Quote`, JSON.stringify(quote, null, 2));

    return quote;
  } catch (error) {
    console.error(`Error fetching stock price for ${ticker}:`, error);
    throw error;
  }
}
