/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('constants.organisation Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      beforeEach(() => {
        cy.homePage();
      });
    });
  });

  context('Test for constants.organization Filter', () => {
    it('should have a clickable arrow button', () => {
      cy.get(constants.ORGANISATION_INPUT_FIELD, {
        timeout: constants.WAITING_TIME,
      })
        .eq(0)
        .click(); //Clicks the toggle button
      cy.get('div.Select-menu-outer').should('be.visible');
    });

    it('should display less results on items selection', () => {
      cy.get(constants.ORGANISATION_INPUT_FIELD, {
        timeout: constants.WAITING_TIME,
      })
        .eq(0)
        .click();
      cy.get(constants.ORGANISATION_FIELD_OPTION_2).click();
      cy.get('.Select-value #react-select-2--value-0').should('contain', 'NES');

      cy.get(constants.ORGANISATION_INPUT_FIELD, {
        timeout: constants.WAITING_TIME,
      })
        .eq(0)
        .click();
      cy.get(constants.ORGANISATION_FIELD_OPTION_1).click();
      cy.get('.Select-value #react-select-2--value-1').should(
        'contain',
        'Recurship'
      );
      cy.get('.btn').click();
      cy.get('#event-list a')
        .eq(0)
        .should('have.attr', 'href')
        .and('include', '/events/1');

      cy.get('#event-list a')
        .eq(1)
        .should('have.attr', 'href')
        .and('include', '/events/2');
      cy.log('can cancel all the items at once');
      cy.get(constants.ORGANISATION_FIELD_VALUE).should(
        'have.class',
        'Select-value'
      );
      cy.get(
        ':nth-child(1) > .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
      cy.get('.btn').click();
      cy.get(constants.ORGANISATION_FIELD_VALUE).should(
        'not.have.class',
        'Select-value'
      );
    });
  });
});
