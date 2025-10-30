// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="cypress" />

import '@4tw/cypress-drag-drop';
import 'cy-verify-downloads';
import 'cypress-file-upload';

// Login user, password
Cypress.Commands.add('login', (loginUrl, username, password) => {
    cy.session([loginUrl, username], () => {
        cy.visit(loginUrl);
        cy.get('#orderForm_tb_email').type(username);
        cy.get('#orderForm_tb_password').type(password, { log: false });
        cy.get('#orderForm_btn_login_KTM').click();
        cy.location('pathname').should('eq', '/');
    }).then(() => {
        cy.visit('/en/search/quick');
        cy.get('img[alt="TM-logo"]').should('be.visible');
    });
});

// Login user, password
Cypress.Commands.add('oldlogin', (environmentLoginUrl, username, password) => {
    cy.visit(environmentLoginUrl);
    cy.get('#orderForm_tb_email').type(username);
    cy.get('#orderForm_tb_password').type(password, { log: false });
    cy.get('#orderForm_btn_login_KTM').click();
    cy.location('pathname').should('eq', '/');
});

Cypress.Commands.add('step', (description) => {
    const MAX_STEPS = 8;
    const arr = Cypress.env('step') || [];
    arr.push(description);

    if (arr.length > MAX_STEPS) {
        arr.shift();
    }

    Cypress.env('step', arr);
});
Cypress.Commands.add('Compare_Results', (currentResult, expectedResult) => {
    var numberPattern = /\d+/g;
    const currentnumberOfResults = currentResult.match(numberPattern);
    const expectednumberOfResults = expectedResult.match(numberPattern);
    if (currentnumberOfResults > expectednumberOfResults) {
        const diff = currentnumberOfResults - expectednumberOfResults;
        throw new Error(
            `The number of results has increased for: ` +
                `+ ` +
                diff +
                `\n` +
                `Current result:  ` +
                currentnumberOfResults +
                `\n` +
                `Expected result: ` +
                expectednumberOfResults,
        );
    }
    if (currentnumberOfResults < expectednumberOfResults) {
        const diff = expectednumberOfResults - currentnumberOfResults;
        throw new Error(
            `The number of results has decreased for: ` +
                `- ` +
                diff +
                `\n` +
                `Current result:  ` +
                currentnumberOfResults +
                `\n` +
                `Expected result: ` +
                expectednumberOfResults,
        );
    }
    expect(currentnumberOfResults).to.be.deep.equal(expectednumberOfResults);
});

Cypress.Commands.add(
    'compareResultsWithDeviation',
    (currentResult, expectedResult, deviation) => {
        const numberPattern = /\d+(\.\d+)?/g; // Matches integers and floating point numbers
        const currentNumberOfResults = currentResult.match(numberPattern);
        const expectedNumberOfResults = expectedResult.match(numberPattern);
        const diff = currentNumberOfResults - expectedNumberOfResults;

        const msg =
            `Deviation exceeded for value for allowed ${deviation}, actual ${diff}` +
            `\n` +
            `Current result:  ` +
            currentNumberOfResults +
            `\n` +
            `Expected result: ` +
            expectedNumberOfResults;

        expect(diff).to.be.closeTo(0, deviation, msg);
    },
);

Cypress.Commands.add('Compare_Price', (currentPrice1, expectedPrice1) => {
    var numberPattern = /\d+/g;
    const currentPrice = currentPrice1.match(numberPattern);
    const expectedPrice = expectedPrice1.match(numberPattern);
    if (currentPrice > expectedPrice) {
        const diff = currentPrice - expectedPrice;
        throw new Error(
            `The price is increased for: ` +
                `+ ` +
                diff +
                `\n` +
                `Current price:  ` +
                currentPrice +
                `\n` +
                `Expected price: ` +
                expectedPrice,
        );
    }
    if (currentPrice < expectedPrice) {
        const diff = expectedPrice - currentPrice;
        throw new Error(
            `The price is decreased for: ` +
                `- ` +
                diff +
                `\n` +
                `Current price:  ` +
                currentPrice +
                `\n` +
                `Expected price: ` +
                expectedPrice,
        );
    }
    expect(currentPrice).to.be.deep.equal(expectedPrice);
});

Cypress.Commands.add('Compare_Arrays', (arrCurrent, arrExpected) => {
    if (arrCurrent.length > arrExpected.length) {
        let difference = arrCurrent.filter(
            (member) => !arrExpected.includes(member),
        );
        throw new Error(
            'In expected array missing: ' +
                difference +
                '\n' +
                'Current:  ' +
                arrCurrent +
                '\n' +
                'Expected: ' +
                arrExpected,
        );
    }
    if (arrCurrent.length < arrExpected.length) {
        let difference = arrExpected.filter(
            (member) => !arrCurrent.includes(member),
        );
        throw new Error(
            'In current array missing: ' +
                difference +
                '\n' +
                'Current:  ' +
                arrCurrent +
                '\n' +
                'Expected: ' +
                arrExpected,
        );
    }
    expect(arrCurrent).to.include.members(arrExpected);
});

// Cypress.Commands.add('saveLocalStorage', () => {
//     cy.window().then((window) => {
//         const localstorage = window.localStorage;
//         cy.writeFile('cypress/fixtures/localSdata.json', localstorage);
//         const id_token = window.localStorage.id_token;
//         cy.writeFile('cypress/fixtures/accessToken.json', { id_token });
//     });
// });

// Cypress.Commands.add('restoreLocalStorage', () => {
//     cy.fixture('localSdata.json').then((LOCAL_STORAGE) => {
//         Object.keys(LOCAL_STORAGE).forEach((key) => {
//             localStorage.setItem(key, LOCAL_STORAGE[key]);
//         });
//     });
// });

// Cypress.Commands.add('saveSessionStorage', () => {
//     cy.url()
//         .should('include', '/')
//         .then(() => {
//             cy.window().then((window) => {
//                 const sessionstorage = window.sessionStorage;
//                 cy.writeFile(
//                     'cypress/fixtures/sessionSdata.json',
//                     sessionstorage,
//                 );
//             });
//         });
// });
// Cypress.Commands.add('restoreSessionStorage', () => {
//     cy.fixture('sessionSdata.json').then((SESSION_STORAGE) => {
//         Object.keys(SESSION_STORAGE).forEach((key) => {
//             sessionStorage.setItem(key, SESSION_STORAGE[key]);
//         });
//     });
// });

// Cypress.Commands.add('clearDataInStorage', () => {
//     cy.writeFile('cypress/fixtures/localSdata.json', {
//         'Important!':
//             'netscky says that this file should be empty before and after e2e tests https://www.youtube.com/watch?v=Q0oIoR9mLwc',
//         id_token: 'token',
//     });
//     cy.writeFile('cypress/fixtures/sessionSdata.json', {
//         'Important!':
//             'netscky says that this file should be empty before and after e2e tests https://www.youtube.com/watch?v=E2wuW6w8a_w',
//     });
// });
