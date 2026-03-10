// Custom command: log in via the API directly (faster than typing in the form)
// Usage: cy.loginAs('email@example.com', 'password123')
Cypress.Commands.add('loginAs', (email, password) => {
  cy.request('POST', 'http://localhost:5000/api/auth/login', { email, password }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
  });
});