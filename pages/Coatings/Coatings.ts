export class Coatings {
    static navigateTo() {
        cy.visit('en/data-plus/coatings');
        cy.intercept('GET', '*/coatings/search/filters').as('searchFilters');
        cy.wait('@searchFilters', { timeout: 10000 }).then(() => {
            cy.get('multiselect-tree');
        });
    }

    static getTitleofNotes() {
        return cy.get('.coatings-table-notes').invoke('text');
    }

    static getTitleOfPropertyTable(column: number) {
        return cy.get('.coatings-table-name').eq(column).invoke('text');
    }

    static getValuesInTable(numberOfTable: number, columnNumber: number) {
        return cy
            .get('.coatings-table-wrapper')
            .find('.coatings-table')
            .eq(numberOfTable)
            .find('.dimensions-table-cell')
            .eq(columnNumber)
            .find('.p-0')
            .invoke('prop', 'innerHTML')
            .then((text) => {
                return cy.wrap(text);
            });
    }

    static enterInSearchBoxField(index: number, designation: string) {
        cy.wait(400);
        cy.get('.form-control').eq(index).clear().type(designation);
    }

    static getMaterialFromRow(name: string) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .contains('[col-id="designation"]', name)
            .parents(`[role="row"]`)
            .find('[col-id="designation"]')
            .invoke('text');
    }

    static clickMaterialFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="designation"]')
            .click();
    }

    static clickOnTab(nameOfTAb: string) {
        cy.get('.tm-tab');
        cy.contains('.tab-text', nameOfTAb).click();
    }
}
export default new Coatings();
