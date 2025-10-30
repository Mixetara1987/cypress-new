export class ComparisonByProperties {
    static checkForVisibilityOfButtonSearch() {
        return cy
            .get('.property-comparison-selector-content')
            .find('button')
            .find('span')
            .invoke('text');
    }

    static checkForVisibilityOfTextInDDL() {
        return cy
            .get('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-placeholder')
            .invoke('text');
    }

    static getAllPropertiesInDDl() {
        return cy
            .get('.ng-select-container')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static selectProperty(ddlItem: string) {
        cy.get('.ng-select-container')
            .eq(0)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', ddlItem)
            .click();
    }

    static selectType(type: string) {
        cy.get('#valueTypeDropdown')
            .find('.icon-keyboard_arrow_down')
            .click()
            .get('[aria-labelledby="valueTypeDropdown"]')
            .contains('.dropdown-item ', type)
            .click();
    }

    static getAlertForMaxSelectedProperty() {
        return cy.get('#toast-container').invoke('text');
    }

    // property body
    static propertyComparisonBody() {
        return cy.get('.properties-comparison-body');
    }

    static customSelectedPropertyBody() {
        return cy.get('.custom-details-table').find('tr');
    }

    static getSelectedProperty(row: number) {
        return cy.get('tbody').find('tr').eq(row).find('td').eq(0);
    }

    static getSelected(row: number, column: number) {
        return cy
            .get('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(column)
            .find('button')
            .find('span');
    }

    static getAllTemperatureValuesInProperty(row: number) {
        const options = [];
        return cy
            .get('#unitDropdown')
            .eq(row)
            .click()
            .get('[aria-labelledby="unitDropdown"]')
            .find('.dropdown-item')
            .each(($option) => {
                options.push($option.text());
                cy.wrap(options);
            });
    }

    static clickOnRemoveFromComparison(row: number) {
        cy.get('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(3)
            .find('button')
            .find('i')
            .click();
    }
    // property body
}
export default new ComparisonByProperties();
