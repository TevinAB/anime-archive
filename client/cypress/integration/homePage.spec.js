/* eslint no-undef: 0 */
/* eslint jest/valid-expect: 0 */

describe('Homepage test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders home page', () => {
    cy.get('#nav_header').should('exist');
    cy.findByText('Top Anime').should('exist');
    cy.findByText('Top Characters').should('exist');
  });

  it('has a link to homepage', () => {
    cy.get('#nav_header a').should('have.attr', 'href').and('equal', '/');
  });

  it('has a search area', () => {
    cy.get('#search').should('exist');
    cy.get('#search_field').should('exist');
  });
});
