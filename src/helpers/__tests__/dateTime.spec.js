import { convertMsToHumanFormat } from "../dateTime";

it("converts time in ms to {s}{ms} e.g. 1s 320ms", () => {
  expect(convertMsToHumanFormat(3200)).toBe("3s 200ms");
  expect(convertMsToHumanFormat(200)).toBe("200ms");
  expect(convertMsToHumanFormat()).toBe("0ms");
});
