import { decodeToUnicode } from "./base64";
import MarkdownIt from "markdown-it";


export const getHtmlFromMarkdownBase64 = (base64string) => {
  const content = decodeToUnicode(base64string);
  const markdown = new MarkdownIt({
    html: true,
  });
  return markdown.render(content);
}