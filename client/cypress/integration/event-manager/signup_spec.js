import { randomData } from './dataSet';
describe('Sign up', function() {
  context('Testing Signup Page', function() {
    it('Load signup page', function() {
      cy.visit('/signup');
      cy.get('div').should('have.class', 'login-container');
    });
  });
  context('Form Validation testing', function() {
    it('disable on empty fields', function() {
      cy.get('form .btn')
        .contains('Sign Up')
        .should('be.disabled');
    });

    context('Type Validation on Email and Password', function() {
      it('Invalid Email -> Validation Error', function() {
        cy.get('input[name=email]')
          .clear()
          .type(randomData.invalidEmail)
          .blur()
          .next()
          .contains('*Invalid email address');
      });
      it('Invalid Password -> Validation Error', function() {
        cy.get('input[name=password]')
          .clear()
          .type(randomData.invalidPassword)
          .blur()
          .next()
          .contains('*Password must be atleast 8 characters');
      });
    });
    context('Submit should be enabled after', function() {
      it('Fill-out all fields', function() {
        cy.get('form input[name=firstname]')
          .clear()
          .type(randomData.firstname);
        cy.get('form input[name=lastname]')
          .clear()
          .type(randomData.lastname);
        cy.get('form input[name=username]')
          .clear()
          .type(randomData.uniqueUsername);
        cy.get('form input[name=email]')
          .clear()
          .type(randomData.uniqueEmail);
        cy.get('form input[name=password]')
          .clear()
          .type(randomData.password);
      });
      it('Submit Button Enabled', function() {
        cy.get('form .btn')
          .contains('Sign Up')
          .should('be.enabled')
          .click();
      });
      it('Redirected to Login', function() {
        cy.url().should('include', '/login');
      });
    });
    context('Should not submit on existed username', function() {
      it('Load signup page', function() {
        cy.visit('/signup');
      });
      it('Fill-out fields for existed username', function() {
        cy.get('form input[name=firstname]')
          .clear()
          .type(randomData.firstname);
        cy.get('form input[name=lastname]')
          .clear()
          .type(randomData.lastname);
        cy.get('form input[name=username]')
          .clear()
          .type(randomData.existedUsername);
        cy.get('form input[name=email]')
          .clear()
          .type(randomData.uniqueEmail2);
        cy.get('form input[name=password]')
          .clear()
          .type(randomData.password);
      });
      it('Submit Form', function() {
        cy.get('form .btn')
          .contains('Sign Up')
          .should('be.enabled')
          .click();
      });
      it('show error on existed username', function() {
        cy.get('.error-message')
          .should('be.visible')
          .contains('user with this username already exists.');
      });
    });
    context('Should not submit on existed email', function() {
      it('Fill-out fields for existed email', function() {
        cy.visit('/signup');
        cy.get('form input[name=firstname]')
          .clear()
          .type(randomData.firstname);
        cy.get('form input[name=lastname]')
          .clear()
          .type(randomData.lastname);
        cy.get('form input[name=username]')
          .clear()
          .type(randomData.uniqueUsername2);
        cy.get('form input[name=email]')
          .clear()
          .type(randomData.existedEmail);
        cy.get('form input[name=password]')
          .clear()
          .type(randomData.password);
      });
      it('Submit Form', function() {
        cy.get('form .btn')
          .contains('Sign Up')
          .should('be.enabled')
          .click();
      });
      it('show error on existed email', function() {
        cy.get('.error-message')
          .should('be.visible')
          .contains('user with this email already exists.');
      });
    });
  });
});
