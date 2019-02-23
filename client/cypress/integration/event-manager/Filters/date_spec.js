/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('Date Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      beforeEach(() => {
        cy.homePage();
      });
    });
  });

  context('Test for Date Filter', () => {
    it('should only accept a correct date format', () => {
      cy.get("input[name='filterDateTo']")
        .type(constants.EVENT_END_DATE)
        .should('have.value', '2018-11-18'); //Event END Date
      cy.get("input[name='filterDateFrom']")
        .type(constants.EVENT_START_DATE)
        .should('have.value', '2011-11-24'); //Event START date
      cy.visit(constants.BASE_URL);
    });
  });
});
