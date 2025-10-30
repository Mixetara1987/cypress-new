/// <reference types="cypress" />

export class ConditionSelectorHeaders {
    static clickOnSyntheticViewDetailsViewSlider() {
        cy.get('app-mechanical-physical-view')
            .should('be.visible')
            .find('.sliderPointer')
            .parent('.view-switcher')
            .find('label.switch')
            .should('be.visible')
            .click();
        // .get('.slider').eq(1).click();
    }

    static getConditionSelectorTitle() {
        return cy.get('.accordion-title').invoke('text');
    }

    static getTooltipOnButtonAddToReportBuilder() {
        return cy
            .get('.action-list')
            .find('.action-item')
            .eq(1)
            .find('.action-button.ng-star-inserted')
            .find('i.icon-note_add')
            .trigger('mouseenter', { force: true })
            .get('.spx-tooltip')
            .eq(1)
            .should('exist')
            .invoke('text');
    }

    static clickOnAddToReportBuilder() {
        cy.get('.action-list')
            .find('.action-item')
            .eq(1)
            .find('.action-button.ng-star-inserted')
            .click();
    }

    static clickOnReset() {
        cy.get('.accordion-header').contains('span', 'Reset').click();
    }

    static clickOnCheckboxAllConditions() {
        cy.get('.table-header-cell-checkbox').click();
    }

    static colorOfSelectedAllConditionChechbox() {
        return cy.get('table-header-cell-checkbox').find('tm-checkbox');
    }

    static getTitle() {
        cy.wait(400);
        return (
            cy
                .get('.module-header-title')
                .as('title')
                // .get('@title')
                .find('h1')
                .invoke('text')
        );
    }

    static getTitleOptionTwo(index: number) {
        cy.wait(500);
        return (
            cy
                .get('.module-header-title')
                .as('title')
                // .get('@title')
                .find('h1')
                .eq(index)
                .invoke('text')
        );
    }

    static getTitleOMultisectefDdlFormability() {
        return cy.get('.form-group-wrapper').find('.form-group');
    }

    static getTitleOMultisectefDdl() {
        return cy.get('.form-group-wrapper').find('.form-group');
    }

    // dodata
    static getTitlesOfDDLptionTwo() {
        return cy.get('.filter-wrapper').find('.title');
    }

    static getTitlesOfDDLptionThree() {
        return cy.get('.filter-wrapper').find('#searchDropdown').find('label');
    }

    static getTableHeader(row: number) {
        return cy.get('.custom-table-header').find('th').eq(row).invoke('text');
    }

    static checkIfTableHeaderIsVisible(row: number) {
        return cy.get('.custom-table-header').find('th').eq(row);
    }

    static checkIfHazardImageIsVisible(row: number) {
        return cy
            .get('.transport-compliance-wrapper')
            .find('.custom-details-table')
            .find('tr')
            .eq(row)
            .find('.image');
    }

    static getSelectedOptionInDdl() {
        return cy.get('.ng-value-container');
    }

    static getSelectedOptionDdlFatigue() {
        return cy.get('#searchableMultiselectDropdown');
    }

    static getSelectedOptionInExemptions() {
        return cy.get('.ng-value-label');
    }

    // dodata
    static getNumbersOfConditions() {
        return cy
            .get('.conditions-wrapper')
            .find('span.table-header-cell-text')
            .invoke('text');
    }

    static numberOfCheckedConditionRows() {
        return cy.get('.selected-row');
    }

    static getPropertyTableHeaderColumnsOptionTwo() {
        return cy
            .get('.condition-details-table-row')
            .find('div')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getPropertyTableHeaderColumnsCompliance() {
        return cy
            .get('.custom-table-header')
            .find('th')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    // dodata
    static getHeaderValuesColumTitles() {
        const headerTitles = [];
        return (
            cy
                .get('.points-table-header')
                .find('.points-table-header-cell')
                // .find('label')
                .each(($X) => {
                    headerTitles.push($X.text());
                    return cy.wrap(headerTitles);
                })
        );
    }

    // dodata
    static getHeaderValues() {
        const headers = [];
        return cy
            .get('.ag-cell-label-container')
            .find('.ag-header-cell-label')
            .find('[ref="eText"]')
            .each((title) => {
                headers.push(title.text());
                return cy.wrap(headers);
            });
    }

    static getHeaderValuesPredictor() {
        const headers = [];
        return cy
            .get('.ag-header')
            .find('.ag-header-cell.ag-focus-managed')
            .each((title) => {
                headers.push(title.text());
                return cy.wrap(headers);
            });
    }

    static getHeaderValuesComposition() {
        return cy
            .get('.points-table-header')
            .find('.points-table-header-cell')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    // dodata
    static getTitleOfMaterial() {
        return cy.get('.material-number').invoke('text');
    }

    // dodata
    static getSearchFiltersBox() {
        return cy.get('.accordion-header-wrapper').invoke('text');
    }

    // dodata
    static getSearchCriteriaBox() {
        return cy.get('#headingSearch').should('be.visible').invoke('text');
    }

    // dodata
    static getForwardToBox() {
        return cy.get('.forwarded-search').invoke('text');
    }

    // dodata
    static getFooterText() {
        return cy.get('.row').find('.col-auto').find('p').invoke('text');
    }

    // dodata
    static getPropertyTableHeaderColumnsExporter() {
        return cy
            .get('.custom-table-header')
            .find('tr')
            .find('th')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getSolverDdllistOptionTwo() {
        return cy
            .get('.form-group')
            .find('.ng-input')
            .click()
            .get('.ng-dropdown-panel')
            .find('.ng-dropdown-panel-items')
            .find('.ng-option.ng-star-inserted')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getSolverDdllistOptionThree() {
        return (
            cy
                .get('.form-group')
                .find('.ng-input')
                .click()
                .get('.ng-dropdown-panel')
                .find('.ng-dropdown-panel-items')
                // .find('div')
                .find('.ng-option')
                .then(($title) => {
                    return Cypress.$.makeArray($title).map(
                        (textTitlte) => textTitlte.textContent,
                    );
                })
        );
    }

    // dodata
    static getPhysicalDetailsViewTaB(indexOfTab: number) {
        return cy
            .get('.tm-tab-selected')
            .should('be.visible')
            .get('.tab-text')
            .eq(indexOfTab)
            .invoke('text');
    }

    //
    static getSearchFilters() {
        return cy.get('.accordion-title').invoke('text');
    }

    // dodata
    static getTitleOfConditionFilters() {
        const titles = [];
        return cy
            .get('.form-group')
            .find('label')
            .each(($X) => {
                titles.push($X.text());
                return cy.wrap(titles);
            });
    }

    static getConditionFiltersTitles() {
        return cy.get('.filter-wrapper').find('.title');
    }

    static getTitleForExposureTemperature(name: string) {
        return cy
            .contains('#searchDropdown', name)
            .find('label')
            .invoke('text');
    }

    static getTitleForIrradiationTypeAndSubTypeFilter(name: string) {
        return cy
            .get('.column-2')
            .contains('#searchDropdown', name)
            .find('label')
            .invoke('text');
    }

    static clickOnSearchFiltersArrowDropdown(index: number) {
        return cy
            .get('button.is-collapsed')
            .find('.icon-arrow_drop_down')
            .eq(index)
            .scrollIntoView()
            .click();
    }

    static clickOnSearchFiltersArrowDropdownByName(name: string) {
        return cy
            .get('button.is-collapsed')
            .should('be.visible')
            .contains('.icon-arrow_drop_down+span', name)
            .scrollIntoView()
            .click();
    }

    static getTitleAfterPageScrollDown() {
        return cy
            .get('.material-title-wrapper')
            .find('.number-and-status-wrapper')
            .find('.number-star-wrapper')
            .invoke('text');
    }

    static showFreezeActionButtonsAfterPageScrollDown(Index: number) {
        return cy
            .get('.material-title-wrapper')
            .find('ul')
            .find('li')
            .eq(Index)
            .invoke('text');
    }

    static getDefaultTab(index: number) {
        return cy
            .get('.tm-tab-button-wrapper')
            .find('button')
            .eq(index)
            .invoke('text');
    }

    static getTitleForUpdateAndPropertyGroupFilters(index: number) {
        return cy
            .get('.column-3.dropdown-filters')
            .find('.filter-wrapper')
            .eq(index)
            .find('.form-group')
            .find('label')
            .invoke('text');
    }

    static getRoHSFiltersTitle(index: number) {
        return cy
            .get('.form-group-wrapper')
            .find('.form-group')
            .eq(index)
            .find('label')
            .invoke('text');
    }
}

export default new ConditionSelectorHeaders();
