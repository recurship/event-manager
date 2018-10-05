/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

const URL = 'http://localhost:3000/events/';

describe('Date Filter Testing', () => {
  context('Test for Filters Route', () => {
    it('Should be on Filters page', () => {
      cy.visit('/events');
      cy.get('h3').should('contain', 'Welcome to Event Management');
    });
  });

  context('Test for Date Filter', () => {
    it('should only accept a correct date format', () => {
      cy.get("input[name='filterDateTo']")
        .type('2018-10-03')
        .should('have.value', '2018-10-03'); //Event END Date
      cy.get("input[name='filterDateFrom']")
        .type('2011-10-06')
        .should('have.value', '2011-10-06'); //Event START date
        cy.visit(URL);
    });

    //BUGS-NOT WORKING
    // it('should display 1 result on Start date filter ', () => {
    //   cy.get("input[name='filterDateFrom']")
    //   .type('2018-10-03')
    //   .should('have.value', '2018-10-03'); //Start Event Date
    
    //   cy.get('.btn').click();
    //   cy.get('#event-list a')
    //     .should('have.attr', 'href')
    //     .and('include', '/events/2')
    //     .then(href => {
    //       cy.visit(href);
    //       cy.get(
    //         ':nth-child(3) > :nth-child(1) > .row > .col-md-10 > .text-dark'
    //       ).should('contain', 'Saturday, October 6, 2018 11:00 AM');
    //     });
    //   cy.visit('http://localhost:3000/events/');
    // });

    // it('should display 3 results on end date filter ', () => {
    //   cy.get("input[name='filterDateTo']")
    //     .type('2011-10-06')
    //     .should('have.value', '2011-10-06'); //End Event date
    
    //   cy.get('.btn').click();
    //   cy.get('#event-list a')
    //     .should('have.attr', 'href')
    //     .and('include', '/events/2')
    //     .then(href => {
    //       cy.visit(href);
    //       cy.get(
    //         ':nth-child(1) > .card > .card-body > .card-subtitle > .text-muted'
    //       ).should('contain', 'Saturday, October 6, 2018 11:00 AM');
    //       cy.get(
    //         ':nth-child(2) > .card > .card-body > .card-subtitle > .text-muted'
    //       ).should('contain', 'Wednesday, October 3, 2018 11:00 AM');
    //       cy.get(
    //         ':nth-child(3) > .card > .card-body > .card-subtitle > .text-muted'
    //       ).should('contain', 'Tuesday, October 2, 2018 11:00 AM');
    //     });
    // });
    
  });

  
});