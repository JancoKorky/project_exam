/// <reference types="cypress" />

describe("testing login page", () => {
  beforeEach(() => {
    cy.visit("index.php?route=account/login");
  });

  it("contains login text", () => {
    cy.contains("h2", "Returning Customer");
  });

  it("links to /register", () => {
    cy.get(".well")
      .first()
      .contains("Continue")
      .should("have.attr", "href", "https://demo.opencart.com/index.php?route=account/register");
  });

  it("requires email", () => {
    cy.get("form").last().contains("Login").click();
    cy.get(".alert").should("contain", "Warning: No match for E-Mail Address and/or Password.");
  });

  it("requires password", () => {
    cy.get('input[name="email"]').type("inval@email.com{enter}");
    cy.get(".alert").should("contain", "Warning: No match for E-Mail Address and/or Password.");
  });

  it("requires valid email and password", () => {
    cy.get('input[name="email"]').type("inval@email.sk");
    cy.get('input[name="password"]').type("invalid{enter}");
    cy.get(".alert").should("contain", "Warning: No match for E-Mail Address and/or Password.");

  });
  
  it("navigates to /website after successful login", () => {
    cy.get('input[name="email"]').type("yitarip108@chinamkm.com");
    cy.get('input[name="password"]').type("jozko{enter}");
    cy.url().should('eq', 'https://demo.opencart.com/index.php?route=account/account')
  });
});
