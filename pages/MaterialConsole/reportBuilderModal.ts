export class ReportBuilderModal {
    static reportBuilderModal() {
        return cy.get('ngb-modal-window');
    }

    static getTitleInModalDialog() {
        return cy.get('.modal-header');
    }

    static getTextInModal() {
        return cy
            .get('ngb-modal-window')
            .find('app-addtoreportmodal')
            .find('p')
            .invoke('text');
    }

    static getListInModal() {
        return cy
            .get('ngb-modal-window')
            .find('app-addtoreportmodal')
            .find('ul')
            .find('label')
            .find('i')
            .siblings('span');
    }

    static clickOnCancelInModal() {
        cy.get('ngb-modal-window')
            .find('.modal-footer')
            .contains('button', 'Cancel')
            .click();
    }

    static buttonAddtoReportBuilderModal() {
        return cy
            .get('ngb-modal-window')
            .find('.modal-footer')
            .contains('button', 'Add to Report Builder');
    }

    static clickOnAddtoReportBuilderModal() {
        cy.get('ngb-modal-window')
            .should('be.visible')
            .find('.modal-footer')
            .contains('button', 'Add to Report Builder')
            .click();
    }

    static getTextInAlert() {
        return cy.get('#toast-container').invoke('text');
    }

    static goToReport() {
        cy.contains('.toast-wrapper button', 'Go to report...').click();
    }

    static clickOnCheckboxItemModal(item: string) {
        cy.get('ngb-modal-window')
            .find('app-addtoreportmodal')
            .find('ul')
            .find('label')
            .find('i')
            .siblings('span')
            .contains('span', item)
            .parent('label.tm-checkbox')
            .find('.icon-check_box_outline_blank')
            .click();
    }

    static clickOnClearChanges() {
        cy.contains('button', 'Clear changes').click();
    }
}
export default new ReportBuilderModal();
