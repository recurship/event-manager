describe('Sign up', function() {
  context('Testing Signup Page', function() {
    it('Load signup page', function() {
      cy.visit('/signup');
    });
  });
  context('Form Validation testing', function() {
    it('disable on empty fields', function() {
      cy.get('form .btn')
        .contains('Sign Up')
        .should('be.disabled');
    });
    context('Type Checking on the fields', function() {
      it('Email -> email type', function() {
        cy.get('form input[name=email]').should('have.attr', 'type', 'email');
      });
      it('Password -> password', function() {
        cy.get('input[name=password]').should('have.attr', 'type', 'password');
      });
    });

    context('Type Validation on Email and Password', function() {
      it('Invalid Email -> Validation Error', function() {
        cy.get('input[name=email]')
          .clear()
          .type('123')
          .blur()
          .next()
          .contains('*Invalid email address');
      });
      it('Invalid Password -> Validation Error', function() {
        cy.get('input[name=password]')
          .clear()
          .type('123')
          .blur()
          .next()
          .contains('*Password must be atleast 8 characters');
      });
    });
    context('Submit should be enabled after', function() {
      it('Fill-out all fields', function() {
        cy.get('form input[name=firstname]')
          .clear()
          .type('first');
        cy.get('form input[name=lastname]')
          .clear()
          .type('last');
        cy.get('form input[name=username]')
          .clear()
          .type('usernamse00s0');
        cy.get('form input[name=email]')
          .clear()
          .type('email00s00s@something.com');
        cy.get('form input[name=password]')
          .clear()
          .type('12345678');
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
    context('Should not submit on existed username or email', function() {
      it('Load signup page', function() {
        cy.visit('/signup');
      });
      it('Fill-out existing fields for username/email', function() {
        cy.get('form input[name=firstname]')
          .clear()
          .type('first');
        cy.get('form input[name=lastname]')
          .clear()
          .type('last');
        cy.get('form input[name=username]')
          .clear()
          .type('username000');
        cy.get('form input[name=email]')
          .clear()
          .type('email0000@something.com');
        cy.get('form input[name=password]')
          .clear()
          .type('12345678');
      });
      it('Submit Button clicked', function() {
        cy.get('form .btn')
          .contains('Sign Up')
          .should('be.enabled')
          .click();
      });
      it('show error on existed email/username', function() {
        cy.get('.error-message').should('be.visible');
      });
    });
  });
});
