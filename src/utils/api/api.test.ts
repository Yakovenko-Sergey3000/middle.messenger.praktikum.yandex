import { describe, expect, beforeAll, jest, test } from "@jest/globals";
import { ApiResponceType } from "@utils/utils.js";
import Api from "./api.ts";

const xhrMockClass = () => ({
  open: jest.fn(),
  send: jest.fn(function (data) {
    if (data) {
      // @ts-ignore
      this.response = data;
    }
    // @ts-ignore
    this.onload();
  }),
  setRequestHeader: jest.fn(),
  status: 200,
  response: "OK",
});

globalThis.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass) as any;

describe("HTTP Transport", () => {
  let api: Api;
  const testBodyData = {
    someData: "Test",
  };

  beforeAll(() => {
    api = new Api("/");
    api.get.bind(api);
    api.post.bind(api);
    api.put.bind(api);
    api.delete.bind(api);
  });

  test("Должен сделать GET запрос и вернуть ответ", async () => {
    const res = await api.get<ApiResponceType>("/");

    expect(res.status).toBe(200);
    expect(res.response).toBe("OK");
  });

  test("Должен сделать POST запрос и вернуть ответ", async () => {
    const res = await api.post<ApiResponceType>("/", {
      data: testBodyData,
    });

    expect(res.status).toBe(200);
    expect(res.response).toBe(JSON.stringify(testBodyData));
  });

  test("Должен сделать PUT запрос и вернуть ответ", async () => {
    const res = await api.put<ApiResponceType>("/", {
      data: testBodyData,
    });

    expect(res.status).toBe(200);
    expect(res.response).toBe(JSON.stringify(testBodyData));
  });

  test("Должен сделать DELETE запрос и вернуть ответ", async () => {
    const res = await api.delete<ApiResponceType>("/", {
      data: testBodyData,
    });

    expect(res.status).toBe(200);
    expect(res.response).toBe(JSON.stringify(testBodyData));
  });
});
