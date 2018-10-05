/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

const tag =
  ':nth-child(6) .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const delay = 30000;
const URL = 'http://localhost:3000/events/';

describe('Tags Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });
  context('Test for Tags filter', () => {
    it('should have one item', () => {
      cy.get(tag, { timeout: delay })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.contains('javascript').click();
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
      cy.visit(URL);
    });

    it('should have multiple items', () => {
      cy.get(tag, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('abc').click();
      cy.get('.Select-value #react-select-5--value-0').should('contain', 'abc');

      cy.get(tag, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('javascript').click();
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
