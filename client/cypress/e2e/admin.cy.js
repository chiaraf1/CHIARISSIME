describe('Admin Panel', () => {

  // ====== ACCESS CONTROL ======

  it('should redirect to login if not logged in', () => {
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173/admin');
    cy.url().should('include', '/login');
  });

  it('should redirect non-admin users to dashboard', () => {
    const email = `nonadmin_${Date.now()}@example.com`;
    cy.request('POST', 'http://localhost:5000/api/auth/register', {
      name: 'Not Admin',
      email,
      password: 'password123',
    }).then((res) => {
      cy.window().then((win) => {
        win.localStorage.setItem('token', res.body.token);
      });
    });
    cy.visit('http://localhost:5173/admin');
    cy.url().should('include', '/dashboard');
  });

  // ====== ADMIN USER ======

  describe('when logged in as admin', () => {
    beforeEach(() => {
      cy.loginAsAdmin();
      cy.visit('http://localhost:5173/admin');
    });

    // ====== PAGE LOADS ======

    it('should show the Admin Panel label', () => {
      cy.contains('Admin Panel').should('be.visible');
    });

    it('should show the CHIARISSIME logo', () => {
      cy.contains('CHIARISSIME').should('be.visible');
    });

    it('should show the three section tabs', () => {
      cy.contains('button', 'editorials').should('be.visible');
      cy.contains('button', 'runway').should('be.visible');
      cy.contains('button', 'culture').should('be.visible');
    });

    it('should show the New Article button', () => {
      cy.contains('New Article').should('be.visible');
    });

    // ====== TABS ======

    it('should switch to runway tab when clicked', () => {
      cy.contains('button', 'runway').click();
      cy.contains('button', 'runway').should('have.class', 'border-[#0a0a0a]');
    });

    it('should switch to culture tab when clicked', () => {
      cy.contains('button', 'culture').click();
      cy.contains('button', 'culture').should('have.class', 'border-[#0a0a0a]');
    });

    // ====== ARTICLE FORM ======

    it('should open the new article form when clicking New Article', () => {
      cy.contains('New Article').click();
      cy.contains('New Article', { matchCase: false }).should('be.visible');
      cy.get('input[placeholder="Article title"]').should('be.visible');
    });

    it('should close the form when clicking Cancel', () => {
      cy.contains('New Article').click();
      cy.contains('button', 'Cancel').click();
      cy.get('input[placeholder="Article title"]').should('not.exist');
    });

    it('should show validation error if title is missing', () => {
      cy.contains('New Article').click();
      cy.get('textarea[placeholder="Short preview shown on the article card"]').type('Some excerpt');
      cy.contains('button', 'Publish').click();
      cy.contains('Title and excerpt are required').should('be.visible');
    });

    it('should show validation error if excerpt is missing', () => {
      cy.contains('New Article').click();
      cy.get('input[placeholder="Article title"]').type('Test Title');
      cy.contains('button', 'Publish').click();
      cy.contains('Title and excerpt are required').should('be.visible');
    });

    it('should publish a new article and show it in the list', () => {
      const title = `Cypress Test Article ${Date.now()}`;
      cy.contains('New Article').click();
      cy.get('input[placeholder="Article title"]').type(title);
      cy.get('textarea[placeholder="Short preview shown on the article card"]').type('A test excerpt for Cypress.');
      cy.contains('button', 'Publish').click();
      cy.contains(title).should('be.visible');
    });

    it('should open the edit form when clicking Edit on an article', () => {
      cy.contains('New Article').click();
      cy.get('input[placeholder="Article title"]').type(`Edit Test ${Date.now()}`);
      cy.get('textarea[placeholder="Short preview shown on the article card"]').type('Excerpt for edit test.');
      cy.contains('button', 'Publish').click();

      cy.contains('button', 'Edit').first().click();
      cy.contains('Edit Article').should('be.visible');
    });

    // ====== LOGOUT ======

    it('should log out and redirect to home when clicking Logout', () => {
      cy.contains('Logout').click();
      cy.url().should('eq', 'http://localhost:5173/');
    });
  });
});
