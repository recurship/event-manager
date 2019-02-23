/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('Sponsors Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      beforeEach(() => {
        cy.homePage();
      });
    });
  });

  context('Test for sponsors filter', () => {
    it('should have one item', () => {
      cy.get(constants.SPONSORS_INPUT_FIELD, {
        timeout: constants.WAITING_TIME,
      })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.get(constants.SPONSORS_FIELD_OPTION_1).click();
      cy.get('.Select-value #react-select-4--value-0').should(
        'contain',
        'tapal'
      );
      cy.log('should deselect item');
      cy.get(constants.SPONSORS_FIELD_VALUE).should(
        'have.class',
        'Select-value'
      );
      cy.get('.Select-value-icon').click();
      cy.get(constants.SPONSORS_FIELD_VALUE).should(
        'not.have.class',
        'Select-value'
      );
    });

    it('should have multiple items', () => {
      cy.get(constants.SPONSORS_INPUT_FIELD, {
        timeout: constants.WAITING_TIME,
      })
        .eq(0)
        .click();
      cy.get(constants.SPONSORS_FIELD_OPTION_2).click();
      cy.get('.Select-value #react-select-4--value-0').should(
        'contain',
        'nokia'
      );

      cy.get(constants.SPONSORS_INPUT_FIELD, {
        timeout: constants.WAITING_TIME,
      })
        .eq(0)
        .click();
      cy.get(constants.SPONSORS_FIELD_OPTION_2).click();
      cy.get('.Select-value #react-select-4--value-1').should(
        'contain',
        'apple'
      );
      cy.log('can cancel all the items at once');
      cy.get(constants.SPONSORS_FIELD_VALUE).should(
        'have.class',
        'Select-value'
      );
      cy.get(
        ':nth-child(5) > .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
      cy.get(constants.SPONSORS_FIELD_VALUE).should(
        'not.have.class',
        'Select-value'
      );
    });
  });
});
