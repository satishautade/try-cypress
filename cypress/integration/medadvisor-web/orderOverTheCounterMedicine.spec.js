/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://webtest.medadvisor.com.au/Home/Landing')
  })

  // https://on.cypress.io/interacting-with-elements

  it('Login as Patient', () => {
    
    describe('Clicks the Log In button in Homepage', () => {
      cy.get('a.btn-default').click()
    })
    
    describe('Type Username', () => {
      cy.get('#UserName')
        .type('satisha@medadvisor.net.au').should('have.value', 'satisha@medadvisor.net.au')
      cy.get('input.btn-orange').click()
    })

    describe('Type Password', () => {
      cy.get('#Password')
        .type('asdfASDF12!@')
      cy.get('input.btn-orange').click()
    })

    describe('Check visibility of Navigation Sidebar on Login', () => {
      cy.get('#dnn_NAV1')
        .should('be.visible')
    })

    describe('Order over counter drug', () => {
      cy.get('#addNonPrescriptionMed')
        .should('be.visible')
        .click()
      
      cy.get('#colorbox').should('be.visible')
      cy.get('#otcSearchTerm').clear().type('panadol')
      cy.contains('20 Tablets').click()
      cy.get('#tapToRefillButton').click()
      cy.window()
      .then( (win) => {
        win.id == "Body"
      })
      cy.get("#btnAddSaveButton").click()
      cy.get("#OTCTable").should("be.visible").should("contain.text Panadol")
    })



  })
})
