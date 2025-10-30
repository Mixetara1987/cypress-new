export class Machinability {
    static navigateToMaterial(materialId) {
        cy.visit(`en/search/quick/materials/${materialId}/machinability`);
    }

    static getTextInReference(rowIndex: number) {
        return cy
            .get(`div[row-id="${rowIndex}"]`)
            .find('.ag-cell-value')
            .find('app-machinabilitycellrender')
            .invoke('text');
    }

    static getValueInReference(rowIndex: number) {
        return cy.get(`div[row-id="${rowIndex}"]`).invoke('text');
    }

    static getReferencesTitle() {
        return cy.get('.reference-list-wrapper').find('h4').invoke('text');
    }

    static getTextInReferences() {
        return cy.get('.reference-list-item').invoke('text');
    }

    static getListOfResultsFound(indexOfResult: number) {
        return cy
            .get('material-search-results-table')
            .get('.grid-tools-wrapper')
            .eq(indexOfResult)
            .get('.results')
            .invoke('text');
    }
}
export default new Machinability();
