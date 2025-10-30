export class IrradiationDiagram {
    static clickOnDDl(nameofDDl: string, value: string) {
        cy.contains('.form-group-wrapper .form-group-3', `${nameofDDl}`)
            .click()
            .find(`div[title="${value}"]`)
            .click();
    }

    static clickOnCheckboxCondition(indexOfRow: number) {
        return cy.get('.custom-grid-wrapper').find('tr').eq(indexOfRow).click();
    }

    static getNumberOfConditions() {
        return cy.get('.table-header').invoke('text');
    }
}
export default new IrradiationDiagram();
