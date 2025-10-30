export class Irradiation {
    static clickOnDDl(nameofDDl: string, value: string) {
        cy.contains('.form-group-wrapper .form-group-3', `${nameofDDl}`)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', value)
            .click();
    }

    static visibleIrradiationTypeandSubtype(index: number) {
        return cy
            .get('.column-2.dropdown-filters')
            .find('.filter-wrapper')
            .eq(index);
    }

    static getSelectedOptionForTypeAndSubtype(index: number) {
        return cy
            .get('#searchDropdown')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .get('.ng-placeholder')
            .eq(index);
    }
}
export default new Irradiation();
