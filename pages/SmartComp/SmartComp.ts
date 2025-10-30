export class SmartComp {
    static navigateToSmartCompStandard() {
        cy.visit(`en/smart-comp/standard`);
    }

    static getBaseElement() {
        return cy.get('#baseElementDropdownMenuButton').invoke('attr', 'value');
    }

    static getSelectedMaterial() {
        return cy.get('.py-1.px-2');
    }

    static clickOnBaseElement(element: number) {
        cy.get('#baseElementDropdown')
            .click()
            .find('.dropdown-menu')
            .find(`a`)
            .eq(element)
            .click();
    }

    static clickOnBaseElementDDl() {
        cy.get('#baseElementDropdown').click();
    }

    static clickOnBaseElementOptionTwo(element: string) {
        cy.get('#baseElementDropdown').click();
        return cy
            .contains('.dropdown-menu', element)
            .click({ force: true })
            .then(() => {
                return element;
            });
    }

    static showImportWindow() {
        return cy.get('.modal-content');
    }

    static getImportTitle() {
        return cy.get('.modal-header').find('b').invoke('text');
    }

    static getDropDownFormatTitle() {
        return cy
            .get('.modal-body')
            .find('.body-wrapper')
            .find('.filter-wrapper')
            .find('span')
            .invoke('text');
    }

    static checkdefaultFormatDropDownBox() {
        return cy
            .get('.searchable-dropdown')
            .find('.ng-select-container')
            .find('.ng-placeholder')
            .invoke('text');
    }

    static checkOkButton() {
        return cy.get('.btn.btn-primary');
    }

    static checkCancelButton() {
        return cy.get('.btn.btn-second-footer');
    }

    static clickOnSelectedStandard(indexOfCheckBox: number) {
        cy.get('.icon-check_box_outline_blank').eq(indexOfCheckBox).click();
    }

    static mouseHoverTooltipAndGetText() {
        return cy
            .get('.module-header')
            .get('.module-header-help')
            .trigger('mouseenter')
            .get('.header-tooltip')
            .invoke('text')
            .then((text: string) => {
                cy.get('.module-header-help').trigger('mouseleave');
                return cy.wrap(text);
            });
    }

    static mouseHoverTooltipOnValueInTable(column: number) {
        cy.get('.chemistry-container')
            .find('chemical-composition')
            .find('.chemical-composition-container')
            .find('.mt-2')
            .find('table')
            .find('tbody')
            .find('tr')
            .eq(column)
            .find('td')
            .find('span')
            .find('i')
            .trigger('mouseenter');
        return cy.get('.show.tooltip').invoke('text');
    }

    static checkIfMaterialDetailsIsVisible() {
        return cy.get('.chemistry-container.bordered-div.material-details');
    }

    static getMaterialDetailsDataTitle(row: number, index: number) {
        return cy
            .get('.chemistry-container')
            .find('table')
            .find('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(index)
            .invoke('text');
    }

    static getMaterialDetailsDataInTableColumnHeaders(
        column: number,
        index: number,
    ) {
        return cy
            .get('.chemistry-container')
            .find('chemical-composition')
            .find('.chemical-composition-container')
            .find('.mt-2')
            .find('table')
            .find('thead')
            .eq(column)
            .find('tr')
            .find('th')
            .eq(index)
            .invoke('text');
    }

    static getMaterialDetailsDataInTable(row: number) {
        return cy
            .get('.chemistry-container')
            .find('chemical-composition')
            .find('.chemical-composition-container')
            .find('.mt-2')
            .find('table')
            .find('tbody')
            .find('tr')
            .eq(row)
            .invoke('text');
    }

    static colorOfOutOfRangeValues(row: number) {
        return cy
            .get('.chemical-composition-container')
            .find('.mt-2')
            .find('table')
            .find('tbody')
            .find('tr')
            .eq(row)
            .find('td');
    }

    static clickOnViewMaterialPropertiesButton() {
        return cy
            .get('.chemistry-container')
            .find('.btn.btn-secondary')
            .click();
    }

    static chooseFormatImportType(name: string) {
        return cy
            .get('ng-select.searchable-dropdown')
            .click()
            .get('.ng-dropdown-panel')
            .contains(
                '.ng-dropdown-panel-items.scroll-host .ng-option.ng-star-inserted',
                name,
            )
            .click()
            .invoke('text');
    }

    static importExcelFile() {
        // cy.contains('#buttonImport', 'Browse').click();
        cy.get('#buttonImport').click({ force: true });
    }

    static clickOnClearToDeselectImport(row: number) {
        return cy
            .get('ng-select.searchable-dropdown')
            .click()
            .get('.ng-dropdown-panel')
            .find('.ng-dropdown-panel-items.scroll-host')
            .find('.ng-option.ng-star-inserted')
            .eq(row)
            .click()
            .find('.ng-clear-wrapper')
            .click();
    }

    static getTextAfterSelectingImportFormat() {
        return cy
            .get('.importing-template-wrapper')
            .find('.importing-template')
            .find('.text-above')
            .invoke('text');
    }

    static checkIfOkButtonInsideImportAreDisabled() {
        return cy
            .get('.import-file-modal')
            .find('.modal-body')
            .find('.modal-footer')
            .find('.btn.btn-primary');
    }

    static getImportFile() {
        return cy.get('#buttonImport').click();
    }

    static closeImportButtonWindow() {
        return cy.get('.modal-header').find('.close').click();
    }

    static buttonToChooseImport() {
        return cy
            .get('.importing-template-wrapper')
            .find('.importing-template')
            .find('#chemistryFileImport')
            .find('#buttonImport')
            .click();
    }

    static colorOfSelectedSmartCompTab(tabName: string) {
        return cy
            .get('.nav-item.ng-star-inserted')
            .contains('.nav-link', tabName)
            .should('have.class', 'selected')
            .then(($tab) => {
                const computedStyle = window.getComputedStyle(
                    $tab[0],
                    '::after',
                );
                return computedStyle.getPropertyValue('background-color');
            });
    }

    static clickOnSmartCompTab(link: string) {
        return cy
            .get('.navbar-nav')
            .find('.nav-item')
            .contains('a', `${link}`)
            .click();
    }

    static clickOnMaterialFromRow(rowIndex: number) {
        cy.get('[col-id="materialMetadata.designation"]').eq(rowIndex).click();
    }

    static clickSearchButtMaterialSearch() {
        return cy
            .get('.material-search-modal')
            .find('.tm-filter-button-submit')
            .find('.icon-search ')
            .click();
    }

    static getMessageForNonCompositionData() {
        return cy.get('.chemistry-container').find('.message').invoke('text');
    }

    static clickOnCheckboxAll() {
        cy.get('.ag-header-row-column > .ag-column-last')
            .should('exist')
            .click();
    }

    static getTextForFormatLink(row: number) {
        return cy
            .get('.importing-template-wrapper')
            .find('.importing-template')
            .find('span')
            .eq(row)
            .invoke('text');
    }

    static clickOnClearButton() {
        cy.get('#buttons').contains('.tm-filter-button', 'Clear').click();
    }

    static checkImportButton() {
        return cy.get('.btn-secondary.ms-3.tm-action-button');
    }

    static clickOnImportButton() {
        cy.get('.accordion-body').find('.btn.btn-secondary').click();
    }
}
export default new SmartComp();
