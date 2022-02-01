/// <reference types="cypress" />

describe("testing shopping", () => {
  before(() => {
    cy.visit("/");
  });

  it("navigate to specific product (iMac)", () => {
    cy.get(".nav.navbar-nav")
      .find("li.dropdown")
      .first()
      .find(".dropdown-menu")
      .invoke("show")
      .contains("Mac (1)")
      .click();
    cy.url().should("eq", "https://demo.opencart.com/index.php?route=product/category&path=20_27");
    cy.contains("h4", "iMac").find("a").click();
    cy.url().should("eq", "https://demo.opencart.com/index.php?route=product/product&path=20_27&product_id=41");
  });

  it('product out of stock',()=>{
      cy.contains('Availability: Out Of Stock')
      cy.contains('button','Add to Cart').should('be.disabled')
  })

  it('none(0) product to cart',()=>{
      cy.get('input[name=quantity]').clear().type('0')
      cy.contains('button','Add to Cart').click()
      cy.get('.alert').should('contain','Not Success: Cannot add 0 items to cart!')
  })

  it('minus product to cart',()=>{
      cy.get('input[name=quantity]').clear().type('-2')
      cy.contains('button','Add to Cart').click()
      cy.get('.alert').should('contain','Not Success: To remove items from cart you should visit shopping cart!')
  })

  it("add product to cart", () => {
    cy.get("input[name=quantity]").clear().type("2");
    cy.contains("button", "Add to Cart").click();
    cy.get(".alert").should("contain", "Success: You have added iMac to your shopping cart!");
  });

  it("check shopping cart for product", () => {
    cy.get("#cart-total").click();
    cy.get(".table.table-striped tr td")
      .first()
      .next()
      .should("contain", "iMac")
      .next()
      .should("contain", "x 2")
      .next()
      .should("contain", "$244.00");
    cy.get(".dropdown-menu.pull-right").contains("View Cart").click();

    cy.get(".table-responsive tbody tr td")
      .first()
      .next()
      .should("contain", "iMac")
      .next()
      .next()
      .next()
      .should("contain", "$122.00")
      .next()
      .should("contain", "$244.00");
  });

  it('remove product from cart and show alert',()=>{
    cy.get(".table-responsive tbody tr td").find('.btn.btn-danger').click()
    // from this point there should be some alert popup if we want to remove an item
    // and also, lets say if there will not be any popup, then at least there should be alert informing you about removed item from cart, including link/option to reverse this and bring item back.
    cy.get('.alert').should('contain','You removed item{link} from cart, do you want to bring it back{link}?')
  })

  it("Checkout products", () => {
    //   not possible on this demo website
  });
});
