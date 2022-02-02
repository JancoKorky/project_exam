// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("login", () => {
  cy.visit("index.php?route=account/login");
  cy.get('input[name="email"]').type("yitarip108@chinamkm.com");
  cy.get('input[name="password"]').type("jozko{enter}");
  cy.url().should("eq", "https://demo.opencart.com/index.php?route=account/account");
});

// Cypress.Commands.add("login", () => {
//   cy.request({
//     method: "POST",
//     url: "https://www.opencart.com/index.php?route=account/login",
//     body: {
//       user: {
//         email: "yitarip108@chinamkm.com",
//         password: "jozko",
//       },
//     },
//   }).then((resp) => {
//       window.localStorage.setItem('jwt',resp.body.user.token)
//   });
// });
