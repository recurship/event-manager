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
      cy.visit('/events');
      cy.get('.btn').should('contain', 'Search');
    });
  });

  context('Test for sponsors filter', () => {
    it('should have one item', () => {
      cy.get(constants.spons, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.get(constants.VAL7).click();
      cy.get('.Select-value #react-select-4--value-0').should(
        'contain',
        'tapal'
      );
    });

    it('should deselect item', () => {
      cy.get('.Select-value-icon').click();
    });

    it('should have multiple items', () => {
      cy.get(constants.spons, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL8).click();
      cy.get('.Select-value #react-select-4--value-0').should(
        'contain',
        'nokia'
      );

      cy.get(constants.spons, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL8).click();
      cy.get('.Select-value #react-select-4--value-1').should(
        'contain',
        'apple'
      );
    });

    it('should cancel all the items at once', () => {
      cy.get(
        ':nth-child(5) > .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
    });
  });
});
