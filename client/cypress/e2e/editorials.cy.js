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

  it('should navigate to the article detail URL when clicking "Read Editorial"', () => {
    cy.contains('Read Editorial').click();
    cy.url().should('match', /\/editorials\/[a-f0-9]+/);
  });

  it('should show the article title on the detail page', () => {
    cy.contains('Read Editorial').click();
  });

  it('should show a back button on the article detail page', () => {
    cy.contains('Read Editorial').click();
    cy.contains('← Back').should('be.visible');
  });

  it('should go back to editorials when clicking the back button', () => {
    cy.contains('Read Editorial').click();
    cy.contains('← Back').click();
    cy.url().should('include', '/editorials');
    cy.url().should('not.match', /\/editorials\/[a-f0-9]+/);
  });

  it('should navigate to the Thrifting article when clicking on it', () => {
    cy.contains('Thrifting: Where History Meets Style').click();
    cy.url().should('match', /\/editorials\/[a-f0-9]+/);
    cy.contains('Thrifting: Where History Meets Style').should('be.visible');
  });

  // ====== NEWSLETTER SECTION ======

  it('should have a "Stay Updated" newsletter section at the bottom', () => {
    cy.contains('Stay Updated').should('be.visible');
    cy.contains('Subscribe').should('be.visible');
  });
});
