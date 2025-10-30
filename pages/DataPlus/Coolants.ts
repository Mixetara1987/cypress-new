export class Coolants {
    static navigateToMaterial(materialId: number) {
        cy.visit(`en/data-plus/lubricants/${materialId}`);
    }

    static getTextInReferences() {
        return cy.get('.reference-list-text').invoke('text');
    }

    static AddToMaterialListBuilder() {
        return cy.get('.action-button').click();
    }
}
export default new Coolants();
