export class ComplianceAssessor {
    static clickOnCompliance() {
        cy.contains('a', 'Compliance').click();
    }

    static clickOnSubstances() {
        cy.contains('a', 'Substances').click();
    }

    static navigateToComplianceSearchPage() {
        cy.visit(`en/compliance/materials`);
    }

    static navigateToSubstancesSearchPage() {
        cy.visit(`en/compliance/substances`);
    }

    static navigateToMaterial(materialId: number) {
        cy.visit(`en/compliance/materials/${materialId}/compliance`);
    }

    static navigateToSubstances(materialId: number) {
        cy.visit(`en/compliance/substances/${materialId}/substances`);
    }

    static getTitle() {
        return cy.get('.module-header-title').find('h1').invoke('text');
    }

    static getTabTitle() {
        return cy
            .get('.tm-tab-button-wrapper')
            .find('.tab-text')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getCriterionDdlList() {
        return cy
            .get('#searchDropdown')
            .click()
            .find('ng-dropdown-panel')
            .find('.ng-dropdown-panel-items')
            .find('.ng-option')
            .then(($defaultMaterialGroup) => {
                return Cypress.$.makeArray($defaultMaterialGroup).map(
                    (textGroup) => textGroup.textContent,
                );
            });
    }

    static getConditionDDlFiltersTitles() {
        return cy
            .get('.column-2.dropdown-filters')
            .find('.filter-wrapper')
            .find('label');
    }

    static getTitlesInDDlFilters() {
        const titlesOfTabs = [];
        return cy
            .get('.form-group')
            .get('label')
            .each(($X) => {
                titlesOfTabs.push($X.text());
                return cy.wrap(titlesOfTabs);
            });
    }

    static getColumnHeaders() {
        return cy
            .get('.properties-table-wrapper')
            .get('.custom-table-header')
            .find('th')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getColumnHeadersOptionTwo() {
        return cy
            .get('.ag-header-row.ag-header-row-column')
            .get('.ag-header-cell')
            .find('.ag-header-cell-text')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getColumnHeadersOptionThree() {
        return cy
            .get('app-substances-details')
            .get('.custom-table-header')
            .find('th')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getConditionDDlFiltersTitlesSubstances() {
        return cy.get('.accordion-body').find('.filter-wrapper').find('label');
    }

    static isEnabledToSelect(type: string) {
        cy.wait(500);
        return cy
            .get('.accordion-body-wrapper')
            .contains('#searchDropdown', type)
            .parents('.filter-wrapper')
            .find('.ng-input')
            .find('input');
    }

    static getLabelTextIfNoItem() {
        return cy.get('.tm-alert').find('.alert-label').invoke('text');
    }

    // modal
    static getTextInModalMessage() {
        return cy.get('.modal-body').invoke('text');
    }

    static clickOnYESinModal() {
        cy.get('.modal-footer').contains('.tm-filter-button', 'Yes').click();
    }

    // modal
    static checkForPreselectedValues(index: number) {
        return cy
            .get('.form-group-wrapper')
            .find('.form-group')
            .eq(index)
            .find('.searchable-dropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-value')
            .find('.ng-value-label')
            .invoke('text');
    }

    static getTextForSelectedDDLFilters(index: number) {
        return cy
            .get('#searchDropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .get('.ng-value')
            .eq(index)
            .find('.ng-value-label')
            .invoke('text');
    }

    static getTextForSelectedSubstanceName(index: number, row: number) {
        return cy
            .get('.accordion-body-wrapper')
            .find('.accordion-body')
            .get('.column-1')
            .find('.quick-search')
            .find('.quick-search-filters')
            .find('.filters-wrapper')
            .eq(index)
            .find('.filter-wrapper')
            .eq(row)
            .get('.form-control')
            .invoke('prop', 'value');
    }

    static showFlagCompliance(index: number) {
        return cy.get('.custom-details-table ').find('tr').find('td').eq(index);
    }

    static visibleDDLFilters(column: number, row: number) {
        return cy
            .get('.accordion-body')
            .find('.column-1')
            .find('.quick-search')
            .find('.filters-wrapper')
            .eq(column)
            .find('.filter-wrapper')
            .eq(row);
    }

    static visibleRadioButtons(column: number, index: number) {
        return cy
            .get('.accordion-body')
            .find('.column-1')
            .find('.quick-search')
            .find('.filters-wrapper')
            .eq(column)
            .find('.filter-wrapper.radio-btn-holder')
            .find('label')
            .eq(index);
    }

    static visibleRadioButtons1(index: number) {
        return cy
            .get('.column-1')
            .find('.quick-search')
            .get('.filter-wrapper.radio-btn-holder')
            .find('label')
            .eq(index);
    }

    static getDefaultRadioButton(row: number, index: number) {
        return cy
            .get('.column-1')
            .find('.filters-wrapper')
            .eq(row)
            .find('.filter-wrapper.radio-btn-holder')
            .eq(index)
            .find('.form-control')
            .invoke('prop', 'checked');
    }

    static clickOnRadioButton(name: string, index: number) {
        cy.get('.column-1');
        cy.contains('.filters-wrapper .filter-wrapper.radio-btn-holder', name)
            .find('.tm-radio')
            .eq(index)
            .click();
    }

    static getDefaultRadioButtonListOfSubstances(row: number) {
        return cy
            .get('.column-2')
            .find('.filter-wrapper')
            .eq(row)
            .find('.form-control')
            .invoke('prop', 'checked');
    }

    static clickOnRadioButtonListOfSubstances(row: number) {
        return cy
            .get('.column-2')
            .find('.filter-wrapper')
            .eq(row)
            .find('.tm-radio')
            .click();
    }

    static enterSubstanceName(textForSubstanceName: string) {
        return cy
            .get('.filters-wrapper')
            .find('.filter-wrapper')
            .eq(0)
            .find('.form-control')
            .clear()
            .type(textForSubstanceName);
    }

    static enterSubstanceNumber(textForSubstanceNumber: string) {
        return cy
            .get('.filters-wrapper')
            .find('.filter-wrapper')
            .eq(2)
            .find('.form-control')
            .clear()
            .type(textForSubstanceNumber);
    }

    static getLinkOfSubstances() {
        return cy.get('.designation-info').invoke('text');
    }

    static getMaterialDesignationTitle(index: number) {
        return cy
            .get('.header-designation-wrapper')
            .eq(index)
            .find('.material-designation-text')
            .invoke('text');
    }

    static getMaterialStandardTitle(index: number) {
        return cy
            .get('.header-designation-wrapper')
            .eq(index)
            .find('.standard')
            .invoke('text');
    }

    static clickOnLinkOfGroupOFSubstances() {
        // return cy.get('.tab-content-wrapper')
        cy.get('app-substances-regulation-groups')
            // .find('.substances-rohs-groups')
            .find('a')
            .click();
    }

    static clickOnLinkedMixtureSubstances(index: number) {
        return (
            cy
                .get('.substances-crm-components-wrapper')
                .find('.mixture-component-wrapper')
                .eq(index)
                // .find('.substances-rohs-groups')
                .find('a')
                .click()
        );
    }

    static clickOnLinkViewSustances(conditionRow: number) {
        return cy
            .get('.ng-star-inserted')
            .get('.material-info-value')
            .eq(conditionRow)
            .click();
    }

    static clickOnViewSubstancesLink(viewSubstance: string) {
        return cy
            .get(`.designation-info`)
            .contains('a', `${viewSubstance}`)
            .click();
    }

    static clickOnSubstanceComponents(components: string) {
        return cy
            .get(`.material-info-value`)
            .contains('a', `${components}`)
            .click();
    }

    static clickOnLinkedChemicalComposition(
        row: number,
        index: number,
        viewCASNUmber: string,
    ) {
        return cy
            .get(`.points-table-body`)
            .find('table')
            .find('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(index)
            .contains('a', `${viewCASNUmber}`)
            .click();
    }

    static mouseHoverTooltipOverFlagOptionOne(index: number, column: number) {
        return cy
            .get('.custom-details-table')
            .find('tr')
            .eq(index)
            .find('td')
            .eq(column)
            .find('.ng-star-inserted')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static mouseHoverTooltipOverFlagOptionTwo(index: number, column: number) {
        // return cy.get('.custom-details-table.compliance')
        return cy
            .get('.custom-details-table')
            .find('tr')
            .eq(index)
            .find('td')
            .eq(column)
            .find('.image')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static mouseHoverOptionOne(index: number, column: number) {
        return cy
            .get('.custom-details-table')
            .find('tr')
            .eq(index)
            .find('td')
            .eq(column)
            .find('span')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static mouseHoverOptionFour(index: number, column: number, row: number) {
        return cy
            .get('.custom-details-table')
            .find('tr')
            .eq(index)
            .find('td')
            .eq(column)
            .find('span')
            .eq(row)
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static mouseHoverOptionRoHS(index: number, column: number) {
        return (
            cy
                .get('.custom-details-table')
                .find('tr')
                .eq(index)
                .find('td')
                .eq(column)
                // .find('.width-12')
                .trigger('mouseenter')
                .get('ngb-tooltip-window')
                .invoke('text')
        );
    }

    static getMouseHoverOptionThree(index: number, column: number) {
        return cy
            .get('.custom-details-table')
            .find('tr')
            .eq(index)
            .find('td')
            .eq(column)
            .find('.icon-info')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static colorOfSelectedRadioButtonSubstances(name: string) {
        return cy
            .get('.column-2')
            .contains('.filter-wrapper label', name)
            .find('.icon-check_box_outline_blank');
    }

    static colorOfSelectedOnRadioButton(name: string) {
        return cy
            .get('.column-1')
            .contains('.filter-wrapper label', name)
            .find('.icon-check_box_outline_blank');
    }

    static getTextForSelectedCountryAndAccording(index: number) {
        return cy
            .get('.compliance-header-actions-wrapper')
            .find('.form-group')
            .eq(index)
            .find('.searchable-dropdown')
            .click()
            .find('.ng-value-container')
            .find('.ng-placeholder')
            .invoke('text');
    }

    static getHazardColumnTitles(index: number) {
        return cy
            .get('app-substances-details')
            .find('table')
            .find('th')
            .eq(index)
            .invoke('text');
    }

    static getHazardPictogramColumnTitles(index: number) {
        return cy
            .get('app-compliance-hazard')
            .find('table')
            .find('th')
            .eq(index)
            .invoke('text');
    }

    static colorOfPinedMaterial() {
        return cy
            .get('.header-element')
            .find('.header-actions')
            .find('.pin-button');
    }

    static clickOnRemoveMaterialButton(index: number) {
        cy.get('.remove-button').eq(index).click();
    }

    static checkStatusIconColor(index: number) {
        return cy.get('.status-icon').eq(index);
    }

    static checkSubstanceStatusIconColor(name: string) {
        return cy
            .contains('.cmp-table-wrapper tbody tr', name)
            .find('.status-icon');
    }

    static checkTooltipValueColor(column: number) {
        return cy.get('i.icon-info.ng-star-inserted').eq(column);
    }

    static checkStatusIcon(index: number) {
        return cy.get('tbody').eq(index).find('.status-icon.green-icon');
    }

    static checkStatusIconOptionTwo(index: number) {
        return cy.get('tbody').eq(index).find('.status-icon.ng-star-inserted');
    }

    static checkStatusIconOptionThree(index: number, row: number) {
        return cy
            .get('tbody')
            .eq(index)
            .find('tr')
            .eq(row)
            .find('i.status-icon.green-icon.ng-star-inserted');
    }

    static checkForPinButton() {
        return cy.get('.pin-button');
    }

    static mouseOverCheckMarkAndGetText(index: number) {
        return cy
            .get('.header-actions > .status-wrapper > .status-icon')
            .eq(index)
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .should('be.visible')
            .invoke('text')
            .then((tooltipText: string) => {
                // Hide the tooltip
                return cy
                    .get('.header-actions > .status-wrapper > .status-icon')
                    .eq(index)
                    .trigger('mouseleave')
                    .wait(700)
                    .then(() => tooltipText); // Return the tooltip text after hiding the tooltip
            });
    }

    static mouseOverCheckMarkAndGetTextOptionTwo(index: number) {
        return cy
            .get('.comparison-view-body-header')
            .find('.header-element')
            .eq(index)
            .find('.header-actions')
            .find('.status-wrapper')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static mouseOverForReachTooltip() {
        // return cy.get('span.ng-tns-c204-0 > .icon-info')
        return cy
            .get('.icon-info')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static mouseOverBeforeAssessbutton() {
        return cy
            .get('span > .icon-info')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static mouseOverTooltipInfoFromTableOptionTwo(name: string) {
        return cy
            .get('.chemical-property-element')
            .contains('.cmp-table-wrapper tbody tr', name)
            .find('i.status-icon')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .should('be.visible')
            .invoke('text')
            .then((tooltipText: string) => {
                // Hide the tooltip
                return cy
                    .get('.chemical-property-element')
                    .contains('.cmp-table-wrapper tbody tr', name)
                    .find('i.status-icon')
                    .trigger('mouseleave')
                    .wait(800)
                    .then(() => tooltipText); // Return the tooltip text after hiding the tooltip
            });
    }

    /*  static clickSomeWhereOnCompliancePage() {
        cy.get('.comparison-view-body').click();
    }*/

    static mouseOverTooltipInfoFromTable(index: number) {
        return cy
            .get('.chemical-text-preview > .icon-info')
            .eq(index)
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static getTextForSubstances(name: string) {
        return cy
            .get('.chemical-property-element')
            .contains('.cmp-table-wrapper tbody tr', name)
            .invoke('text');
    }

    static clickOnLinkForSubstances(index: number, row: number, link: string) {
        return cy
            .get('.accordion-body')
            .find('.chemical-property-element')
            .eq(index)
            .find('.cmp-table-wrapper')
            .find('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .contains('a', `${link}`)
            .click();
    }

    static clickOnExemption(column: number) {
        cy.wait(1000);
        return cy
            .get('.exemptions-button-wrapper')
            .eq(column)
            .find('.exemptions-button')
            .click();
    }

    static clickOnViewLink(row: number, column: number, link: string) {
        cy.wait(1000);
        return cy
            .get('.custom-details-table')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(column)
            .contains('a', `${link}`)
            .click();
    }

    static checkForExemption(column: number) {
        cy.wait(1000);
        return cy.get('.exemptions-button-wrapper').eq(column);
    }

    static RoHSCheckBoxes(index: number) {
        return cy
            .get('.checkboxes-wrapper')
            .find('label')
            .eq(index)
            .invoke('text');
    }

    static getDefaultRoHSCheckBOx(index: number) {
        return cy
            .get('.checkboxes-wrapper')
            .find('label')
            .eq(index)
            .find('.form-control')
            .invoke('prop', 'checked');
    }

    static ClickOnExemptionBox(index: number) {
        return cy.get('.checkboxes-wrapper').find('label').eq(index).click();
    }

    static colorOfExemptionBox(nameOfCheckbox: string) {
        return cy
            .get('.checkboxes-wrapper')
            .find('label')
            .contains('.tm-checkbox', nameOfCheckbox);
    }

    static getRoHSCategories() {
        return cy.get('.compliance-general-wrapper');
    }

    static getChemicalMessage(index: number) {
        return cy
            .get('assessor-chemical-composition')
            .eq(index)
            .find('.cmp-message-wrapper')
            .find('.cmp-message')
            .invoke('text');
    }

    static clickSomeWhereOnPictogramTable(index: number) {
        cy.get('.custom-details-table').eq(index).click();
    }

    static clickOnAddToReportBuidler() {
        return cy.get('.add-to-report-btn').should('be.visible').click();
    }

    static clickOnPrintToPdf() {
        return cy.get('.print-to-pdf-btn').should('be.visible').click();
    }

    static getModalWindowTitle() {
        return (
            cy
                .get('.modal-content')
                // .find('app-addtobookmarkmodal')
                // .find('.modal-save-wrapper')
                .find('.modal-header')
                .find('b')
                .invoke('text')
        );
    }

    static getComplianceHeaderColumns(index: number) {
        const defaultpropertyTableColumnHeaders = [];
        return cy
            .get('.cmp-wrapper')
            .find('.cmp-table-wrapper')
            .find('table')
            .eq(index)
            .find('thead')
            .find('tr')
            .find('th')
            .each(($X) => {
                defaultpropertyTableColumnHeaders.push($X.text());
                return cy.wrap(defaultpropertyTableColumnHeaders);
            });
    }

    static checkForSpecificExemptions() {
        return cy.get('.form-group');
    }

    static getSubstanceDropDownTitle() {
        return cy.get('.form-group').find('label').invoke('text');
    }

    static getExemptionSubstanceMessage() {
        return cy.get('.rohs-specific-info').invoke('text');
    }

    static clickOnSubstancesDdl(nameOfSubstance: string) {
        cy.get('.searchable-dropdown')
            .click()
            .find('.ng-select-container')
            .find('.ng-value-container');
        cy.contains('.ng-star-inserted', `${nameOfSubstance}`)
            .click({ force: true }) // TODO check method
            .get('.ng-value-label');
    }

    static getConflictMinerasComment() {
        return cy
            .get('.compliance-view-wrapper')
            .find('.content-wrapper')
            .invoke('text');
    }

    static getMixtureText() {
        return cy
            .get('.substances-crm-components-wrapper')
            .find('.conflict-info-label')
            .invoke('text');
    }

    static clickOnComplinaceSlider() {
        cy.get('app-green-line span.slider').should('be.visible').click();
    }

    static colorOfSelectedRoHSCountry(country_name: string) {
        return cy
            .contains('span', country_name)
            .parents('.tm-checkbox')
            .find('.icon-check_box_outline_blank');
    }

    static getNumberOfRowsInRoHS() {
        return cy
            .get('.properties-table-wrapper')
            .find('.custom-details-table')
            .find('tr');
    }

    static getNumberOfColumnsInRoHS() {
        return cy
            .get('.custom-table-wrapper')
            .find('.custom-table-header')
            .find('th');
    }

    static getTextInConflictMinerals() {
        return cy.get('.content-wrapper').find('span').invoke('text');
    }

    static getTransportMessage() {
        return cy.get('.hiden-properties-wrapper').invoke('text');
    }
}
export default new ComplianceAssessor();
