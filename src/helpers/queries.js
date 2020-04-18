export const queryConstructor = {
  byTitle(title) {
    return `?q=${title}`;
  },
  byPageForTitle(page, title) {
    return `?q=${title}&page=${page}`;
  },
  byOwnerAndTitle(owner, title) {
    return `/${owner}/${title}`;
  }
};

export const parseSearchQueryFromUrl = (url) => {
  if (!url) return "";

  const parsedUrl = new URL(url);
  return parsedUrl.search;
};

export const getParamFromQueryString = (query, paramName) => {
  const params = new URLSearchParams(query);
  return params.get(paramName);
};

export const getPageValueFromUrl = (url) => {
  const linkSearchQuery = parseSearchQueryFromUrl(url);
  const pageParamValue = getParamFromQueryString(linkSearchQuery, "page");

  if (Boolean(pageParamValue) === false) {
    console.warn("no param has been found in the query");
    return 0;
  }

  return Number(pageParamValue);
};
