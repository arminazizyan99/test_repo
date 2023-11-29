class loginPage  {

    elements = { 
        usernameInput : () => cy.get('input[placeholder="Username"]'),      
        passwordInput : () => cy.get('input[placeholder="Password"]'),    
        loginBtn : () => cy.get("#login-button"),
        errorBtn : () => cy.get(".error-button"),
        errorTxt : () => cy.get('[data-test="error"]')
    }


    enterIdentifiers(username:string, password: string) {

       this.elements.usernameInput().type(username);
       this.elements.passwordInput().type(password);

    } 
    
    clickLoginBtn(){

       this.elements.loginBtn().click();
    }


    checkErrorText(param:string){

        this.elements.errorTxt().should('have.text',param)
        
    }

    clearInputs(){

        this.elements.errorBtn().click()
        this.elements.errorBtn().should("not.exist")

        this.elements.usernameInput().clear()
        this.elements.passwordInput().clear()
    }

}

module.exports = new loginPage();