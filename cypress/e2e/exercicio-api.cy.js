/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários - Serverest', () => {
  let usuarioId;

  beforeEach(() => {
    // cria um usuário antes de cada teste
    cy.criarUsuario().then((id) => {
      usuarioId = id;
    });
  });

  afterEach(() => {
    // garante limpeza após os testes
    if (usuarioId) {
      cy.removerUsuario(usuarioId);
    }
  });

  it('Deve validar contrato de usuários', () => {
    cy.request('GET', '/usuarios').then((response) => {
      expect(response.status).to.eq(200);
      response.body.usuarios.forEach((usuario) => {
        expect(usuario).to.have.all.keys(
          'nome',
          'email',
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
    cy.criarUsuario().then((id) => {
      expect(id).to.not.be.undefined;
      cy.removerUsuario(id); // remove logo após pra não acumular
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
      expect(response.body).to.have.property('email', 'email deve ser um email válido');
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
    cy.removerUsuario(usuarioId).then((response) => {
      expect(response.body.message).to.eq('Registro excluído com sucesso');
      usuarioId = null; // evita tentar excluir de novo no afterEach
    });
  });
});



