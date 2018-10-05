/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

const kw = ':nth-child(8) > .form-control';
const URL = 'http://localhost:3000/events/';

describe('KeyWords Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });
  context('Test for Key Words filter', () => {
    it('should display 1 result', () => {
      cy.get(kw).type('const');
      cy.get(kw).should('have.value', 'const');
      cy.get('.btn').click();
      cy.get('.card-text').should('contain', 'const');
      cy.visit(URL);
    });
    it('should display 2 result', () => {
      cy.get(kw).type('sasta');
      cy.get(kw).should('have.value', 'sasta');
      cy.get('.btn').click();
      cy.get('.card div')
        .should('have.length', '2')
        .each($div => {
          cy.wrap($div)
            .get('.card > .card-body > .card-text')
            .should('contain', 'sasta');
        });
    });
  });
});
