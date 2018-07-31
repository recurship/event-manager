/* global describe  */
/* global context */
/* global it */
/* global cy */

import { ValidCredentials, wrongCredentials } from './dataSet';

describe('Login Testing', () => {
  context('Test for Login Route', () => {
    it('Should be on Sign up page', () => {
      cy.visit('/login');
      cy.get('h4').should('contain', 'Login');
    });
  });

  context('Test for Empty Fields', () => {
    it('Submit button should be disabled on empty fields', () => {
      cy.contains('Submit').should('be.disabled');
    });
  });

  context('Test for Wrong Credentials', () => {
    it('submit button should be enabled for filled fields', () => {
      cy.login(wrongCredentials);
      cy.get('form .btn')
        .contains('Submit')
        .click();
    });
    it('Should show error on wrong credentials', () => {
      cy.get('p.error-message').should(
        'contain',
        'No active account found with the given credentials'
      );
    });
  });

  context('Test for Correct Credentials', () => {
    it('Should redirect to home page', () => {
      cy.login(ValidCredentials);
      cy.contains('Submit').click();
      cy.url().should('include', '/');
      cy.get('h3').should('contain', 'Welcome to Event Management');
      //logout functionality should be added here
      localStorage.clear();
    });
  });
  context('Sign up label should redirect to signup page', () => {
    it('click on Sign Up', () => {
      cy.visit('/login');
      cy.contains('Sign Up').click();
      cy.url().should('include', '/signup');
    });
  });

  context(
    'Forgot Password label should redirect to forgot-password page',
    () => {
      it('click on Forgot Password?', () => {
        cy.visit('/login');
        cy.contains('Forgot Password?').click();
        cy.url().should('include', '/forgot-password');
      });
    }
  );
});
