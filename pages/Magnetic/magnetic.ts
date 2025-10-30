export class PhysicalPropertiesMagnetic {
    static getTextInSpecialTable(index: number) {
        return cy.get('.special-table').eq(index);
    }

    static getHeaderText(index: number) {
        cy.get('ag-grid-angular');
        return cy
            .get('.condition-details-table-head')
            .find('.condition-details-table-cell')
            .eq(index)
            .invoke('text');
    }

    static getValuesInPropertyRows() {
        return cy
            .get('app-mechanical-physical-view')
            .get('[role="rowgroup"]')
            .find('[col-id="name"].propertyCell')
            .then((property) => {
                return Cypress.$.makeArray(property).map(
                    (textProperty) => textProperty.textContent,
                );
            });
    }

    static getValueInRow(row: number) {
        return cy
            .get('app-mechanical-physical-view')
            .get(`[row-id="${row - 1}"]`)
            .find('[aria-colindex="2"]')
            .invoke('text');
    }

    static getUnitInRow(row: number) {
        return cy
            .get('app-mechanical-physical-view')
            .get(`[row-id="${row - 1}"]`)
            .find('[aria-colindex="3"]')
            .invoke('text');
    }

    static diagramImg(index: number) {
        return cy.get('.carousel-item1').find('img').eq(index);
    }

    static getDiagramName(diagramIndex: number) {
        return cy.get('.carousel-item1').eq(diagramIndex).invoke('text');
    }

    static clickOnRightArrovForChangeDiagram() {
        cy.get('button.arrow-right').eq(0).click();
    }

    static clickOnLeftArrovForChangeDiagram() {
        cy.get('button.arrow-left').eq(1).click();
    }

    static getReferenceForSelectedMaterialTitle() {
        // return cy.get('app-selected-references')
        return cy.get('.reference-list-title').eq(0).invoke('text');
    }

    static getReferenceForSelectedMaterialText() {
        // ('app-selected-references')
        return cy
            .get('.reference-list')
            .find('.reference-list-text')
            .invoke('text');
    }
}
export default new PhysicalPropertiesMagnetic();
