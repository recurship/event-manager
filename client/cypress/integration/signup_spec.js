describe('Signing up', function() {
  context('Should be on Signup page', function() {
    it('successfully load sign up page', function() {
      cy.visit('/signup');
    });
    it('Visible Sign Up heading', function() {
      cy.get('.login-container').contains('Sign Up');
    });
  });
  describe('Form Validation', function() {
    it('Having Sign up form', function() {
      cy.get('form');
    });
    it('disable on empty fields', function() {
      cy.get('form')
        .contains('Sign Up')
        .should('be.disabled');
    });
    context('check placeholders on the fields and type', function() {
      it('First Name', function() {
        cy.get('input[name=firstname]').should(
          'have.attr',
          'placeholder',
          'First Name'
        )
      });
      it('Last Name', function() {
        cy.get('input[name=lastname]').should(
          'have.attr',
          'placeholder',
          'Last Name'
        );
      });
      it('User Name', function() {
        cy.get('input[name=username]').should(
          'have.attr',
          'placeholder',
          'User Name'
        );
      });
      it('Email', function() {
        cy.get('input[name=email]').should(
          'have.attr',
          'placeholder',
          'Email'
        );
      });
      it('Password', function() {
        cy.get('input[name=password]').should(
          'have.attr',
          'placeholder',
          'Password'
        );
      });
    });
  });
});
