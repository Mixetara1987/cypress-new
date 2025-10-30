/// <reference types="cypress" />

export class MaterialConsole {
    static navigateToMaterialConsole() {
        cy.visit(`en/mmc/working`);
    }

    static clickOnMaterialListBuilder() {
        cy.get('.nav-item')
            .contains('.nav-link', 'Material List Builder')
            .click();
    }

    static clickOnComparisonView() {
        cy.get('.nav-item').contains('.nav-link', 'Comparison View').click();
    }

    static clickOnReportBuilder() {
        cy.get('.nav-item').contains('a.nav-link', 'Report Builder').click();
    }

    static clickOnMyConsole() {
        cy.get('.nav-item')
            .contains('a.nav-link', 'My Console')
            .should('be.visible')
            .click();
    }

    static clickSomeWhereOnMLDPage() {
        cy.get('.ag-body-viewport').click();
    }

    static getTextinGreenPopup() {
        cy.wait(1000);
        return cy
            .get('.toast-container')
            .should('be.visible')
            .then((message) => {
                return message.text();
            });
    }

    static checkIfTextinGreenPopupIsVisible() {
        cy.wait(500);
        return cy
            .get('.overlay-container')
            .should('exist')
            .find('#toast-container');
    }

    static getTitle() {
        cy.get('.container-fluid');
        return cy.get('.module-header-title').invoke('text');
    }

    static clickOnAddToMaterialListBuilder() {
        cy.get('.material-title-wrapper')
            .get('.material-info')
            .get('.number-and-status-wrapper')
            .should('be.visible')
            .find('.material-number')
            .should('exist');
        cy.get(':nth-child(1) > .action-button').click();
    }

    static closeGreenMessage() {
        cy.get('.toast-close-button > .icon-clear').should('exist').click();
    }

    static waitGreenMessageToNotExist() {
        cy.get('.toast-close-button > .icon-clear').should('not.exist');
    }

    // modal
    static clickOnYESinModal() {
        cy.get('.modal-footer')
            .contains('.tm-filter-button', 'Yes')
            .click({ force: true });
    }

    static waitForModalAndclickOnYES() {
        cy.get('.modal-footer').contains('.tm-filter-button', 'Yes').click();
    }

    static clickOnNOinModal() {
        cy.get('.modal-footer').contains('.tm-filter-button', 'No').click();
    }

    static getAlertNoItem() {
        return (
            cy
                .get('.tm-alert')
                // return cy.get('.tm-alert.tm-alert-info')
                .invoke('text')
        );
    }

    static clcikOnCheckboxSelectMaterial(row: number) {
        cy.get('[ref="eCheckbox"]').find('input').eq(row).click();
    }

    // dodata
    static getListOfResultsFound(indexOfResult: number) {
        return cy
            .get('material-search-results-table')
            .get('.grid-tools-wrapper')
            .eq(indexOfResult)
            .get('.results')
            .invoke('text');
    }

    // dodata
    static clickOnSelectedMaterial(row: number) {
        return cy
            .get('.ag-selection-checkbox')
            .eq(row)
            .should('be.visible')
            .click();
    }

    // dodata
    static clickOnComparison1vs1(indexOfTab: number) {
        return cy
            .get('.icon-compare_arrows')
            .eq(indexOfTab)
            .should('be.visible')
            .click();
    }

    static clickOnMaterialConsole() {
        cy.contains('Material Console').click({ force: true });
    }

    static modalForComparison1Vs1() {
        return cy.get('.modal-content');
    }

    static selectMaterialListBuilder() {
        cy.get('submodule-navigation')
            .contains('.nav-link', 'Material List Builder')
            .should('be.visible')
            .click();
    }

    static selectMyConsoleSubTab(link: string) {
        return cy
            .contains('ul.mmc-header-list li a', link)
            .should('be.visible')
            .click();
    }

    static colorOfSelectedTab(tabName: string): Cypress.Chainable<string> {
        return cy
            .get('.mmc-header-list')
            .contains('.list-link', tabName)
            .should('have.class', 'selected')
            .then(($tab) => {
                const computedStyle = window.getComputedStyle(
                    $tab[0],
                    '::after',
                );
                return computedStyle.getPropertyValue('background-color');
            });
    }

    static colorOfSelectedUnderline(link: string) {
        return cy
            .get('.module-header')
            .find('ul')
            .find('.list-item')
            .contains('.list-link', link);
    }

    static getCounterForPropertiesInsideMyConsoleTab(link: string) {
        return cy
            .get('.module-header')
            .find('ul')
            .find('.list-item')
            .contains('.list-link', link)
            .find('.mmc-number')
            .invoke('text');
    }

    // dodata
    static closeRemoveFromMatListBuilderWindow() {
        return cy
            .get('.modal-content')
            .find('.confirm-dialog')
            .find('.modal-footer')
            .find('.tm-filter-buttons-wrapper')
            .contains('.tm-filter-button', 'No')
            .click({ force: true });
    }

    static clickYesToRemoveFromList() {
        return cy
            .get('confirmation-modal')
            .find('.confirm-dialog')
            .find('.modal-footer')
            .find('.tm-filter-buttons-wrapper')
            .contains('.tm-filter-button', 'Yes')
            .click({ force: true });
    }

    // dodata
    static closeTheWindowCOmparison1vs1() {
        return cy.get('.modal-header .icon-clear').click();
    }

    // dodata
    static checkIfAddToMaterialisdisabled() {
        return cy.get('.btn.btn-default');
    }

    // dodata
    static modalDropDownText() {
        return cy.get('.accordion-title');
    }

    // dodata
    static basicInformationBoxFirstMaterial(indexOfTab: number) {
        return cy
            .get('.basic-info-compare-wrapper')
            .find('.basic-info')
            .as('basicInfo')
            .get('@basicInfo')
            .find('.basic-info-value')
            .eq(indexOfTab)
            .invoke('text');
    }

    static basicInformationBoxSecondMaterial(indexOfTab: number) {
        return cy
            .get('.basic-info-wrapper')
            .find('.basic-info')
            .as('basicInfo')
            .get('@basicInfo')
            .find('.basic-info-value')
            .eq(indexOfTab)
            .invoke('text');
    }

    /* static deleteFromListWindowModal() {
         return cy.get('.modal-content')
             .find('.modal-body')
             .find('p')
     } */
    static clickOnForwardButton(rowIndex: number) {
        cy.get('.icon-arrow_forward').eq(rowIndex).click();
    }

    static clickOnDeleteCAButton(rowIndex: number) {
        cy.get('.icon-delete').eq(rowIndex).click();
    }

    static clickOnForwardButtonFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="open"]')
            .click();
    }

    static getNumberOfRows() {
        return cy.get('[ref="centerContainer"] [role="row"]');
    }

    static findAndLoadSavedItem(findsavedSearch: string) {
        MaterialConsole.getNumberOfRows().then((rows) => {
            let found = false;

            cy.get(
                '[ref="centerContainer"] [role="row"] [col-id="name"] a',
            ).should('be.visible'); // sometimes title not show up on time

            cy.wrap(rows)
                .each(($el) => {
                    const savedSearch = $el.find('[col-id="name"] a');
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
                                cy.get('[aria-label="Next Page"]')
                                    .click()
                                    .wait(2000)
                                    .then(() => {
                                        MaterialConsole.findAndLoadSavedItem(
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

    static loadSavedReports(name: string) {
        return cy
            .contains(name) // Find the element containing the name
            .parents('.ag-row') // Navigate up to the row
            .within(() => {
                // Within the same row, find the load button
                cy.get('.icon-arrow_forward').click();
            });
    }

    static clickOnForwardButtonFromRowOptionThree(name: string) {
        cy.get('.ag-center-cols-container');
        cy.contains('[col-id="description"]', name)
            .parent('.ag-row')
            .find('[col-id="open"]')
            .click();
    }

    static getDataCreatedFromRow(name: string) {
        cy.get('.ag-center-cols-container').find('.ag-row');
        return cy.contains('[role="row"]', name).find('[col-id="dateCreated"]');
    }

    static clickOnShareButtonFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy.get(`[row-index="${rowIndex}"]`).find('[col-id="2"]').click();
    }

    static clickOnShareButtonFromRowOptionTwo(name: string) {
        cy.get('.ag-root-wrapper-body').find('.ag-row');
        return cy.contains('[role="row"]', name).find('[col-id="2"]').click();
    }

    static clickOnShareButtonFromRowOptionThree(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="bookmark"]')
            .click();
    }

    static checkIfShareButtonIsVisible() {
        return cy.get('.icon-share');
    }

    static checkIfForwardToButtonIsVisible() {
        return cy.get('.icon-arrow_forward');
    }

    static checkIfForwardToButtonIsDisabled() {
        return cy.get('#forwardToDropdown');
    }

    static checkIfDeleteButtonIsDisabled() {
        return cy.get('.btn-ag-grid');
    }

    static getMessage() {
        return cy
            .get('.accordion-body-wrapper')
            .find('.column-4')
            .find('.message')
            .invoke('text');
    }

    static clickOnShareButton(rowIndex: number) {
        cy.get('.icon-share').eq(rowIndex).click();
    }

    static getMyConsoleHeaderValues() {
        return cy
            .get('.module-header')
            .find('.mmc-header-list')
            .find('span')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getCounterNumber(index: number) {
        return cy.get('.mmc-number').eq(index);
    }

    static getCountOfNumber() {
        return cy.get('[ref="lbRecordCount"]');
    }
}
export default new MaterialConsole();
