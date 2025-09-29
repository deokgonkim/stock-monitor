import { queryNotionDatabase } from "../src/notion";
import { getNotionRecordByName, updateCurrentPrice, updateUpdated } from "../src/notionStockPage";

describe('Update stock page item record', () => {
  it('should update a Notion database item', async () => {
    const datasourceResult = await queryNotionDatabase(process.env.NOTION_DATASOURCE_ID || '');
    const testItem = await getNotionRecordByName(datasourceResult, 'TEST');
    console.log('Found test item:', testItem);
    if (!testItem) {
      throw new Error('Test item not found in Notion database. Please create a page with Name "TEST"');
    }
    await updateUpdated(testItem, `Updated at ${new Date().toISOString()}`);
    await updateCurrentPrice(testItem, Math.random() * 100);
  });
});
