const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter.json',
  },
  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1366,
  viewportHeight: 768,
  e2e: {},
})
