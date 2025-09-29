// jest환경에서 내장 fetch사용할 때, yahoo finance사용하면 set-cookie 관련 에러가 나서 패치함.
const { fetch, Headers, Request, Response } = require('undici');
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
