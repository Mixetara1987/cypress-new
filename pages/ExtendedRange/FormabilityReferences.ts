export class FormabilityReferences {
    static getTitleForReferences(index: number) {
        return cy
            .get('.selected-reference-wrapper')
            .find('h4')
            .eq(index)
            .invoke('text');
    }

    static getTitleForAllReferences() {
        return cy.get('.material-reference-wrapper').find('h4').invoke('text');
    }
}
export default new FormabilityReferences();
