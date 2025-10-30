/// <reference types="cypress" />

export class ListOfMaterials {
    static getAlertMessage() {
        return cy.get('.alert').invoke('text');
    }

    static getResultsFound() {
        return cy
            .get('material-search-results-table')
            .find('.results')
            .should('be.visible');
    }

    // ******************
    // Table Headers
    static getTableHeaders() {
        return cy
            .get(
                '[ref="gridHeader"] [ref="eCenterContainer"] [role="columnheader"]',
            )
            .should('be.visible');
    }

    static getVisibleHeaderText() {
        return cy.get('.ag-header-row').find('span[ref="eText"]');
    }

    // Table Rows
    static getTableRows() {
        return cy
            .get('[ref="centerContainer"] [role="row"]')
            .should('be.visible');
    }

    static checkRowByName(materialName: string) {
        return cy
            .contains('[ref="centerContainer"] [role="row"]', materialName)
            .should('be.visible')
            .parent('[role="row"]')
            .find('[ref="eCheckbox"]')
            .should('be.visible')
            .find('input[type="checkbox"]')
            .click();
    }

    // get row for fiven material and standard name, producer is optional
    static getRowByMaterialAndStandard(
        materialName: string,
        standardName: string,
        producerName?: string,
    ) {
        // eslint-disable-next-line cypress/no-assigning-return-values
        let row = cy
            .get('[ref="centerContainer"] [role="row"] [col-id="designation"]')
            .should('be.visible', {
                message: 'Designation column should be visible',
            })
            .and('not.be.empty', {
                message: 'Designation column should not be empty',
            })
            .filter(`:contains("${materialName}")`)
            .parents('[role="row"]')
            .contains('[col-id="standard"]', standardName)
            .should('be.visible', {
                message:
                    'Standard column should contain the specified standard name',
            });

        if (producerName) {
            row = row
                .parents('[role="row"]')
                .contains('[col-id="countryProducer"]', producerName)
                .should('be.visible');
        }
        // row.parent().then((parentRow) => {
        //     // Return the parent row to be used in the next command
        //     return parentRow;
        // });
        return row.parent(); // row
    }

    // primary key material+standard, find row which contains material and standard
    static clickOnRowMaterialStandard(
        material: string,
        standard: string,
        producer?: string,
    ) {
        this.getRowByMaterialAndStandard(material, standard, producer).click();
    }

    // check/select row by material and standard
    static checkRowByMaterialStandard(
        material: string,
        standard: string,
        producer?: string,
    ) {
        this.getRowByMaterialAndStandard(material, standard, producer)
            .find('[ref="eCheckbox"]')
            .should('be.visible')
            .find('input[type="checkbox"]')
            .click();
    }

    // Find col-id (e.g. hardenss, weatherability..) in given row with material and standard unique key
    static findInRowColumnId(
        material: string,
        standard: string,
        targetColumnIdCell: string, // weatherability
    ) {
        return this.getRowByMaterialAndStandard(material, standard).find(
            `[col-id="${targetColumnIdCell}"]`,
        );
    }

    // Table COLUMNS
    static getTableColumnValues(columnId: string) {
        return cy
            .get(`[ref="centerContainer"] [col-id="${columnId}"]`)
            .should('be.visible')
            .should('not.be.empty')
            .invoke('text')
            .then((text) => text.trim());
    }

    static getTableColumnValueByIndex(columnId: string, index: number) {
        return cy
            .get(`[ref="centerContainer"] [col-id="${columnId}"]`)
            .should('be.visible')
            .eq(index) // row index
            .should('not.be.empty');
    }

    // perform click or invoke on this method
    // item: material, standard, producer... any col-id value
    static getItemFromColumn(columnIdName: string, columnCellValue: string) {
        cy.get('ag-grid-angular [ref="gridBody"]');
        return cy
            .contains(
                `[ref="centerContainer"] [col-id="${columnIdName}"]`,
                `${columnCellValue}`,
            )
            .should('be.visible')
            .and('not.be.empty');
    }

    // check/select row for given column cell value
    static checkRowByColumnNameAndValue(
        columnIdName: string,
        columnCellValue: string,
    ) {
        return this.getItemFromColumn(columnIdName, columnCellValue)
            .parent('[role="row"]')
            .find('[ref="eCheckbox"]')
            .should('be.visible')
            .find('input[type="checkbox"]')
            .click();
    }

    // col-id: 'standard' - find column
    // 'AISI' - find value in column and get row of cell's value //
    // col-id: 'irradiationProperty' - find target cell irradiation in row
    static findSpecificItemByColumnNameAndValue(
        columnIdName: string,
        columnCellValue: string,
        targetCell: string,
    ) {
        return this.getItemFromColumn(columnIdName, columnCellValue)
            .parent() // row
            .find(`[col-id="${targetCell}"]`); // specific cell in another column
    }

    static clickColumnFromRowByIndex(rowIndex: number, columnId: string) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find(`[col-id="${columnId}"]`)
            .click();
    }

    static clickOnMaterialInListByIndex(row: number) {
        cy.get('[ref="eBodyViewport"]').should('exist');
        cy.get('[role="gridcell"]')
            .should('exist')
            .parent(`div[role="row"][row-index="${row}"]`)
            .should('be.visible')
            .click();
    }

    static clickOnMaterialInListString(name: string) {
        cy.get('[ref="eBodyViewport"]').should('exist');
        cy.contains('[role="gridcell"]', name)
            .should('exist')
            .parents('div[role="row"]')
            .should('be.visible')
            .click();
    }

    // checkbox All
    static clickOnCheckboxAll() {
        cy.get(
            '[ref="gridHeader"] [col-id="checkbox"] input[ref="eInput"]',
        ).click();
    }

    static getNumberOfRows() {
        return cy.get('[ref="centerContainer"] [role="row"]');
    }

    // find Material by name and pagination
    static findMaterialNamePagination(findsavedSearch: string) {
        cy.get('material-search-results-table').should('be.visible');
        ListOfMaterials.getNumberOfRows().then((rows) => {
            let found = false;

            cy.get(
                '[ref="centerContainer"] [role="row"] [col-id="designation"]',
            ).should('be.visible'); // sometimes title not show up on time

            cy.wrap(rows)
                .each(($el) => {
                    const savedSearch = $el.find('[col-id="designation"]');
                    if (savedSearch.text() === findsavedSearch) {
                        cy.wrap(savedSearch).click();
                        found = true;
                        return false; // break out of the each loop
                    }
                })
                .then(() => {
                    if (!found) {
                        // Check if the "Next Page" button is disabled
                        cy.get('[aria-label="Next Page"]').then(($nextBtn) => {
                            const isDisabled =
                                $nextBtn.attr('aria-disabled') === 'true';
                            if (!isDisabled) {
                                ListOfMaterials.clickOnNextPage()
                                    .wait(2000)
                                    .then(() => {
                                        ListOfMaterials.findMaterialNamePagination(
                                            findsavedSearch,
                                        );
                                    });
                            } else {
                                // Handle the case where the search item was not found
                                cy.log(
                                    `Saved search item "${findsavedSearch}" not found.`,
                                );
                            }
                        });
                    }
                });
        });
    }

    static checkIfResultsFoundCloseTo(
        expectedResult: number,
        deviation: number,
    ) {
        return cy
            .get('material-search-results-table')
            .find('.results')
            .should('be.visible')
            .then((result) => {
                const numberPattern = /\d+/g;
                const currentnumberOfResults = parseInt(
                    result.text().match(numberPattern).toString(),
                );
                expect(currentnumberOfResults).to.be.closeTo(
                    expectedResult,
                    deviation,
                );
            });
    }

    // *****
    // Pagination
    static clickOnNextPage() {
        return cy.get('[aria-label="Next Page"]').click();
    }

    static clickOnLastPage() {
        cy.get('[aria-label="Last Page"]').click();
    }

    static clickOnFirstPage() {
        cy.get('[aria-label="First Page"]').click();
    }

    // ********************

    static getAllValuesFromRow(rowIndex: number) {
        return cy
            .get('ag-grid-angular [ref="centerContainer"] [role="row"]')
            .get(`[row-index="${rowIndex}"]`)
            .should('be.visible');
    }

    static getMaterialFromRowByIndex(rowIndex: number) {
        cy.get('[col-id="designation"]').last().should('not.be.empty');
        return cy
            .get('[ref="eBodyViewport"]')
            .find(`[row-index="${rowIndex}"]`, { timeout: 10000 })
            .should('be.visible')
            .find('[col-id="designation"]')
            .then((designation) => {
                const material = designation.find('span');
                return material.text();
            });
    }

    static clickOnAddPropertyCheckbox(property: string) {
        cy.get('.ag-side-button')
            .find('button')
            .click()
            .get('.list-wrapper')
            .contains('.tm-checkbox', property)
            .click()
            .get('.ag-side-button')
            .find('button')
            .click();
    }

    static clickOnAddPropertyCheckboxCrossReff(property: string) {
        cy.get(
            '.cross-reference-results > material-search-results-table > .search-grid > .skeleton-data-table-loader > #myGrid > .ag-root-wrapper > .ag-root-wrapper-body > .ag-side-bar > .ag-side-buttons > .ag-side-button > .ag-side-button-button',
        )
            .click()
            .get('.list-wrapper')
            .eq(0)
            .contains('.tm-checkbox', property)
            .click();
        cy.get(
            '.cross-reference-results > material-search-results-table > .search-grid > .skeleton-data-table-loader > #myGrid > .ag-root-wrapper > .ag-root-wrapper-body > .ag-side-bar > .ag-side-buttons > .ag-side-button > .ag-side-button-button',
        ).click();
    }

    static clickOnCompareButton(index: number) {
        cy.get('[col-id="compare"]')
            .eq(index)
            .get('i.icon-compare_arrows')
            .eq(index)
            .click();
    }

    static clickOnMaterialCheckboxPredictor(row: number) {
        cy.get('[ref="eBodyViewport"] [name="center"]')
            .should('be.visible')
            .find('[ref="eCheckbox"]')
            .and('be.visible')
            .find('input[ref="eInput"]')
            .should('exist')
            .eq(row)
            .click({ force: true });
    }

    static clickOnMaterialCheckbox(row: number) {
        cy.get('.grid-tools-wrapper');
        cy.get('[ref="eBodyViewport"] [col-id="checkbox"] input[ref="eInput"]')
            .should('exist')
            .should('be.enabled')
            .eq(row)
            .click();
    }

    static colorOfSelectedCheckbox(row: number) {
        return cy
            .get('.ag-selection-checkbox')
            .find('.ag-wrapper.ag-input-wrapper.ag-checkbox-input-wrapper')
            .eq(row)
            .should('have.class', 'ag-checked')
            .then((index) => {
                const computedStyle = window.getComputedStyle(
                    index[0],
                    '::after',
                );
                return computedStyle.getPropertyValue('color');
            });
    }

    static checkIfAllCheckboxIsSelected() {
        return cy
            .get('[ref="gridHeader"] [col-id="checkbox"] input[ref="eInput"]')
            .invoke('attr', 'aria-label')
            .then((areaLabelContent) => {
                expect(areaLabelContent).to.contain('(checked)');
            });
    }

    // Greed Tools Buttons - Add to, Forward to...
    //  ' Compliance Assessor ', ' LCA ', ' Carbon Footprint '
    static addToGreenLineDDL(dropMenuName: string) {
        cy.get('[data-qa="addToGreenLineButton"]')
            .should('be.visible')
            .should('be.enabled')
            .click()
            .then(() => {
                cy.get('[aria-labelledby="greenLineDropdown"]')
                    .should('be.visible')
                    .contains('a', dropMenuName)
                    .click();
            });
    }

    static addToOldComplianceAssessor() {
        cy.get('[data-qa="addToCAButton"]').should('be.visible').click();
    }

    static clickOnDelete() {
        cy.get('#deleteSelectedItems')
            .should('be.visible')
            .should('be.enabled')
            .click();
    }

    static checkDeleteButton() {
        return cy.get('#deleteSelectedItems').should('be.visible');
    }

    static clickOnForwardTo(property: string) {
        cy.get('[data-qa="forwardButton"]')
            .should('be.visible')
            .should('be.enabled')
            .click()
            .then(() => {
                cy.get('[aria-labelledby="forwardToDropdown"]')
                    .should('be.visible')
                    .contains('a', property)
                    .click();
            });
    }

    static checkForwardToButton() {
        return cy.get('[data-qa="forwardButton"]').should('be.visible');
    }

    // Materials, Properties, Analytics
    static addToComparisonView(property: string) {
        cy.get('#comparisonDropdown')
            .should('be.visible')
            .should('be.enabled')
            .click()
            .then(() => {
                cy.get('[aria-labelledby="comparisonDropdown"]')
                    .should('be.visible')
                    .contains('a', property)
                    .click();
            });
    }

    static clickOnAddToMaterialListBuilder() {
        return cy
            .get('[data-qa="addToMaterialListBuilderButton"]')
            .should('be.visible')
            .should('be.enabled')
            .click();
    }

    static checkAddToMaterialListBuilderButton() {
        return cy
            .get('[data-qa="addToMaterialListBuilderButton"]')
            .should('be.visible');
    }

    // share
    static checkShareButton() {
        return cy.get('[data-qa="shareButton"]').should('be.visible');
    }

    static clickOnShareLinkButton() {
        cy.get('[data-qa="shareButton"]')
            .should('be.visible')
            .should('be.enabled')
            .click();
    }

    static clickOnAddToReportBuidler(index: number) {
        return cy
            .get('.module-split-content')
            .find('.module-split-content-info')
            .find('.material-title-wrapper')
            .find('ul')
            .find('li')
            .eq(index)
            .click();
    }

    static getnumberOfPagesOptionTwo() {
        return cy.get('[ref="lbTotal"]');
    }

    static getNumberOfVisbleRows() {
        return cy.get('[ref="lbLastRowOnPage"]').then((numberOfvisibleRows) => {
            return parseInt(numberOfvisibleRows.text(), 10);
        });
    }

    static getMessageForPossibleMaches() {
        return cy.get('.p-4').invoke('text');
    }

    static clickOnLinkedMessage(moreMatches: string) {
        cy.get('.p-4').contains('a', `${moreMatches}`).click();
    }

    static showingFirst2000Message() {
        return cy.get('.alert.alert-warning').find('p').invoke('text');
    }

    static getSuggestionsText() {
        return cy
            .get('.skeleton-data-table-loader')
            .find('.p-4 ')
            .invoke('text');
    }

    static getListOfProperties() {
        const defaultLPropertyList = [];
        return cy
            .get('.list-wrapper')
            .find('.form-check')
            .each(($X) => {
                defaultLPropertyList.push($X.text());
                return cy.wrap(defaultLPropertyList);
            });
    }

    static clickOnAddedPropertyWithValue(value: string) {
        cy.get('.ag-body-viewport')
            .find('[ref="centerContainer"]')
            .find('[role="row"]')
            .as('list');
        cy.get('@list').contains('div[role="gridcell"].ag-cell', value).click();
    }

    // dodata
    static getListOfResultsInMaterialListBuilder() {
        return cy.get('.results', { timeout: 15000 }).invoke('text');
    }

    static getListOfResultsFound() {
        return cy.get('.grid-tools-wrapper').get('.results').invoke('text');
    }

    // dodata
    static showToastMessage() {
        return cy.get('.toast-message').invoke('text');
    }

    // dodata
    static getAlternativeDesignatioFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="alternativeDesignation"]')
            .invoke('text');
    }

    // dodata
    static clickOnColumnTitle(rowIndex: number) {
        cy.get('.ag-header-cell-sortable').eq(rowIndex).click();
    }

    static getPageNumber() {
        return cy.get('.ag-paging-number');
    }

    static getNumbersOfProperties() {
        return cy
            .get('.ag-side-button')
            .find('button')
            .click()
            .get('.list-wrapper')
            .find('.tm-checkbox');
    }

    // TODO complete function
    static checkUncheckPropertyCheckbox123() {
        ListOfMaterials.getNumbersOfProperties().then((properties) => {
            const numberofProperties = properties.length;
            for (let i = 0; i < numberofProperties; i++) {
                let checkBoxProperty = Cypress.$('.list-wrapper')
                    .find('.tm-checkbox')
                    .find('input[type="checkbox"]')
                    .eq(i);
                if (checkBoxProperty.prop('checked') === false) {
                    cy.get('.list-wrapper').find('.tm-checkbox').eq(i).click();
                    ///
                    /// bla.. bla.. bla....proveri da li je dodato u listi ili tako nesto (napravi funkciju)
                    ///
                    cy.get('.list-wrapper').find('.tm-checkbox').eq(i).click();
                }
            }
        });
    }
}
export default new ListOfMaterials();
