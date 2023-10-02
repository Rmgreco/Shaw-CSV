import 'cypress-file-upload';


describe('Home Page', () => {
  it('should load the home page', () => {
    cy.visit('http://localhost:4000');


    cy.contains('CSV Data Viewer');
  });

  it('should upload a CSV file', () => {
    cy.visit('http://localhost:4000');


    cy.get('input[type="file"]').attachFile('test.csv');

  });
});
