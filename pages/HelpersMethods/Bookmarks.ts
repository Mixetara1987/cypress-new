export class Bookmarks {
    static clickOnBookmarksPage(index: number) {
        return cy
            .get('.module-split')
            .find('.module-split-content')
            .find('.module-split-content-info')
            .find('.material-title-wrapper')
            .find('ul')
            .find('li')
            .eq(index)
            .click();
    }

    static visibleBookmarksFilterBoxes(index: number) {
        return cy.get('.form-group').eq(index);
    }

    static getModalWindowTitle() {
        return (
            cy
                .get('.modal-content')
                // .find('app-addtobookmarkmodal')
                .find('.modal-save-wrapper')
                .find('.modal-header')
                .find('b')
                .invoke('text')
        );
    }

    static getModalWindowHeader() {
        return cy
            .get('.modal-content')
            .find('app-sharelinkmodal')
            .find('.m-2')
            .find('.modal-header')
            .find('b')
            .invoke('text');
    }

    static getModalWindowSubTitle() {
        return cy
            .get('.modal-content')
            .find('app-sharelinkmodal')
            .find('.m-2')
            .find('.modal-body')
            .find('p')
            .invoke('text');
    }

    static getWindowWithSharedLink() {
        return cy
            .get('.modal-content')
            .find('app-sharelinkmodal textarea')
            .invoke('val')
            .should('have.length.gt', 0);
    }

    static shareLinkModal() {
        return cy.get('app-sharelinkmodal');
    }

    static clickToDeleteFromList() {
        cy.get('.my-console-search-results-wrapper')
            .contains('.btn-ag-grid', 'Delete')
            .click();
    }

    static checkDeleteButton() {
        return cy.get('.btn-ag-grid');
    }

    static enterTextInMaterialonSearchBox(searchedText: string) {
        cy.get('.form-group').eq(0).type(searchedText);
    }

    static enterTextInDescriptionModalBox(descriptionText: string) {
        cy.get('textarea').type(descriptionText);
    }

    static enterTextInTitleCA(descriptionText: string) {
        cy.get('.content-holder')
            .find('.form-group')
            .eq(0)
            .type(descriptionText);
    }

    static enterTextInDescriptionModalLCA(descriptionText: string) {
        cy.get('.content-holder')
            .find('.form-group')
            .eq(1)
            .type(descriptionText);
    }

    static getTextInModal(index: number) {
        return cy
            .get('.content-holder')
            .find('.form-group')
            .eq(index)
            .find('input')
            .invoke('prop', 'value');
    }

    static getSelectedOptionForFilterBox(index: number) {
        return cy
            .get('.bookmark-search-wrapper')
            .find('.form-group')
            .eq(index)
            .find('.searchable-dropdown')
            .find('.ng-select-container')
            .get('.ng-value-container')
            .find('.ng-placeholder');
    }

    static checkSaveButton() {
        return cy.get('.tm-filter-button.tm-filter-button-submit');
    }

    static getDescriptionForSavedBookmarksFromRow(description: string) {
        return cy
            .contains('[col-id="description"]', description)
            .invoke('text');
    }

    static clickOnMaterialFromRow(linkedmaterial: string) {
        return cy
            .get(`[col-id="designation"]`)
            .contains('a', `${linkedmaterial}`)
            .click();
    }
}
export default new Bookmarks();
