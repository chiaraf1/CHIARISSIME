describe('Home Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:5173/');
  });

  // ====== BRANDING ======

  it('should show the CHIARISSIME title', () => {
    cy.contains('CHIARISSIME').should('be.visible');
  });

  it('should show the hero tagline', () => {
    cy.contains('The things worth wearing').should('be.visible');
  });

  // ====== NAVIGATION LINKS ======

  it('should have a link to Editorials', () => {
    // Click the first "Editorials" link in the nav
    cy.get('a[href="/editorials"]').first().click();
    cy.url().should('include', '/editorials');
  });

  it('should have a link to Runway', () => {
    cy.get('a[href="/runway"]').first().click();
    cy.url().should('include', '/runway');
  });

  it('should have a Sign In link that goes to the login page', () => {
    cy.get('a[href="/login"]').first().click();
    cy.url().should('include', '/login');
  });

  it('should have a Register link that goes to the register page', () => {
    cy.get('a[href="/register"]').first().click();
    cy.url().should('include', '/register');
  });

  // ====== LATEST STORIES SECTION ======

  it('should show a "Latest" section with articles', () => {
    cy.contains('Latest').should('be.visible');
  });

  it('should show the Carolyn Bessette editorial card', () => {
    cy.contains('The Carolyn Bessette Copy-Paste Era').should('be.visible');
  });

  it('should show the Chanel runway card', () => {
    cy.contains('Chanel Spring/Summer 2025').should('be.visible');
  });

  // ====== NEWSLETTER SECTION ======

  it('should show the newsletter section with an email input', () => {
    cy.contains('Join Our Community').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
  });

  it('should have a Subscribe button in the newsletter section', () => {
    cy.contains('button', 'Subscribe').should('be.visible');
  });

  // ====== FOOTER ======

  it('should show the footer with copyright text', () => {
    cy.contains('2025 CHIARISSIME').should('be.visible');
  });
});
