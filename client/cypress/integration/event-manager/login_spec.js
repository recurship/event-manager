describe('Logging In', function() {

	context('Should be on login page', function() {
		it('successfully load login page', function() {
      cy.visit('/login')
    })
	})

	context('Submit button should be disabled on empty fields', function(){
		it('disabled submit button when both fields are empty', function() {
			cy.contains('Submit').should('be.disabled')
		})
	})

	context('Sould show an error on wrong credentials', function(){
		it('show an error on wrong credentials', function() {
			cy.get('input[name=username]').type('hello')
			cy.get('input[name=password]').type('123')
			cy.contains('Submit').click()
			 cy.get('p.error-message')
        .should('contain', 'No active account found with the given credentials')
				cy.get('input[name=username]').clear()
				cy.get('input[name=password]').clear()
		})
	})

	context('Username field should contain admin', function() {
		it("types 'admin' into username field", function() {
			cy.get('input:first').should('have.attr', 'placeholder', 'User Name')
			.type('admin')
  	})
	})

	context('Password field should contain 1299459ML', function() {
		it("types 'password' into password field", function() {
			cy.get('input:last').should('have.attr', 'placeholder', 'Password')
			.type('1299459ML')
 	 	})
	})

	context('Submit button should be enabled on filled fields', function(){
		it('enable submit button when both fields are filled', function() {
			cy.contains('Submit').should('be.enabled')
		})
	})

	context('Submit button should be enabled on filled fields', function(){
		it('enable submit button when both fields are filled', function() {
			cy.contains('Submit').should('be.enabled')
		})
	})

	// context('Should redirect to home page on successful login', function(){
	// 	it('show home page on successful login', function() {
	// 		cy.contains('Submit').click()
	// 		cy.url().should('include', '/')
	// 		cy.get('h3').should('contain', 'Welcome to Event Management')
	// 	})
	// })
	
	context('Should redirect on signup page', function() {
		it("click on Sign Up", function() {
			cy.contains('Sign Up').click()
			cy.url().should('include', '/signup')
			cy.contains('Login').click({force: true})
		})
	})
	
	context('Should redirect on forgot-password page', function() {
		it("click on Forgot Password?", function() {
			cy.contains('Forgot Password?').click()
			cy.url().should('include', '/forgot-password')
		})
	})
})