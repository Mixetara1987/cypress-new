/// <reference types="cypress" />

const materialDescTableRow = '.material-description-table-wrapper table tr';

export class PropertyTable {
    static getTextInHeaders() {
        return cy
            .get('.condition-details-table-row')
            .should('be.visible')
            .invoke('text');
    }

    static getNumberOfVisiblePropertyRows() {
        return cy
            .get('.custom-row-table')
            .find('tr')
            .then((numberOfPropertyRows) => {
                return numberOfPropertyRows.length;
            });
    }

    static getNumberOfVisiblePropertyRowsComposition() {
        return cy
            .get('.points-table.noBottomMargin')
            .find('.points-table-body')
            .then((numberOfPropertyRows) => {
                return numberOfPropertyRows.length;
            });
    }

    static getPropertyInRow(row: number) {
        return cy
            .contains('div', 'Property')
            .parentsUntil('.condition-details-table-body')
            .find('td.property-cell')
            .eq(row)
            .then((property) => {
                cy.wrap(property).invoke('text');
            });
    }

    static findSubstancePropertyByText(text: string) {
        return cy
            .get('app-substances-details tr')
            .should('be.visible')
            .contains('td', text)
            .then((property) => {
                cy.wrap(property).invoke('text');
            });
    }

    static getTemperatureValueInRow(row: number) {
        return cy
            .get('app-details-grid')
            .find('table.custom-row-table')
            .find('td.temperature-cell')
            .eq(row)
            .find('.mobile-table-value')
            .invoke('text');
    }

    static getAllTemperaturesInProperty(index: number) {
        return cy
            .get('app-grid-row')
            .eq(index)
            .should('be.visible')
            .find('.temperature-cell')
            .should('be.visible')
            .find('.mobile-table-value')
            .should('be.visible')
            .then((temperatureValue) => {
                return Cypress.$.makeArray(temperatureValue).map(
                    (textTemperatureValue) => textTemperatureValue.textContent,
                );
            });
    }

    static getAllTemperaturesInPropertyTable() {
        return cy
            .get('.custom-condition-wrapper')
            .find('.temperature-cell')
            .find('.mobile-table-value')
            .then((temperature) => {
                return Cypress.$.makeArray(temperature).map(
                    (textTemperature) => textTemperature.textContent,
                );
            });
    }

    static getNumericalValueInValuePropertyRow(property: string) {
        return cy
            .get('.condition-details-table-section')
            .contains('.property-cell', property)
            .parents('.custom-row-table')
            .find('td.value-cell')
            .find('.mobile-table-value')
            .first()
            .then(($value) => {
                return cy.wrap(parseInt($value.text(), 10));
            });
    }

    static getValuesInPropertyTableColumn(column: number) {
        cy.wait(1000);
        return cy
            .get('app-grid-row')
            .find('.mobile-table-value')
            .eq(column)
            .invoke('text');
    }

    static getValueInRow(row: number) {
        return cy
            .get('app-details-grid')
            .find('table.custom-row-table')
            .find('td.value-cell')
            .eq(row)
            .find('.mobile-table-value')
            .invoke('text');
    }

    // dodata
    static getUnitInRow(row: number) {
        return cy
            .get('app-details-grid')
            .find('table.custom-row-table')
            .find('td.unit-cell')
            .eq(row)
            .find('.mobile-table-value')
            .invoke('text');
    }

    static getNoteInRow(row: number) {
        return cy
            .get('app-details-grid')
            .find('table.custom-row-table')
            .find('td.note-cell')
            .eq(row)
            .find('.mobile-table-value')
            .invoke('text');
    }

    static getTextInAllGreyGridPropertyTable() {
        cy.wait(1500);
        return cy
            .get('.condition-wrapper.custom-condition-wrapper.ng-star-inserted')
            .find('.condition-details-table-section-header')
            .should('be.visible');
    }

    static getPropertiesInGreyRows() {
        return cy
            .get('.condition-details-table-section-header')
            .should('be.visible');
    }

    static getTextInFirstGreyGridPropertyTable() {
        cy.wait(1000);
        return cy
            .get('app-condition-details')
            .find('.condition-details-table-section-header')
            .eq(0);
    }

    //
    static getTextInGreyGridPropertyTable(index: number) {
        cy.wait(1000);
        return cy
            .get('app-condition-details')
            .find('.condition-details-table-section-header')
            .eq(index);
    }

    static getValueInPropertyTableColumn(column: number) {
        cy.wait(1500);
        return (
            cy
                .get('.app-property-multi-point-table-wrapper')
                .find('.property-cell')
                .eq(column)
                //   .find('.mobile-table-value').eq(column)
                .invoke('text')
        );
    }

    // dodata
    static getPropertyValuesInTableRow(name: string) {
        return cy.contains('.mobile-table-value', name).invoke('text');
    }

    static clickOnRadioButtonGroupBy(by: string) {
        cy.get('.group-by-wrapper')
            .should('exist')
            .and('be.visible')
            .contains('span', by)
            .should('exist')
            .and('be.visible')
            .click();
        // .parent('label.tm-radio').should('exist').and('be.visible').click();
    }

    static selectedRadioButtonGroupBy() {
        return cy
            .get('.group-by-wrapper')
            .find('label.tm-radio')
            .find('.icon-radio_button_checked')
            .parent('label')
            .find('.font-weight-bold')
            .invoke('text');
    }

    static clickOnViewDiagramLink(diagramname: string) {
        cy.get('.condition-details-table-body')
            .should('exist')
            .and('be.visible')
            .then((table) => {
                cy.wrap(table).realHover();
                cy.contains('.property-cell', diagramname)
                    .should('exist')
                    .parents('tr')
                    .find('.diagram-wrapper')
                    .find('span.open-diagram')
                    .should('be.visible')
                    .click();
            });
    }

    static clickOnViewDiagramLinkGroupByProperty(diagramname: string) {
        cy.wait(1000);
        cy.get('.condition-details-table-body')
            .contains('.condition-details-table-section', diagramname)
            .find('.open-diagram')
            .click({ force: true });
    }

    static clickOnViewDiagramLinkGroupByPropertyBookmark(diagramname: string) {
        cy.wait(1000);
        cy.get('.condition-details-table-body')
            .contains('.condition-details-table-section', diagramname)
            .find('.open-diagram')
            .eq(0)
            .click({ force: true });
    }

    static getAllValuesInPropertyRows() {
        cy.wait(1000);
        cy.get('.condition-details-table-body'); // .get('app-details-grid')
        return cy
            .get('.condition-details-table-section')
            .find('table.custom-row-table')
            .find('.property-cell')
            .should('be.visible');
        // .find('#0');
    }

    static mouseHoverToltipAndGetText() {
        cy.get('.tooltip-desktop-btn')
            .find('.icon-info')
            .first()
            .trigger('mouseenter');
        return cy.get('ngb-tooltip-window').invoke('text');
    }

    static mouseHoverToltipAndGetTextOptionTwo(index: number) {
        cy.get('.tooltip-desktop-btn')
            .find('.icon-info')
            .eq(index)
            .trigger('mouseenter');
        return cy.get('ngb-tooltip-window').invoke('text');
    }

    static mouseHoverToltipAndGetTextOptionThree() {
        cy.get('.selected-condition-body')
            .find('.icon-info')
            .trigger('mouseenter');
        return cy.get('ngb-tooltip-window').invoke('text');
    }

    static getTablePropertyCellText(value: string) {
        return cy
            .contains('table tr td', value)
            .should('be.visible')
            .invoke('text');
    }

    static getTablePropertyCellTooltipText(value: string) {
        return cy.contains('table tr td', value).realHover().invoke('text');
    }

    static findAndGetExemptionByName(name: string) {
        return cy
            .get('.custom-details-table')
            .should('be.visible')
            .contains('tr td', name)
            .invoke('text');
    }

    static findAndGetReferencesByName(name: string) {
        return cy
            .get('.elvs-reference-wrapper')
            .find('.custom-table-wrapper')
            .find('.custom-details-table')
            .contains('tr', name)
            .invoke('text');
    }

    static findColumnNameInTable(name: string) {
        return cy
            .get('.custom-table-header')
            .contains('th', name)
            .invoke('text');
    }

    static findPropertyNameInTable(name: string) {
        return cy
            .contains('.condition-details-table-body table tr', name)
            .find('.property-cell')
            .invoke('text');
    }

    static findNoteInTable(name: string) {
        return cy
            .contains('.condition-details-table-body table tr', name)
            .find('.note-cell')
            .invoke('text');
    }

    static findSourcePropertyInTable(name: string) {
        return cy
            .contains(materialDescTableRow, name)
            .find('.source-property')
            .invoke('text');
    }

    static findSourceValueInTable(name: string) {
        return cy
            .contains(materialDescTableRow, name)
            .find('.source-value')
            .invoke('text');
    }

    static findTemperatureInTable(name: string) {
        return cy
            .contains(materialDescTableRow, name)
            .find('.temperature-cell')
            .invoke('text');
    }

    static findInPropertyTableJoints(cell: string, name: string) {
        return cy
            .contains('app-property-multipoint-row', name)
            .should('be.visible')
            .find(`.${cell}-cell`)
            .invoke('text');
    }

    static findValueInTable(name: string) {
        return cy
            .contains(materialDescTableRow, name)
            .find('.value-cell')
            .invoke('text');
    }

    static findUnitInTable(name: string) {
        return cy
            .contains(materialDescTableRow, name)
            .find('.unit-cell')
            .invoke('text');
    }

    static findDataInTableCoatings(name: string) {
        return cy.get('table').contains('tr td', name).invoke('text');
    }

    static tableDataExist() {
        return (
            cy
                .get('.points-wrapper')
                // .find('td')
                .invoke('text')
        );
    }

    static isPropertyTablevisible() {
        return cy.get('app-condition-details');
    }

    static getValueInPropertyTableRow(name: string) {
        return cy
            .contains('.custom-row-table', name)
            .find('.property-cell')
            .invoke('text');
    }

    static getTableValues(value: string) {
        return cy
            .get('.points-table-body')
            .contains('tr td', value)
            .invoke('text');
    }
}
export default new PropertyTable();
