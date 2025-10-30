/// <reference types="cypress" />

export class FatigueDataHomePage {
    static clickOnFatigueData() {
        cy.contains('.nav-item', 'Fatigue Data').click();
    }

    static getSelectedTextInType() {
        return cy
            .get('.accordion-body')
            .find('.column-2')
            .find('.filter-wrapper')
            .eq(3)
            .find('span.ng-value-label');
    }

    static getSelectedTextInDDLHeatTreatmentMaterialProcessing() {
        return cy
            .contains('label', 'Heat Treatment / Material Processing')
            .parent('div')
            .find('button')
            .find('span')
            .invoke('text');
    }

    static getSelectedTextInDDLForm() {
        return cy
            .contains('label', 'Form')
            .parent('div')
            .find('span')
            .then((selectedText) => {
                return selectedText.text();
            });
    }

    static selectPropertyType(property: string) {
        cy.get('.dropdown-filters')
            .get('#searchDropdown')
            .click()
            .find('.ng-dropdown-panel')
            .contains('.ng-option', property)
            .click();
    }

    static selectedSearchCriteria() {
        return cy
            .get('.heading-box-criteria-text')
            .should('be.visible')
            .and('not.be.empty')
            .invoke('text');
    }
}
export default new FatigueDataHomePage();
