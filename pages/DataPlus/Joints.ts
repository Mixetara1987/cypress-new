/// <reference types="cypress" />

export class Joints {
    static getTitleOfJoints() {
        return cy.get('.module-header-title').invoke('text');
    }

    static clickOnWeldingDDl(nameofDDl: string) {
        cy.contains('.form-group-wrapper .form-group-3', 'Welding method')
            .click()
            .find(`div[title="${nameofDDl}"]`)
            .click();
    }

    static clickOnClearInDdl() {
        cy.get('.ng-clear-wrapper').click();
    }

    static clickOnLinkedMaterialInSelectedTextCondition(
        linkedmaterial: string,
    ) {
        return cy.get('.selected-condition-body').find('dd').find('a').click();
    }

    static clickOnMaterialLink(linkedmaterial: string) {
        return cy.get('.selected-condition-body').find('a').click();
    }

    static clickOnMaterialLinkForNonMetals(rowNumberMaterialLink: number) {
        return cy.get('.desingation').eq(rowNumberMaterialLink).click();
    }

    static getAllValuesFromARow(rowNumber: number) {
        return cy
            .get('[role="presentation"]')
            .find(`[row-id="${rowNumber}"]`)
            .invoke('text');
    }
}
export default new Joints();
