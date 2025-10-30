export class AgeingReferences {
    static getReferencesTitle() {
        return cy.get('.reference-list-title').invoke('text');
    }

    static getTextInReferences() {
        return cy.get('.reference-list-item').invoke('text');
    }
}
export default new AgeingReferences();
