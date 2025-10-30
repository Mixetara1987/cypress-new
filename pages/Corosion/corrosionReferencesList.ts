/// <reference types="cypress" />

export class CorrosionReferencesList {
    static getReferenceForSelectedMaterialTitle() {
        cy.get('material-overview')
            .get('app-selected-references')
            .find('.reference-list-wrapper');
        return cy.get('.reference-list-title').invoke('text');
    }

    static getReferenceForSelectedMaterialText() {
        cy.get('material-overview');
        return cy
            .get('.reference-list')
            .find('.reference-list-text')
            .invoke('text');
    }

    static getAllReferenceForSelectedMaterialTitle() {
        cy.get('material-overview')
            .get('app-material-references')
            .find('.reference-list-wrapper');
        return cy.get('.reference-list-title').invoke('text');
    }

    static getAllReferenceForSelectedMaterialText() {
        cy.get('material-overview')
            .get('app-material-references')
            .find('.reference-list-wrapper');
        return cy
            .get('.reference-list')
            .find('.reference-list-text')
            .invoke('text');
    }
}
export default new CorrosionReferencesList();
