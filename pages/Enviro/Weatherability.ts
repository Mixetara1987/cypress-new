export class Weatherability {
    static navigateWeatherabiltySearchPage() {
        cy.visit(`en/enviro/weatherability`);
        cy.intercept('GET', '**/weatherability/search/filters').as(
            'searchFilters',
        );
        cy.wait('@searchFilters', { timeout: 10000 }).then(() => {
            cy.get('[data-qa="standardDropdown"]');
        });
    }

    static getTextSelectedInCondition() {
        return cy.get('.selected-condition-body').invoke('text');
    }

    static getTextForSelectedWeatherabilityType(index: number) {
        return cy
            .get('#searchDropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .get('.ng-value')
            .eq(index)
            .find('.ng-value-label')
            .invoke('text');
    }

    static getTextForSelectedWeatherabilityType1() {
        return cy.get('#searchDropdown').invoke('text');
    }

    static getItemsListInForWeatherabilityDDL(index: number, index1: number) {
        cy.get('#searchDropdown').eq(index).click();
        return cy
            .get('.searchable-dropdown')
            .find('ng-dropdown-panel')
            .eq(index1)
            .find('.ng-dropdown-panel-items')
            .then((item) => {
                return Cypress.$.makeArray(item).map(
                    (textItem) => textItem.textContent,
                );
            });
    }
}
export default new Weatherability();
