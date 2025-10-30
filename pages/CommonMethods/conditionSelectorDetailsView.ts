/// <reference types="cypress" />

export class ConditionsSelectorDetailsView {
    static getThermometerTitle() {
        return cy
            .get('.accordion-body')
            .find('.box-title')
            .eq(0)
            .invoke('text');
    }

    static getMediumTitle() {
        return cy
            .get('.accordion-body')
            .find('.box-title')
            .eq(1)
            .invoke('text');
    }

    static getParametersInSelectedConditionRow() {
        return cy.get('tr.selected-row').find('b');
    }

    // dodata
    static getSelectedTextInConditions() {
        return cy.get('tr.selected-row');
    }

    static getSelectedTextInConditionBox() {
        return cy.get('.selected-condition-body');
    }

    static clickOnCheckboxCondition(indexOfCondition: number) {
        return cy
            .get('.table-cell-checkbox')
            .eq(indexOfCondition)
            .should('exist')
            .click();
    }

    static findAndClickConditionByName(name: string) {
        return cy
            .get('table tr td.table-cell-text')
            .contains('label', name)
            .parent()
            .parent()
            .find('td.table-cell-checkbox')
            .should('be.visible')
            .click({ force: true });
    }

    static clickOnCheckboxConditionWithText(conditionText: string) {
        cy.get('.custom-grid-wrapper')
            .find('tbody')
            .contains('label', conditionText)
            .click();
    }

    static getNumbersOfConditions() {
        return cy
            .get('.table-header')
            .get('.conditions-wrapper')
            .find('span.table-header-cell-text')
            .invoke('text');
    }

    static checkNumbersOfConditions() {
        return cy.get('.table-header').get('.conditions-wrapper');
    }

    static getNumberOfResults() {
        return cy.get('.counter').invoke('text');
    }

    static getAllConditionsInConditionSelector() {
        return cy.get('.table-wrapper').find('.table-cell-text').invoke('text');
    }

    static getConditionInRow(rowIndex: number) {
        return cy.get('.table-cell-text').eq(rowIndex).invoke('text');
    }

    static clickOnCheckboxAllCondition() {
        // cy.get('.table-header-cell-checkbox').click();
        cy.get(
            '.table-header-cell-checkbox > .tm-checkbox > .table-checkbox',
        ).click();
    }

    static conditionCheckboxIsSelected(indexOfCondition: number) {
        return cy.get('.table-cell-checkbox').eq(indexOfCondition).parent('tr');
    }

    // dodata
    static getDefaultCondition() {
        return cy.get('.selected-condition-body').find('dd').invoke('text');
    }

    // dodata
    static getTextSelectedInCondition() {
        return cy.get('.selected-condition-body').find('dl').invoke('text');
    }

    static scrollDownConditios() {
        cy.get('.cdk-virtual-scroll-viewport').scrollTo('bottom');
    }

    // dodata
    static getDdlListOfResult(indexOfResult: number) {
        return cy
            .get('material-search-results-table')
            .get('.grid-tools-wrapper')
            .eq(indexOfResult)
            .get('.results')
            .invoke('text');
    }

    static checkIfConditionIsSelected(rowindex: number) {
        return cy
            .get('.table-wrapper')
            .find('tr')
            .find('.ng-star-inserted')
            .eq(rowindex)
            .invoke('text');
    }

    // dodata
    static checkNumbersOfConditionsInExporter() {
        return cy
            .get('.table-header')
            .get('.table-header-cell-label')
            .find('.table-header-cell-text')
            .invoke('text');
    }
}

export default new ConditionsSelectorDetailsView();
