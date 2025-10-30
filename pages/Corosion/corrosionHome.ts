/// <reference types="cypress" />

export class CorrosionHome {
    static getTitleEnviroCorrosion() {
        return cy.get('.module-header-title').invoke('text');
    }

    static selectInDDLOption(ddlTitle: string, option: string) {
        cy.get('.accordion-body')
            .contains('label', ddlTitle)
            .parents('.filter-wrapper')
            .click()
            .contains('div', option)
            .click()
            .get('.accordion-body')
            .click();
    }

    static selectInDDLMedium(option: string) {
        cy.get('.accordion-body')
            .contains('label', 'Medium')
            .parents('.filter-wrapper')
            .click()
            .find('mat-tree')
            .contains('.btn', option)
            .click()
            .get('.accordion-body')
            .click();
    }

    static getSelectedTextInDDL(ddlTitle: string) {
        return cy
            .get('.accordion-body')
            .contains('label', ddlTitle)
            .parents('.filter-wrapper')
            .find('div')
            .find('span')
            .invoke('text');
    }

    static getAllItemsInDDL(ddlTitle: string) {
        return cy
            .get('.accordion-body')
            .contains('label', ddlTitle)
            .parents('.filter-wrapper')
            .click()
            .find('.ng-dropdown-panel-items')
            .find('.ng-option')
            .then((item) => {
                return Cypress.$.makeArray(item).map(
                    (textItem) => textItem.textContent,
                );
            });
    }

    static getUnitsForPropertyCorrosionRate() {
        return cy.get('.number-unit').invoke('text');
    }

    static getTitleThermometer() {
        return cy.get('.box-title').eq(0).invoke('text');
    }

    static getTitleMedium() {
        return cy.get('.box-title').eq(1).invoke('text');
    }

    static getTextInAllertPopUp() {
        return cy.get('.toast-warning').invoke('text');
    }

    static removeForwardedSearch() {
        cy.get('.main-content').then((body) => {
            if (body.find('.forwarded-search').length > 0) {
                cy.get('forwarded-search-context')
                    .should('be.visible')
                    .find('.forwarded-search', { timeout: 20000 })
                    .should('be.visible')
                    .contains('button', ' Remove ')
                    .should('be.visible')
                    .click();
            } else {
                return;
            }
        });
    }

    static getTitlesOnHomePageForTemperatureAndMedium() {
        const titles = [];
        return cy.get('.box-title').each(($title) => {
            titles.push($title.text());
            cy.wrap(titles);
        });
    }

    static getTitlesForDDLists() {
        return cy
            .get('.form-group')
            .find('label')
            .then((title) => {
                return Cypress.$.makeArray(title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }
}

export default new CorrosionHome();
