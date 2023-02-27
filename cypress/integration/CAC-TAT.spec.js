/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    this.beforeEach(function () {
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = "aslkdfjalskdfjlaskdjflkasdjflksdjflaskdjflaksjdflkasldfksaldkfalskjdflaskdjflskdjflkasjdflksaj lskflksadf lskjdf ls"
        cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Moreira de Almeida')
        cy.get('#email').type('marcelomdea@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Moreira de Almeida')
        cy.get('#email').type('marcelomdea-gmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não numérico', function () {
        cy.get('#phone').type('abcde').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Marcelo')
        cy.get('#lastName').type('Moreira de Almeida')
        cy.get('#email').type('marcelomdea@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Marcelo')
          .should('have.value', 'Marcelo')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Moreira')
          .should('have.value', 'Moreira')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('marcelo@gmail.com')
          .should('have.value', 'marcelo@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('123456')
          .should('have.value', '123456')
          .clear()
          .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it(' envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
          .select("YouTube")
          .should('have.value', "youtube")
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
          .select("mentoria")
          .should('have.value', "mentoria")
    })

    it.only('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
          .select(1)
          .should('have.value', "blog")
    })
})
