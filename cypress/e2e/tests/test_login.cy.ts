import loginPage from "../../pages/loginPage"
import homePage from "../../pages/homePage"

describe("Login",()=>{
   beforeEach(()=>{

      //cy.visit(Cypress.env("baseUrl"));
      cy.visit(homePage.loginpageUrl);
   
   })
 

it("should login successfully", ()=>{

    cy.fixture('user_data.json').then((userData) =>{
	    loginPage.enterIdentifiers(userData.users[0].username, userData.users[0].password);
        loginPage.clickLoginBtn();
	    cy.url().should("contain",homePage.successfulLoginPageUrl);
     })
      
   })


it("should login unsuccessfully", ()=>{

      cy.fixture('user_data.json').then((userData) =>{
		 loginPage.enterIdentifiers(userData.users[1].username, userData.users[1].password);
		 loginPage.checkErrTextandClearInput("Epic sadface: Sorry, this user has been locked out.")
    })
 }) 




it("should login unsuccessfully with incorrect inputs",()=>{
	cy.fixture("incorrect_input.json").then((wrongInput) =>{
	   wrongInput.wrong_input.forEach((input) =>
		  //if username is empty get username required message
		 {

			if(!input.username){
				cy.get(loginPage.passwordInput).type(input.password)
				loginPage.checkErrTextandClearInput("Epic sadface: Username is required")
	
			}
			else if (!input.password){
				cy.get(loginPage.usernameInput).type(input.username)
				loginPage.checkErrTextandClearInput("Epic sadface: Password is required")

			}
			else{
				cy.get(loginPage.usernameInput).type(input.username)
			    cy.get(loginPage.passwordInput).type(input.password)
				loginPage.checkErrTextandClearInput("Epic sadface: Username and password do not match any user in this service")
				
			}
 
		})
	
		})
	 })
			
})