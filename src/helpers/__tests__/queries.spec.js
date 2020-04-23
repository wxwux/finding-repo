import { queryConstructor, getPageValueFromUrl } from "../queries";

it("constructs proper title query obj", () => {
  const query = queryConstructor.byTitle("value");

  expect(query.type).toBe("title");
  expect(query.originalValues).toStrictEqual(["value"]);
  expect(`${query}`).toBe(`?q=value`);
});

it("constructs proper page&title query obj", () => {
  const query = queryConstructor.byPageForTitle(2, "value");

  expect(query.type).toBe("page");
  expect(query.originalValues).toStrictEqual([2, "value"]);
  expect(`${query}`).toBe(`?q=value&page=2`);
});

it("returns value of the page params form query", () => {
  const url = "http://nowhere.com?q=test&page=13";
  expect(getPageValueFromUrl(url)).toBe(13);
  expect(getPageValueFromUrl()).toBe(0);
  expect(getPageValueFromUrl(NaN)).toBe(0);
});