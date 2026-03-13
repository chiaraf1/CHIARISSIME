describe('About Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 800);
    cy.visit('http://localhost:5173/about');
  });

  // ====== PAGE LOADS ======

  it('should show the CHIARISSIME logo', () => {
    cy.contains('CHIARISSIME').should('be.visible');
  });

  it('should show the hero heading', () => {
    cy.contains('Written without').should('be.visible');
  });

  it('should show the "Our Story" label', () => {
    cy.contains('Our Story').should('be.visible');
  });

  // ====== NAVIGATION ======

  it('should have a working link to Editorials in the nav', () => {
    cy.get('nav').contains('Editorials').click();
    cy.url().should('include', '/editorials');
  });

it('should navigate home when clicking the CHIARISSIME logo', () => {
    cy.contains('CHIARISSIME').click();
    cy.url().should('eq', 'http://localhost:5173/');
  });

  // ====== CONTENT ======

  it('should show the about description text', () => {
    cy.contains('independent journal').should('be.visible');
  });

  it('should show the cinema x fashion section', () => {
    cy.contains('Cinema dresses its characters').should('be.visible');
  });

  it('should show the Bill Cunningham quote', () => {
    cy.contains('Fashion is the armour').should('be.visible');
  });

  it('should show the "What we cover" section', () => {
    cy.contains('What we cover').should('be.visible');
  });

  it('should have working links to Editorials, Runway and Culture in "What we cover"', () => {
    cy.get('a[href="/editorials"]').should('exist');
    cy.get('a[href="/runway"]').should('exist');
    cy.get('a[href="/culture"]').should('exist');
  });

  // ====== IMAGES ======

  it('should render the hero image', () => {
    cy.get('img[alt="Fashion editorial"]').first().should('exist');
  });

  // ====== FOOTER ======

  it('should show the footer with copyright text', () => {
    cy.contains('2025 CHIARISSIME').should('be.visible');
  });

  it('should have a Contact link in the footer', () => {
    cy.get('footer').contains('Contact').should('exist');
  });
});
