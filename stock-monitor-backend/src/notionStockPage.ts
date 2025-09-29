import { updateNotionDatabaseItem } from "./notion";

const datasourceId = process.env.NOTION_DATASOURCE_ID || '';

export async function getNotionRecordByName(result: any, name: string) {
  return result.results.find((page: any) => page?.properties?.Name?.title?.[0]?.text?.content === name);
}

export async function updateCurrentPrice(page: any, price: number) {
  return updateNotionDatabaseItem(datasourceId, page.id, {
    'Current Price': {
      'number': price,
    },
  });
}

export async function updateUpdated(page: any, updatedContent: string) {
  return updateNotionDatabaseItem(datasourceId, page.id, {
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
