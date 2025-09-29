import { WebClient } from '@slack/web-api';

const SLACK_TOKEN = process.env.SLACK_TOKEN || '';

const client = new WebClient(SLACK_TOKEN);

export async function sendSlackMessage(channel: string, text: string) {
  const result = await client.chat.postMessage({
    channel,
    markdown_text: text,
  });
  console.log('Message sent: ', result);
  if (!result.ok) {
    throw new Error(`Failed to send message to Slack: ${result.error}`);
  }
};
