export class FractureMechanicsHomeDDL {
    static getAllOptionsInDDLKicMPa() {
        return cy
            .get('.dropdown-filters')
            .get('#searchDropdown')
            .click()
            .find('.ng-dropdown-panel')
            .find('.ng-option')
            .should('be.visible')
            .then((option) => {
                return Cypress.$.makeArray(option).map(
                    (textOption) => textOption.textContent,
                );
            });
    }

    static selectKicMPa(value: string) {
        cy.get('.dropdown-filters')
            .get('#searchDropdown')
            .click()
            .find('.ng-dropdown-panel')
            .contains('.ng-option', value)
            .click();
    }
}
export default new FractureMechanicsHomeDDL();
