import { WebClient } from '@slack/web-api';

const SLACK_TOKEN = process.env.SLACK_TOKEN || '';

const client = new WebClient(SLACK_TOKEN);

describe('Send Slack message', () => {
  it('should send a message to a Slack channel', async () => {
    const channel = '#general';
    const result = await client.chat.postMessage({
      channel: channel,
      text: `Test message from stock-monitor-backend at ${new Date().toISOString()}`,
    });
    console.log('Message sent: ', result);
    if (!result.ok) {
      throw new Error(`Failed to send message to Slack: ${result.error}`);
    }
  });
});
