/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

describe('Filters Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });
  context('Test for Organization Filters', () => {
    it('should have an arrow button', () => {
      cy.get(
        ':nth-child(1)  .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
        { timeout: 30000 }
      ) //Gets the location of the Organisation field with a delay of 30000
        .eq(0);
      // .click(); //Clicks the toggle button
    });

    it('should select one option', () => {
      cy.get(
        ':nth-child(1)  .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
        { timeout: 30000 } //gets the location with a delay of 30000
      )
        .eq(0)
        .click();
      cy.contains('NES').click(); //Selects the dropdown menu option
    });

    it('should deselect option', () => {
      cy.get(':nth-child(1)>.Select-value-icon').click(); //Deselects one of the option
    });

    it('should select multiple options', () => {
      cy.get(
        ':nth-child(1)  .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
        { timeout: 30000 } //gets the location with a delay of 30000
      )
        .eq(0)
        .click();
      cy.contains('NES').click(); //Selects the dropdown menu option
      cy.get(
        ':nth-child(1)  .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
        { timeout: 30000 } //gets the location with a delay of 30000
      )
        .eq(0)
        .click();
      cy.contains('Recurship').click(); //Selects the dropdown menu option
    });

    it('should deselect all the options', () => {
      cy.get(':nth-child(1)>.Select-value-icon').click(); //Deselects one of the option
      cy.get('.Select-value-icon').click(); //Deselects both
    });

    //    cy.get('form .btn').click();
  });
});
