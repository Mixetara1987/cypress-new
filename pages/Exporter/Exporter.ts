export class Exporter {
    static navigateToPreviousExports() {
        cy.visit(`en/exporter/previous-exports`);
    }

    static clickOnExporterButton() {
        return cy.get('.hidden-mobile').find('.action-button').click();
    }

    static checkIfExporterModalIsOpen() {
        return cy.get('.modal-content').find('.exporter-modal');
    }

    static checkChosenProperties(index: number) {
        return cy
            .get('.checkboxes-wrapper')
            .find('.tm-checkbox')
            .eq(index)
            .find('.icon-check_box_outline_blank');
    }

    static getlistOfProperties() {
        return cy
            .get('.checkboxes-wrapper')
            .find('span')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getExporterTitle() {
        return cy.get('.modal-header').find('h3').invoke('text');
    }

    static getExporterSubtitle() {
        return cy.get('.modal-header').find('a').invoke('text');
    }

    static getWelcomeText() {
        return cy.get('.welcome-message').invoke('text');
    }

    static getSolverTitle() {
        return cy.get('.form-group').find('label').invoke('text');
    }

    static getPropertyTitle() {
        return cy
            .get('.progress-bar-container')
            .find('.step-name')
            .invoke('text');
    }

    static getPropertySubTitle() {
        return cy
            .get('.progress-bar-container')
            .find('.progress-bar-step')
            .invoke('text');
    }

    static checkForDDlSolver() {
        return cy.get('.ng-select-container');
    }

    static checkNextStepButton() {
        return cy.get('.tm-filter-button');
    }

    static clikOnNextStepButton() {
        return cy
            .get('.btn-holder')
            .contains('.tm-filter-button-submit', ' NEXT STEP ')
            .click();
    }

    /* static clickOnCheckBoxForProperties(index: number) {
        return cy
            .get('.checkboxes-wrapper')
            .find('.form-group')
            .find('.tm-checkbox')
            .eq(index)
            .click();
    }*/
    static clickOnCheckBoxForProperties(name: string) {
        return cy
            .get('.checkboxes-wrapper')
            .contains('.form-group .tm-checkbox', name)
            .click();
    }

    static checkForProperties(name: string) {
        return cy
            .get('.checkboxes-wrapper')
            .contains('.form-group .tm-checkbox', name);
    }

    static clickOnCheckBoxForAllProperties() {
        return cy.get('.check-all-wrapper').find('.tm-checkbox').click();
    }

    static isXMLNavigationVisible() {
        return cy
            .get('.navigation-container')
            .find('.button-previous')
            .invoke('text');
    }

    static isExportViewNavigationVisible() {
        return cy
            .get('.navigation-container')
            .find('.button-next')
            .invoke('text');
    }

    static isNavigationTitleVisible() {
        return cy
            .get('.navigation-container')
            .find('.progress-bar-container')
            .find('.step-name')
            .invoke('text');
    }

    static isNavigationSubTitleVisible() {
        return cy
            .get('.navigation-container')
            .find('.progress-bar-container')
            .find('.progress-bar-step')
            .invoke('text');
    }

    static getDefaultConditionInExporter(rowindex: number) {
        return cy
            .get('.table-wrapper')
            .find('.selected-row')
            .eq(rowindex)
            .find('td')
            .invoke('text');
    }

    static colorOfSelectedCondition(index: number) {
        return cy.get('.tm-radio').eq(index).find('.icon-radio_button_checked');
    }

    static colorOfSelectedTemperature(index: number) {
        return cy
            .get('ngb-modal-window .custom-details-table .ng-star-inserted')
            .find('i')
            .eq(index);
    }

    static colorOfSelectedTemperatureforStressStrain(index: number) {
        return cy
            .get('.points-table-body .ng-star-inserted tr td .tm-checkbox')
            .find('i')
            .eq(index);
    }

    static isCheckedPropertyInNextStepsModal(index: number) {
        return cy
            .get('table.custom-details-table input')
            .eq(index)
            .should('be.checked');
    }

    static isChemicalCompositionTableVisible() {
        return cy.get('.custom-table-wrapper').invoke('text');
    }

    static removeFromTheListBox() {
        return cy.get('.modal-content');
    }

    static confirmationDialog() {
        return cy.get('.confirmation-dialog-wrapper').find('h3').invoke('text');
    }

    static confirmationDeletingExportBox() {
        return cy.get('.modal-content').find('.confirm-dialog').invoke('text');
    }

    static clickYesButton() {
        return cy
            .get('.tm-filter-buttons-wrapper')
            .contains('.tm-filter-button-submit', 'Yes')
            .click({ force: true });
    }

    static clickNoButton() {
        return cy
            .get('.tm-filter-buttons-wrapper')
            .contains('.tm-filter-button', 'No')
            .click({ force: true });
    }

    static clickOnBackButton() {
        return cy.get('.tm-filter-button.btn-back').click();
    }

    static clickOnSolverName() {
        return cy.get('.solver-name').click();
    }

    static clickOnClearButtonX(row: number, index: number) {
        cy.get('app-exporter-export-page')
            .find('.custom-details-table')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(index)
            .find('.icon-clear')
            .click();
    }

    static getTextForSelectedConditionExporter(rowindex: number) {
        return cy
            .get('.table-wrapper')
            .find('tr')
            .eq(rowindex)
            .find('td')
            .invoke('text');
    }

    static getTextForSelectedCondition() {
        return cy
            .get('.modal-body')
            .find('.scrollable-wrapper')
            .find('.ng-star-inserted')
            .find('p')
            .invoke('text');
    }

    static getTextForSelectedSolver(index: number) {
        return cy
            .get('.searchable-dropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .get('.ng-value')
            .eq(index)
            .find('.ng-value-label')
            .invoke('text');
    }

    static getTableData(column: number) {
        return cy
            .get('.modal-body')
            .find('.scrollable-wrapper')
            .find('.custom-details-table')
            .find('.ng-star-inserted')
            .find('td')
            .eq(column)
            .invoke('text');
    }

    static clickOnCheckBox(row: number) {
        return cy
            .get('.modal-body')
            .find('.scrollable-wrapper')
            .find('.custom-details-table')
            .find('.ng-star-inserted')
            .find('td')
            .find('.tm-checkbox')
            .eq(row)
            .click();
    }

    static isConditionSearchBoxDisplayed() {
        return cy
            .get('.exporter-filter-wrapper')
            .find('.form-group')
            .find('.form-control');
    }

    static enterCondition(textForCondition: string) {
        return cy
            .get('.form-group')
            .find('.form-control')
            .type(textForCondition);
    }

    static getMessageForNotDisplayingData(row: number) {
        return cy
            .get('.modal-body')
            .find('.scrollable-wrapper')
            .find('.ng-star-inserted')
            .find('span')
            .eq(row)
            .invoke('text');
    }

    static getNoDisplayingDataMessage() {
        return cy
            .get('.exporter-modal')
            .find('.modal-body')
            .find('.scrollable-wrapper')
            .find('.exporter-properties-selector-container')
            .invoke('text');
    }

    static getTemperatureForStressStrain(column: number) {
        return cy
            .get('.grid-box')
            .find('.points-wrapper')
            .find('.points-table')
            .find('.points-table-body')
            .find('.ng-star-inserted')
            .find('td')
            .find('label.tm-checkbox.tm-checkbox')
            .eq(column)
            .click();
    }

    static getTableDetails(row: number) {
        return cy
            .get('.custom-table-wrapper')
            .find('.custom-details-table.extended-range')
            .find('tr')
            .find('td')
            .eq(row)
            .invoke('text');
    }

    static getTableHeader() {
        return (
            cy
                .get('.custom-table-wrapper')
                .find('.custom-table-header')
                // .find('th')
                .invoke('text')
        );
    }

    static getExportRemainingMessage() {
        return cy.get('.user-access-message').find('span').invoke('text');
    }

    static checkIfTemperatureAreSelected(column: number) {
        return cy
            .get('.grid-box')
            .find('.points-wrapper')
            .find('.points-table')
            .find('.points-table-body')
            .find('.ng-star-inserted')
            .find('td')
            .find('.tm-checkbox')
            .eq(column);
    }

    static checkTemperatureMessageWindow() {
        return cy.get('.confirmation-dialog-wrapper').find('h3').invoke('text');
    }

    static isTemperatureMessageWindowOpen() {
        return cy.get('.confirmation-dialog-wrapper');
    }

    static enterSolver(searchSolver: string) {
        return cy
            .get('.form-group')
            .find('.searchable-dropdown')
            .type(searchSolver)
            .contains('.ng-option', searchSolver)
            .click();
    }

    static checkIfPropertiesAreDisplayed() {
        return cy
            .get('.modal-body')
            .find('.scrollable-wrapper')
            .find('.exporter-properties-selector-container')
            .find('.checkboxes-wrapper');
    }

    static visibleSolverDdl() {
        return cy.get('.searchable-dropdown');
    }

    static getTitlesForDdls() {
        return cy
            .get('.exporter-search-wrapper')
            .should('be.visible')
            .find('label');
    }

    static getSelectedOptionInDdlForSolver() {
        return cy.get('.ng-select-container').find('.ng-value-container');
    }

    static getStandardFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="standard"]')
            .invoke('text');
    }

    static getDataCreatedFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="dateCreated"]');
    }

    static getPreviousExportStandards() {
        const standards = [];
        return (
            cy
                .get('.filter-item')
                // .find('.filter-item')
                // .find('label')
                .each((title) => {
                    standards.push(title.text());
                    return cy.wrap(standards);
                })
        );
    }
}

export default new Exporter();
