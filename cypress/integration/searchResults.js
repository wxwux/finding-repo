/*eslint-disable*/
import { Pagination } from "../../src/helpers/pagination";
import { getPageValueFromUrl } from "../../src/helpers/queries";

it("shows all required data after search", () => {
  const searchValue = "redux";
  cy.search(searchValue);

  cy.wait("@search").then(({ response }) => {
    const totalFound = response.body["total_count"];
    const totalDisplay = totalFound > 10000 ? "10000+" : totalFound;
    const itemsPerPage = 30;
    const itemsShown = totalFound >= itemsPerPage ? itemsPerPage : totalFound;

    cy.get("#search-history > button:first").contains(searchValue);

    cy.get("#total-repos span").contains(totalDisplay);

    cy.get("#response-time").contains(/(\d*s\s)?(\d*)ms/);

    cy.get("#results-list > li").its("length").should("to.equal", itemsShown);

    if (totalFound >= itemsPerPage) {
      expect(response.headers.link.length > 0).to.be.true;
      cy.get("#pagination ul > li")
        .its("length")
        .should("to.be.greaterThan", 0);
    }
  });
});

it("paginates correctly", () => {
  const searchValue = "redux";
  cy.search(searchValue);

  cy.wait("@search");
  cy.get("#pagination li:nth-child(4)").click();

  cy.wait("@search").then(({ response }) => {
    const paginationHeader = response.headers.link;
    const items = response.body.items;

    const pagination = new Pagination(paginationHeader).generate();

    expect(pagination.active).to.equal(2);
    expect(getPageValueFromUrl(pagination.next)).to.equal(3);
    expect(getPageValueFromUrl(pagination.prev)).to.equal(1);

    const titles = [];
    cy.get("#results-list li")
      .each((item) => {
        titles.push(item.text());
      })
      .then(() => {
        const itemsShownCorrectly = items.every(
          (item, ndx) => item.name === titles[ndx]
        );

        expect(itemsShownCorrectly).to.be.true;
      });
  });
});
