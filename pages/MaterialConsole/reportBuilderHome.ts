import 'cypress-real-events/support';
export class ReportBuilderHome {
    static getPropertiesInReport() {
        return cy
            .get('.new-report-body-content-pdf-viewer')
            .get('.new-report-body-content-list')
            .should('be.visible')
            .find('.title')
            .find('.title-preview');
    }

    static getMaterialInReport() {
        return cy
            .get('.new-report-body-content-pdf-viewer')
            .get('.new-report-body-content-list')
            .find('.title')
            .find('.ng-star-inserted');
    }

    static getDragableList() {
        return cy
            .get('.cdk-drop-list')
            .eq(1)
            .find('.cdk-drag.body-list-box')
            .find('.d-flex.align-items-center')
            .find('.title')
            .then((item) => {
                return Cypress.$.makeArray(item).map(
                    (textItem) => textItem.textContent,
                );
            });
    }

    static dragAndDrop(titleOfElementToDrag: string) {
        cy.get('#itemsList');
        cy.get('#cdk-drop-list-1');
        cy.contains('span', titleOfElementToDrag)
            .parents('.cdk-drag')
            .then((el) => {
                const draggable = el[0]; // Pick up ( Plain text )
                cy.get('#itemsList > :nth-child(1)').then((el1) => {
                    const droppable = el1[0]; // Drop above ( Material content )
                    const coords = droppable.getBoundingClientRect();

                    cy.wrap(draggable)
                        .realMouseDown()
                        .trigger('mousemove', coords.x, coords.y, {
                            force: true,
                        });
                    cy.wrap(droppable)
                        .trigger('mouseover', { force: true })
                        .click();
                });
            });
    }

    static clickOnCreatePlainText() {
        cy.get('.icon-create').click();
    }

    static getTextIn(draggable: string) {
        return cy
            .contains('div', draggable)
            .parent('.text-truncate')
            .find('small');
    }

    static getTitle() {
        return cy.get('.title-preview').eq(0); // first draggable
    }

    static inContentEnterText(text: string) {
        cy.contains('label', 'Content:')
            .siblings('textarea')
            .clear()
            .type(text);
    }

    static inTitleEnterText(text: string) {
        cy.contains('label', 'Title:').siblings('input').clear().type(text);
    }

    static clickOnUpdate() {
        cy.get('.modal-footer.tm-filter-buttons-wrapper')
            .contains('button.tm-filter-button-modal', 'Update')
            .click();
    }

    static clickOnNextPage() {
        cy.get('#toolbarViewerLeft')
            .contains('span', 'Next')
            .parent('button#next')
            .click();
    }

    static clickOnDelete() {
        cy.get('.action-buttons')
            .find('.icon-clear')
            .parent('button.button')
            .click();
    }

    static clickOnClearChanges() {
        cy.contains('button', 'Clear changes').click();
    }

    static getTextInEmtyList() {
        return cy.get('#itemsList').then((text) => {
            const reportText = text.text();
            cy.wrap(reportText);
        });
    }

    static greenButtons() {
        const buttons = [];
        return cy
            .get('.new-report-header-content')
            .find('.green-button')
            .each((button) => {
                buttons.push(button.toArray());
            });
    }

    static clickOnGreenButton(button: string) {
        cy.get('.action-buttons')
            .contains('button', button)
            .should('be.enabled')
            .click();
    }

    // save modal
    static inSaveReportEnterTitle(text: string) {
        cy.contains('label', 'Report title:')
            .siblings('input')
            .clear()
            .type(text);
    }

    static inSaveReportEnterDescription(text: string) {
        cy.contains('label', 'Description:')
            .siblings('textarea')
            .clear()
            .type(text);
    }

    static inSaveReportClickOnSave() {
        cy.get('.modal-footer.tm-filter-buttons-wrapper')
            .contains('button.tm-filter-button-modal', ' Save ')
            .click();
    }

    // ***
    // share modal
    static getMessageInShareModal() {
        return cy.get('.modal-content').find('p');
    }

    static getUrlInShareModal() {
        return cy
            .get('.modal-content')
            .find('p')
            .parents('.modal-body')
            .find('textarea')
            .invoke('prop', 'value')
            .should('contain', 'htt');
    }

    static onXCloseSharingModal() {
        cy.get('.modal-header')
            .find('.btn.close')
            .should('be.visible')
            .click()
            .get('.modal-header')
            .should('not.exist');
    }
}
export default new ReportBuilderHome();
