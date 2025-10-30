export class DirectSuppliers {
    static navigateToMaterial(materialId: number) {
        cy.visit(
            `en/suppliers/supplier-material/materials/${materialId}/direct-suppliers`,
        );
    }

    static ClickOnDropDownArrowConditionSelector(rowIndex: number) {
        return cy
            .get('.searchable-dropdown')
            .find('.ng-arrow-wrapper')
            .eq(rowIndex)
            .click()
            .get('.ng-dropdown-panel');
    }

    static getSelectedOptionInDdl() {
        return cy.get(
            '.ng-select-container > .ng-value-container > .ng-placeholder',
        );
    }

    static getListOfResultsFound() {
        return cy.get('.direct-suppliers-table').get('.results');
    }

    static getListOfResultsFound1() {
        return cy.get('.direct-suppliers-table').get('.results').invoke('text');
    }

    static getMaterialStandardFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="name"]')
            .invoke('text');
    }

    static getSupplierFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="name_1"]')
            .invoke('text');
    }

    static getTypeFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="formName_1"]')
            .invoke('text');
    }

    static clickOnLinkedSupplier(linkedmaterial: string) {
        return cy
            .get(`[col-id="name_1"]`)
            .contains('a', `${linkedmaterial}`)
            .click();
    }

    static checkIfItIsDisabled(nameofDDl: string) {
        return cy
            .contains('.filter-wrapper .form-group', `${nameofDDl}`)
            .find('ng-select');
    }

    static clickOnReset() {
        cy.contains('.reset-btn', 'Reset').click();
    }

    static clickOnClearAll() {
        cy.get('.ng-clear-wrapper').click();
    }
}
