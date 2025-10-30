export class Ageing {
    static navigateAgeingSearchPage() {
        cy.visit(`en/enviro/ageing/time-temperature-dependency`);
        cy.intercept('GET', '**/search/filters').as('searchFilters');
        cy.wait('@searchFilters', { timeout: 10000 }).then(() => {
            cy.get('[data-qa="standardDropdown"]');
        });
    }

    static clickOnDDlTemperatures(temperature: string) {
        cy.contains('.form-group-wrapper .form-group-4', 'Exposure Temperature')
            .click()
            .find(`[title="${temperature}"]`)
            .click();
    }

    static clickOnDDl(nameofDDl: string, value: string) {
        cy.contains('.form-group-wrapper .form-group-4', `${nameofDDl}`)
            .click()
            .find(`div[title="${value}"]`)
            .click();
    }

    static areConditionFiltersVisible(index: number) {
        return cy.get('.form-group').eq(index);
    }

    static mouseHoverTooltipAndGetText(index: number) {
        cy.get('.selected-condition-body')
            .get('dd')
            .eq(index)
            .find('.icon-info')
            .trigger('mouseenter');
        return cy.get('.tooltip').invoke('text');
    }

    static checkForPreselectedValues(index: number) {
        return cy
            .get('.form-group-wrapper')
            .find('.form-group-4')
            .eq(index)
            .find('.searchable-dropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-value')
            .find('.ng-value-label')
            .invoke('text');
    }

    static visibleExposureTemperatureMediumConcentration() {
        return cy.get('#searchDropdown');
    }

    static getSelectedOptionForExposureTemperature() {
        return cy
            .get('#searchDropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .get('.ng-placeholder');
    }
}
export default new Ageing();
