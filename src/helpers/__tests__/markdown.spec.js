import { cutOffTheBadges } from "../markdown";

it("cutoffs github badges", () => {
  const markdown = `#Markdown [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]`;
  expect(cutOffTheBadges(markdown)).toBe(`#Markdown `);
});

it("cutoffs github badges with links", () => {
  const markdown = `#Markdown [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)`;
  expect(cutOffTheBadges(markdown)).toBe(`#Markdown `);
});
