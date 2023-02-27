Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Moreira de Almeida')
    cy.get('#email').type('marcelomdea@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})
