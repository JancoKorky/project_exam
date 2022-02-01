/// <reference types="cypress" />

describe("testing navigation", () => {
  before(() => {
    cy.visit("/");
  });

    it('redirect to category after click on main categories of navigation',()=>{
        cy.get('.nav.navbar-nav > li a').first().click()
        cy.url().should('eq', 'https://demo.opencart.com/index.php?route=product/category&path=20')
        // I suggest to write this navigation different better way as redirect to main categories not working
        // I also checked if there is element <a> with href and it is.
    })

  it("show dropdown on hover if contains class dropdown", () => {
    cy.get(".nav.navbar-nav > li.dropdown").each(($li) => {
      cy.wrap($li).invoke("addClass", "open").find("li").should("be.visible");
      cy.wrap($li).invoke("removeClass", "open");
    //   hover effect in cypress is not working by suggested options in documentation and i think it is bug pending to be solved
    //  but from what i read there is some kind of plugin that allows you to use .realhover() method and fixing this issue but it is supported just with chrome browser
    // https://github.com/dmtrKovalenko/cypress-real-events#cyrealhover
    // https://stackoverflow.com/questions/63135193/how-to-test-hover-using-cypress-triggermouseover-doesnt-work
    });
  });
});
