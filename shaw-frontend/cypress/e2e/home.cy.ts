import 'cypress-file-upload';


describe('Home Page', () => {
  it('should load the home page', () => {
    cy.visit('http://localhost:4000'); // Adjust the URL to match your frontend's URL

    // Perform assertions using Cypress commands
    cy.contains('CSV Data Viewer');
  });

  it('should upload a CSV file', () => {
    cy.visit('http://localhost:4000'); // Adjust the URL

    // Upload a CSV file using the file input
    cy.get('input[type="file"]').attachFile('test.csv');

  });
});
