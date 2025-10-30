export class GreenLineCarbonFootprintAddParametersModal {
    static select(parameterFor: string) {
        cy.get('app-carbon-footprint-parameters-modal')
            .find('ul')
            .contains('li', parameterFor)
            .click();
    }

    static clickOnInDdl(ddlname: string, option: string, treeoption: string) {
        cy.contains('label', ddlname).parent('div').click();
        if (ddlname === ' Transport type ') {
            cy.get('mat-tree')
                .find('mat-tree-node')
                .contains(option)
                .siblings('button')
                .click();
            cy.contains(treeoption).click();
            return;
        }
        cy.get('ng-dropdown-panel').contains(option).click();
    }

    static enterDistancekm(distance: number) {
        cy.contains('label', 'Distance (km) ')
            .siblings('input')
            .clear()
            .type(`${distance}`);
    }

    static enterRemovedMaterialkg(removedmaterialkg: number) {
        cy.contains('label', 'Removed material ')
            .siblings('input')
            .clear()
            .type(`${removedmaterialkg}`);
    }

    static clickOn(button: string) {
        cy.contains('button', button).should('be.visible').click();
    }

    static clickOnAdd() {
        cy.contains('button[type="submit"]', ' Add ')
            .should('be.visible')
            .click();
    }

    static getTextForSelectedCountry() {
        return cy.get('#country').invoke('text');
    }

    static getTextForProductionMethod() {
        return cy.get('#productionMethod').invoke('text');
    }
}
export default new GreenLineCarbonFootprintAddParametersModal();
