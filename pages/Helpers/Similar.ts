export class Similar {
    static getMessage() {
        return cy.get('.similar-container-header-details').invoke('text');
    }

    static getListOfResultsFound(indexOfResult: number) {
        return cy
            .get('material-search-results-table')
            .get('.grid-tools-wrapper')
            .eq(indexOfResult)
            .get('.results')
            .invoke('text');
    }

    static clickOnMaterialFromRow(name: string) {
        cy.contains('[col-id="designation"]', name)
            .should('be.visible')
            .click();
    }

    static getCountryAndProducerFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="countryProducer"]')
            .invoke('text');
    }

    static getSimilarMaterialInfoType(row: number) {
        cy.wait(1000);
        return cy
            .get('#similar-container')
            .get('.show-details-wrapper')
            .find('dt')
            .eq(row)
            .invoke('text');
    }

    static getSimilarMaterialInfoTypeNew(row: number) {
        cy.wait(1000);
        return cy
            .get('.similar-container')
            .get('.show-details-wrapper')
            .get('.refine-search-wrapper')
            .get('.refine-search-details')
            .find('dl')
            .find('dt')
            .eq(row)
            .invoke('text');
    }

    static getSimilarMaterialInfoValue(row: number) {
        return cy
            .get('#similar-container')
            .find('.show-details-wrapper')
            .find('dd')
            .eq(row)
            .invoke('text');
    }

    static getSimilarMaterialInfoValueNew(row: number) {
        cy.wait(1000);
        return cy
            .get('.similar-container')
            .get('.show-details-wrapper')
            .get('.refine-search-wrapper')
            .get('.refine-search-details')
            .find('dl')
            .find('dd')
            .eq(row)
            .invoke('text');
    }

    static clickOnSelectMaterial(row: number) {
        cy.wait(1000);
        return cy.get('.ag-selection-checkbox').eq(row).click();
    }

    static clickOnForwardTo(dropdownitem: string) {
        cy.get('#forwardToDropdown')
            .click({ force: true })
            .get('[aria-labelledby="forwardToDropdown"]')
            .contains('a.dropdown-item', `${dropdownitem}`)
            .click();
    }

    static clickOnlinkedMesssage(link: string) {
        cy.wait(1000);
        return cy
            .get('#similar-container')
            .find('.rs .text-uppercase')
            .contains('a', `${link}`)
            .click();
    }

    static clickOnRemove() {
        cy.get('.btn').contains('.btn-secondary', ' Remove ').click();
    }

    static getTitleOfConditionFilters() {
        const conditionFilters = [];
        return cy
            .get('.form-group')
            .find('label')
            .each(($X) => {
                conditionFilters.push($X.text());
                return cy.wrap(conditionFilters);
            });
    }

    static clickSomeWhereOnSimilarPage() {
        cy.get('.module-split-content').click();
    }

    static checkForTitleOfColumns(rowIndex: number) {
        return cy
            .get('.ag-cell-label-container > .ag-header-cell-label')
            .eq(rowIndex);
    }
}
export default new Similar();
