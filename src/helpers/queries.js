export const queryConstructor = {
  byTitle(title) {
    return `?q=${title}`;
  },
};

export const parseSearchQueryFromLink = link => {
  const url = new URL(link);
  return url.search;
}
