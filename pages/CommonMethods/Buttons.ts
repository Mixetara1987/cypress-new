export class Buttons {
    static checkClearButton() {
        return cy.contains('.tm-filter-button', 'Clear');
    }

    static clearRegulationFieldButton() {
        return cy.get('.d-block').find('#clearAllButton').click();
    }

    static checkButtonToAddSearch() {
        return cy
            .get('.tm-filter-buttons-wrapper')
            .find('.tm-filter-button-submit');
    }

    static isDeleteButtonVisible() {
        return cy.get('.btn-ag-grid');
    }

    static isButtonAddMaterialsDropDwnQAVisible() {
        return cy.get('.select-material-ngb-dropdown');
    }

    static clickOnAddMaterialsQAModeButton() {
        cy.get('.select-material-ngb-dropdown').find('.green-button').click();
    }

    static isResetSlidersSmartCompButtonsVisible() {
        return cy.contains('.tm-filter-button', 'Reset sliders');
    }

    static clickSaveButton() {
        cy.get('.tm-filter-button-save .icon-save')
            .should('be.visible')
            .click();
    }

    static clickOnSaveSearchButton() {
        cy.contains('.tm-filter-button.primary', ' Save ').click();
    }

    static clickOnSaveSearchButtonItalian() {
        cy.contains('.tm-filter-button-save', ' Salva la ricerca ').click();
    }

    static clickOnSaveBookmarkButton() {
        cy.contains('.tm-filter-button-modal', ' Save ').click();
    }

    static clickOnSaveBookmarkButtonItaliano() {
        cy.contains('.tm-filter-button-modal', ' Salva ').click();
    }

    static clickOnCancelButton() {
        cy.contains('.tm-filter-button', ' Cancel ').click();
    }

    static clickOnReset() {
        cy.contains('.tm-filter-button', 'Reset').click();
    }

    static clickOnCancel() {
        cy.get('.btn').contains('.btn-secondary', 'Cancel').click();
    }

    static clickOnClose() {
        cy.get('.close-btn').find('.icon-clear').click();
    }

    static clearButtonFromExporter(column: number) {
        return cy
            .get('.custom-details-table')
            .find('.w-5')
            .eq(column)
            .find('i')
            .click({ force: true });
    }

    static clickOnButtonPrevious() {
        return cy.get('.button-previous').click();
    }

    static clickOnButtonNext() {
        return cy.get('.button-next').click();
    }

    //
    static clickOnExportButton() {
        return cy.get('.btn-holder').find('.tm-filter-button-submit').click();
    }

    static checkExportButtonVisibility() {
        return cy.get('.tm-filter-button-submit');
    }

    static checkOnAddToReportBuilderbutton() {
        return cy.contains('.btn-primary', 'Add to Report Builder');
    }

    static clickSearchButtonOnExporter() {
        cy.contains('.tm-filter-button-submit', ' Search ').click();
    }

    static checkSearchButtonOnExporter() {
        return cy.contains('.tm-filter-button-submit', ' Search ');
    }

    static clickOnOverWriteChangeshButton() {
        cy.contains('.tm-filter-button-submit', 'Overwrite changes').click();
    }

    static clickNoOverWriteChangeshButton() {
        cy.contains('.tm-filter-button', 'Cancel').click();
    }

    static clickOnButtonCloud(row: number) {
        return (
            cy
                .get('[col-id="download"]')
                // .find('span')
                .find('.btn')
                .eq(row)
                .find('.icon-cloud_download')
                .click()
        );
    }

    static clickOnButtonClearExporter(row: number) {
        return (
            cy
                .get('[col-id="delete"]')
                // .find('span')
                .find('.btn')
                .eq(row)
                .find('.icon-clear')
                .click()
        );
    }

    static AddToMaterialListBuilderCrossReff() {
        return cy
            .get(
                '.cross-reference-results > material-search-results-table > .search-grid > .grid-tools-wrapper > .grid-tools > .btn-default',
            )
            .should('be.visible')
            .click();
    }

    static clickOnSearchMoreOnAddMaterialsQAModeButton() {
        return cy.get('.search-more').find('.btn-link.mt-2').click();
    }

    static clickOnShareLInkButton() {
        cy.get('.d-flex.align-items-center')
            .find('.btn.btn-outline-secondary')
            .click();
    }

    static clickOnAssesAllButton() {
        cy.get('.assess-button').click({ force: true });
    }

    static ClearAllInComplianceAssesorButton() {
        return cy
            .contains('.compliance-header-button', ' Clear all ')
            .click({ force: true });
    }

    static clickOnAssessGLButton() {
        cy.get('.btn-gl-ca').eq(0).click();
    }

    static clickOnClearAllGLButton() {
        return cy.contains('.btn-secondary', 'Clear all').click();
    }

    static clickOnClearAssesment() {
        return cy.contains('.btn-secondary', 'Clear assessments').click();
    }

    static clickOnLCACalculate() {
        return cy.contains('.tm-filter-button-submit', ' Calculate').click();
    }

    static clickOnLCACRank() {
        return cy.contains('.tm-filter-button-submit', 'Rank').click();
    }

    static clickOnClosePdfWinwow() {
        return cy.contains('.btn-secondary', 'Close').click();
    }

    static clickOnBackButton() {
        cy.get('.history-back-wrapper').find('button').click();
    }

    static clickOnBackButtonOptionTwo() {
        cy.get('.icon-arrow_back').click();
    }

    static clickOnApplyGLButton() {
        return cy.contains('.tm-filter-button-submit', 'Apply').click();
    }

    static clickOnProceeed() {
        cy.contains('.btn-primary', 'Proceed').click();
    }

    static clickOnPredictorExporterAndReport(index: number) {
        cy.get('.report-wrapper')
            .find('.action-list')
            .find('.action-item')
            .eq(index)
            .find('.action-button')
            .click();
    }

    static clickInExporterClear() {
        cy.get('.ng-clear-wrapper').click();
    }

    static clikOnPredictButton() {
        return cy.contains('.btn-wrapper', ' Predict').click();
    }
}

export default new Buttons();
