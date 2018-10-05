/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

const time =
  ':nth-child(7) .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const delay = 30000;

describe('Time Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });

  context('Test for Time filter', () => {
    it('should have one item', () => {
      cy.get(time, { timeout: delay })
        .eq(0)
        .click();
      cy.get('div.Select-menu-outer').should('be.visible');
      cy.contains('Noon').click();
      cy.get('.Select-value #react-select-6--value-0').should(
        'contain',
        'Noon'
      );
    });

    it('should deselect item', () => {
      cy.get('.Select-value-icon').click();
    });

    it('should have multiple items', () => {
      cy.get(time, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('Morning').click();
      cy.get('.Select-value #react-select-6--value-0').should(
        'contain',
        'Morning'
      );

      cy.get(time, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('Evening').click();
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
