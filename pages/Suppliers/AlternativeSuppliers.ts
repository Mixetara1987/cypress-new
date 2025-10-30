export class AlternativeSuppliers {
    static navigateToMaterial(materialId: number) {
        cy.visit(
            `en/suppliers/supplier-material/materials/${materialId}/alternative-suppliers`,
        );
    }

    static getListOfResultsFound() {
        return cy.get('.grid-tools-wrapper').get('.results');
    }

    static clickOnLinkedSupplier(linkedmaterial: string) {
        return cy
            .get(`[col-id="alternativeMaterial"]`)
            .contains('a', `${linkedmaterial}`)
            .click();
    }

    static clickOnViewSuppliersLink(linkedmaterial: string) {
        return cy
            .get(`[col-id="2"]`)
            .contains('a', `${linkedmaterial}`)
            .click();
    }

    static clickOnReset() {
        cy.contains('.reset-btn', 'Reset').click();
    }

    static clickOnClearAll() {
        cy.get('.ng-clear-wrapper').click();
    }
}
