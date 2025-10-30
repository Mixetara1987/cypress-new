/// <reference types="cypress" />

export class FatigueDataDiagram {
    static radioButtonName(radioButtonNumber: number) {
        return cy
            .get('.diagram-form-holder')
            .find('.tm-radio')
            .eq(radioButtonNumber)
            .invoke('text');
    }

    static isRadioButtonSelected(type: string) {
        return cy
            .get('.diagram-form-holder')
            .contains('label', `${type}`)
            .find('.form-control');
    }

    static isRadioButtonVisible(type: string) {
        return cy
            .get('.diagram-form-holder')
            .find('.group-by-wrapper')
            .contains('.ng-star-inserted', `${type}`)
            .find('label');
    }

    static clickOnRadioButtonDisplay(type: string) {
        cy.get('.diagram-form-holder')
            .contains('label.tm-radio', `${type}`)
            .click();
    }

    static selectConfidenceBand(value: string) {
        cy.get('select').select(value);
    }

    static inDiagramTableSelect(option: string) {
        cy.get('.grid-box')
            .find('.select-temperature-wrapper')
            .find('.ng-select-container')
            .contains('.ng-placeholder', 'Select temperature')
            .parents('.ng-select-container')
            .click();
        cy.get(`[title="${option}"]`).click();
    }

    static getValuesInConfidenceBandDDList() {
        const options = [];
        return cy
            .get('.select-confidence-band')
            .find('option')
            .each(($X) => {
                options.push(parseInt($X.text(), 10));
                return cy.wrap(options);
            });
    }

    static getTitleOnX() {
        return cy.get('.g-xtitle').invoke('text');
    }

    static getTitleOnY() {
        return cy.get('svg').find('.g-ytitle').invoke('text');
    }

    static getTableHeaderResize() {
        cy.get('.diagram-wrapper');
        return cy
            .get('.ag-header-row')
            .find('.ag-header-cell')
            .find('.ag-header-cell-label')
            .invoke('text');
    }

    static getTableHeader() {
        cy.get('.diagram-wrapper');
        return cy.get('.points-table-header-cell').invoke('text');
    }

    static getTableValues(row: number, column: number) {
        return cy
            .get('.points-table-body')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(column)
            .invoke('text');
    }

    static getTableValuesResize(row: number, column: number) {
        return cy
            .get('.points-wrapper')
            .find('.ag-center-cols-container')
            .find(`[row-id="${row}"]`)
            .find(`[aria-colindex="${column}"]`)
            .invoke('text');
    }

    static getValuesInTableRow(row: number) {
        const pointsData = [];
        return cy
            .get('.diagram-wrapper')
            .find('.grid-box')
            .find('.points-wrapper')
            .find('table')
            .find('tr')
            .eq(row)
            .find('td')
            .each(($X) => {
                pointsData.push(parseInt($X.text(), 10));
                return cy.wrap(pointsData);
            });
    }

    static getRunout() {
        return cy.get('.runout-holder').find('span');
    }
}
export default new FatigueDataDiagram();
