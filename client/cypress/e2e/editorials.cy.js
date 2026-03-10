describe('Editorials Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/editorials');
  });

  // ====== PAGE LOADS ======

  it('should show the "Editorials" heading', () => {
    cy.contains('h1', 'Editorials').should('be.visible');
  });

  it('should show the "In-Depth Features" label', () => {
    cy.contains('In-Depth Features').should('be.visible');
  });

  // ====== NAVIGATION ======

  it('should have the CHIARISSIME logo that goes back to home', () => {
    cy.contains('CHIARISSIME').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  // ====== SEARCH BAR ======

  it('should have a search bar on the page', () => {
    cy.get('input[placeholder="Search editorials..."]').should('be.visible');
  });

  it('should let you type in the search bar', () => {
    cy.get('input[placeholder="Search editorials..."]').type('Carolyn');
    cy.get('input[placeholder="Search editorials..."]').should('have.value', 'Carolyn');
  });

  // ====== ARTICLES LIST ======

  it('should show the featured editorial (Carolyn Bessette)', () => {
    cy.contains('The Carolyn Bessette Copy-Paste Era').should('be.visible');
  });

  it('should show the Thrifting editorial', () => {
    cy.contains('Thrifting: Where History Meets Style').should('be.visible');
  });

  it('should show the Paris Fashion Week editorial', () => {
    cy.contains('Paris Fashion Week').should('be.visible');
  });

  // ====== READING AN ARTICLE ======

  it('should open the featured editorial when you click "Read Editorial"', () => {
    cy.contains('Read Editorial').click();

    // The full article content should now be visible
    cy.contains('The Carolyn Bessette Copy-Paste Era').should('be.visible');
    cy.contains('Why Style Is More Than an Outfit').should('be.visible');
  });

  it('should show a "Back to Editorials" button after opening an article', () => {
    cy.contains('Read Editorial').click();
    cy.contains('Back to Editorials').should('be.visible');
  });

  it('should go back to the article list when clicking "Back to Editorials"', () => {
    cy.contains('Read Editorial').click();
    cy.contains('Back to Editorials').click();

    // Should be back on the list — featured title visible again
    cy.contains('Read Editorial').should('be.visible');
  });

  it('should open the Thrifting article when you click on it', () => {
    cy.contains('Thrifting: Where History Meets Style').click();
    cy.contains('Why vintage fashion is more than just a trend').should('be.visible');
  });

  // ====== NEWSLETTER SECTION ======

  it('should have a "Stay Updated" newsletter section at the bottom', () => {
    cy.contains('Stay Updated').should('be.visible');
    cy.contains('Subscribe').should('be.visible');
  });
});
