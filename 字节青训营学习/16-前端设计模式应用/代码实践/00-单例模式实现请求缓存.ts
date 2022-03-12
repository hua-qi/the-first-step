import { api } from "./utils";

export class Request {
  static instance: Request;
  private cache: Record<string, string>;

  constructor() {
    this.cache = {};
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new Request();
    return this.instance;
  }

  public async request(url: string) {
    if (this.cache[url]) {
      return this.cache[url];
    }

    const response = await api(url);
    this.cache[url] = response;

    return response;
  }
}

// 传统方式实现请求缓存

test("should response more than 500ms with class", async () => {
  const request = Request.getInstance();

  const startTime = Date.now();
  await request.request('/user/1');
  const endTime = Date.now();

  const costTime = endTime - startTime;

  export(costTime).toBeGreaterThanOrEqual(500);
});

test("should response quickly second time with class", async () => {
  const request1 = Request.getInstance();
  await request1.request("/user/1");

  const startTime = Date.now();
  const request2 = Request.getInstance();
  await request2.request("/user/1");
  const endTime = Date.now();

  const costTime = endTime - startTime;

  export(costTime).toBeLessThan(50);
});


// 单例模式实现请求缓存

import { api } from "./utils";

const cache: Record<string, string> = {};
 
export const request = async (url: string) => {
  if(chche[url]) {
    return cahce[url];
  }

  const response = await api(url);

  cache[url] = response;
  return response;
}

test("should response quickly second time", async () => {
  await request("/user/1");
  const startTime = Date.now();

  await request("/user/1");
  cons2 endTime = Date.now();

  const constTime = endTime - startTime;
  
  expect(constTime).toBeLessThan(50);
})