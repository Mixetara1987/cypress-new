export class Formability {
    static sourceTreeExist() {
        cy.get('.temperature-table');
        return cy.get('.box');
    }

    static getAllTemperaturesRange() {
        const temperature = [];
        return cy
            .get('.temperature-table')
            .find('.tm-checkbox')
            .each(($X) => {
                temperature.push(parseInt($X.text(), 10));
                return cy.wrap(temperature);
            });
    }

    static getTextInReference(row: number) {
        return cy.get('.custom-table-sub-header').eq(row).invoke('text');
    }

    static getPropertyNameInRow(numberOfTable: number) {
        return cy
            .get('.extended-range')
            .find('.property-cell-right')
            .eq(numberOfTable)
            .invoke('text');
    }

    static getPropertyValuesInTableRow(columnNumber: number) {
        return cy
            .get('.custom-table-wrapper')
            .find('tr')
            .eq(columnNumber)
            .find('td')
            .invoke('text');
    }

    static propertyTableForBendability() {
        return cy.get('.custom-table-wrapper');
    }

    static getTextInReferenceOnRfactorsTab(row: number) {
        return cy
            .get('.custom-table-header.custom-table-header-gray')
            .eq(row)
            .invoke('text');
    }

    static getPropertyValuesInTableRowRFactor(columnNumber: number) {
        return cy
            .get('.custom-table-wrapper')
            .find('tr')
            .eq(columnNumber)
            .find('.width-30')
            .invoke('text');
    }

    static checkbox(index: number) {
        return cy
            .get('ul.jqx-tree-dropdown-root')
            .get('.jqx-tree-item-li')
            .find('.jqx-checkbox-default')
            .find('span')
            .eq(index);
    }

    static diagramAndTableDataExist() {
        return cy.get('.diagram-wrapper').invoke('text');
    }
}
export default new Formability();
