/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

describe('Filters Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });
  context('Test for Organization Filters', () => {
    it('should have an arrow button', () => {
      cy.get('div .Select #react-select-2--value').click()
    });  
  });
});
