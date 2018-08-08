// import {store}  from '../../../src';
// import jwtDecode from 'jwt-decode';
import { ValidCredentials } from './dataSet';
import values from '../../../node_modules/redux-form/lib/values';

/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

describe('User profile edit Testing', () => {
  context('Test for contents in the edit profile for an invalid user', () => {
    it('Visits the edit profile page of an invalid user ', () => {
      cy.visit('/users/b/edit');
    });

    it('First name should be empty', () => {
      cy.get('input[name=firstname]').should('have.value', '');
    });

    it('Last name should be empty', () => {
      cy.get('input[name=lastname]').should('have.value', '');
    });

    it('User name should be empty', () => {
      cy.get('input[name=username]').should('have.value', '');
    });

    it('Email should be empty', () => {
      cy.get('input[name=email]').should('have.value', '');
    });
  });

  context(
    'Test for contents in the edit profile page for logged in user',
    () => {
      it('Visits the logged in user edit profile page ', () => {
        cy.visit('/login');
        cy.login(ValidCredentials);
        cy.contains('Submit').click();
        cy.visit('/users/b6e21be3-ae59-42b0-acd2-ca48690cff9b/edit');
      });

      it('Should contain Edit Profile text', () => {
        cy.get('.card-header').should('contain', 'Edit Profile');
      });

      it('First name should not be empty', () => {
        expect(cy.get('input[name=firstname]')).to.not.equal('');
      });

      it('Last name should not be empty', () => {
        expect(cy.get('input[name=lastname]')).to.not.equal('');
      });

      it('User name should not be empty', () => {
        expect(cy.get('input[name=username]')).to.not.equal('');
      });

      it('Email should not be empty', () => {
        expect(cy.get('input[name=email]')).to.not.equal('');
      });
    }
  );

  context('Test for validating input fields', () => {
    it('Visits the edit profile page', () => {
      cy.visit('/users/b6e21be3-ae59-42b0-acd2-ca48690cff9b/edit');
    });

    context('First name validation', () => {
      it('Should show error on invalid input', () => {
        cy.get('input[name=firstname]')
          .focus()
          .clear()
          .next()
          .contains('*First name is required');
      });

      it('Should disable submit button', () => {
        cy.get('#submit_button').should('be.disabled');
      });

      it('Should enable submit button on valid firstname', () => {
        cy.get('input[name=firstname]').type('Javeria');
        cy.get('#submit_button').should('be.enabled');
      });
    });

    context('Last name validation', () => {
      it('Should show error on invalid input', () => {
        cy.get('input[name=lastname]')
          .focus()
          .clear()
          .next()
          .contains('*Last name is required');
      });

      it('Should disable submit button', () => {
        cy.get('#submit_button').should('be.disabled');
      });

      it('Should enable submit button on valid lastname', () => {
        cy.get('input[name=lastname]').type('Nisar');
        cy.get('#submit_button').should('be.enabled');
      });
    });

    context('Username validation', () => {
      it('Should show error on empty input', () => {
        cy.get('input[name=username]')
          .focus()
          .clear()
          .next()
          .contains('*Username is required');
      });

      it('Should show error on invalid username', () => {
        cy.get('input[name=username]')
          .focus()
          .type('DDD')
          .next()
          .contains('*Username must be in lowercase');
      });

      it('Should disable submit button', () => {
        cy.get('#submit_button').should('be.disabled');
      });

      it('Should enable submit button on valid username', () => {
        cy.get('input[name=username]')
          .clear()
          .type('admin');
        cy.get('#submit_button').should('be.enabled');
      });
    });

    context('Email validation', () => {
      it('Should show error on empty input', () => {
        cy.get('input[name=email]')
          .focus()
          .clear()
          .next()
          .contains('*Email is required');
      });

      it('Should show error on invalid email', () => {
        cy.get('input[name=email]')
          .focus()
          .type('DDD')
          .next()
          .contains('*Invalid Email');
      });

      it('Should disable submit button', () => {
        cy.get('#submit_button').should('be.disabled');
      });

      it('Should enable submit button on valid email', () => {
        cy.get('input[name=email]')
          .clear()
          .type('admin1234@gmail.com');
        cy.get('#submit_button').should('be.enabled');
      });
    });
  });
});
