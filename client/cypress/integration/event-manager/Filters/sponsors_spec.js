/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

const spons =
  ':nth-child(5) .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const delay = 30000;

describe('Sponsors Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });

  context('Test for sponsors filter', () => {
    it('should have one item', () => {
      cy.get(spons, { timeout: delay })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.contains('tapal').click();
      cy.get('.Select-value #react-select-4--value-0').should(
        'contain',
        'tapal'
      );
    });

    it('should deselect item', () => {
      cy.get('.Select-value-icon').click();
    });

    it('should have multiple items', () => {
      cy.get(spons, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('nokia').click();
      cy.get('.Select-value #react-select-4--value-0').should(
        'contain',
        'nokia'
      );

      cy.get(spons, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('apple').click();
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
