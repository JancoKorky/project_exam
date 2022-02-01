/// <reference types="cypress" />

describe("testing page not found", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("change of slug in category", () => {
    // path=999 does not exist
    cy.visit("index.php?route=product/category&path=999", { failOnStatusCode: false });
    cy.get("#content").should("contain", "Category not found!");
  });

  it("change of route", () => {
    // route=invalid not exist
    cy.visit("index.php?route=invalid/category&path=24", { failOnStatusCode: false });
    cy.get("#content").should("contain", "The page you requested cannot be found!");
  });

  it("404, link base to invalid", () => {
    // index.php to invalid.php that not exist
    const url404test = "invalid.php?route=invalid/category&path=999";

    cy.request({
      url: url404test,
      failOnStatusCode: false,
    })
      .its("status")
      .should("eq", 404);

    cy.visit(url404test, { failOnStatusCode: false });
    cy.get('h1').should('contain','Not Found');
    cy.get('p').last().should('contain','404 Not Found')
  });
});
