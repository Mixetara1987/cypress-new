const parent = '.analytics-search-selector';
const axisTitle = 'label.axis-label';

export class ComparisonByAnalytics {
    static getTitlesForXandYaxis() {
        return cy.get(axisTitle);
    }

    static getAllPropertiesInDDlFor(axis: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .find('.form-group')
            .eq(0)
            .find('.ng-arrow-wrapper')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .should('be.visible')
            .then((property) => {
                return Cypress.$.makeArray(property).map(
                    (textProperty) => textProperty.textContent,
                );
            });
    }

    static getAllItemsInTypeOptionforAxis(axis: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .find('.type-range-holder')
            .find('.ng-arrow-wrapper')
            .eq(0)
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .invoke('text');
    }

    static getAllItemsInTemperatureOptionForAxis(axis: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .find('.type-range-holder')
            .find('.ng-arrow-wrapper')
            .eq(1)
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option-label')
            .invoke('text');
    }

    static selectPropertyOnAxis(axis: string, ddlItem: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .find('.form-group')
            .find('.ng-arrow-wrapper')
            .eq(0)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', ddlItem)
            .click();
    }

    static getSelectedTextInDDLFor(axis: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .find('.ng-value-container')
            .find('.ng-value');
    }

    static getTypeListFor(axis: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .find('.type-range-holder')
            .find('ng-select')
            .eq(0);
    }

    static getTemperatureListFor(axis: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .find('.type-range-holder')
            .should('be.visible')
            .find('ng-select')
            .eq(1)
            .should('be.visible');
    }

    static getFromFor(axis: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .contains('label', 'From')
            .siblings('input');
    }

    static getToFor(axis: string) {
        return cy
            .contains(axisTitle, axis)
            .parent(parent)
            .contains('label', 'To')
            .siblings('input');
    }

    static getTextInPopup() {
        cy.get('.toast-container').invoke('width').should('be.greaterThan', 10);
        cy.get('.toast-container')
            .invoke('height')
            .should('be.greaterThan', 10);
        return cy
            .get('.toast-container')
            .should('be.visible')
            .then((message) => {
                return message.text();
            });
    }

    static getDisplayMaterialsPoints() {
        return cy
            .get('.display-material-holder')
            .contains('span', 'Points')
            .parents('label')
            .find('input')
            .invoke('prop', 'checked');
    }

    static getDisplayMaterialsRectangles() {
        return cy
            .get('.display-material-holder')
            .contains('span', 'Rectangles')
            .parents('label')
            .find('input')
            .invoke('prop', 'checked');
    }

    static clickOnClear() {
        cy.get(
            '.analytics-selector-wrapper > .tm-filter-buttons-wrapper > :nth-child(2)',
        ).click();
    }

    static clickOnShowResults() {
        cy.contains('button', ' Show results ').click();
    }
}
export default new ComparisonByAnalytics();
