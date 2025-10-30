export class SmartCompQA {
    static navigateToSmartCompQA() {
        cy.visit(`en/smart-comp/qa`);
    }

    static getChemicalCompositionBoxesQAMode() {
        return cy.get('.standard-search-box-body');
    }

    static getAddMaterialsDropDownQAModeTitle() {
        return cy.get('.col').find('p').invoke('text');
    }

    static mouseOverToolTipThreshHoldSensitivityQAMode(row: number) {
        cy.get('.qa-search-threshold-sensitivity')
            .find('i')
            .eq(row)
            .trigger('mouseenter');
        return cy
            .get('.header-tooltip')
            .invoke('text')
            .then((tooltipText: string) => {
                cy.get('.qa-search-threshold-sensitivity')
                    .find('i')
                    .eq(row)
                    .trigger('mouseleave')
                    .wait(700)
                    .then(() => tooltipText);
            });
    }

    static showAddMaterialsWindow() {
        return cy
            .get('.select-material-ngb-dropdown')
            .find('.add-material-dropdown');
    }

    static enterMaterialInBox(textOfMaterial: string) {
        cy.get('.dropdown')
            .find('[placeholder="Material ID"]')
            .type(textOfMaterial);
    }

    static enterMaterialInMaterialDesignationBox(textOfMaterial: string) {
        cy.get('.d-flex.tm-filter-buttons-wrapper')
            .find('[placeholder="Material designation"]')
            .type(textOfMaterial);
    }

    static clickOnMaterialFromList(index: number) {
        cy.get('.materials-list').find('.dropdown-item').eq(index).click();
    }

    static clickSearchButton(index: number) {
        cy.get('.tm-filter-button-submit').eq(index).click();
    }

    static clearAddedMaterial() {
        cy.get('.py-1 > .icon-clear').click();
    }

    static getAddTOMaterialsTitleWindow() {
        return cy.get('.modal-header').find('b').invoke('text');
    }

    static checkIfMaterialDesignationFieldIsVisible() {
        return cy.get('.modal-body').find('form').find('.d-flex');
    }

    static checkIfStandardDropDOwnIsVisible() {
        return cy
            .get('.modal-body')
            .find('form')
            .find('[data-qa="standardDropdown"]');
    }

    static checkIfAddMaterialsButtonIsVisible() {
        return cy
            .get('.tm-filter-buttons-wrapper')
            .find('.tm-filter-button.primary');
    }

    static checkIfCancelButtonIsVisible() {
        return cy.get('.tm-filter-buttons-wrapper').find('.tm-filter-button');
    }

    static clickOnCheckBox(rowIndex: number) {
        cy.get('.ag-center-cols-container');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="designation"]')
            .click();
    }

    static addToMaterialsButton() {
        return cy.get('.tm-filter-buttons-wrapper').find('.primary').click();
    }

    static listOFSelectedMaterials(Index: number) {
        return cy
            .get('.row.mx-0.mt-2')
            .find('.py-1.px-2')
            .eq(Index)
            .invoke('text');
    }
}
export default new SmartCompQA();
