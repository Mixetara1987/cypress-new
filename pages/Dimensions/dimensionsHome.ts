/// <reference types="cypress" />

export class Dimensions {
    static getNumberOfTables() {
        return cy.get('.dimension-table-name');
    }

    static gettextInTooltip() {
        return cy
            .get('.module-header-help')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .should('be.visible')
            .invoke('text');
    }

    static enterStandardNumber(standardNumber: string) {
        cy.contains('label', 'Standard Number')
            .siblings('input')
            .clear()
            .type(standardNumber);
    }

    static getSelectedStandardNumber() {
        return cy
            .contains('label', 'Standard Number')
            .should('be.visible')
            .siblings('.form-control')
            .invoke('prop', 'value');
    }

    static getHeaderTextInReferencesTable() {
        return cy.get('.table-header-cell-label').invoke('text');
    }

    static getSelectedReferences() {
        return cy
            .get('.conditions-wrapper')
            .find('.table-wrapper')
            .find('.selected-row');
    }

    static colorOfSelectedCondition() {
        return cy.get('.selected-condition-body');
    }

    static clickOnAllReferencesCheckbox() {
        cy.get('.table-header-cell-checkbox')
            .find('label')
            .find('.icon-check_box_outline_blank')
            .click();
    }

    static getTextInSelectedReferencesTable() {
        return cy.get('.selected-condition-body').find('dd');
    }

    static getNameOfPropertyTable(tableIndex: number) {
        return cy
            .get('.dimension-material-content')
            .find('.dimension-table-name')
            .eq(tableIndex)
            .invoke('text');
    }

    static getHeaderTextInTable(tableIndex: number) {
        return cy
            .get('.dimension-material-content')
            .find('.dimensions-table')
            .eq(tableIndex)
            .find('.dimensions-table-header');
        // .invoke('text')
    }

    static getTitleNotes() {
        return cy.get('.dimension-table-notes').invoke('text');
    }

    static getValueInTableRowColumn(
        table: number,
        row: number,
        column: number,
    ) {
        return cy
            .get('.dimensions-table')
            .eq(table)
            .find('tr')
            .eq(row)
            .find('td')
            .eq(column)
            .invoke('text');
    }

    static getTitlesInconditionsTable() {
        return cy.get('.selected-condition-body').find('dt').invoke('text');
    }

    // Dimensions & Tolerances Home Page

    static getTitlesAboveFilters() {
        cy.get('label.title').should('exist').should('be.visible');
        cy.wait(500);
        return cy
            .get('.accordion-body')
            .should('exist')
            .and('be.visible')
            .find('label.title')
            .as('dimensions')
            .get('@dimensions')
            .should('be.visible')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }
}
export default new Dimensions();
