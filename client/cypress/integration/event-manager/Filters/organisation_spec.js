/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

const delay = 30000;
const org =
  ':nth-child(1)  .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const URL = 'http://localhost:3000/events/';


describe('Organisation Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });

  context('Test for Organization Filter', () => {
    it('should have a clickable arrow button', () => {
      cy.get(org, { timeout: delay })
        .eq(0)
        .click(); //Clicks the toggle button
      cy.get('div.Select-menu-outer').should('be.visible');
    });

    it('should display 1 result on single item selection', () => {
      cy.get(org, { timeout: delay }).eq(0);
      cy.contains('NES').click();
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
      cy.visit(URL);
    });

    it('should display 2 results on 2 items selection', () => {
      cy.get(org, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('NES').click();
      cy.get('.Select-value #react-select-2--value-0').should('contain', 'NES');

      cy.get(org, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('Recurship').click();
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
      cy.get(org, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('NES').click();
      cy.get('.Select-value #react-select-2--value-0').should('contain', 'NES');

      cy.get(org, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('Recurship').click();
      cy.get('.Select-value #react-select-2--value-1').should(
        'contain',
        'Recurship'
      );
      cy.get(
        ':nth-child(1)> .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
    });
  });
});
