export class AddToReport {
    static navigateToReportBuilder() {
        cy.visit(`en/mmc/report-center`);
    }

    static checkIfReportModalIsOpen() {
        return cy.get('.modal-content');
        // .find('app-addtoreportmodal');
        // .find('.add-to-report-modal');
    }

    static checkIfPdfModalIsOpen() {
        // return cy.get('.print-to-pdf-modal')
        return cy.get('report-center');
        // .find('.print-to-pdf-modal');
    }

    static getAddToReportTitle() {
        return cy.get('.modal-header').find('b').invoke('text');
    }

    static getAddToReportTitleOptionTwo() {
        return cy.get('.modal-header').find('h3').invoke('text');
    }

    static getNewToReportTitle() {
        return cy.get('.new-report-header-title').find('b').invoke('text');
    }

    static getTextInsideReportWindow() {
        return cy
            .get('.modal-body')
            .find('.ng-star-inserted')
            .should('be.visible')
            .find('p')
            .invoke('text');
    }

    static getPropertyCheckbox(property: string) {
        return cy
            .get('ngb-modal-window')
            .find('app-addtoreportmodal')
            .find('ul')
            .find('label')
            .find('i')
            .siblings('span')
            .contains('span', property)
            .parent('label.tm-checkbox')
            .find('.form-control');
    }

    static clickOnSelectedPropertiesInReport(row: number) {
        return cy
            .get('.tm-checkbox')
            .find('i')
            .eq(row)
            .click({ multiple: true });
    }

    static clickOnReportButtons(index: number) {
        cy.get('.action-buttons')
            .find('.button.green-button')
            .eq(index)
            .find('i')
            .click();
    }

    static getReportButtons(index: number) {
        return cy.get('.action-buttons').find('.button.green-button').eq(index);
        // .find('i')
    }

    static ReportBodyContent() {
        return cy
            .get('.new-report-body-content-list')
            .find('#itemsList')
            .invoke('text');
    }

    static getTextInAddToReportModalAlert() {
        return cy.get('.alert-info').invoke('text');
    }

    static getDateAndPageNumber() {
        return (
            cy
                .get('.textLayer')
                // .find('.textLayer')
                .invoke('text')
        );
    }

    static clickOnCancelButton() {
        cy.contains('.btn-secondary', 'Cancel').click();
    }

    static getQuestionText() {
        return cy.get('.modal-body').find('p').invoke('text');
    }

    static clickOnClear() {
        cy.contains('.button', ' Clear ').click();
    }
}
export default new AddToReport();
