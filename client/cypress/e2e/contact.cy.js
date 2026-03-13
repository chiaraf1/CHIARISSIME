describe('Contact Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:5173/contact');
  });

  // ====== PAGE LOADS ======

  it('should show the CHIARISSIME logo', () => {
    cy.contains('CHIARISSIME').should('be.visible');
  });

  it('should show the main heading', () => {
    cy.contains("We'll be in touch").should('be.visible');
  });

  it('should show the placeholder message', () => {
    cy.contains('CHIARISSIME is still growing').should('be.visible');
  });

  // ====== NAVIGATION ======

it('should navigate home when clicking the CHIARISSIME logo', () => {
    cy.contains('CHIARISSIME').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('should navigate home when clicking "Back to the journal"', () => {
    cy.contains('Back to the journal').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  // ====== FOOTER ======

  it('should show the footer with copyright text', () => {
    cy.contains('2025 CHIARISSIME').should('be.visible');
  });

  it('should have an About link in the footer', () => {
    cy.get('footer').contains('Our Story').should('exist');
  });
});
