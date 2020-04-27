/*eslint-disable*/

const host = Cypress.env("host");

it("opens repo page", () => {
  cy.server();
  cy.route({
    url: "**/search/*",
  }).as("search");

  cy.visit(host);

  const searchValue = "redux";

  cy.get("input[type=text]").type(searchValue);
  cy.wait(1000);

  cy.wait("@search").then(({ response }) => {
    const items = response.body.items;
    const clickableItem = items[2];
    const fullName = clickableItem["full_name"];

    cy.route({
      url: `repos/${fullName}`,
    }).as("repo");

    cy.route({
      url: `**/readme`,
    }).as("readme");

    cy.get("#results-list li:nth-child(3)").click();

    cy.url().should("include", fullName);

    cy.wait("@repo").then(({ response }) => {
      const repo = response.body;

      cy.get("#user-name").contains(repo.owner.login);

      cy.get("#repo-stats > :nth-child(1) span").contains(repo.forks);
      cy.get("#repo-stats > :nth-child(3) span").contains(repo["open_issues"]);
      cy.get("#repo-stats > :nth-child(5) span").contains(
        repo["subscribers_count"]
      );
      cy.get("#repo-stats > :nth-child(7) span").contains(
        repo["stargazers_count"]
      );

      cy.get("#repo-title").contains(repo.name);

      cy.get("#last-changed").should("not.contain", "null");
      cy.get("#last-changed").should("not.contain", "undefined");
      cy.get("#last-changed").should("not.contain", "0");
    });

    cy.wait("@readme").then(({ response }) => {
      const readme = response.body;

      if (readme.content) {
        cy.get("#readme-container").should("not.contain", "No readme was provided");
      }

    });
  });
});
