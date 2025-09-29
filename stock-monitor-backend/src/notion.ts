import { Client } from '@notionhq/client'

const NOTION_TOKEN = process.env.NOTION_TOKEN || '';

const notion = new Client({
  auth: NOTION_TOKEN,
})

/**
 * returns a Notion database object given its ID
 * @param pageId
 */
export async function getNotionDatabase(pageId: string) {
  const response = await notion.databases.retrieve({ database_id: pageId });
  return response;
}

export async function getNotionDatasource(datasourceId: string) {
  const response = await notion.dataSources.retrieve({ data_source_id: datasourceId });
  return response;
}

export async function queryNotionDatabase(datasourceId: string, filter?: any, sorts?: any) {
  const response = await notion.dataSources.query({
    data_source_id: datasourceId,
    filter,
    sorts,
  });
  return response;
}

export async function updateNotionDatabaseItem(datasourceId: string, itemId: string, properties: any) {
  const response = await notion.pages.update({
    page_id: itemId,
    properties,
  });
  return response;
}
