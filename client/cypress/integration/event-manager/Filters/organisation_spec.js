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
      cy.visit('/events');
      cy.get('.legend').should('contain', 'Filters');
    });
  });

  context('Test for constants.organization Filter', () => {
    it('should have a clickable arrow button', () => {
      cy.get(constants.org, { timeout: constants.delay })
        .eq(0)
        .click(); //Clicks the toggle button
      cy.get('div.Select-menu-outer').should('be.visible');
    });

    it('should display 1 result on single item selection', () => {
      cy.get(constants.org, { timeout: constants.delay }).eq(0);
      cy.get(constants.VAL4).click();
      cy.get('.Select-value #react-select-2--value-0').should('contain', 'NES');
      cy.get('.btn').click();
      cy.get('#event-list a')
        .should('have.attr', 'href')
        .and('include', '/events/2')
        .then(href => {
          cy.visit(href);
          cy.get(
            ':nth-child(3) > :nth-child(4) > .row > .col-md-10 > a > .text-dark'
          ).should('contain', 'NES');
        });
      cy.visit(constants.URL);
    });

    it('should display 2 results on 2 items selection', () => {
      cy.get(constants.org, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL4).click();
      cy.get('.Select-value #react-select-2--value-0').should('contain', 'NES');

      cy.get(constants.org, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL3).click();
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
    });

    it('should cancel all the items at once', () => {
      cy.get(
        ':nth-child(1)> .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
    });
  });
});
