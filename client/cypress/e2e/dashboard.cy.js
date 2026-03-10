describe('Dashboard Page', () => {
  const testUser = {
    email: `dashboard_test_${Date.now()}@example.com`,
    password: 'password123',
    name: 'Dashboard Tester',
  };

  // Create the test user once before all tests
  before(() => {
    cy.request('POST', 'http://localhost:5000/api/auth/register', {
      name: testUser.name,
      email: testUser.email,
      password: testUser.password,
    });
  });

  // ====== PROTECTED ROUTE ======

  it('should redirect to login if you are not logged in', () => {
    // Clear any token first
    cy.clearLocalStorage();
    cy.visit('http://localhost:5173/dashboard');

    // Should land on login page, not dashboard
    cy.url().should('include', '/login');
  });

  // ====== LOGGED IN USER ======

  describe('when logged in', () => {
    beforeEach(() => {
      // Log in via the API (faster than filling the form every time)
      cy.loginAs(testUser.email, testUser.password);
      cy.visit('http://localhost:5173/dashboard');
    });

    it('should show the dashboard page after logging in', () => {
      cy.url().should('include', '/dashboard');
    });

    it('should show the CHIARISSIME brand name', () => {
      cy.contains('CHIARISSIME').should('be.visible');
    });

    it('should show "Welcome back" text', () => {
      cy.contains('Welcome back').should('be.visible');
    });

    it('should show the user email on the page', () => {
      cy.contains(testUser.email).should('be.visible');
    });

    it('should show the Account Information section with the user email', () => {
      cy.contains('Account Information').should('be.visible');
      cy.contains(testUser.email).should('be.visible');
    });

    it('should show a User ID in the Account Information section', () => {
      cy.contains('User ID').should('be.visible');
    });

    it('should show the three feature cards (My Account, Collections, Saved Items)', () => {
      cy.contains('My Account').should('be.visible');
      cy.contains('Collections').should('be.visible');
      cy.contains('Saved Items').should('be.visible');
    });

    it('should have a Logout button visible', () => {
      cy.contains('button', 'Logout').should('be.visible');
    });

    // ====== LOGOUT ======

    it('should log out and redirect to home when clicking Logout', () => {
      cy.contains('button', 'Logout').click();

      // Should be on the home page
      cy.url().should('eq', 'http://localhost:5173/');
    });

    it('should remove the token from localStorage after logging out', () => {
      cy.contains('button', 'Logout').click();

      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.not.exist;
      });
    });

    it('should redirect back to login if you visit dashboard after logging out', () => {
      cy.contains('button', 'Logout').click();

      // Try going back to dashboard without logging in
      cy.visit('http://localhost:5173/dashboard');
      cy.url().should('include', '/login');
    });
  });
});
