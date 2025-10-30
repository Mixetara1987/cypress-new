/// <reference types="cypress" />

export class Thermometer {
    static getAllTemperaturesInThermometer() {
        return cy.get('.temperature-table').find('.tm-checkbox');
    }

    static getAllTemperatures() {
        return cy
            .get('.temperature-table')
            .find('.tm-checkbox')
            .then((temperature) => {
                return Cypress.$.makeArray(temperature).map(
                    (textTemperature) => textTemperature.textContent,
                );
            });
    }

    static getDisabledTemperaturesInThermometer() {
        return cy
            .get('.temperature-table')
            .find('.tm-checkbox')
            .find('[type="checkbox"][disabled]')
            .parents('.temperature-value-wrapper')
            .find('.temperature-value');
    }

    static getTemperature(index: number) {
        cy.get('.temperature-table-wrapper');
        cy.get('.temperature-table').find('.tm-checkbox').should('be.visible');
        return cy
            .get('.temperature-table')
            .find('.tm-checkbox')
            .find('.form-control')
            .eq(index)
            .should('exist');
    }

    static getTemperatureValue(index: number) {
        return cy
            .get('.temperature-table')
            .find('.tm-checkbox')
            .eq(index)
            .find('.temperature-value')
            .invoke('text');
    }

    static clickOnTemperature(indexOfTemperatureRange: number) {
        cy.get('.temperature-table')
            .should('exist')
            .find('.tm-checkbox')
            .eq(indexOfTemperatureRange)
            .should('be.visible')
            .click();
    }

    static getNumbersOfTemperatures() {
        return cy.get('.temperature-table').find('.tm-checkbox');
    }

    static clickOnCheckboxForTemperature(temperature: string[]) {
        cy.get('.temperature-table').should('exist').and('be.visible');
        let i: number;
        for (i = 0; i < temperature.length; i++) {
            cy.contains('span', temperature[i])
                .parent('label')
                .should('be.visible')
                .click();
        }
    }

    static getTemperatureState(temperature: string) {
        // cy.get('.temperature-table').should('exist');
        return cy
            .get('.temperature-table')
            .should('exist')
            .and('be.visible')
            .contains('span', temperature)
            .parent('label')
            .should('be.visible')
            .find('input[type="checkbox"]');
    }

    static selectAllTeperatures() {
        Thermometer.getNumbersOfTemperatures().then((temperatures) => {
            const numberofTemperatures = temperatures.length;
            let indexOfTemperatureRange = 0;
            for (
                indexOfTemperatureRange = 0;
                indexOfTemperatureRange < numberofTemperatures;
                indexOfTemperatureRange++
            ) {
                let $temperature = Cypress.$('.temperature-table')
                    .find('.tm-checkbox')
                    .find('input[type="checkbox"]')
                    .eq(indexOfTemperatureRange);
                if ($temperature.prop('checked') === false) {
                    cy.get('.temperature-table')
                        .should('exist')
                        .find('.tm-checkbox')
                        .should('be.visible')
                        .eq(indexOfTemperatureRange)
                        .should('be.visible')
                        .click();
                }
            }
        });
    }
}

export default new Thermometer();
