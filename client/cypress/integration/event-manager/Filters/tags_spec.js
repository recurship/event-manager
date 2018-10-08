/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('constants.tags Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('.btn').should('contain', 'Search');
    });
  });
  context('Test for constants.tags filter', () => {
    it('should have one item', () => {
      cy.get(constants.tag, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.get(constants.VAL2).click();
      cy.get('.Select-value #react-select-5--value-0').should(
        'contain',
        'javascript'
      );
      cy.get('.btn').click();
      cy.get('#event-list a')
        .should('have.attr', 'href')
        .and('include', '/events/1')
        .then(href => {
          cy.visit(href);
          cy.get('.container > :nth-child(5)').should('contain', 'javascript');
        });
      cy.visit(constants.URL);
    });

    it('should have multiple items', () => {
      cy.get(constants.tag, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL1).click();
      cy.get('.Select-value #react-select-5--value-0').should('contain', 'abc');

      cy.get(constants.tag, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL2).click();
      cy.get('.Select-value #react-select-5--value-1').should(
        'contain',
        'javascript'
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
        ':nth-child(6) > .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
    });
  });
});
