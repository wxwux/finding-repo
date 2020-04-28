/*eslint-disable*/

it("gets items form cache without request", () => {
  const searchValue = "redux";
  cy.search(searchValue);

  let items = [];
  cy.wait("@search").then(({ response }) => {
    items = response.body.items;
  });

  cy.get("#pagination li:nth-child(4)").click();

  cy.wait("@search");

  cy.get("#pagination li:nth-child(3)").click();

  cy.expectDataAppearedInListCorrectly("#results-list li", items);
});
