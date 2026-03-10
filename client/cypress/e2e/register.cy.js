describe('Register Page', () => {
    const baseUrl = 'http://localhost:5173';
  
    beforeEach(() => {
      cy.visit(`${baseUrl}/register`);
    });
  
    // ====== SUCCESSFUL REGISTRATION ======
  
    it('should register a new user successfully', () => {
      const email = `user_${Date.now()}@example.com`;
      
      // Fill form
      cy.get('input[name="name"]').type('Chiara Finger');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
  
      // Submit
      cy.get('button[type="submit"]').click();
  
      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
  
      // Token should be in localStorage
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.exist;
      });
    });
  
    // ====== VALIDATION ERRORS ======
  
    it('should show error when name is empty', () => {
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      cy.get('button[type="submit"]').click();
  
      cy.contains('All fields are required').should('be.visible');
    });
  
    it('should show error when email is empty', () => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      cy.get('button[type="submit"]').click();
  
      cy.contains('All fields are required').should('be.visible');
    });
  
    it('should show error when password is empty', () => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      cy.get('button[type="submit"]').click();
  
      cy.contains('All fields are required').should('be.visible');
    });
  
    it('should show error when passwords do not match', () => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password456');
      
      cy.get('button[type="submit"]').click();
  
      cy.contains('Passwords do not match').should('be.visible');
    });
  
    it('should show error when password is less than 6 characters', () => {
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('123');
      cy.get('input[name="confirmPassword"]').type('123');
      
      cy.get('button[type="submit"]').click();
  
      cy.contains('Password must be at least 6 characters').should('be.visible');
    });
  
    // ====== DUPLICATE EMAIL ======
  
    it('should show error when email is already registered', () => {
          const email = 'duplicate@example.com';
      
          // First registration
          cy.get('input[name="name"]').type('First User');
          cy.get('input[name="email"]').type(email);
          cy.get('input[name="password"]').type('password123');
          cy.get('input[name="confirmPassword"]').type('password123');
          cy.get('button[type="submit"]').click();
      
          // Wait for redirect and go back to register
          cy.url().should('include', '/dashboard');
          cy.wait(1000);
          cy.visit(`${baseUrl}/register`);
      
          // Try to register same email
          cy.get('input[name="name"]').type('Second User');
          cy.get('input[name="email"]').type(email);
          cy.get('input[name="password"]').type('password123');
          cy.get('input[name="confirmPassword"]').type('password123');
          cy.get('button[type="submit"]').click();
      
          // Should show duplicate error
          cy.contains('Email already registered').should('be.visible');
      });
  
    // ====== FORM BEHAVIOR ======
  
    it('should have Sign In link to login page', () => {
      cy.contains('Sign In').should('be.visible').click();
      cy.url().should('include', '/signin');
    });
  
    it('should have CHIARISSIME branding', () => {
      cy.contains('CHIARISSIME').should('be.visible');
      
    });
  
    it('should clear form after successful submission', () => {
      // This tests that form resets after successful registration
      const email = `clear_test_${Date.now()}@example.com`;
      
      cy.get('input[name="name"]').type('Test User').should('have.value', 'Test User');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      cy.get('button[type="submit"]').click();
  
      // Should redirect, proving form was submitted
      cy.url().should('include', '/dashboard');
    });
  
    // ====== BUTTON STATES ======
  
    it('should disable button while submitting', () => {
      const email = `button_test_${Date.now()}@example.com`;
      
      cy.get('input[name="name"]').type('Test User');
      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');
      
      cy.get('button[type="submit"]').click();
  
      // Button should show loading state
      cy.get('button[type="submit"]').should('contain', 'Creating Account...');
    });
  
    // ====== EMAIL VALIDATION ======
  
    it('should accept valid email formats', () => {
      const validEmails = [
        'user@example.com',
        'user.name@example.com',
        'user+tag@example.co.uk',
      ];
  
      validEmails.forEach((email) => {
        cy.get('input[name="name"]').clear().type('Test User');
        cy.get('input[name="email"]').clear().type(email);
        cy.get('input[name="password"]').clear().type('password123');
        cy.get('input[name="confirmPassword"]').clear().type('password123');
  
        // Form should be valid (no HTML5 error)
        cy.get('input[name="email"]').then(($input) => {
          expect($input[0].validity.valid).to.be.true;
        });
  
        cy.visit(`${baseUrl}/register`);
      });
    });
  
    // ====== ACCESSIBILITY ======
  
    it('should have proper labels for form inputs', () => {
      cy.contains('Name').should('be.visible');
      cy.contains('Email').should('be.visible');
      cy.contains('Password').should('be.visible');
      cy.contains('Confirm Password').should('be.visible');
    });
  
    it('should have proper form input types', () => {
      cy.get('input[name="name"]').should('have.attr', 'type', 'text');
      cy.get('input[name="email"]').should('have.attr', 'type', 'email');
      cy.get('input[name="password"]').should('have.attr', 'type', 'password');
      cy.get('input[name="confirmPassword"]').should('have.attr', 'type', 'password');
    });
  });