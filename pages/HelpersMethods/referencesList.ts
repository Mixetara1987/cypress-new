/// <reference types="cypress" />

export class ReferencesList {
    static getReferencesForSelectedMaterialTitle() {
        return (
            cy
                .get('material-overview')
                .get('app-selected-references')
                //  .find('.reference-list-wrapper')
                .find('.reference-list-title')
                .eq(0)
                .invoke('text')
        );
    }

    static getReferencesText() {
        return cy
            .get('.reference-list')
            .find('span.reference-list-text')
            .invoke('text');
    }

    static getAllReferencesForSelectedMaterialTitle() {
        cy.get('material-overview')
            .get('app-material-references')
            .wait(1500)
            .get('.reference-list-wrapper');
        return cy.get('.reference-list-title').invoke('text');
    }

    static getTitleOfReferences() {
        return cy.get('.table-header').invoke('text');
    }

    static getReferencesTitle() {
        return cy.get('.reference-list-title').invoke('text');
    }

    static getTextInForAllReferences() {
        return cy
            .get('.reference-list-wrapper')
            .find('ol')
            .find('li')
            .invoke('text');
    }

    static getTextInReferences() {
        return cy.get('.selected-list').find('ol').invoke('text');
    }
}

export default new ReferencesList();
