/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

const loc =
  ':nth-child(4) .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const delay = 30000;
const URL = 'http://localhost:3000/events/';

describe('Location Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });

  context('Test for location filter ', () => {
    it('should only have single item', () => {
      cy.get(loc, { timeout: delay })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.contains('NIC').click();
      cy.get('.Select-value #react-select-3--value-item').should(
        'contain',
        'NIC'
      );
      cy.get(loc, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('neduet').click();
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
      cy.visit(URL);
    });
  });
});
