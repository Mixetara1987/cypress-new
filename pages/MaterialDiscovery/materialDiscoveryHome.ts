export class MaterialDiscoveryHome {
    static getTitle() {
        return cy.get('.module-header-title');
    }

    static getTitlesAboveXDDLs() {
        return cy.get('.axis-label').invoke('text');
    }

    static getTtlesForRanges() {
        return cy.get('.input-wrapper').find('label');
    }

    static getSelectedTemperatureFor(axis: string) {
        return cy
            .contains('label', axis)
            .parent('div')
            .find('span.ng-value-label')
            .should('be.visible');
    }

    static getPropertiesInDDLFor(axis: string) {
        return cy
            .contains('label', axis)
            .parent('div')
            .find('.form-group')
            .eq(0)
            .click()
            .get('.ng-dropdown-panel-items', { timeout: 6000 })
            .should('be.visible')
            .find('.ng-option')
            .should('be.visible')
            .then((property) => {
                return Cypress.$.makeArray(property).map(
                    (textproperty) => textproperty.textContent,
                );
            });
    }

    static getSelectedPropertyInDDL(axis: string) {
        return cy
            .get('.axis-filter-wrapper')
            .contains('.axis-label', axis)
            .parent('.axis-filter-wrapper')
            .find('.ng-value')
            .eq(0)
            .invoke('text');
    }

    static getTemperaturesInDDLFor(axis: string) {
        return cy
            .contains('label', axis)
            .parent('div')
            .find('.form-group')
            .eq(1)
            .click()
            .wait(600)
            .find('.ng-dropdown-panel-items')
            .should('be.visible')
            .find('.ng-option')
            .should('be.visible')
            .then((temperature) => {
                return Cypress.$.makeArray(temperature).map(
                    (texttemperature) => texttemperature.textContent,
                );
            });
    }

    static enterInRangeFromToForAxis(
        axis: string,
        label: string,
        value: string,
    ) {
        cy.contains('.axis-label', `${axis}` + '-axis:')
            .parent('.axis-filter-wrapper')
            .find('.input-group-wrapper')
            .contains('label', label)
            .siblings('input[type="text"]')
            .clear()
            .type(value);
    }

    static getSelectedRangeFromToForAxis(axis: string, label: string) {
        return cy
            .contains('.axis-label', `${axis}` + '-axis:')
            .parent('.axis-filter-wrapper')
            .find('.input-group-wrapper')
            .contains('label', label)
            .siblings('input[type="text"]')
            .invoke('prop', 'value');
    }

    static selectXAxisProperty(option: string) {
        cy.get('.axis-filter-wrapper .form-group')
            .eq(0)
            .click()
            .get('[role="option"]')
            .find(`div[title="${option}"]`)
            .click();
    }

    static selectYAxisProperty(option: string) {
        cy.get('.axis-filter-wrapper .form-group')
            .eq(2)
            .click()
            .get('[role="option"]')
            .find(`div[title="${option}"]`)
            .click();
    }

    static clickOnLogSwitch(index: number) {
        cy.get('.input-group-wrapper')
            .eq(index)
            .contains('span', 'Log')
            .parent('.radio-group')
            .find('.tm-switch')
            .click();
    }

    static clickOnShowResults() {
        cy.get('.tm-filter-button-submit').click();
    }

    static getTextInCriteriaItem(index: number) {
        return cy.get('.criteria-item').find('button').eq(index);
    }

    static getAlertMessage() {
        return cy.get('#toast-container').invoke('text');
    }
}
export default new MaterialDiscoveryHome();
