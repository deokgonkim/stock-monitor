import { getStockPrice } from "../src/lib";
import { saveJson } from "../src/util";


describe('Yahoo finance test', () => {
  // No set-cookie header present in Yahoo's response.  Something must have changed, please report.
  // https://github.com/gadicc/yahoo-finance2/issues/923
  // jest하고 yahoofinance하고 호환 문제가 있는 듯 하다.
  // jest.setup.js 사용해서 globals.fetch를 교체하는 것으로 하였다. 관련해서 undici 패키지를 설치하였다.

  it('should fetch stock data from Yahoo Finance', async () => {
    const ticker = 'AAPL';
    const quote = await getStockPrice(ticker);
    console.log(quote);
    expect(quote).toBeDefined();
    saveJson(quote, './output/yf-quote.json');
  });
});
