describe("Login",()=>{
   beforeEach(()=>{

      //cy.visit(Cypress.env("baseUrl"));
      cy.visit('/');
   
   })
 


it("should login successfully", ()=>{

    cy.fixture('user_data.json').then((userData) =>{
	    cy.login(userData.users[0].username, userData.users[0].password)	;
       cy.get("#login-button").click();
	    cy.url().should("contain","/v1/inventory.html");
         })
      
   })
   

it("should login unsuccessfully", ()=>{

      cy.fixture('user_data.json').then((userData) =>{
         cy.login(userData.users[1].username, userData.users[1].password);
         cy.get("#login-button").click();

         cy.checkErrorText(".error-button",['[data-test="error"]',"Epic sadface: Sorry, this user has been locked out."])
    })
 }) 



it("should login unsuccessfully with incorrect inputs",()=>{
   cy.fixture("incorrect_input.json").then((wrongInput) =>{
      wrongInput.wrong_input.forEach((input) =>{
	     //if username is empty get username required message
        if(!input.username){
	       
		   cy.get('input[placeholder="Username"]').type("{enter}")


		   cy.checkErrorText(".error-button",['[data-test="error"]',"Epic sadface: Username is required"])
		   cy.clearInputs(".error-button",['input[placeholder="Username"]','input[placeholder="Password"]'])

		   //get message after typing password without typing username 

		   cy.get('input[placeholder="Password"]').type(input.password).type("{enter}");
		   cy.checkErrorText(".error-button",['[data-test="error"]',"Epic sadface: Username is required"])
		   cy.clearInputs(".error-button",['input[placeholder="Username"]','input[placeholder="Password"]'])

	   }
   //if password is empty get password is required message
	else if(!input.password){
         	       
		 cy.get('input[placeholder="Username"]').type(input.username)
		 cy.get('input[placeholder="Password"]').type("{enter}")

		 cy.checkErrorText(".error-button",['[data-test="error"]',"Epic sadface: Password is required"])

		 cy.clearInputs(".error-button",['input[placeholder="Username"]','input[placeholder="Password"]'])

	   }

        else
	   {

		 cy.login(input.username, input.password)	
		 
		 cy.get("#login-button").click();
		 
		 cy.checkErrorText(".error-button",['[data-test="error"]',"Epic sadface: Username and password do not match any user in this service"])
		
		 cy.clearInputs(".error-button",['input[placeholder="Username"]','input[placeholder="Password"]'])
      
          }
     
       })
	})
           
   
   
   })


})


