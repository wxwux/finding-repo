import { PaginationLink, Pagination } from "../pagination";

const pageState = {
  NEXT: "next",
  PREV: "prev",
  FIRST: "first",
  LAST: "last",
};

const generateLinkPageField = (page, rel) => {
  return {
    value: `<https://api.github.com/search/repositories?q=loftschool&page=${page}>; rel="${rel}"`,
    link: `<https://api.github.com/search/repositories?q=loftschool&page=${page}>`,
    pureLink: `https://api.github.com/search/repositories?q=loftschool&page=${page}`,
    rel: `rel=${rel}`,
    pureRel: `${rel}`,
    toString() {
      return this.value
    }
  };
};

describe("PaginationLink class", () => {
  let linkObj;

  beforeEach(() => {
    linkObj = generateLinkPageField(10, pageState.NEXT)
  });

  it("parses pure url from link string", () => {
    const paginationLink = new PaginationLink();
    const pureLink = paginationLink.parseUrl(linkObj.link);

    expect(pureLink).toBe(linkObj.pureLink);
  });

  it("parses pure rel from rel string", () => {
    const paginationLink = new PaginationLink();
    const pureRel = paginationLink.parseRel(linkObj.rel);

    expect(pureRel).toBe(linkObj.pureRel);
  });

  it("constructs object representarion from link string", () => {
    const linkHeaderObj = generateLinkPageField(12, pageState.FIRST);
    const paginationLink = new PaginationLink(linkHeaderObj.value);

    const object = paginationLink.constructObject();

    const result = {
      url: linkHeaderObj.pureLink,
      rel: linkHeaderObj.pureRel
    }

    expect(object).toMatchObject(result);
  });
});


describe("Pagination class", () => {
  const firstPage = {
    next: generateLinkPageField(2, pageState.NEXT),
    last: generateLinkPageField(35, pageState.LAST),
    getLinkString() {
      return [this.next, this.last].join(", ");
    }
  }
  
  const middlePage = {
    prev: generateLinkPageField(1, pageState.PREV),
    next: generateLinkPageField(3, pageState.NEXT),
    last: generateLinkPageField(35, pageState.LAST),
    first: generateLinkPageField(1, pageState.FIRST),
    getLinkString() {
      return [this.prev, this.next, this.last, this.first].join(", ");
    }
  }

  const lastPage = {
    prev: generateLinkPageField(34, pageState.PREV),
    first: generateLinkPageField(1, pageState.FIRST),
    getLinkString() {
      return [this.prev, this.first].join(", ")
    }
  };

  it("generates proper pagination object for the first page", () => {
    const pagination = new Pagination(firstPage.getLinkString());
    const paginationObject = pagination.generate();

    const result = {
      total: 35,
      next: firstPage.next.pureLink,
      active: 1
    };

    expect(paginationObject).toMatchObject(result); 
  });

  it("generates proper pagination object for the middle page", () => {
    const pagination = new Pagination(middlePage.getLinkString());
    const paginationObject = pagination.generate();

    const result = {
      total: 35,
      prev: middlePage.prev.pureLink,
      next: middlePage.next.pureLink,
      active: 2
    };

    expect(paginationObject).toMatchObject(result); 
  });

  it("generates proper pagination object for the last page", () => {
    const pagination = new Pagination(lastPage.getLinkString());
    const paginationObject = pagination.generate();

    const result = {
      total: 35,
      prev: lastPage.prev.pureLink,
      active: 35
    };

    expect(paginationObject).toMatchObject(result); 
  });

  it("counts active page correctly", () => {
    const firstPageObj = new Pagination(firstPage.getLinkString());
    expect(firstPageObj.getActivePage()).toBe(1);

    const middlePageObj = new Pagination(middlePage.getLinkString());
    expect(middlePageObj.getActivePage()).toBe(2)

    const lastPageObj = new Pagination(lastPage.getLinkString());
    expect(lastPageObj.getActivePage()).toBe(35);

    const randomPage = [
      generateLinkPageField(14, pageState.PREV),
      generateLinkPageField(16, pageState.NEXT),
      generateLinkPageField(1, pageState.FIRST),
      generateLinkPageField(66, pageState.LAST)
    ].join(", ");

    const randomPageParination = new Pagination(randomPage);
    expect(randomPageParination.getActivePage()).toBe(15);
  });

  it("counts amount of pages correctly", () => {
    const middlePageObj = new Pagination(middlePage.getLinkString());
    expect(middlePageObj.getTotal()).toBe(35);

    const lastPageObj = new Pagination(lastPage.getLinkString());
    expect(lastPageObj.getTotal()).toBe(35);
  });

  it("returns link object by its rel", () => {
    const middlePagePagination = new Pagination(middlePage.getLinkString());

    const linkObj = middlePagePagination.getLinkObjectByRel("next");

    const result = {
      url: middlePage.next.pureLink,
      rel: middlePage.next.pureRel
    }

    expect(linkObj).toMatchObject(result);
  });

  it("returns formatted obj by its rel", () => {
    const middlePagePagination = new Pagination(middlePage.getLinkString());

    const formatter = ({url, rel}) => ({
      [rel] : url
    })

    const linkObj = middlePagePagination.getLinkObjectByRel("prev", formatter);

    const result = {
      prev: middlePage.prev.pureLink,
    }

    expect(linkObj).toMatchObject(result);
  });

  it("transfroms link header to pages array", () => {
    const firstPagePagination = new Pagination(firstPage.getLinkString());
    const pagesArray = firstPagePagination.parseDefaultLinks();

    const result = [
      {
        rel: firstPage.next.pureRel,
        url: firstPage.next.pureLink
      },
      {
        rel: firstPage.last.pureRel,
        url: firstPage.last.pureLink
      }
    ]

    pagesArray.forEach((page, ndx) => {
      expect(page).toMatchObject(result[ndx]);
    }) 
  });
});
