export class Lubricants {
    static getTitleOfLubricants() {
        return cy.get('.module-header-title').invoke('text');
    }

    static getTextInReferences() {
        return cy.get('.reference-list-text').invoke('text');
    }

    static getTextInReference(row: number) {
        return cy
            .get('.condition-details-table-section-header')
            .find('.condition-details-table-section-header-content')
            .eq(row)
            .find('.overflow')
            .invoke('text');
    }

    static getConditionDetails(row: number) {
        return cy
            .get('.condition-details-table-section-header')
            .find('.condition-details-table-section-header-content')
            .eq(row)
            .find('.reference-cell')
            .invoke('text');
    }

    static visibleApplicationDdl() {
        return cy.get('.searchable-dropdown');
    }

    static visibleMinMaxBoxes(index: number) {
        return cy.get('.filter-wrapper').eq(index);
    }

    static enterMinMaxValues(index: number, kinematicViscosity: string) {
        return cy
            .get('.input-number-wrapper')
            .eq(index)
            .type(kinematicViscosity);
    }

    // TODO check method above
    static enterLabelMinMaxValues(
        labelName: string,
        index: number,
        value: string,
    ) {
        return cy
            .contains('app-lubricants-filters label', labelName)
            .siblings()
            .find('.input-number-wrapper')
            .eq(index)
            .type(value);
    }

    static findLinkedComponent(name: string) {
        return cy
            .contains('.tm-tab-button-wrapper .module-header', name)
            .find('ul')
            .invoke('text');
    }
}
export default new Lubricants();
