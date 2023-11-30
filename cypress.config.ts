export default {
  e2e: {
    baseUrl: 'https://www.saucedemo.com/v1/index.html',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  },
  env: {

    standard_user: { "username": "standard_user", "password": "secret_sauce"},
    locked_user: { "username": "locked_out_user", "password": "secret_sauce"},
  
  }
};
