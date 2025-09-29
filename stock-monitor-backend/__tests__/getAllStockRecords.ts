import { getStockPrice } from "../src/lib";
import { getAllStockRecords } from "../src/notionStockPage";

describe('Get all stock records', () => {
  it('should fetch and log all stock records from Notion', async () => {
    await getAllStockRecords(async (ticker) => {
      const quote = await getStockPrice(ticker);
      const newPrice = quote?.price?.regularMarketPrice || 0;
      return newPrice;
    }, async (ticker, targetPrice, stopLossPrice, currentPrice, newPrice) => {
      console.log(`Ticker: ${ticker}, Target Price: ${targetPrice}, Stop Loss Price: ${stopLossPrice}, Current Price: ${currentPrice}, New Price: ${newPrice}`);
    });
  });
});
