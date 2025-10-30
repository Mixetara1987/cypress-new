export class SmartCompStandardMode {
    static getStandardModeSearchBox() {
        return cy.get('.standard-search-box-body');
    }

    static getChemicalCompositionBoxesStandardMode() {
        return cy.get('.standard-search-content');
    }

    static getChemicalCompositionBoxesTitleStandardMode() {
        return cy
            .get('.standard-search-box-body-title')
            .find('p')
            .invoke('text');
    }

    static clickOnSomewhereOnSearchBoxStandardMode() {
        cy.get('.standard-search-box-body').click();
    }

    static getBaseElementStandardModeTitle() {
        return cy.get('.standard-search-base-element').find('p').invoke('text');
    }

    static getBaseElement() {
        return cy.get('#baseElementDropdownMenuButton').invoke('attr', 'value');
    }

    static getStandardDropDownStandardModeTitle() {
        return cy
            .get('.standard-search-dropdown-wrapper')
            .find('p')
            .invoke('text');
    }

    static getSimilarityThresholdStandardModeTitle(row: number) {
        return cy
            .get('.standard-search-slider')
            .find('p')
            .eq(row)
            .invoke('text');
    }
}
export default new SmartCompStandardMode();
