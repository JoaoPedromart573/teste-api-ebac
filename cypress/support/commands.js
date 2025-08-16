// Cadastrar usuário e retornar ID
Cypress.Commands.add('criarUsuario', () => {
  const usuario = {
    nome: `Usuário Teste ${Date.now()}`,
    email: `teste${Date.now()}@qa.com`,
    password: '123456',
    administrador: 'true'
  };

  return cy.request('POST', '/usuarios', usuario).then((res) => res.body._id);
});

// Deletar usuário
Cypress.Commands.add('removerUsuario', (id) => {
  return cy.request('DELETE', `/usuarios/${id}`);
});
