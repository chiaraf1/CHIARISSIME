describe('Culture Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:5173/culture');
  });

  // ====== PAGE LOADS ======

  it('should show the main hero heading', () => {
    cy.contains('Culture').should('be.visible');
  });

  it('should show the hero description', () => {
    cy.contains('Fashion does not exist in isolation').should('be.visible');
  });

  // ====== NAVIGATION ======

  it('should have the CHIARISSIME logo that goes back to home', () => {
    cy.contains('CHIARISSIME').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should have a working link to Editorials in the nav', () => {
    cy.get('nav').contains('Editorials').click();
    cy.url().should('include', '/editorials');
  });

  it('should have a working link to Runway in the nav', () => {
    cy.visit('http://localhost:5173/culture');
    cy.get('nav').contains('Runway').click();
    cy.url().should('include', '/runway');
  });

  // ====== SEARCH BAR ======

  it('should have a search bar on the page', () => {
    cy.get('input[placeholder="Search culture..."]').should('be.visible');
  });

  it('should let you type in the search bar', () => {
    cy.get('input[placeholder="Search culture..."]').type('Wes');
    cy.get('input[placeholder="Search culture..."]').should('have.value', 'Wes');
  });

  it('should filter articles based on search query', () => {
    cy.get('input[placeholder="Search culture..."]').type('Wes Anderson');
    cy.contains('Wes Anderson: The Architect of Symmetrical Style').should('be.visible');
  });

  it('should show no results message for an unmatched search', () => {
    cy.get('input[placeholder="Search culture..."]').type('zzzznotanarticle');
    cy.contains('No results found').should('be.visible');
  });

  // ====== ARTICLE INDEX ======

  it('should show the Film tag', () => {
    cy.contains('Film').should('be.visible');
  });

  it('should show the Art tag', () => {
    cy.contains('Art').should('be.visible');
  });

  it('should show the Music tag', () => {
    cy.contains('Music').should('be.visible');
  });

  // ====== ARTICLES CONTENT ======

  it('should show the Wes Anderson article', () => {
    cy.contains('Wes Anderson: The Architect of Symmetrical Style').should('be.visible');
  });

  it('should show the Fashion as Art article', () => {
    cy.contains('Fashion as Art').should('be.visible');
  });

  it('should show the Fashion and Music article', () => {
    cy.contains('Fashion and Music').should('be.visible');
  });

  // ====== READING AN ARTICLE ======

  it('should navigate to the article detail URL when clicking "Read Article"', () => {
    cy.contains('Read Article').click();
    cy.url().should('match', /\/culture\/[a-f0-9]+/);
  });

  it('should show a back button on the detail page', () => {
    cy.contains('Read Article').click();
    cy.contains('← Back').should('be.visible');
  });

  it('should go back to culture when clicking the back button', () => {
    cy.contains('Read Article').click();
    cy.contains('← Back').click();
    cy.url().should('include', '/culture');
    cy.url().should('not.match', /\/culture\/[a-f0-9]+/);
  });

  // ====== IMAGES ======

  it('should render article images', () => {
    cy.get('article img').should('have.length.at.least', 1);
  });

  // ====== NEWSLETTER ======

  it('should show the newsletter section', () => {
    cy.contains('Stay Updated').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.contains('Subscribe').should('be.visible');
  });
});
