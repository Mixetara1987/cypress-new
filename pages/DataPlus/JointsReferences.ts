export class JointsReferences {
    static getTitleForReferences() {
        return cy
            .get('.reference-list-wrapper.selected-list')
            .find('h4')
            .invoke('text');
    }

    static getReferencesTitleForNonMetals(index: number) {
        return cy
            .get('.reference-list-wrapper.selected-list')
            .find('h4')
            .eq(index)
            .invoke('text');
    }

    static getTextInReferences() {
        cy.wait(1000);
        return cy
            .get('.reference-list-wrapper.selected-list')
            .find('ol')
            .invoke('text');
    }

    static getTextInForAllReferences() {
        return cy
            .get('.reference-list-wrapper')
            .find('ol')
            .find('li')
            .invoke('text');
    }
}
export default new JointsReferences();
