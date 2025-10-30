/// <reference types="cypress" />

export class CreepData {
    static getTextInDataTableHeaders() {
        return cy.get('table.custom-table-header').invoke('text');
    }

    static colorOfSelectedCondition() {
        // return cy.get('.selected-condition-body');
        return cy.get('.selected-row');
    }

    static colorOfSelectedTabButton() {
        return cy.get('.tm-tab-selected');
    }

    static getPropertiesInGreyRow() {
        return cy
            .get('.creep-view-content-wrapper')
            .find('.condition-details-table-body')
            .get('.condition-details-table-section-header');
    }

    static getValuesInTableRow(row: number) {
        return cy.get('.custom-row-table').find('tr').eq(row).invoke('text');
    }

    static getValueInDataTableRowColumn(row: number, column: number) {
        return cy
            .get('.custom-table-wrapper')
            .find('.custom-details-table')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(column)
            .invoke('text');
    }

    static mouseHoverToltipAndGetText(numberOfTooltip: number) {
        cy.get('.custom-table-header')
            .find('.icon-info')
            .eq(numberOfTooltip)
            .trigger('mouseenter');
        return cy.get('ngb-tooltip-window').invoke('text');
    }

    static moveMouseFromTooltip(numberOfTooltip: number) {
        cy.get('.custom-table-header')
            .find('.icon-info')
            .eq(numberOfTooltip)
            .trigger('mouseleave');
    }

    static clickOnLarsonMilerParameter() {
        cy.get('app-creep-condition-selector')
            .get('.tm-radio')
            .contains('span', 'Larson-Miller Parameter')
            .click();
    }

    // selected search criteria
    static selectedSearchCriteria() {
        return cy.get('.heading-box-criteria-text').invoke('text');
    }
}
export default new CreepData();
