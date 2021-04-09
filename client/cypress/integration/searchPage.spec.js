/* eslint no-undef: 0 */
/* eslint jest/valid-expect: 0 */

describe('Search Results test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigates to search results page from homepage', () => {
    cy.get('#search_field')
      .should('exist')
      .type('sal')
      .get('#search_form')
      .should('exist')
      .submit()
      .get('h1')
      .should((h1) => {
        expect(h1).to.have.length(1);
      });
  });
});
