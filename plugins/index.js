///  <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const path = require('path');
const fs = require('fs-extra');

// Function to fetch configuration based on specified file
const fetchConfigurationByFile = (file) => {
    const fileName = `${file}`;
    // Construct the absolute path to the configuration file
    // eslint-disable-next-line no-undef
    const absolutePath = path.resolve(process.cwd(), fileName);
    // console.log('Absolute Path: ', absolutePath);

    // Check if the configuration file exists
    if (fs.existsSync(absolutePath)) {
        // Dynamically require the configuration file
        return require(absolutePath);
    } else {
        // File not found, return null or handle error as needed
        // console.error(`Configuration file not found: ${absolutePath}`);
        return null;
    }
};

// Export the Cypress plugin function
module.exports = (on, config) => {
    const environmentFile = config.configFile || 'nightly';
    // const environment = config.env.configFile || 'nightly'; // Use configFile directly from config object

    const configurationForEnvironment =
        fetchConfigurationByFile(environmentFile);
    // console.log('****Env: ', environmentFile);
    // console.log('ConfigFile: ', config.configFile);
    // Log the configuration
    // console.log('configurationForEnvironment: ', configurationForEnvironment);

    // Return the fetched configuration or the original config object
    return configurationForEnvironment || config;
};
