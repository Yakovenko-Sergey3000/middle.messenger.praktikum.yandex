import { describe, expect, test } from "@jest/globals";
import Router from "./index.ts";
import Component from "../component.ts";

describe("Router", () => {
  test("Роутер должен быть singleton", () => {
    const router1 = new Router();
    const router2 = new Router();

    expect(router1 === router2).toBe(true);
  });

  test("Должен переключаться между страницами через метод 'go()'", () => {
    const router = new Router();
    router.use("/", new Component("div"));
    router.use("/test", new Component("div"));
    router.start();

    expect(router.atPath).toBe("/");
    router.go("/test");

    expect(router.atPath).toBe("/test");
  });

  test("use() Должен возвращать экземпляр класса", () => {
    const router = new Router();

    expect(router.use("/", new Component("div")) === router).toBe(true);
  });
});
