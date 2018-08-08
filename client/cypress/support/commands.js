/* global Cypress  */
/* global cy */
/* eslint no-undef: "error" */
Cypress.Commands.add('fillForm', userType => {
  cy.get('form input[name=firstname]')
    .clear()
    .type(userType.firstname);
  cy.get('form input[name=lastname]')
    .clear()
    .type(userType.lastname);
  cy.get('form input[name=username]')
    .clear()
    .type(userType.username);
  cy.get('form input[name=email]')
    .clear()
    .type(userType.email);
  cy.get('form input[name=password]')
    .clear()
    .type(userType.password);
});

Cypress.Commands.add('login', userType => {
  cy.get('form input[name=username]')
    .clear()
    .type(userType.username);
  cy.get('form input[name=password]')
    .clear()
    .type(userType.password);
});

Cypress.Commands.add('visitEditPage', (ValidCredentials, username) => {
  cy.visit('/login');
  cy.login(ValidCredentials);
  cy.contains('Submit').click();
  cy.get('.card-img-top')
    .first()
    .click();
  cy.reload();
  cy.get('.card-title')
    .contains(username)
    .click();
});
