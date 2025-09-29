# stock-monitor

This project will monitor my stock prices and update notion pages accordingly.

## What this does

- Fetch Stock prices from Yahoo Finance using [node-yahoo-finance2](https://www.npmjs.com/package/yahoo-finance2)
- Update Stock prices in Notion using [Notion SDK for JavaScript](https://www.npmjs.com/package/@notionhq/client)
- Notify user when Stock price reaches threshold price(stop loss price, target price) using [Slack Web API](https://www.npmjs.com/package/@slack/web-api)
