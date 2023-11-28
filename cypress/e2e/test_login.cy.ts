describe("test login",()=>{
   beforeEach(()=>{
   
    cy.visit("https://www.saucedemo.com/v1/index.html"); 
   
   })
 


it("successful login", ()=>{

   cy.fixture('user_data.json').then((userData) =>{
      userData.users.forEach((user)=>{
       if(user.username == "standard_user"){
	 cy.LogIn(user.username, user.password)	
         cy.get("#login-button").click();
	 cy.url().should("contain","/v1/inventory.html");
         }
      
      })
    }) 
})




it("failure login", ()=>{

   cy.fixture('user_data.json').then((userData) =>{
      userData.users.forEach((user)=>{
       if(user.username == "locked_out_user"){
       
	 cy.LogIn(user.username, user.password)	
         cy.get("#login-button").click();

         cy.Check(".error-button",['[data-test="error"]',"Epic sadface: Sorry, this user has been locked out."])
         }
      
      })
    }) 
})



it("incorrect inputs",()=>{
   cy.fixture("incorrect_input.json").then((wrongInput) =>{
      wrongInput.wrong_input.forEach((input) =>{
	//if username is empty get username required message
        if(input.username === "empty"){
	       
		 cy.get('input[placeholder="Username"]').type("{enter}")


		 cy.Check(".error-button",['[data-test="error"]',"Epic sadface: Username is required"])
		 cy.CleanUp(".error-button",['input[placeholder="Username"]','input[placeholder="Password"]'])

		 //get message after typing password without typing username 

		 cy.get('input[placeholder="Password"]').type(input.password).type("{enter}");
		 cy.Check(".error-button",['[data-test="error"]',"Epic sadface: Username is required"])
		 cy.CleanUp(".error-button",['input[placeholder="Username"]','input[placeholder="Password"]'])

	   }
        //if password is empty get password is required message
	else if(input.password === "empty"){
         	       
		 cy.get('input[placeholder="Username"]').type(input.username)
		 cy.get('input[placeholder="Password"]').type("{enter}")

		 cy.Check(".error-button",['[data-test="error"]',"Epic sadface: Password is required"])

		 cy.CleanUp(".error-button",['input[placeholder="Username"]','input[placeholder="Password"]'])

	   }

        else
	   {

		 cy.LogIn(input.username, input.password)	
		 
		 cy.get("#login-button").click();
		 
		 cy.Check(".error-button",['[data-test="error"]',"Epic sadface: Username and password do not match any user in this service"])
		
		 cy.CleanUp(".error-button",['input[placeholder="Username"]','input[placeholder="Password"]'])
      
          }
     
       })
	})
           
   
   
   })


})


