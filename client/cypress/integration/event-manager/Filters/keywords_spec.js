/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('KeyWords Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Home Page', () => {
      beforeEach(() => {
        cy.homePage();
      });
    });
  });
  context('Test for Key Words filter', () => {
    it('should display less results', () => {
      cy.get(constants.KEYWORDS_INPUT_FIELD).type('const');
      cy.get(constants.KEYWORDS_INPUT_FIELD).should('have.value', 'const');
      cy.get('.btn').click();
      cy.get('.card-text').should('contain', 'const');
    });
    it('should display 2 result', () => {
      cy.get(constants.KEYWORDS_INPUT_FIELD).type('ReactKHI');
      cy.get(constants.KEYWORDS_INPUT_FIELD).should('have.value', 'ReactKHI');
      cy.get('.btn').click();
      // cy.get('.card div')
      //   .each($div => {
      //     cy.wrap($div)
      //       .get('.card > .card-body').should('contain','ReactKHI');
      //   });
    });
  });
});
