export class StressStrainDiagram {
    static getHeaderTextInPointTable() {
        return cy
            .get('.points-table')
            .find('.points-table-header')
            .invoke('text');
    }

    static clickOnCalculate() {
        return cy.get('.calculate').click();
    }

    static getHeatTreatmentMaterialProcessing() {
        return cy
            .get(
                '[data-qa="heatTreatmentDropdown"] #searchableMultiselectDropdown',
            )
            .should('be.visible');
    }

    static selectHeatTreatmentMaterialProcessing(heatOrProcessing: string) {
        this.getHeatTreatmentMaterialProcessing().click();
        cy.get(
            '[data-qa="heatTreatmentDropdown"] [aria-labelledby="searchableMultiselectDropdown"]',
        )
            .should('be.visible')
            .find('.filter-item')
            .find('label')
            .contains('span', heatOrProcessing)
            .click();
        this.getHeatTreatmentMaterialProcessing().type('{esc}');
    }

    static filterHeatProcessingTree(heatOrProcessing: string) {
        this.getHeatTreatmentMaterialProcessing()
            .should('be.visible')
            .click()
            .then(() => {
                cy.get(
                    '[data-qa="heatTreatmentDropdown"] [aria-labelledby="searchableMultiselectDropdown"] input[placeholder="Search"]',
                )
                    .should('be.visible')
                    .clear()
                    .type(heatOrProcessing);
            });
    }
}
export default new StressStrainDiagram();
