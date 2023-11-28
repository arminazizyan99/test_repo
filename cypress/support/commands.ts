// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/// <reference types="@cypress/xpath"/>

//Creating command for deleting username and password and closing error message
Cypress.Commands.add("clear_inputs", (selectorToclick: string, selectorToclean: any[]) =>  {

   cy.get(selectorToclick).click()
   cy.get(selectorToclick).should("not.exist")
    
   selectorToclean.forEach((item)=>{  
            
     cy.get(item).clear()
   
   })
  

})


//Creating command for checking the error message,if it is the right one
Cypress.Commands.add("check_error_text", (selectorBeenabled: string, selectorText: any[]) =>  {

   cy.get(selectorBeenabled).should('be.enabled')
    
   cy.get(selectorText[0]).should("have.text", selectorText[1]) 

})


//Creting command for login using username and password
Cypress.Commands.add("login",(username:string,password:string)=>{
         

         cy.get('input[placeholder="Username"]').type(username)
         cy.get("#user-name").should('have.value', username);
         cy.get('input[placeholder="Password"]').type(password);
         cy.get("#password").should('have.value', password);
})
