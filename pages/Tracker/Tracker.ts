export class Tracker {
    static clickOnTracker() {
        cy.contains('a', 'Tracker').click();
    }

    static navigateToMaterial(materialId: number) {
        cy.visit(`en/search/quick/materials/${materialId}/tracker`);
    }

    static navigateToTrackerSearchPage() {
        cy.visit(`en/tracker/tracker-data`);
    }

    static getColumnHeadersOptionOne() {
        return cy
            .get('.tracker-layout1-wrapper')
            .find('table')
            .find('thead')
            .find('tr')
            .find('th')
            .should('be.visible')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getColumnHeadersManufactoring(index: number) {
        return cy
            .get('.tracker-layout1-wrapper')
            .find('table')
            .eq(index)
            .find('thead')
            .find('tr')
            .find('th')
            .should('be.visible')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getColumnHeadersTrackerOptionTwo() {
        return cy
            .get('.tracker-layout2-wrapper')
            .find('table')
            .get('thead')
            .find('tr')
            .find('th')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getTextInReference(row: number) {
        return cy
            .get('table')
            .find('tbody')
            .find('.ng-star-inserted')
            .eq(row)
            .find('.condition')
            .find('span')
            .invoke('text');
    }

    static getTextInReference1(row: number) {
        return cy
            .get('table')
            .find('tbody')
            .find('.ng-star-inserted')
            .find('.condition')
            .eq(row)
            .should('exist')
            .and('be.visible')
            .contains('span', 'Reference: ')
            .invoke('text');
    }

    static getTableReference() {
        return cy
            .get('.ng-star-inserted')
            .find('.condition')
            .contains('b', 'Reference: ');
    }

    static getPropertyValue(value: string) {
        return cy
            .get('table')
            .find('tbody')
            .contains('tr td', value)
            .invoke('text');
    }

    static getUpdateDDL() {
        return cy
            .get('.ng-select-container')
            .find('.ng-value-label')
            .invoke('text');
    }

    static getRFactorsTableTitle() {
        return cy.get('.tracker-layout2-wrapper').find('.group').invoke('text');
    }

    static visibilityOfUpdateAndPropertyGroupDDL(index: number) {
        return cy
            .get('.column-3.dropdown-filters')
            .find('.filter-wrapper')
            .eq(index);
    }

    static getSelectedOptionForUpdateAndPropertyGroupDDL(index: number) {
        return cy
            .get('.form-group')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .get('.ng-placeholder')
            .eq(index);
    }

    static getTrackerTabContent(index: number) {
        return cy
            .get('.module-split-content-tiles')
            .find('nav')
            .find('ul')
            .find('li')
            .eq(index)
            .find('.tile-body')
            .find('.tile-body-content')
            .invoke('text');
    }

    static getPropertyValueInTable(table: string, row: number, index: number) {
        return cy
            .get('table')
            .contains('span', table)
            .parents('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(index)
            .invoke('text');
    }

    static enterTextInPropertyGroupDDl(designation: string) {
        cy.get(
            ':nth-child(2) > .form-group > .ng-select > .ng-select-container',
        )
            .click()
            .clear()
            .type(designation);
    }
}
export default new Tracker();
