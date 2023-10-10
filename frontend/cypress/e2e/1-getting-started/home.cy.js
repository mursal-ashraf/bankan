/// <reference types="cypress" />

describe('Home page', () => {
  it('should login', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://jqwqsficrwpkkrqoqwpx.supabase.co/auth/v1/token?grant_type=password',
    }).as('LoginApi');
    cy.visit('/');
    expect(cy.get('h6').contains('KanBan')).to.exist;
    expect(cy.get('header button').contains('Login')).to.exist;
    expect(cy.get('header button').contains('Signup')).to.exist;

    cy.get('header button').contains('Login').click();
    expect(cy.get('h2').contains('Login')).to.exist;

    expect(cy.get('[type="email"]')).to.exist;
    cy.get('[type="email"]').type('test@test.com.au');

    expect(cy.get('[data-testid="password-input"]')).to.exist;
    cy.get('[data-testid="password-input"]').type('FIT3162*monash');
    cy.get('h2')
      .contains('Login')
      .parent()
      .within(() => {
        cy.get('button').contains('Login').click();
      });

    cy.wait('@LoginApi');
  });
});
