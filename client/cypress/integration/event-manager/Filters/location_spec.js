/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('location Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('.btn').should('contain', 'Search');
    });
  });

  context('Test for constants.location filter ', () => {
    it('should only have single item', () => {
      cy.get(constants.loc, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.get(constants.VAL5).click();
      cy.get('.Select-value #react-select-3--value-item').should(
        'contain',
        'NIC'
      );
      cy.get(constants.loc, { timeout: constants.delay })
        .eq(0)
        .click();
      cy.get(constants.VAL6).click();
      cy.get('.Select-value #react-select-3--value-item').should(
        'contain',
        'neduet'
      );
      cy.get('.btn').click();
      cy.get('#event-list a')
        .should('have.attr', 'href')
        .and('include', '/events/2')
        .then(href => {
          cy.visit(href);
          cy.get(':nth-child(3) > .row > .col-md-10 > .text-dark').should(
            'contain',
            'neduet johar'
          );
        });
      cy.visit(constants.URL);
    });
  });
});
