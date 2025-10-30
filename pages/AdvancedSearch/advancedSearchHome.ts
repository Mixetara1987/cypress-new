export class AdvancedHome {
    static getAlertForEmptySearchCriteria() {
        return cy.get('.alert.alert-warning').invoke('text');
    }

    static getModalTitle() {
        return cy
            .get('app-advanced-search-criteria-parent-modal')
            .find('.tm-tabs-header-title');
    }

    // dodata
    static isModalAdvancedSearchOpen() {
        return cy.get('.advance-search-modal-wrapper');
    }

    static closeModal() {
        cy.get('.modal-content')
            .find('.tm-tabs-wrapper')
            .find('.tm-tabs-header')
            .find('.icon-clear')
            .click();
    }

    static clickOnCancelOnModal() {
        cy.contains('.tm-filter-button', 'Cancel').click();
    }

    static clickOnAddToSearchModal() {
        cy.get(
            'app-advanced-search-criteria-parent-modal button.tm-filter-button-submit',
        )
            .should('be.visible')
            .click();
        cy.get('app-advanced-search-criteria-parent-modal').should('not.exist');
    }

    static clickOnAddToSearchCriteria() {
        cy.get('.tm-button-add ').eq(0).click();
    }

    static clickOnClearButton() {
        cy.contains('button', ' Clear ').should('be.visible').click();
    }

    static getSearchCriteria(row: number) {
        return cy
            .get('advanced-search-criteria-group')
            .find('.btn-group')
            .eq(row)
            .invoke('text');
    }

    static getSearchCriteriaBox() {
        return cy.get('.search-list-header').invoke('text');
    }

    static clickOnSearchCriteria(row: number) {
        cy.get('.search-criteria-group-wrapper')
            .find('.criteria-item')
            .find('.btn-group')
            .find('button')
            .eq(row)
            .click();
    }

    static clickOnSubmit() {
        cy.get('.modal-content .tm-filter-button-submit')
            .should('be.visible')
            .click();
        cy.get('.modal-content').should('not.exist');
    }

    static clickOnCancelButtonItaliano() {
        cy.contains('.tm-filter-button', ' Cancellare ').click();
    }

    static clickOnRadioButton(textType: string) {
        cy.contains('span', textType).parent('.tm-radio').click();
    }

    // Save search - modal
    static clickOnSavesearch() {
        cy.get('button.tm-filter-button-save').click();
    }

    static getSaveMessage() {
        return cy.get('.modal-save-wrapper').find('.modal-header');
    }

    static clickOnCancelToSave() {
        cy.get('.modal-footer').contains('button', ' Cancel ').click();
    }

    // general
    static enterTextInFullTextSearch(text: string) {
        cy.get('.advance-search-edit-container')
            .find('.advance-search-edit-content')
            .find('.textarea-wrapper')
            .find('textarea')
            .clear()
            .type(text);
    }

    // heat treatment
    static getImageTitle() {
        return cy
            .get('.tm-gallery-cards')
            .find('.diagram-wrapper')
            .find('.title')
            .invoke('text');
    }

    static getTitlesOfAllImages() {
        return cy
            .get('.diagram-wrapper')
            .find('.title')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    // added
    static getTitle() {
        return cy.get('.tm-tabs-header').find('h3').invoke('text');
    }

    static getMessage() {
        return cy.get('.message').invoke('text');
    }
}
export default new AdvancedHome();
