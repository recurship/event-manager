import {
  ValidCredentials,
  validUser,
  invalidUser,
  anotherUser,
} from './dataSet';
/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

describe('Edit Profile Testing', () => {
  context('Tests for different users on user profile', () => {
    it('Edit button should not be visible for other users', () => {
      cy.visitEditPage(ValidCredentials, anotherUser.username);
      cy.get('#edit-user').should('not.exist');
    });
    it('Edit button should not be visible for current user', () => {
      cy.visitEditPage(ValidCredentials, ValidCredentials.username);
      cy.get('#edit-user')
        .children()
        .first()
        .should('have.class', 'fa-edit');
    });
    it('Should direct to Edit Profile page on current user', () => {
      cy.get('#edit-user').click({ force: true });
    });
  });
  context('Tests for Edit Profile Page', () => {
    it('Should show edit profile header', () => {
      cy.get('.card-header').should('contain', 'Edit Profile');
    });
    it('Fields should not be empty in form', () => {
      expect(cy.get('input[name=firstname]')).to.not.equal('');
      expect(cy.get('input[name=lastname]')).to.not.equal('');
      expect(cy.get('input[name=username]')).to.not.equal('');
      expect(cy.get('input[name=email]')).to.not.equal('');
    });
    context('Validation testing on form', () => {
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
          cy.get('input[name=firstname]').type(validUser.firstname);
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
          cy.get('input[name=lastname]').type(validUser.lastname);
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
            .type(invalidUser.username)
            .next()
            .contains('*Username must be in lowercase');
        });

        it('Should disable submit button', () => {
          cy.get('#submit_button').should('be.disabled');
        });

        it('Should enable submit button on valid username', () => {
          cy.get('input[name=username]')
            .clear()
            .type(ValidCredentials.username);
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
            .type(validUser.email);
          cy.get('#submit_button').should('be.enabled');
        });
      });
    });

    context('Routing on Submit', () => {
      it('Should redirect to user profile page', () => {
        cy.get('#submit_button').click({ force: true });
        cy.get('#user-profile h4')
          .first()
          .should('contain', ValidCredentials.username);
      });
    });
  });
});
