export class ManufacturingProcesses {
    static getTextInGreyGridPropertyTable() {
        cy.wait(1000);
        return cy.get('.custom-table-sub-header').find('p.reference-title');
    }

    static getReferencesInpropertyTable() {
        cy.wait(1000);
        return cy.get('.custom-table-sub-header').find('span');
    }

    static rowWithReferences() {
        return cy.get('.custom-table-sub-header');
    }

    static getTemperatureValueInRow(row: number) {
        return cy.get('.custom-details-table').find('tr').eq(row).find('td');
    }

    static getTextInReferencesBellowPropertyTable() {
        return cy.get('.reference-list-text');
    }
}
export default new ManufacturingProcesses();
