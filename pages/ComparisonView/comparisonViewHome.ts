/// <reference types="cypress" />

export class ComparisonViewHome {
    static getTextInMaterialDesignation(index: number) {
        return cy
            .get('.comparison-view-body-header')
            .get('.header-designation-wrapper')
            .eq(index)
            .find('span.material-designation-text')
            .invoke('text');
    }

    static getTitle() {
        return cy
            .get('.module-header')
            .find('.module-header-title')
            .find('h1')
            .then((title) => {
                return title.text();
            });
    }

    static getNumberInLink(link: string) {
        return cy
            .get('.mmc-header-list')
            .contains('span.list-link-text', link)
            .siblings('.mmc-number')
            .invoke('text');
    }

    static clickOnLink(link: string) {
        cy.get('.mmc-header-list')
            .contains('span.list-link-text', link)
            .click();
    }

    static clickOnClearAllMaterials() {
        cy.get('.actions-list')
            .contains('button[type="button"]', ' Clear all ')
            .click();
    }

    static clickOnPrintToPDF() {
        cy.get('.print-to-pdf-btn').click();
    }

    static getTextInPrintTopdfModalAlert() {
        return cy.get('.alert-info').invoke('text');
    }

    static closePDFAlert() {
        cy.get('.print-to-pdf-modal').contains('button', 'Close').click();
    }

    static clickOnClearAllProperties() {
        cy.get('.clear-btn-wrapper')
            .contains('button[type="button"]', ' Clear all ')
            .click();
    }

    static ClickOnYesInModal() {
        cy.get('.modal-footer')
            .contains('.tm-filter-button-submit', 'Yes')
            .click();
    }

    static clickOnSubmit() {
        cy.get('.tm-filter-button-submit').click();
    }

    static selectPropertyOnX(ddlItem: string) {
        cy.get('.ng-value-container')
            .eq(0)
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .contains('div', ddlItem)
            .click();
    }

    static selectPropertyOnY(ddlItem: string) {
        cy.get('.ng-value-container')
            .eq(3)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', ddlItem)
            .click();
    }

    static clickOnShowResults() {
        cy.get('.tm-filter-buttons-wrapper')
            .find('button.tm-filter-button-submit')
            .click();
    }

    static getTitleOnYComparison() {
        return cy
            .get('svg')
            .get('.highcharts-yaxis')
            .find('span')
            .invoke('text');
    }

    static getTitleOnXComparison() {
        return cy
            .get('svg')
            .get('.highcharts-xaxis')
            .find('span')
            .invoke('text');
    }

    static getMaterialsInComparisonViewOneOnOne() {
        return cy
            .get('one-on-one-comparison')
            .find('.comparison-view-body-header')
            .find('.material-designation-text')
            .should('be.visible')
            .then((material) => {
                return material;
            });
    }

    // comparison table

    // Arrows
    static getLeftArrow() {
        return cy.get('.arrows-wrapper').find('#button-previous');
    }

    static getRightArrow() {
        return cy.get('.arrows-wrapper').find('#button-next');
    }

    static clickOnLeftArrow() {
        return cy.get('.arrows-wrapper').find('#button-previous').click();
    }

    static clickOnRightArrow() {
        return cy.get('.arrows-wrapper').find('#button-next').click();
    }
    // Arrows

    // Basic information
    static getCountryStandardAndMaterialGroup(index: number) {
        return cy
            .get('.basic-info-compare-wrapper')
            .eq(index)
            .find('.basic-info')
            .find('.basic-info-value')
            .invoke('text');
    }

    static mouseOverAddtoReportBuilderAndGetText() {
        return cy
            .get('.actions-list')
            .find('.add-to-report-btn')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static mouseOverPrinttoPdfAndGetText() {
        return cy
            .get('.actions-list')
            .find('.print-to-pdf-btn')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static clickOnAddToReportBuilder() {
        cy.get('.actions-list').find('.add-to-report-btn').click();
    }

    static mouseOverRemoveFromComparisonAndGetText(index: number) {
        return cy
            .get('.header-actions')
            .find('.icon-remove_circle_outline')
            .eq(index)
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static moveMouse() {
        cy.get('.arrows-wrapper').click();
    }
    // Tooltips

    static clickOnPinmaterial(index: number) {
        cy.get('.icon-baseline').eq(index).click();
    }

    static clickOnGLCRT(index: number) {
        cy.get('.icon-gl-cross_reference').eq(index).click();
    }

    static buttonPinmaterial() {
        return cy.get('.pin-button');
    }

    static designationField() {
        return cy.get('.header-element');
    }

    static basicInformationField() {
        return cy.get('.basic-info-element');
    }

    static chemicalCompositionField() {
        return cy.get('.chemical-property-element');
    }

    // Chemical composition
    // Tooltips
    static mouseOverDDLAndGetText(index: number) {
        return cy
            .get('.chemical-property-element')
            .find('.cmp-wrapper')
            .eq(index)
            .find('.cmp-header')
            .trigger('mouseenter')
            .get('ngb-tooltip-window');
    }
    // Tooltips

    static getValuesInChemicalCompositionForMaterial(index: number) {
        return cy
            .get('.chemical-property-element')
            .eq(index)
            .find('.cmp-table-wrapper')
            .find('td');
    }

    static getTextInChemicalParametersForCondition(name: string) {
        return cy
            .get('.chemical-property-element')
            .contains('.cmp-header', name)
            .invoke('text');
    }

    static selectChemicalConditionDDl(index: number, option: number) {
        cy.get('.chemical-property-element')
            .eq(index)
            .find('.ng-select-container')
            .find('.ng-arrow-wrapper')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .eq(option)
            .click();
    }

    // Mechanical tabs
    static clickOnMechanicalTab() {
        cy.get('.mechanical-properties-wrapper')
            .find('.icon-arrow_drop_down')
            .click();
    }

    // Physical tab
    static clickOnPhysicalTab() {
        cy.get('.physical-properties-wrapper')
            .should('be.visible')
            .find('.icon-arrow_drop_down')
            .should('be.visible')
            .click();
    }

    static clickOnSyntheticViewDetailsViewSlider(index: number) {
        cy.get('.accordion-switch')
            .should('be.visible')
            .find('label.tm-switch')
            .eq(index) // mechanical 0, physical 1
            .find('.tm-switch-thumb')
            .click();
    }

    static cllickOnGoToDiagramComparisonInGreenPopup() {
        cy.contains('button', ' Go to Diagram Comparison. ').click();
    }
}
export default new ComparisonViewHome();
