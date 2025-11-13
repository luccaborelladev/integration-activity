describe('Fluxo de integração usuário', () => {
  it('Deve criar e listar um usuário', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name="name"]').type('Ana');
    cy.get('input[name="email"]').type('ana@example.com');
    cy.get('button[type="submit"]').click();
    cy.contains('Usuário criado com sucesso').should('exist');
    cy.contains('Ana').should('exist');
  });
});