// import {store}  from '../../../src';
// import jwtDecode from 'jwt-decode';
import { ValidCredentials} from './dataSet';

/* global describe  */
/* global context */
/* global it */
/* global expect  */
/* global cy */
/* eslint no-undef: "error" */

describe('User profile edit Testing', () => {
  context('Test for contents in the edit profile page for logged in user', () => {
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
  });

  context('Test for contents in the edit profile for a fake user', () => {
    it('Visits the edit profile page of a fake user ', () => {
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

});