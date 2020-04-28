/*eslint-disable*/
const host = Cypress.env("host");

Cypress.Commands.add("search", (searchValue) => {
  cy.server();
  cy.route({
    url: "**/search/*",
  }).as("search");
  cy.visit(host);

  cy.get("input[type=text]").type(searchValue);
  cy.wait(1000);
});

Cypress.Commands.add(
  "expectDataAppearedInListCorrectly",
  (listItems, dataArray) => {
    const titles = [];
    cy.get(listItems)
      .each((item) => {
        titles.push(item.text());
      })
      .then(() => {
        const itemsShownCorrectly = dataArray.every(
          (item, ndx) => item.name === titles[ndx]
        );

        expect(itemsShownCorrectly).to.be.true;
      });
  }
);
