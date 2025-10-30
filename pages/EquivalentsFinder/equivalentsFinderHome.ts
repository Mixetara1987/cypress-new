/// <reference types="cypress" />

export class EquivalentsFinder {
    static getTitleEquivalentsFinder() {
        return cy
            .get('.equivalent-finder-wrapper')
            .get('.module-header-title')
            .invoke('text');
    }

    static getSelectedProperty() {
        return cy
            .get('.tab-toggle-wrapper')
            .find('button.selected-properties-background');
    }

    static colorOfSelectedProperty() {
        return cy
            .get('div.tab-toggle-wrapper')
            .find('.selected-properties-background');
    }

    static getAllProperties() {
        cy.get('.form-group-wrapper');
        return cy
            .get('.tm-checkbox')
            .find('span')
            .then((property) => {
                return Cypress.$.makeArray(property).map(
                    (textProperty) => textProperty.textContent,
                );
            });
    }

    static mouseHoverToltipAndGetText(numberOfTooltip: number) {
        cy.get('.accordion-wrapper')
            .get('.module-split-content-tiles-content')
            .find('.module-header-help')
            .eq(numberOfTooltip)
            .trigger('mouseenter');
        return cy.get('ngb-tooltip-window').invoke('text');
    }

    static mouseHoverChemicalCompositionToltipAndGetText(
        numberOfTooltip: number,
    ) {
        cy.get('.accordion-wrapper')
            .get('.module-split-content-tiles-content')
            .find('.module-header-help')
            .eq(numberOfTooltip)
            .trigger('mouseenter');
        return cy.get('ngb-tooltip-window').invoke('text');
    }

    static getTextInAlertMessage() {
        return cy
            .get('material-search-results-table')
            .find('.alert.alert-warning')
            .then((messageAlert) => {
                const message = messageAlert.text();
                return message;
            });
    }

    static clickOnPropertyCheckbox(propertyToCheck: string) {
        cy.get('.form-group-wrapper')
            .find('label')
            .find('span')
            .then(($title) => {
                Cypress.$.makeArray($title)
                    .map((textTitlte) => textTitlte.textContent)
                    .forEach((property, index) => {
                        if (propertyToCheck === property) {
                            cy.get('.form-group-wrapper')
                                .find('label')
                                .find('span')
                                .eq(index)
                                .click();
                        }
                    });
            });
    }

    static isPresentFormGroupChemicalComposition() {
        return cy
            .get('.show-controls-and-list-wrapper')
            .find('.tm-filter-buttons-wrapper');
    }

    static getValueInValue() {
        return cy
            .get('.show-controls-and-list-wrapper')
            .find('.ng-value-container')
            .find('.ng-value-label')
            .invoke('text');
    }

    static clickOnValueDDlistAndGetAllThresholds() {
        const thresholds = [];
        return cy
            .get('.show-controls-and-list-wrapper')
            .find('#chemicalValueDropdown')
            .find('.ng-arrow-wrapper')
            .click()
            .get('ng-dropdown-panel')
            .find('.ng-option')
            .find('span')
            .each(($threshold) => {
                thresholds.push($threshold.text());
                cy.wrap(thresholds);
            });
    }

    static isSelectedActive() {
        return cy
            .get('.selected-properties-table-wrapper')
            .find('.selected-chemical-background');
    }

    static clickOnActiveSwitch() {
        //  cy.get('.tm-filter-buttons-wrapper')
        cy.get('.tm-switch-thumb').click();
    }

    static clickOnActiveSwitchForProperty(property: string) {
        cy.get('tr')
            .contains('td', property)
            .parent('tr')
            .find('.body-cell-active')
            .find('.tm-switch-thumb')
            .click();
    }

    static getColorOfContentForProperty(property: string) {
        return cy.get('tr').contains('td', property).parent('tr');
    }

    static getToastMessage() {
        return cy.get('.toast-message').invoke('text');
    }

    static isListPresent() {
        return cy.get('.search-results-table-wrapper');
    }

    static isPresentFormGroupMechanicalProperties() {
        return cy.get('div[formarrayname="mechanicalProperties"]');
    }

    static isPresentFormGroupPhysicalProperties() {
        return cy.get('div[formarrayname="physicalProperties"]');
    }

    static getTextInselectedPropertiesTable() {
        return cy
            .get('.selected-properties-table-wrapper')
            .find('.body-cell-property')
            .invoke('text');
    }

    // dodata
    static getTextInselectedPropertiesTableOptionTwo(index: number) {
        return cy
            .get('.selected-properties-table-wrapper')
            .find('table')
            .find('.body-cell-property')
            .eq(index)
            .invoke('text');
    }

    static isPresentSelectedPropertiesTableWrapper() {
        return cy.get('.selected-properties-table-wrapper');
    }

    static getValueInTemperatureDDL() {
        return cy
            .get('.body-cell-temperature')
            .find('.ng-value-label')
            .invoke('text');
    }

    static getValueInTypeDDL() {
        return cy.get('.body-cell-type').find('.ng-value-label').invoke('text');
    }

    static getValueInSensitivity() {
        return cy
            .get('.body-cell-sensitivity')
            .find('.ng-value-label')
            .invoke('text');
    }

    static clickOnOptionDDLType(optionInForm: string) {
        cy.get('#typeDropdown')
            .find('.select-wrapper')
            .click()
            .contains('.ng-option', `${optionInForm}`)
            .click();
    }

    static numberLists() {
        return cy.get('.selected-chemical-background');
    }

    static clickOnClearButtonX(property: string) {
        cy.contains('td', property)
            .parent('tr')
            .find('td.body-cell-remove')
            .find('.icon-clear')
            .click();
    }

    static clickOnOptionDDLSearchSensitivity(optionInForm: string) {
        cy.get('#sensitivityDropdown')
            .find('.select-wrapper')
            .click()
            .contains('.ng-option', `${optionInForm}`)
            .click();
    }

    static clickOnClearAll() {
        cy.contains('button', 'Clear all').should('be.enabled').click();
    }
}
export default new EquivalentsFinder();
