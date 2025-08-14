/// <reference types="cypress" />

// BaseUrl configurada no cypress.config.js: "https://serverest.dev"

describe('Testes da Funcionalidade Usuários - Serverest', () => {

  let usuarioId;

  it('Deve validar contrato de usuários', () => {
    cy.request('GET', '/usuarios').then((response) => {
      expect(response.status).to.eq(200);
      response.body.usuarios.forEach((usuario) => {
        expect(usuario).to.have.all.keys(
          'nome',
          'email',
          'password',
          'administrador',
          '_id'
        );
      });
    });
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request('GET', '/usuarios').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.usuarios).to.be.an('array');
    });
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    const usuario = {
      nome: 'João Teste',
      email: `joao${Date.now()}@teste.com`,
      password: '123456',
      administrador: 'true'
    };

    cy.request('POST', '/usuarios', usuario).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      usuarioId = response.body._id;
    });
  });

  it('Deve validar um usuário com email inválido', () => {
    const usuario = {
      nome: 'João Teste',
      email: 'email-invalido',
      password: '123456',
      administrador: 'true'
    };

    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: usuario,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.eq('email deve ser um email válido');
    });
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    const usuarioAtualizado = {
      nome: 'João Atualizado',
      email: `joao${Date.now()}@teste.com`,
      password: '654321',
      administrador: 'false'
    };

    cy.request('PUT', `/usuarios/${usuarioId}`, usuarioAtualizado).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro alterado com sucesso');
    });
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request('DELETE', `/usuarios/${usuarioId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Registro excluído com sucesso');
    });
  });

});

