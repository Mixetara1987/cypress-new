export class HeatTreatment {
    static navigateToMaterial(materialId: number) {
        cy.visit(`en/search/quick/materials/${materialId}/heat-treatment`);
    }

    static isDiagramsPicturesDisplayed() {
        return cy.get('.tm-gallery-cards');
    }

    static clickOnDiagramPicture(numberOfPicture: number) {
        return cy.get('.tm-gallery-cards-col').eq(numberOfPicture).click();
    }

    static getImageIsDisplayed() {
        return cy.get('.image-wrapper').get('.image');
    }

    static getImageTitle() {
        return cy
            .get('.content-wrapper')
            .find('.header-box')
            .find('.diagram-title')
            .invoke('text');
    }

    static getTitleForReferences() {
        return cy
            .get('.reference-list-wrapper.selected-list')
            .find('h4')
            .invoke('text');
    }

    static closeDiagram() {
        cy.get('.diagram-close').click();
    }

    static getFirstColumnTitles() {
        return cy
            .get('.descriptions-wrapper')
            .find('.ht-ref-header-small')
            .invoke('text');
    }

    static getSecondColumnTitles() {
        return cy
            .get('.descriptions-wrapper')
            .find('.ht-ref-header-medium')
            .invoke('text');
    }

    static getDataInFirstColumn(indexOfColumn: number) {
        return cy
            .get('.description-reference-body')
            .find('.description-label')
            .eq(indexOfColumn)
            .invoke('text');
    }

    static getDataInSecondColumn(indexOfColumn: number) {
        return cy
            .get('.description-reference-body')
            .find('.description-comment')
            .eq(indexOfColumn)
            .invoke('text');
    }

    static getTitleForAllReferences() {
        return cy.get('.reference-list-wrapper').find('h4').invoke('text');
    }

    static getListOfResultsFound(indexOfResult: number) {
        return cy
            .get('material-search-results-table')
            .get('.grid-tools-wrapper')
            .eq(indexOfResult)
            .get('.results')
            .invoke('text');
    }

    static selectedDiagram() {
        return cy.get('.diagram-box');
    }
}
export default new HeatTreatment();
