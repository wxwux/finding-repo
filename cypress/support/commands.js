/*eslint-disable*/
const host = Cypress.env("host");

Cypress.Commands.add("search", (searchValue) => {
  cy.server();
  cy.route({
    url: "**/search/*",
  }).as("search");
  cy.visit(host);

  cy.get("input[type=text]").type(searchValue);
  cy.wait(1000)
});
