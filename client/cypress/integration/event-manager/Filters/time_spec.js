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
      cy.visit('/events');
      cy.get('.btn').should('contain', 'Search');
    });
  });

  context('Test for Time filter', () => {
    it('should have one item', () => {
      cy.get(constants.time, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.get(constants.VAL10).click();
      cy.get('.Select-value #react-select-6--value-0').should(
        'contain',
        'Noon'
      );
    });

    it('should deselect item', () => {
      cy.get('.Select-value-icon').click();
    });

    it('should have multiple items', () => {
      cy.get(constants.time, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL9).click();
      cy.get('.Select-value #react-select-6--value-0').should(
        'contain',
        'Morning'
      );

      cy.get(constants.time, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL10).click();
      cy.get('.Select-value #react-select-6--value-1').should(
        'contain',
        'Evening'
      );
    });

    it('should cancel all the items at once', () => {
      cy.get(
        ':nth-child(7) > .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
    });
  });
});
