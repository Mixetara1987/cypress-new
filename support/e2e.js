// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-real-events';
import 'cypress-plugin-steps';

require('cy-verify-downloads').addCustomCommand();
// load and register the grep feature using "require" function
// https://github.com/cypress-io/cypress/tree/develop/npm/grep
const registerCypressGrep = require('@cypress/grep');
registerCypressGrep();
// https://github.com/archfz/cypress-terminal-report

function filterAuthorization({ type, message, severity }) {
    message = message.replace(
        /(.*"Authorization":\s*"Bearer\s*)((?:[\w-]+\.)+[\w-]+)(.*".*)/,
        '$1****$3',
    );
    return { type, message, severity };
}

const options = {
    xhr: {
        printRequestData: true,
        printHeaderData: false,
    },
    processLog: filterAuthorization,
};
require('cypress-terminal-report/src/installLogsCollector')(options);

Cypress.on('uncaught:exception', (err) => {
    // Check if the error message includes the specific property access error
    if (
        err.message.includes(
            "Cannot read properties of undefined (reading 'paginationGoToFirstPage')",
        )
    ) {
        console.error(
            'Cypress caught "> Undefined props exception", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    if (
        err.message.includes(
            "Cannot read properties of null (reading 'postMessage')",
        )
    ) {
        console.error(
            'Cypress caught "> Null reading postMessage", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    if (
        err.message.includes(
            "Cannot read properties of undefined (reading 'sort')",
        )
    ) {
        console.error(
            'Cypress caught "> Undefined sort exception", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    if (
        err.message.includes(
            "Cannot read properties of undefined (reading 'style')",
        )
    ) {
        console.error(
            'Cypress caught "> Undefined style exception", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    if (
        err.message.includes(
            "Cannot read properties of undefined (reading 'loadAndDisplayList')",
        )
    ) {
        console.error(
            'Cypress caught "> Undefined loadAndDisplayList exception", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    //
    if (
        err.message.includes(
            "Cannot read properties of undefined (reading 'value')",
        )
    ) {
        console.error(
            'Cypress caught "> Undefined property value exception", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    if (
        err.message.includes(
            "Cannot read properties of undefined (reading 'filter')",
        )
    ) {
        console.error(
            'Cypress caught "> Undefined property filter exception", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    if (
        err.message.includes(
            "Cannot read properties of null (reading 'offsetTop')",
        )
    ) {
        console.error(
            'Cypress caught "> Null property offsetTop exception", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    if (
        err.message.includes(
            "Cannot read properties of undefined (reading 'style')",
        )
    ) {
        console.error(
            'Cypress caught "> Properties null exception", continuing tests',
            err,
        );
        // Return false to prevent Cypress from failing the test
        return false;
    }

    return true; // test fails
});

// Alternatively you can use CommonJS syntax:
// require('./commands')
