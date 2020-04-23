import { decodeToUnicode } from "../base64";

it("transforms base64 string to unicode", () => {
  const string = decodeToUnicode(
    "0YLQtdGB0YLQuNGA0YPQtdC8INGO0L3QuNC60L7QtA=="
  );
  const result = "тестируем юникод";

  expect(string).toBe(result);
});
