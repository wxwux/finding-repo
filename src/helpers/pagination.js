import { getPageValueFromUrl } from "./queries";

export class PaginationLink {
  constructor(linkHeaderString) {
    if (!linkHeaderString) return "";

    this.linkString = linkHeaderString.trim();
  }

  parseRel(rel) {
    const relArr = rel.split("=");
    return relArr[1].replace('"', "").replace('"', "");
  }

  parseUrl(link) {
    const regexp = /<(.*)>/gm;
    const pureUrl = regexp.exec(link)[1];

    return pureUrl;
  }

  constructObject() {
    const linkHeaderPart = this.linkString.split("; ");
    const url = this.parseUrl(linkHeaderPart[0]);
    const rel = this.parseRel(linkHeaderPart[1]);

    return { url, rel };
  }
}

export class Pagination {
  constructor(linkHeaderString) {
    this.linkString = linkHeaderString;
  }

  getActivePage() {
    const nextLink = this.getLinkObjectByRel("next");

    //regular pages
    if (nextLink) {
      const pageNum = getPageValueFromUrl(nextLink.url);
      return pageNum - 1;
    }

    //last page
    if (!nextLink) {
      const prevLink = this.getLinkObjectByRel("prev");
      const prevPageNum = getPageValueFromUrl(prevLink.url);
      return prevPageNum + 1;
    }
  }

  getTotal() {
    const lastLinkObj = this.getLinkObjectByRel("last");

    if (lastLinkObj) {
      return getPageValueFromUrl(lastLinkObj.url);
    } else {
      const prevLinkObj = this.getLinkObjectByRel("prev");
      return getPageValueFromUrl(prevLinkObj.url) + 1;
    }
  }

  transformToRelUrlForm(linkObj) {
    if (!linkObj) return {};

    return {
      [linkObj.rel]: linkObj.url,
    };
  }

  parseDefaultLinks() {
    if (Boolean(this.linkString) === false) return [];

    const links = this.linkString.split(",");

    const constructItemObject = (link) => {
      const paginationLink = new PaginationLink(link);

      return paginationLink.constructObject();
    };

    return links.map(constructItemObject);
  }

  getLinkObjectByRel(rel, formatter) {
    const defaultLinks = this.parseDefaultLinks();

    const requiredLink = defaultLinks.filter((link) => link.rel === rel)[0];

    if (Boolean(requiredLink) === false) {
      return null;
    }

    if (typeof formatter === "function") {
      return formatter.call(requiredLink, {
        url: requiredLink.url,
        rel: requiredLink.rel,
      });
    }

    return requiredLink;
  }

  generate() {
    const transformToProperFormat = ({ url, rel }) => ({
      [rel]: url,
    });

    const next = this.getLinkObjectByRel("next", transformToProperFormat);
    const prev = this.getLinkObjectByRel("prev", transformToProperFormat);

    return {
      ...prev,
      ...next,
      total: this.getTotal(),
      active: this.getActivePage(),
    };
  }
}

const parsePaginationHeader = (linkString) => {
  if (Boolean(linkString) === false) return [];

  const links = linkString.split(", ");

  const constructItemObject = (link) => {
    const paginationLink = new PaginationLink(link);

    return paginationLink.constructObject();
  };

  return links.map(constructItemObject);
};

export default parsePaginationHeader;
