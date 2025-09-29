import { getNotionDatasource, queryNotionDatabase } from "../src/notion";
import { saveJson } from "../src/util";

describe('Test Notion API', () => {
  const datasourceId = process.env.NOTION_DATASOURCE_ID || '';
  if (!datasourceId) {
    console.warn('Skipping Notion datasource test because NOTION_DATASOURCE_ID is not set');
    throw new Error('NOTION_DATASOURCE_ID is not set');
  }
  it('should fetch a Notion database', async () => {
    const result = await getNotionDatasource(datasourceId);
    console.log(JSON.stringify(result, null, 2));
    saveJson(result, `./output/notion-database-${datasourceId}.json`);
  });
  it('should fetch a Notion datasource', async () => {
    const result = await queryNotionDatabase(datasourceId);
    console.log(JSON.stringify(result, null, 2));
    saveJson(result, `./output/notion-datasource-${datasourceId}.json`);
  });
  it('should records from database and save each item to file', async () => {
    const result = await queryNotionDatabase(datasourceId);
    console.log(`Total records: ${result.results.length}`);
    result.results?.map((item) => {
      const pageId = item.id;
      const tickerName = item?.properties?.Name?.title?.[0]?.text?.content;
      if (!tickerName) {
        console.warn(`Skipping record ${pageId} because it has no Name property`);
        return;
      }
      console.log(`Saving record ${tickerName} (${pageId}) to file`);
      saveJson(item, `./output/notion-record-${tickerName}-${pageId}.json`);
    });
  });
});
