export class SearchSuppliers {
    static clickOnSuppliers() {
        cy.contains('a', 'Suppliers').click();
    }

    static navigateSuppliersPageByMaterial() {
        cy.visit(`en/suppliers/supplier-material`);
    }

    static navigateSuppliersPageByName() {
        cy.visit(`en/suppliers/supplier-name`);
    }

    static getSearchCriteriaBox() {
        return cy.get('.accordion-header-wrapper').invoke('text');
    }

    static visibleStandardNumber(index: number) {
        return cy.get('.filter-wrapper').eq(index).find('.form-control');
    }

    static visibleSupplierName() {
        return cy.get('.form-control');
    }

    static visibleSupplierCountryDdl() {
        return cy.contains('label', 'Supplier country');
    }

    static visibleSupplierTypeDdl() {
        return cy.contains('label', 'Supplier type');
    }

    static getTitlesForDdls() {
        const titles = [];
        return cy
            .get('.filter-wrapper')
            .find('.title')
            .each(($X) => {
                titles.push($X.text());
                return cy.wrap(titles);
            });
    }

    static getGenericMessage() {
        return cy.get('.alert').invoke('text');
    }

    static getListOfResultsFound() {
        return cy.get('.grid-tools-wrapper').get('.results').invoke('text');
    }

    static clickOnLinkedSupplier(linkedsupplier: string) {
        return cy
            .get(`[col-id="supplierSearchName"]`)
            .contains('a', `${linkedsupplier}`)
            .click();
    }

    static clickOnLinkedSupplierSupplierByName(linkedsupplier: string) {
        return cy
            .get(`[col-id="supplierName"]`)
            .contains('a', `${linkedsupplier}`)
            .click();
    }

    static clickOnLinkedMaterial(linkedmaterial: string) {
        cy.get(`[col-id="suppliersDesignation"]`)
            .contains('a', `${linkedmaterial}`)
            .click();
    }

    static clickOnLinkedMaterialSupplierByNme(linkedmaterial: string) {
        cy.get(`[col-id="materialDesignation"]`)
            .contains('a', `${linkedmaterial}`)
            .click();
    }

    static enterStandardNumber(standardNumber: string) {
        cy.get('.filter-wrapper')
            .get('.form-group')
            .get('[formcontrolname="standardNumber"]')
            .type(standardNumber);
    }

    static enterSupplierName(supplierName: string) {
        cy.get('.filter-wrapper')
            .get('.form-group')
            .get('[formcontrolname="supplierName"]')
            .type(supplierName);
    }

    static enterSupplierCountry(supplierCountry: string) {
        cy.get('.filter-wrapper')
            .get('.form-group')
            .get('[role="combobox"]')
            .eq(1)
            .type(supplierCountry);
    }

    static clickOnStandard(indexOfCheckBox: number) {
        cy.get('.icon-check_box_outline_blank').eq(indexOfCheckBox).click();
    }

    static getListOfResultsFoundinTable(rowIndex: number) {
        return cy.get('.grid-tools-wrapper').eq(rowIndex).invoke('text');
    }

    static clickOnBranchOfficeNextPage() {
        cy.get('[aria-label="Next Page"]').eq(0).click();
    }

    static getColumnHeaders() {
        return cy
            .get('.ag-cell-label-container')
            .find('.ag-header-cell-label')
            .get('.ag-header-cell-text')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static clickOnLinkedWEbSite(linkedsupplier: string) {
        return cy
            .get(`[col-id="website"]`)
            .contains('a', `${linkedsupplier}`)
            .click();
    }

    static clickOnMaterialInfoLinkedAdress(linkedsupplier: string) {
        return cy
            .get(`.material-info`)
            .contains('a', `${linkedsupplier}`)
            .click();
    }

    static clickOnDataPLusModule() {
        cy.contains('Data Plus').click();
    }

    static clickOnSmartCompModule() {
        cy.contains('Smartcomp').click();
    }

    static clickOnSuppliersModule() {
        cy.contains('Suppliers').click();
    }

    static getTextForStandardNumber(index: number) {
        return cy
            .get('.accordion-body-wrapper')
            .find('.accordion-body')
            .get('.column-2')
            .find('.filter-wrapper')
            .eq(index)
            .find('.form-group')
            .find('.form-control')
            .invoke('prop', 'value');
    }

    static getTextForSelectedSupplierCountryAndType(
        index: number,
        row: number,
    ) {
        return cy
            .get('.accordion-body-wrapper')
            .find('.accordion-body')
            .get('.column-3')
            .find('.filter-wrapper')
            .eq(index)
            .find('.form-group')
            .find('.searchable-dropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-value')
            .find('span')
            .eq(row)
            .invoke('text');
    }

    static getTextForSelectedSupplierCountryByName(index: number, row: number) {
        return cy
            .get('.accordion-body-wrapper')
            .find('.accordion-body')
            .get('.column-2')
            .eq(index)
            .find('.filter-wrapper')
            .find('.form-group')
            .find('.searchable-dropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-value')
            .find('span')
            .eq(row)
            .invoke('text');
    }

    static getTextForProducer(index: number, row: number) {
        return cy
            .get('.accordion-body-wrapper')
            .find('.accordion-body')
            .get('.column-1')
            .find('material-search-common-values')
            .find('.quick-search')
            .find('.quick-search-filters')
            .find('.filters-wrapper')
            .eq(index)
            .find('.filter-wrapper')
            .eq(row)
            .find('input')
            .invoke('prop', 'value');
    }

    static colorOfSelectedSupplierTab(tabName: string) {
        return cy
            .contains('submodule-navigation nav ul li a', tabName)
            .should('have.class', 'selected')
            .then(($tab) => {
                const win = $tab[0].ownerDocument.defaultView;
                const computedStyle = win.getComputedStyle($tab[0], '::after');
                return computedStyle.getPropertyValue('background-color');
            });
    }
}
export default new SearchSuppliers();
