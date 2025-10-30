/// <reference types="cypress" />

export class TotalSearchHomePage {
    static clickOnMetricImperialUnits() {
        cy.get('app-header')
            .find('.header-tools-wrapper')
            .get('.slider')
            .eq(0)
            .click();
    }

    static clickOnMaterialConsole() {
        cy.get('.navbar-nav').eq(1);
        cy.contains('span', 'Material Console').should('be.visible').click();
        cy.get('h1').should('have.text', ' Material List Builder ');
    }

    static clickOnMyConsoleTab() {
        cy.contains('.nav-item', 'My Console').click();
    }

    static clickOnCompliance() {
        cy.get('.navbar-nav').eq(1);
        cy.contains('span', 'Compliance')
            .should('be.visible')
            .click({ force: true });
    }

    static clickOnExtendedRange() {
        cy.get('.navbar-nav').eq(1);
        cy.contains('span', 'Extended Range')
            .should('be.visible')
            .click({ force: true });
    }

    static clickOnDataPlus() {
        cy.get('.navbar-nav').eq(1);
        cy.contains('span', 'Data Plus')
            .should('be.visible')
            .click({ force: true });
    }

    static clickOnEnviro() {
        cy.get('.navbar-nav').eq(1);
        cy.contains('span', 'Enviro')
            .should('be.visible')
            .click({ force: true });
    }

    static clickOnAlternativeSupliers() {
        cy.get('.navbar-nav').eq(1);
        cy.contains('a', ' Alternative Suppliers ')
            .should('be.visible')
            .click({ force: true });
    }

    static clickOnAdvancedSearch() {
        cy.contains('.nav-item', 'Advanced Search').click();
    }

    static clickOnStandardList() {
        cy.contains('.nav-item', 'Standard list').click();
    }

    static clickOnMaterialDiscovery() {
        cy.contains('.nav-item', 'Material Discovery').click();
    }

    static clickOnDimensions() {
        cy.contains('.nav-item', 'Dimensions').click();
    }

    static clickOnCoatings() {
        cy.contains('.nav-item', 'Coatings').click();
    }

    static clickOnTribology() {
        cy.contains('.nav-item', 'Tribology').click();
    }

    static clickOnLubricants() {
        cy.contains('.nav-item', 'Lubricants').click();
    }

    static clickOnAgeing() {
        cy.contains('.nav-item', 'Ageing').click();
    }

    static clickOnWeatherability() {
        cy.contains('.nav-item', 'Weatherability').click();
    }

    static clickOnIrradiation() {
        cy.contains('.nav-item', 'Irradiation').click();
    }

    static clickOnFractureMechanics() {
        cy.contains('.nav-item', 'Fracture Mechanics').click();
    }

    static clickOnLeftArrowBack() {
        Cypress.on('uncaught:exception', () => {
            return false;
        });
        cy.get('.history-back-wrapper')
            .find('i.icon-arrow_back')
            .parent('button')
            .realHover()
            .click();
    }

    // dodata
    static clickOnExporter() {
        cy.get('.navbar-nav')
            .eq(0)
            // cy.contains('span', 'Exporter').should('be.visible').click({ force: true })
            .contains(new RegExp('Exporter'))
            .click({ force: true });
    }

    static clickOnTracker() {
        cy.get('.navbar-nav').eq(1);
        cy.contains('span', 'Tracker')
            .should('be.visible')
            .click({ force: true });
        cy.url().should('contain', '/tracker/tracker-data');
    }

    static clickOnTotalSearch() {
        cy.get('.navbar-nav');
        cy.contains('span', 'Total Search').click();
    }

    static clickOnPredictor() {
        cy.get('.navbar-nav');
        cy.contains('span', 'Predictor').click({ force: true });
    }

    //

    static clickOnLogo() {
        cy.get('.logo-wrapper').click();
    }
}

export default new TotalSearchHomePage();
