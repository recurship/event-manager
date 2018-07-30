import {
  validUser,
  invalidUser,
  existedUser_email,
  existedUser_username,
} from './dataSet';
describe('Sign up Testing', () => {
  context('Test for Signup Route', () => {
    it('Should be on Sign up page', () => {
      cy.visit('/signup');
      cy.get('form').should('have.id', 'signup-form');
    });
  });
  context('Test for Empty Fields', () => {
    it('Submit button should be disabled on empty fields', () => {
      cy.get('form .btn')
        .contains('Sign Up')
        .should('be.disabled');
    });

    context('Test for Invalid User', () => {
      it('Invalid Email -> Validation Error', () => {
        cy.get('input[name=email]')
          .clear()
          .type(invalidUser.email)
          .blur()
          .next()
          .contains('*Invalid email address');
      });
      it('Invalid Password -> Validation Error', () => {
        cy.get('input[name=password]')
          .clear()
          .type(invalidUser.password)
          .blur()
          .next()
          .contains('*Password must be atleast 8 characters');
      });
    });
    context('Test Valid User', () => {
      it('Submit Button should be Enabled', () => {
        cy.fillForm(validUser);
        cy.get('form .btn')
          .contains('Sign Up')
          .should('be.enabled')
          .click();
      });
      it('Shoulb be redirected to Login', () => {
        cy.url().should('include', '/login');
      });
    });
    context('Test for existed username', () => {
      it('Submit button should be enabled', () => {
        cy.visit('/signup');
        cy.fillForm(existedUser_username);
        cy.get('form .btn')
          .contains('Sign Up')
          .should('be.enabled')
          .click();
      });
      it('Should show error on existed username', () => {
        cy.get('.error-message')
          .should('be.visible')
          .contains('user with this username already exists.');
      });
    });
    context('Test for on existed email', () => {
      it('Submit button should be enabled', () => {
        cy.visit('/signup');
        cy.fillForm(existedUser_email);
        cy.get('form .btn')
          .contains('Sign Up')
          .should('be.enabled')
          .click();
      });
      it('Should show error on existed email', () => {
        cy.get('.error-message')
          .should('be.visible')
          .contains('user with this email already exists.');
      });
    });
  });
});
