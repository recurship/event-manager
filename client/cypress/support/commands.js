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
