export class SavedLists {
    static editSavedLists(rowIndex: number) {
        // cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="edit"]')
            .click();
    }

    static geteditModalWindow() {
        return cy.get('.modal-content');
    }

    static getModalWindowHeader() {
        return cy
            .get('.modal-content')
            .find('.modal-edit-wrapper')
            .find('.modal-header')
            .find('b')
            .invoke('text');
    }

    static getSaveModalWindowHeader() {
        return (
            cy
                .get('.modal-content')
                .find('.modal-save-wrapper')
                .find('.modal-header')
                .find('b')
                // .find('Save')
                .invoke('text')
        );
    }

    static getModalListTitle() {
        return cy
            .get('app-save-modal input')
            .invoke('attr', 'placeholder')
            .then((placeholderText) => {
                return placeholderText;
            });
    }

    static getEditSubtitle() {
        return cy
            .get('.modal-content')
            .find('.modal-edit-wrapper')
            .find('.modal-body')
            .find('.form-group')
            .find('label')
            .invoke('text');
    }

    static enterTextInSavedListBox(searchedText: string) {
        cy.get('.modal-body').find('.form-control').type(searchedText);
    }

    static clearTextInSavedListBox() {
        cy.get('.form-group').find('.form-control').clear();
    }

    static getSavedLIstInRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="name"]')
            .invoke('text');
    }

    static clickOnSavedLIstInRow(link: string) {
        return cy
            .get('.ag-center-cols-container')
            .find('.ag-row')
            .contains('a', link)
            .click();
    }
}
export default new SavedLists();
