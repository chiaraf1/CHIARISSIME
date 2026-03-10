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

  it('should show the featured Chanel show', () => {
    cy.contains('Chanel Spring/Summer 2025').should('be.visible');
  });

  it('should show the Chloé show', () => {
    cy.contains('Chloé Spring/Summer 2025').should('be.visible');
  });

  it('should show the Valentino show', () => {
    cy.contains('Valentino Couture SS 2025').should('be.visible');
  });

  it('should show the Loewe show', () => {
    cy.contains('Loewe AW 2025').should('be.visible');
  });

  // ====== READING A REVIEW ======

  it('should open the featured review when you click "Read Review"', () => {
    cy.contains('Read Review').click();

    // The full review content should now be visible
    cy.contains('Chanel Spring/Summer 2025').should('be.visible');
    cy.contains('The Return of the Tweed').should('be.visible');
  });

  it('should show a "Back to Runway" button after opening a review', () => {
    cy.contains('Read Review').click();
    cy.contains('Back to Runway').should('be.visible');
  });

  it('should go back to the list when clicking "Back to Runway"', () => {
    cy.contains('Read Review').click();
    cy.contains('Back to Runway').click();

    // Should be back on the list
    cy.contains('Read Review').should('be.visible');
  });

  it('should open the Valentino review when you click on it', () => {
    cy.contains('Valentino Couture SS 2025').click();
    cy.contains('Red and Silence').should('be.visible');
  });

  it('should open the Loewe review when you click on it', () => {
    cy.contains('Loewe AW 2025').click();
    cy.contains('Jonathan Anderson').should('be.visible');
  });

  // ====== NEWSLETTER SECTION ======

  it('should have a "Never Miss a Show" newsletter section at the bottom', () => {
    cy.contains('Never Miss a Show').should('be.visible');
    cy.contains('Subscribe').should('be.visible');
  });
});
