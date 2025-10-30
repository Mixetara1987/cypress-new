/// <reference types="cypress" />

export class MaterialDetails {
    static getUrlActiveTab() {
        cy.get('app-material-details')
            .should('exist')
            .find('app-mechanical-physical-view')
            .find('app-details-view')
            .should('exist');
        return cy
            .get('div[routerlinkactive="active-link"]')
            .should('exist')
            .find('nav')
            .find('ul')
            .find('li.active')
            .should('be.visible')
            .find('a')
            .invoke('prop', 'href');
    }

    static cllickOnStarFavoritesMaterial() {
        cy.get('.star').should('be.visible').click();
    }

    static getTooltipTextOnStarFavorites() {
        return cy
            .get('.favorites.star.pointer')
            .trigger('mouseenter')
            .find('.tooltip-comment');
    }

    static getColorOfStar() {
        return cy.get('.icon-star');
    }

    static getTextInBluePopup() {
        return cy.get('.toast-container').then((alertText) => {
            return alertText.text();
        });
    }

    static inModalForFavoritesMaterialClickOn(answer: string) {
        cy.get('confirmation-modal')
            .find('.modal-footer')
            .find('.tm-filter-buttons-wrapper')
            .contains('button', answer)
            .click();
    }

    static clickOnPhysicalPropertiesTab() {
        cy.get('.tile').should('exist').eq(1).should('exist').click();
    }

    static clickOnMechanicalPropertiesTab() {
        cy.get('.tile').eq(0).should('be.visible').click();
    }

    static clickOnTrackerTab() {
        cy.get('.tile').eq(3).should('be.visible').click();
    }

    static clickOnCrossRefTab() {
        cy.get('.tile').eq(2).should('be.visible').click();
    }

    static getMaterialNumber() {
        return cy
            .get('.number-and-status-wrapper')
            .should('be.visible')
            .find('strong.material-number')
            .should('be.visible')
            .invoke('text');
    }

    static getCurency() {
        return cy
            .get('.material-info-value')
            .find('.info-type-text.ng-star-inserted');
    }

    static getCurencySymbol() {
        return cy
            .get('indicative-price')
            .find('.material-info-value')
            .find('.info-type-text.currency-symbol')
            .should('be.visible')
            .invoke('text');
    }

    static changeCurrency(valute: string) {
        cy.get('.material-info')
            .find('.material-info-value')
            .find('.currency-container')
            .find('.icon-arrow_drop_down')
            .should('be.visible')
            .trigger('mouseover')
            .get('.currency-entry')
            .contains('a', valute)
            .click({ force: true });
    }

    static getMaterialInfoFirstColumnFor(materialNumber: string) {
        return cy
            .get('[app-material-info]')
            .contains('.material-number', materialNumber)
            .parents('.module-split-content-info')
            .find('.material-info')
            .should('be.visible')
            .find('.material-info-item')
            .should('be.visible')
            .find('.material-info-type')
            .should('be.visible')
            .then((info) => {
                return Cypress.$.makeArray(info).map(
                    (textInfo) => textInfo.textContent,
                );
            });
    }

    static getMaterialInfoSecondColumnFor(materialNumber: string) {
        return cy
            .get('[app-material-info]')
            .contains('.material-number', materialNumber)
            .parents('.module-split-content-info')
            .find('.material-info')
            .should('be.visible')
            .find('.material-info-item')
            .should('be.visible')
            .find('.material-info-value')
            .then((info) => {
                return Cypress.$.makeArray(info).map(
                    (textInfo) => textInfo.textContent,
                );
            });
    }
}
export default new MaterialDetails();
