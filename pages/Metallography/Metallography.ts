export class Metallography {
    static navigateToMaterial(materialId) {
        cy.visit(`en/search/quick/materials/${materialId}/metallography`);
    }

    static isSearchBoxVisible() {
        return cy.get('.form-control');
    }

    static clickOnDiagramPicture(numberOfPicture: number) {
        return cy.get('.tm-gallery-cards-col').eq(numberOfPicture).click();
    }

    static getImageIsDisplayed() {
        return cy.get('.image-wrapper').get('.image');
    }

    static getTextOfCondition() {
        return cy.get('.diagram-box').find('.header-box').invoke('text');
    }

    static getNumberOfEnlargment() {
        return cy.get('.enlargement').invoke('text');
    }

    static getGeneralInformationTableTitle() {
        return cy.get('.condition-table-wrapper').find('h3').invoke('text');
    }

    static getTitleBeneathImage() {
        return cy.get('.counter').invoke('text');
    }

    static getGeneralInformationTableCondition() {
        return cy
            .get('.condition-table-wrapper')
            .find('thead')
            .find('tr')
            .find('td')
            .invoke('text');
    }

    static getGeneralInformationTableData(index: number) {
        return cy
            .get('.condition-table-wrapper')
            .find('tr')
            .find('td')
            .eq(index)
            .invoke('text');
    }

    static getTitleForAllReferences() {
        return cy
            .get('.content-wrapper')
            .find('.reference-list-wrapper')
            .find('h4')
            .invoke('text');
    }

    static getTextInForAllReferences() {
        return cy
            .get('.content-wrapper')
            .find('.reference-list-wrapper')
            .find('ol')
            .find('li')
            .invoke('text');
    }

    static closeTheImage() {
        cy.get('.diagram-close').click();
    }

    static clickOnShowAllButton() {
        cy.get('.show-all-button-holder').click();
    }

    static clickOnShowLessButton() {
        cy.get('.show-all').click();
    }

    static enterStandard(textOfCondition: string) {
        cy.get('.form-control').type(textOfCondition);
    }

    static clearTheSearch() {
        cy.get('.form-group').find('.icon-clear').click();
    }

    static getColumnHeaders() {
        return cy.get('.points-table-header').invoke('text');
    }

    static getChemicalCompositionTableData(index: number) {
        return cy
            .get('.points-table-body')
            .find('tr')
            .find('td')
            .eq(index)
            .invoke('text');
    }

    static getChemicalCompositionTableTitle() {
        return cy
            .get('.chemical-composition-wrapper')
            .find('h3')
            .invoke('text');
    }

    static changeTheImage() {
        cy.get('#next').click();
    }

    static mouseOverCheckMarkAndGetText(index: number) {
        return cy
            .get('.tm-gallery-cards-container')
            .find('.tm-gallery-cards-wrapper')
            .find('.tm-gallery-cards-row')
            .find('.tm-gallery-cards-col')
            .eq(index)
            .find('.dialog-container')
            .find('.diagram-wrapper')
            .find('.title')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }
}
export default new Metallography();
