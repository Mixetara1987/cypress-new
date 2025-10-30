/// <reference types="cypress" />
export class JointsPropertyTable {
    static clickOnCheckboxConditionForNonMetals(indexOfCondition: number) {
        return cy
            .get('.custom-grid-wrapper')
            .find('tr')
            .eq(indexOfCondition)
            .click();
    }

    static getPropertyTableTitle(row: number) {
        return cy
            .get('app-joints-properties')
            .eq(row)
            .find('.accordion-header')
            .find('.accordion-title')
            .should('be.visible')
            .invoke('text');
    }
}
export default new JointsPropertyTable();
