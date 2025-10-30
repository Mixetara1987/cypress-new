export class Similarity {
    static getSimilarityMaterialInfo() {
        return cy
            .get('#similar-container')
            .click()
            .get('.show-details-wrapper')
            .find('.refine-search-details')
            .then((materialInfo) => {
                cy.wrap(materialInfo).invoke('text');
            });
    }

    static getMesageSimilarity() {
        return cy
            .get('.similar-container-header')
            .find('.similar-container-header-details')
            .then((similarity) => {
                cy.wrap(similarity).invoke('text');
            });
    }

    static clickOnBackToSimilarMaterials() {
        cy.get('.refine-search-wrapper')
            .find('.rs')
            .find('.icon-keyboard_backspace')
            .click();
    }
}
export default new Similarity();
