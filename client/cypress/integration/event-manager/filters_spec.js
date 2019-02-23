/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

const delay = 30000;
const org =
  ':nth-child(1)  .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const loc =
  ':nth-child(4) .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const spons =
  ':nth-child(5) .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const tag =
  ':nth-child(6) .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const time =
  ':nth-child(7) .Select  .Select-control  .Select-arrow-zone  .Select-arrow';
const kw=
  ':nth-child(8) > .form-control';

describe('Filters Testing', () => {
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
        .dblclick(); //Clicks the toggle button
      // cy.get('div .Select').should('have.attr', 'is-open');
    });

    it('should have one item', () => {
      cy.get(org, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('NES').click();
      cy.get('.Select-value #react-select-2--value-0').should('contain', 'NES');
    });

    it('should deselect item', () => {
      cy.get(':nth-child(1)>.Select-value-icon').click();
    });

    it('should have multiple items', () => {
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
    });

    it('should cancel all the items at once', () => {
      cy.get(
        ':nth-child(1)> .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
    });
    //    cy.get('form .btn').click();
  });

  //BUGS FOUND
  //no validation on the YYYY [year] beacuse it's accepting more than 4 digits
  //event END date should not be less than the event START date

  context('Test for Date Filter', () => {
    it('should only accept a correct date format', () => {
      cy.get("input[name='filterDateTo']")
        .type('2018-01-09')
        .should('have.value', '2018-01-09'); //Start Event Date
      cy.get("input[name='filterDateFrom']")
        .type('2011-01-09')
        .should('have.value', '2011-01-09'); //End Event date
    });
  });

  context('Test for location filter ', () => {
    it('should only have single item', () => {
      cy.get(loc, { timeout: delay })
        .eq(0)
        .click();
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
    });
  });

  context('Test for sponsors filter', () => {
    it('should have one item', () => {
      cy.get(spons, { timeout: delay })
        .eq(0)
        .click();
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

  context('Test for Tags filter', () => {
    it('should have one item', () => {
      cy.get(tag, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('javascript').click();
      cy.get('.Select-value #react-select-5--value-0').should(
        'contain',
        'javascript'
      );
    });

    it('should deselect item', () => {
      cy.get('.Select-value-icon').click();
    });

    it('should have multiple items', () => {
      cy.get(tag, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('abc').click();
      cy.get('.Select-value #react-select-5--value-0').should(
        'contain',
        'abc'
      );

      cy.get(tag, { timeout: delay })
        .eq(0)
        .click();
      cy.contains('javascript').click();
      cy.get('.Select-value #react-select-5--value-1').should(
        'contain',
        'javascript'
      );
    });

    it('should cancel all the items at once', () => {
      cy.get(
        ':nth-child(6) > .Select > .Select-control > .Select-clear-zone > .Select-clear'
      ).click();
    });
    
  })

  context('Test for Time filter', () => {
    it('should have one item', () => {
      cy.get(time, { timeout: delay })
        .eq(0)
        .click();
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
    
  })

  context('Test for Key Words filter', () => {
    it('should accept word ', () => {
      cy.get(kw).type('sasta')
      cy.get(kw).should('have.value','sasta')
    });
    
  });

  
});
