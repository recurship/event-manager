/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

import { constants } from '../dataSet';

describe('location Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Home page', () => {
      beforeEach(() => {
        cy.homePage();
      });
    });
  });

  context('Test for constants.location filter ', () => {
    it('should only accept single item at a time', () => {
      cy.get(constants.LOCATION_INPUT_FIELD, {
        timeout: constants.WAITING_TIME,
      })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.get(constants.LOCATION_FIELD_OPTION_1).click();
      cy.get('.Select-value #react-select-3--value-item').should(
        'contain',
        'NIC'
      );
      cy.get(constants.LOCATION_INPUT_FIELD, {
        timeout: constants.WAITING_TIME,
      })
        .eq(0)
        .click();
      cy.get(constants.LOCATION_FIELD_OPTION_2).click();
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
      cy.visit(constants.BASE_URL);
    });
  });
});
