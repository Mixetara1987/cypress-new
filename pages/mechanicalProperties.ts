/// <reference types="cypress" />

export class MechanicalProperties {
    static navigateTo(materialId: number) {
        cy.visit(`en/search/quick/materials/${materialId}/mechanical`);
    }

    static getSelectedView() {
        return cy.get('.selected-view').invoke('text');
    }

    static getTitleOfMaterial() {
        cy.get('.history-back-wrapper').trigger('mouseenter');
        return cy.get('.material-number').invoke('text');
    }

    static findMaterialInfoType(row: number) {
        return cy
            .get('[app-material-info]')
            .get('.material-info')
            .get('.material-info-item')
            .eq(row)
            .find('.material-info-type')
            .invoke('text');
    }

    static findMaterialInfoValue(row: number) {
        return cy
            .get('[app-material-info]')
            .get('.material-info')
            .get('.material-info-item')
            .eq(row)
            .find('.material-info-value')
            .invoke('text');
    }
}

export default new MechanicalProperties();
