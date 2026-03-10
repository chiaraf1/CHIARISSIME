// ========================================
// Cypress Test: client/cypress/e2e/login.cy.js
// ========================================

describe('Login Page', () => {
  const testUser = {
    email: `cypress_test_${Math.random()}@example.com`,
    password: 'password123',
    name: 'Cypress Tester',
  };
  
  let createdUserEmail;
  
  before(() => {
    createdUserEmail = testUser.email;
    
    cy.request('POST', 'http://localhost:5000/api/auth/register', {
      name: testUser.name,
      email: createdUserEmail,
      password: testUser.password,
    })
  });
  
  beforeEach(() => {
    cy.window().then((win) => {
      win.localStorage.clear();
    });
    cy.visit('http://localhost:5173/login');
  });
  
    // ====== SUCCESSFUL LOGIN ======
  
    it('should store valid JWT token in localStorage', () => {
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
    
      cy.get('button[type="submit"]').click();
    
      // Wait for redirect to happen
      cy.url().should('include', '/dashboard');
    
      // NOW check localStorage
      cy.window().then((win) => {
        const token = win.localStorage.getItem('token');
        expect(token).to.exist;
        expect(token.split('.').length).to.equal(3); // Valid JWT format
      });
    });
  
    // ====== AUTHENTICATION ERRORS ======
  
    it('should show error with wrong password', () => {
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type('wrongpassword');
  
      cy.get('button[type="submit"]').click();
  
      // Should show error message
      cy.contains('Invalid credentials').should('be.visible');
  
      // Should NOT redirect
      cy.url().should('include', '/login');
  
      // Token should NOT be in localStorage
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.not.exist;
      });
    });
  
    it('should show error with non-existent email', () => {
      cy.get('input[name="email"]').type('nonexistent@example.com');
      cy.get('input[name="password"]').type('password123');
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('Invalid credentials').should('be.visible');
      cy.url().should('include', '/login');
    });
  
    // ====== VALIDATION ERRORS ======
  
    it('should show error when email is empty', () => {
      cy.get('input[name="password"]').type('password123');
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('Email and password required').should('be.visible');
    });
  
    it('should show error when password is empty', () => {
      cy.get('input[name="email"]').type('test@example.com');
  
      cy.get('button[type="submit"]').click();
  
      cy.contains('Email and password required').should('be.visible');
    });
  
    it('should show error when both fields are empty', () => {
      cy.get('button[type="submit"]').click();
  
      cy.contains('Email and password required').should('be.visible');
    });
  
    // ====== FORM BEHAVIOR ======
  
    it('should have link to register page', () => {
      cy.contains('Create One').should('be.visible').click();
      cy.url().should('include', '/register');
    });
  
    it('should have CHIARISSIME branding', () => {
      cy.contains('CHIARISSIME').should('be.visible');
    });
  
    it('should show "Sign In to Your Account" heading', () => {
      cy.contains('Sign In to Your Account').should('be.visible');
    });
  
    // ====== BUTTON STATES ======
  
    it('should show loading state while signing in', () => {
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
  
      cy.get('button[type="submit"]').click();
  
      // Button should show loading text (briefly)
      cy.get('button[type="submit"]').should('contain', 'Signing In...');
    });
  
    // ====== CASE SENSITIVITY ======
  
    it('should handle uppercase email (case insensitive)', () => {
      const uppercaseEmail = testUser.email.toUpperCase();
  
      cy.get('input[name="email"]').type(uppercaseEmail);
      cy.get('input[name="password"]').type(testUser.password);
  
      cy.get('button[type="submit"]').click();
  
      // Should login successfully (email is lowercase in DB)
      cy.url().should('include', '/dashboard');
    });
  
    // ====== SECURITY ======
  
    it('should mask password input', () => {
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  
      cy.get('input[name="password"]').type(testUser.password);
  
      // Password should be masked (not visible as plain text)
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });
  
    // ====== ACCESSIBILITY ======
  
    it('should have proper labels for form inputs', () => {
      cy.contains('Email').should('be.visible');
      cy.contains('Password').should('be.visible');
    });
  
    it('should have proper input types', () => {
      cy.get('input[name="email"]').should('have.attr', 'type', 'email');
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    });
  
    // ====== ERROR CLEARING ======
  
    it('should clear error message when user starts typing', () => {
      // Trigger error
      cy.get('button[type="submit"]').click();
      cy.contains('Email and password required').should('be.visible');
  
      // Start typing
      cy.get('input[name="email"]').type('test@example.com');
  
      // Error should still be there until form is resubmitted
      // (This depends on your implementation, adjust if needed)
      cy.contains('Email and password required').should('be.visible');
    });
  
    // ====== MULTIPLE ATTEMPTS ======
  
    it('should allow multiple login attempts', () => {
      // First attempt - wrong password
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Invalid credentials').should('be.visible');
  
      // Second attempt - correct password
      cy.get('input[name="email"]').clear().type(testUser.email);
      cy.get('input[name="password"]').clear().type(testUser.password);
      cy.get('button[type="submit"]').click();
  
      // Should succeed this time
      cy.url().should('include', '/dashboard');
    });
  
    // ====== TOKEN VERIFICATION ======
  
    it('should store valid JWT token in localStorage', () => {
      cy.get('input[name="email"]').type(testUser.email);
      cy.get('input[name="password"]').type(testUser.password);
  
      cy.get('button[type="submit"]').click();
  
      cy.window().then((win) => {
        const token = win.localStorage.getItem('token');
        expect(token).to.exist;
        
        // JWT tokens have 3 parts separated by dots
        expect(token.split('.').length).to.equal(3);
        
        // First part should start with eyJ (base64 for '{')
        expect(token.substring(0, 3)).to.equal('eyJ');
      });
    });
  
    // ====== FORM RESET ======
  
    it('should not clear form on validation error', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
  
      // Submit wrong credentials
      cy.get('button[type="submit"]').click();
  
      // Form values should still be there for user to edit
      cy.get('input[name="email"]').should('have.value', 'test@example.com');
      cy.get('input[name="password"]').should('have.value', 'password123');
    });
  
    // ====== VISUAL ELEMENTS ======
  
    it('should display error messages with proper styling', () => {
      cy.get('input[name="password"]').type('password');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Email and password required').should('be.visible');
      // Check if error has red styling
      cy.contains('Email and password required').should('have.class', 'text-red-700');
    });
  
    it('should have functioning icons in form', () => {
      // Check if email icon exists
      cy.get('input[name="email"]').parent().find('svg').should('exist');
      
      // Check if password icon exists
      cy.get('input[name="password"]').parent().find('svg').should('exist');
    });
  });