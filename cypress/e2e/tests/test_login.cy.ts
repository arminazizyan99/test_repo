import loginPage from "../../pages/loginPage"

describe("Login",()=>{
   beforeEach(()=>{

      //cy.visit(Cypress.env("baseUrl"));
      cy.visit('/');
   
   })
 

it("should login successfully", ()=>{

    cy.fixture('user_data.json').then((userData) =>{
	    loginPage.enterIdentifiers(userData.users[0].username, userData.users[0].password);
        loginPage.clickLoginBtn();
	    cy.url().should("contain","/v1/inventory.html");
     })
      
   })


it("should login unsuccessfully", ()=>{

      cy.fixture('user_data.json').then((userData) =>{
		 loginPage.enterIdentifiers(userData.users[1].username, userData.users[1].password);
         loginPage.clickLoginBtn();
		 loginPage.checkErrorText("Epic sadface: Sorry, this user has been locked out.")
    })
 }) 



it("should login unsuccessfully with incorrect inputs",()=>{
   cy.fixture("incorrect_input.json").then((wrongInput) =>{
      wrongInput.wrong_input.forEach((input) =>{
	     //if username is empty get username required message
        if(!input.username){
	       
		   loginPage.elements.usernameInput().type("{enter}")

		   loginPage.checkErrorText("Epic sadface: Username is required")
		   loginPage.clearInputs()

		   //get message after typing password without typing username 

		   loginPage.elements.passwordInput().type(input.password).type("{enter}");
           loginPage.checkErrorText("Epic sadface: Username is required")
		   loginPage.clearInputs()

	   }
   //if password is empty get password is required message
	else if(!input.password){
         	       
		 loginPage.elements.usernameInput().type(input.username)
		 loginPage.elements.passwordInput().type("{enter}")

		 loginPage.checkErrorText("Epic sadface: Password is required")
		 loginPage.clearInputs()
	   }

        else
	   {

		 loginPage.enterIdentifiers(input.username, input.password);
		 
		 loginPage.clickLoginBtn()

		 loginPage.checkErrorText("Epic sadface: Username and password do not match any user in this service")
		 loginPage.clearInputs()
          }
     
       })
	})
           
   })


})


