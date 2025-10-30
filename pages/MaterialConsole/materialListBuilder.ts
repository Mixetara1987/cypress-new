export class MaterialListBuilder {
    static closePopup() {
        cy.get('.toast-container').get('.toast-close-button').click();
    }

    static getLabelIfNoMaterials() {
        return cy.get('.tm-alert').find('.alert-label').invoke('text');
    }

    static getLabelIfNoMaterialsInAnalytics() {
        return cy.get('.tm-alert').find('b').invoke('text');
    }

    static getMessageIfNoMaterials() {
        return cy.get('.tm-alert').find('.alert-message').invoke('text');
    }

    static getResultsFound() {
        return cy.get('material-search-results-table').find('.results');
    }

    static clickOnSave() {
        cy.get('.tm-filter-button.save-btn').click();
    }

    static inModalDialogEnterName(name: string) {
        cy.get('app-working-list-save-modal')
            .contains('label', 'Name:')
            .siblings('input')
            .clear()
            .type(name);
    }

    static inModalDialogEnterDescription(description: string) {
        cy.get('app-working-list-save-modal')
            .contains('label', 'Description:')
            .siblings('textarea')
            .clear()
            .type(description);
    }

    static clickOnSaveInModal() {
        cy.get('app-working-list-save-modal')
            .find('.tm-filter-button.save-btn')
            .click();
    }

    static clickOnSeeAllSavedLists() {
        cy.get('.module-header-link')
            .contains('button', ' See all saved lists ')
            .click();
    }

    static getModalMessage() {
        return cy.get('.modal-content').find('.modal-body').invoke('text');
    }

    static closeModal() {
        cy.get('.modal-content').find('button[aria-label="Close"]').click();
    }

    static getSavedMaterialListName() {
        return cy
            .get('.modal-content [formcontrolname="name"]')
            .should('be.visible')
            .invoke('val');
    }

    static enterSaveMaterialListDesc(desc: string) {
        cy.get('.modal-content [formcontrolname="description"]').type(desc);
    }

    static clickOnCheckboxAll() {
        cy.contains('h1', ' Material List Builder ').then(() => {
            cy.get(
                'working-list [ref="eCenterContainer"] .ag-header-row-column [col-id="checkbox"]',
            )
                .should('exist')
                .click();
        });
    }

    static clickOnXDelete() {
        cy.contains('span', 'Delete').click();
    }

    static clickOnYesInModal() {
        cy.get('.modal-content').contains('.tm-filter-button', 'Yes').click();
    }
}
export default new MaterialListBuilder();
