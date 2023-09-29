const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'zrh84w',
  e2e: {
    baseUrl: "https://example.cypress.io",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/*.js'
  },
});
