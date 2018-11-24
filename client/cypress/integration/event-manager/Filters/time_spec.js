/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('Time Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      beforeEach(() => {
        cy.homePage();
      });
    });
  });

  context('Test for Time filter', () => {
    it('should have one item', () => {
      cy.get(constants.TIME_INPUT_FIELD, { timeout: constants.WAITING_TIME })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.get(constants.TIME_FIELD_OPTION_2).click();
      cy.get('.Select-value #react-select-6--value-0').should(
        'contain',
        'Noon'
      );
      cy.log('should deselect item');
      cy.get(constants.TIME_FIELD_VALUE).should('have.class', 'Select-value');
      cy.get('.Select-value-icon').click();
      cy.get(constants.TIME_FIELD_VALUE).should('not.have.class', 'Select-value');
    });

    it('should have multiple items', () => {
      cy.get(constants.TIME_INPUT_FIELD, { timeout: constants.WAITING_TIME })
        .eq(0)
        .click();
      cy.get(constants.TIME_FIELD_OPTION_1).click();
      cy.get('.Select-value #react-select-6--value-0').should(
        'contain',
        'Morning'
      );

      cy.get(constants.TIME_INPUT_FIELD, { timeout: constants.WAITING_TIME })
        .eq(0)
        .click();
      cy.get(constants.TIME_FIELD_OPTION_2).click();
      cy.get('.Select-value #react-select-6--value-1').should(
        'contain',
        'Evening'
      );
      cy.log('can cancel all the items at once');
      cy.get(constants.TIME_FIELD_VALUE).should('have.class', 'Select-value');
      cy.get(
        ':nth-child(7) > .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
      cy.get(constants.TIME_FIELD_VALUE).should('not.have.class', 'Select-value');
    });
  });
});
