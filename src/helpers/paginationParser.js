const parseRel = (rel) => {
  const relArr = rel.split("=");
  return relArr[1].replace('"', "").replace('"', "");
};

const parseUrl = (link) => {
  const regexp = /<(.*)>/gm;
  const pureUrl = regexp.exec(link)[1];

  return pureUrl;
};

const parsePaginationHeader = (linkString) => {
  if (Boolean(linkString) === false) return [];

  const links = linkString.split(", ");

  const constructItemObject = (link) => {
    const linkHeaderPart = link.split("; ");

    return {
      url: parseUrl(linkHeaderPart[0]),
      rel: parseRel(linkHeaderPart[1]),
    };
  };

  return links.map(constructItemObject);
};

export default parsePaginationHeader;
