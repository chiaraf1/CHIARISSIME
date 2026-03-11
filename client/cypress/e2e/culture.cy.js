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

  // ====== ARTICLE INDEX ======

  it('should show the Film tag in the article index', () => {
    cy.contains('Film').should('be.visible');
  });

  it('should show the Art tag in the article index', () => {
    cy.contains('Art').should('be.visible');
  });

  it('should show the Music tag in the article index', () => {
    cy.contains('Music').should('be.visible');
  });

  // ====== ARTICLES CONTENT ======

  it('should show the Wes Anderson article', () => {
    cy.contains('The Wes Anderson Wardrobe').should('be.visible');
  });

  it('should show the Fashion & Art article', () => {
    cy.contains('The Canvas and the Collection').should('be.visible');
  });

  it('should show the Fashion & Music article', () => {
    cy.contains('Dressed for the Sound').should('be.visible');
  });

  it('should show article body text about Wes Anderson', () => {
    cy.contains('Wes Anderson does not dress his characters').should('be.visible');
  });

  it('should show article body text about fashion and art', () => {
    cy.contains('Rei Kawakubo').should('be.visible');
  });

  it('should show article body text about music and fashion', () => {
    cy.contains('David Bowie').should('be.visible');
  });

  // ====== IMAGES ======

  it('should render article images', () => {
    cy.get('article img').should('have.length', 2);
  });

  // ====== NEWSLETTER ======

  it('should show the newsletter section', () => {
    cy.contains('Stay Updated').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.contains('Subscribe').should('be.visible');
  });
});
