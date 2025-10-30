/// <reference types="cypress" />

export class StandardListHome {
    static getTextInToastMesage() {
        return cy.get('#toast-container').invoke('text');
    }

    static getTitle() {
        return cy.get('.module-header-title').invoke('text');
    }

    static getResultsFound() {
        return cy.get('.standard-list-results-wrapper').find('span').eq(8);
    }

    static getTitlesInStandardTable() {
        return cy.get('.header-table').invoke('text');
    }

    static getTextInDescriptionRow(row: number) {
        return cy
            .get('.details-table')
            .eq(row)
            .find('.first-row')
            .find('.standard')
            .find('span')
            .invoke('text');
    }

    static blueButtonType(type: string) {
        return cy
            .get('table tr.first-row td.rectangle-wrapper')
            .find('.rect.active')
            .contains('div.type', type)
            .first();
    }

    static clickOnBlueButtonType(type: string) {
        this.blueButtonType(type).should('be.visible').click();
    }

    static getNumberInBlueButtonType(type: string) {
        return this.blueButtonType(type).should('be.visible').parent('div');
    }

    static standardNumber() {
        return cy
            .get('.standards-search-wrapper')
            .get('[placeholder="Standard Number"]');
    }

    static enterStandardNumber(standardNumber: string) {
        this.standardNumber().should('be.visible').clear().type(standardNumber);
    }

    static getStandardNumberValue() {
        return this.standardNumber().should('be.visible').invoke('val');
    }

    static iscNumber() {
        return cy
            .get('.standards-search-wrapper')
            .get('[placeholder="ICS Number"]');
    }

    static enterICSNumber(icsNumber: string) {
        this.iscNumber().should('be.visible').clear().type(icsNumber);
    }

    static getICSNumberValue() {
        return this.iscNumber().should('be.visible').invoke('val');
    }

    static getISCNumberFromMaterialListRow(row: number) {
        return cy
            .get('.details-table')
            .eq(row)
            .find('.ics-number')
            .invoke('text');
    }

    static enterStandardDescription(description: string) {
        cy.get('.standards-search-wrapper')
            .get('[placeholder="Standard Description"]')
            .clear()
            .type(description);
    }

    static getStandardDescriptionValue() {
        return cy
            .get('.standards-search-wrapper')
            .get('[placeholder="Standard Description"]')
            .invoke('val');
    }

    static IsColapseRowVisible() {
        return cy.get('.third-row ');
    }
}

export default new StandardListHome();
