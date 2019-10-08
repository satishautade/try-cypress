/// <reference types="Cypress" />

context('Actions', () => {
  beforeEach(() => {

    Cypress.Commands.add('iframe', { prevSubject: 'element' }, $iframe => {
      return new Cypress.Promise(resolve => {
          $iframe.on('load', () => {
              resolve($iframe.contents().find('body'));
          });
      });
    });

    cy.visit('http://mobiletest.medadvisor.com.au/4_29_0/webapp/Default.aspx')
    cy.get('iframe#MobileWebsite').then( $iframe => {
        const innerPage = $iframe.contents();
        const userNameInput = innerPage.find('input#Login_MemberID');
        cy.wrap(userNameInput).type('satisha@medadvisor.net.au'); 
    })
  })

  // https://on.cypress.io/interacting-with-elements

  it('Login as Patient', () => {
   

    describe('Type Username', () => {
      cy.get('iframe#MobileWebsite').iframe().find('input#Login_MemberID')
      .type('satisha@medadvisor.net.au').should('have.value', 'satisha@medadvisor.net.au')
      cy.window()
      cy.get('iframe#MobileWebsite').iframe().find('#Screen_Landing_Next').click()
      // cy.get('#Screen_Login_AcceptTermsAndConditions')
      // cy.get('#Screen_Landing_Next').click()
    })

    describe('Type Password', () => {
      cy.get('#Screen_Login_Password')
        .type('asdfASDF12!@')
      cy.get('#Screen_Login_Next').click()
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
