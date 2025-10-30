/// <reference types="cypress" />

export class AdvancedGeneralInformation {
    static enterStandardNumber(standardNumber: string) {
        cy.get('advanced-search-general-info')
            .get('.filter-wrapper')
            .get('[placeholder="Standard Number"]')
            .clear()
            .type(standardNumber);
    }

    static enterTextInFullTextSearch(searchText: string) {
        cy.get('.filter-wrapper').find('textarea').clear().type(searchText);
    }

    static enterStandardDescription(standardDescription: string) {
        cy.get('.filter-wrapper')
            .get('[placeholder="Standard Description"]')
            .click()
            .clear()
            .type(standardDescription);
    }

    static selectFlameRetardants(option: string) {
        cy.get('[bindlabel="flameRetardantName"]')
            .click()
            .get('.ng-dropdown-panel ')
            .find('.ng-option')
            .contains('div', option)
            .click();
    }

    static clickOnCheckbox(option: string) {
        cy.get('advanced-search-general-info')
            .find('.filter-wrapper')
            .contains('span', option)
            .parents('.form-group')
            .find('i')
            .click();
    }

    static clickOnCheckboxProperty(property: string) {
        cy.get('advanced-search-general-info')
            .contains('span', property)
            .siblings('.icon-check_box_outline_blank')
            .click();
    }

    static clickOnCheckboxes(property: string[]) {
        Cypress._.times(property.length, (propertyIndex) => {
            AdvancedGeneralInformation.clickOnCheckboxProperty(
                property[propertyIndex],
            );
        });
    }

    static enterMin(value: string) {
        cy.get('.number-filter-wrapper')
            .find('.input-number-wrapper')
            .eq(0)
            .find('input.form-control')
            .clear()
            .type(value);
    }

    static clickOnRadioButton(name: string) {
        cy.get('.filter-wrapper')
            .get('.radio-group')
            .contains('span', name)
            .click();
    }

    static enterStandardDescriptionItaliano(standardDescription: string) {
        cy.get('.filter-wrapper')
            .get('[placeholder="Descrizione Norma"]')
            .clear()
            .type(standardDescription);
    }

    static enterTextInFullTextSearchItaliano(searchText: string) {
        cy.get('.filter-wrapper')
            .get(
                '[placeholder="Ricerca tramite testo / parola chiave (es. catene, corrosione etc.)"]',
            )
            .clear()
            .type(searchText);
    }
}
export default new AdvancedGeneralInformation();
