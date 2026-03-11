describe('Runway Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/runway');
  });

  // ====== PAGE LOADS ======

  it('should show the "Runway" heading', () => {
    cy.contains('h1', 'Runway').should('be.visible');
  });

  it('should show the "Season Reviews" label', () => {
    cy.contains('Season Reviews').should('be.visible');
  });

  // ====== NAVIGATION ======

  it('should have the CHIARISSIME logo that goes back to home', () => {
    cy.contains('CHIARISSIME').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  // ====== SEARCH BAR ======

  it('should have a search bar', () => {
    cy.get('input[placeholder="Search runway reviews..."]').should('be.visible');
  });

  it('should let you type in the search bar', () => {
    cy.get('input[placeholder="Search runway reviews..."]').type('Chanel');
    cy.get('input[placeholder="Search runway reviews..."]').should('have.value', 'Chanel');
  });

  // ====== SHOWS LIST ======

  it('should show the ISABEL MARANT show', () => {
    cy.contains('ISABEL MARANT').should('be.visible');
  });

  it('should show the VALENTINO show', () => {
    cy.contains('VALENTINO').should('be.visible');
  });

  it('should show the CHANEL show', () => {
    cy.contains('CHANEL').should('be.visible');
  });

  it('should show the CHLOÈ show', () => {
    cy.contains('CHLOÈ').should('be.visible');
  });

  // ====== READING A REVIEW ======

  it('should navigate to the article detail URL when clicking "Read Review"', () => {
    cy.contains('Read Review').click();
    cy.url().should('match', /\/runway\/[a-f0-9]+/);
  });

  it('should show the show title on the detail page', () => {
    cy.contains('Read Review').click();
    cy.contains('ISABEL MARANT').should('be.visible');
  });

  it('should show a back button on the detail page', () => {
    cy.contains('Read Review').click();
    cy.contains('← Back').should('be.visible');
  });

  it('should go back to runway when clicking the back button', () => {
    cy.contains('Read Review').click();
    cy.contains('← Back').click();
    cy.url().should('include', '/runway');
    cy.url().should('not.match', /\/runway\/[a-f0-9]+/);
  });

  it('should navigate to the CHANEL review when clicking on it', () => {
    cy.contains('CHANEL').click();
    cy.url().should('match', /\/runway\/[a-f0-9]+/);
    cy.contains('CHANEL').should('be.visible');
  });

  // ====== NEWSLETTER SECTION ======

  it('should have a "Never Miss a Show" newsletter section at the bottom', () => {
    cy.contains('Never Miss a Show').should('be.visible');
    cy.contains('Subscribe').should('be.visible');
  });
});
