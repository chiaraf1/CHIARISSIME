// Custom command: log in via the API directly (faster than typing in the form)
// Usage: cy.loginAs('email@example.com', 'password123')
Cypress.Commands.add('loginAs', (email, password) => {
  cy.request('POST', 'http://localhost:5000/api/auth/login', { email, password }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
  });
});

// Create and log in as an admin user (requires CYPRESS_SECRET active on server)
Cypress.Commands.add('loginAsAdmin', () => {
  const email = 'cypress_admin@chiarissime.test';
  const password = 'cypress_admin_pass';
  cy.request('POST', 'http://localhost:5000/api/auth/seed-admin', {
    secret: 'cypress_test_secret',
    name: 'Cypress Admin',
    email,
    password,
  }).then(() => {
    cy.loginAs(email, password);
  });
});