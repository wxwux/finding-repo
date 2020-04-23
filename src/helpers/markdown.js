import { decodeToUnicode } from "./base64";
import MarkdownIt from "markdown-it";

export const cutOffTheBadges = (markdown) => {
  const badgeRegex = /(\[\!)(.*)(\]|\))/gm;
  return markdown.replace(badgeRegex, "");
};

export const getHtmlFromMarkdownBase64 = (base64string) => {
  const content = decodeToUnicode(base64string);
  const markdown = new MarkdownIt({
    html: true,
  });
  const purifiedMarkdown = cutOffTheBadges(content);
  return markdown.render(purifiedMarkdown);
};
