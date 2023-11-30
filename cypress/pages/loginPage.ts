class loginPage  {

    usernameInput  = 'input[placeholder="Username"]'      
    passwordInput = 'input[placeholder="Password"]'    
    loginBtn = "#login-button"
    errorBtn = ".error-button"
    errorTxt = '[data-test="error"]'



    enterIdentifiers(username:string, password: string) {

       cy.get(this.usernameInput).type(username);
       cy.get(this.passwordInput).type(password,{log: false})

    } 
    
    clickLoginBtn(){

        cy.get(this.loginBtn).click();
    }


    checkErrTextandClearInput(param:string){

        cy.get(this.loginBtn).click();
        cy.get(this.errorTxt).should('have.text',param)
        cy.get(this.errorBtn).click()
        cy.get(this.errorBtn).should("not.exist")

        cy.get(this.usernameInput).clear()
        cy.get(this.passwordInput).clear()
        
    }

}

module.exports = new loginPage();