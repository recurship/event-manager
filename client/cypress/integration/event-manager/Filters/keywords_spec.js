/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('KeyWords Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('.btn').should('contain', 'Search');
    });
  });
  context('Test for Key Words filter', () => {
    it('should display 1 result', () => {
      cy.get(constants.kw).type('const');
      cy.get(constants.kw).should('have.value', 'const');
      cy.get('.btn').click();
      cy.get('.card-text').should('contain', 'const');
      cy.visit(constants.URL);
    });
    it('should display 2 result', () => {
      cy.get(constants.kw).type('sasta');
      cy.get(constants.kw).should('have.value', 'sasta');
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
