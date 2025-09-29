import { getStockPrice } from "./lib";
import { getAllStockRecords, updateCurrentPrice, updateUpdated } from "./notionStockPage";
import { sendSlackMessage } from "./slack";

const channel = process.env.SLACK_CHANNEL || '#general';

function alertMessage(params: {
  ticker: string
  currentPrice: number,
  targetPrice: number,
  stopLossPrice: number,
  newPrice: number,
}): string {
  return `## ALERT: ${params.ticker} has reached the thresh hold
  - Ticker: ${params.ticker}
  - Price: ${params.newPrice} (was ${params.currentPrice})
  - Target Price: ${params.targetPrice}${params.targetPrice && params.newPrice >= params.targetPrice ? ' ✅' : ''}
  - Stop Loss Price: ${params.stopLossPrice}${params.stopLossPrice && params.newPrice <= params.stopLossPrice ? ' ✅' : ''}`;
}

const updateStockPrices = async () => {
  await getAllStockRecords(async (ticker) => {
    const quote = await getStockPrice(ticker);
    const newPrice = quote?.price?.regularMarketPrice || 0;
    return newPrice;
  }, async (ticker, targetPrice, stopLossPrice, currentPrice, newPrice, pageId) => {
    console.log(`Ticker: ${ticker}, Target Price: ${targetPrice}, Stop Loss Price: ${stopLossPrice}, Current Price: ${currentPrice}, New Price: ${newPrice}`);

    if (targetPrice && newPrice >= targetPrice) {
      console.log(`*** ALERT: ${ticker} has reached the target price of ${targetPrice}. Current Price: ${newPrice} ***`);
      await sendSlackMessage(channel, alertMessage({ ticker, currentPrice, targetPrice, stopLossPrice, newPrice }));
    } else if (stopLossPrice && newPrice <= stopLossPrice) {
      console.log(`*** ALERT: ${ticker} has reached the stop loss price of ${stopLossPrice}. Current Price: ${newPrice} ***`);
      await sendSlackMessage(channel, alertMessage({ ticker, currentPrice, targetPrice, stopLossPrice, newPrice }));
    } else {
      console.log(`${ticker} is within the target and stop loss range. No alert needed.`);
    }

    if (pageId) {
      await updateCurrentPrice(pageId, newPrice);
      await updateUpdated(pageId, `${new Date().toLocaleString()}`);
    } else {
      console.warn(`No pageId found for ticker ${ticker}, cannot update Notion record.`);
    }
  });
  await sendSlackMessage(channel, `Stock prices updated at ${new Date().toLocaleString()}`);
}

export const run = async (event: any = {}): Promise<any> => {
  console.log('Beginning stock monitor backend function');
  await updateStockPrices();
  return { message: "Hello from stock-monitor-backend!" };
}
