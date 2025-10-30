/// <reference types="cypress" />

export class FatigueDataReferencesText {
    static getReferenceForSelectedMaterialTitle() {
        return cy
            .get('app-selected-references')
            .find('.reference-list-title')
            .eq(0)
            .invoke('text');
    }

    static getReferenceForSelectedMaterialText() {
        return cy
            .get('app-selected-references')
            .find('.reference-list')
            .find('.reference-list-text')
            .invoke('text');
    }

    static getAllReferenceForSelectedMaterialTitle() {
        return cy
            .get('app-material-references')
            .find('.reference-list-title')
            .invoke('text');
    }

    static getAllReferenceForSelectedMaterialText() {
        return cy
            .get('app-material-references')
            .find('.reference-list')
            .find('.reference-list-text')
            .invoke('text');
    }

    static waitReferences() {
        cy.intercept('/en/materials/conditions/4468470/references').as(
            'references',
        );
        cy.wait('@references');
    }
}
export default new FatigueDataReferencesText();
