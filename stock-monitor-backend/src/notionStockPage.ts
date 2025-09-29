import { getNotionDatasource, queryNotionDatabase, updateNotionDatabaseItem } from "./notion";

const datasourceId = process.env.NOTION_DATASOURCE_ID || '';

const SKIP_TICKERS = 'TEST'.split(',');

export type FunctionGetStockPrice = (ticker: string) => Promise<number>;
export type FunctionOnComplete = (ticker: string, targetPrice: number, stopLossPrice: number, currentPrice: number, newPrice: number, pageId?: string) => Promise<void>;

export async function getNotionRecordByName(result: any, name: string) {
  return result.results.find((page: any) => page?.properties?.Name?.title?.[0]?.text?.content === name);
}

export async function updateCurrentPrice(pageId: string, price: number) {
  return updateNotionDatabaseItem(datasourceId, pageId, {
    'Current Price': {
      'number': price,
    },
  });
}

export async function updateUpdated(pageId: string, updatedContent: string) {
  return updateNotionDatabaseItem(datasourceId, pageId, {
    'Updated': {
      'rich_text': [
        {
          'text': {
            'content': updatedContent,
          },
        },
      ],
    },
  });
}

export async function getAllStockRecords(getStockPrice: FunctionGetStockPrice, onComplete: FunctionOnComplete) {
  const result = await queryNotionDatabase(datasourceId);
  console.log(`Total records: ${result.results.length}`);
  return Promise.all(result.results.map(async (item: any) => {
    const pageId = item.id;
    const name = item?.properties?.Name?.title?.[0]?.text?.content;
    if (SKIP_TICKERS.includes(name)) {
      console.log(`Skipping ${name}`);
      return;
    }
    const targetPrice = item?.properties?.['Target Price']?.number;
    const stopLossPrice = item?.properties?.['Stop Loss Price']?.number;
    const currentPrice = item?.properties?.['Current Price']?.number;
    console.log(`Name: ${name}, Target Price: ${targetPrice}, Stop Loss Price: ${stopLossPrice}, Current Price: ${currentPrice}`);
    const newPrice = await getStockPrice(name);
    await onComplete(name, targetPrice, stopLossPrice, currentPrice, newPrice, pageId);
  }));
}
