export class IrradiationMetalsPropertyTable {
    static clickOnDDl(nameofDDl: string, value: string) {
        cy.contains('.form-group-wrapper .form-group-3', `${nameofDDl}`)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', value)
            .click();
    }
}
export default new IrradiationMetalsPropertyTable();
