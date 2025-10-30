/// <reference types="cypress" />

export class JointsSearch {
    static getTitleForJointsType() {
        return cy
            .get('.accordion-body')
            .find('.column-2.dropdown-filters')
            .find('.filter-wrapper')
            .find('.title')
            .invoke('text');
    }

    static getRadioButtons(row: number) {
        return cy
            .get('.column-2.dropdown-filters')
            .find('.filter-wrapper')
            .find('.tm-radio')
            .eq(row)
            .invoke('text');
    }

    static getColorForSelectedRadioButton(row: number) {
        return cy
            .get('.column-2.dropdown-filters')
            .get('.icon-check_box_outline_blank')
            .eq(row);
    }

    static clickOnRadioButton(row: number) {
        return cy
            .get('.column-2.dropdown-filters')
            .get('.icon-check_box_outline_blank')
            .eq(row)
            .click();
    }

    static isDdlvisible(row: number) {
        return cy.get('.filter-wrapper').eq(row);
    }

    static clickOnWeldingDDlFilters(nameofDDl: string, subproperty: string) {
        cy.contains('#searchDropdown', `${nameofDDl}`)
            .click()
            .get('.ng-dropdown-panel')
            .contains(new RegExp(`^${subproperty}$`))
            .click();
    }

    static clickOnDDlSearchFilters(nameofDDl: string, subproperty: string) {
        cy.contains('#searchDropdown', `${nameofDDl}`)
            .click()
            // .contains('.ng-dropdown-panel', `${name}`).click();
            .contains(new RegExp(`^${subproperty}$`))
            .click();
    }

    static getTitleForFilter(row: number) {
        return cy
            .get('.filter-wrapper')
            .eq(row)
            .find('#searchDropdown')
            .find('label')
            .invoke('text');
    }

    static getSelectedOptionInDdl() {
        return cy.get('.dropdown-toggle').find('span');
    }

    static getSelectedOptionInDdlSingleDdl(index: number) {
        return cy.get('.dropdown-toggle').eq(index).find('span').invoke('text');
    }
}
export default new JointsSearch();
