export class GreenLineCarbonFootprint {
    static clickOnStandard(standard: string) {
        cy.contains('label', ' Standard ')
            .parent('div')
            .find('[formcontrolname="standardFC"]')
            .click()
            .get('ng-dropdown-panel')
            .contains('span', standard)
            .realClick();
    }

    static clickOn(button: string) {
        cy.contains('button', button).click();
    }

    static getNumberOfVisibleRowsWithMaterials() {
        return cy
            .get('[role="gridcell"]')
            .should('be.visible')
            .then((numberOfRows) => {
                return numberOfRows.length;
            });
    }

    static getTitle() {
        return cy
            .get('.module-header-title')
            .find('h1')
            .should('be.visible')
            .then((title) => {
                return title.text();
            });
    }

    static getSelectedTextIn(filter: string) {
        return cy
            .contains('label', filter)
            .parent('div')
            .find('div.ng-placeholder')
            .then((selectedText) => {
                return selectedText.text();
            });
    }

    static getAlertDialog() {
        return cy
            .get('[role="alert"]')
            .should('be.visible')
            .then((textInAlert) => {
                return textInAlert.text();
            });
    }

    static closeAlertDialog() {
        cy.get('.toast-close-button').should('be.visible').click();
    }

    static clickOnIconRepeatForMaterial(material: string) {
        cy.contains('div.clickable-designation', material)
            .parents('designation-cell')
            .parents('div[col-id="designation"]')
            .siblings('div')
            .find('i.icon-repeat')
            .should('be.visible')
            .click();
    }

    static getTextInReferenceForMaterial(material: string) {
        return cy
            .contains('.clickable-designation', material)
            .parents('div[role="row"]')
            .find('status-cell')
            .find('div[placement="top-start"]')
            .then((selectedCondition) => {
                return selectedCondition.text();
            });
    }

    static getParametersForMaterial(material: string) {
        return cy
            .contains('.clickable-designation', material)
            .parents('div[role="row"]')
            .find('designation-cell')
            .then((selectedParameters) => {
                return Cypress.$.makeArray(selectedParameters).map(
                    (textParameters) => textParameters.textContent,
                );
            });
    }

    static getResultInCarbonFootprintColumnForMaterial(material: string) {
        return cy
            .contains('.clickable-designation', material)
            .parents('div[role="row"]')
            .should('be.visible')
            .find('b')
            .should('be.visible')
            .then((carbonfootprintresult) => {
                return carbonfootprintresult.text();
            });
    }

    static getTooltipTextForCalculate() {
        return cy
            .get('i.icon-info')
            .realHover()
            .get('ngb-tooltip-window')
            .then((tooltiptext) => {
                return tooltiptext.text();
            });
    }

    static getRecycledPrecentage() {
        return cy.get('.px-4').find('label').invoke('text');
    }

    static clickOnDeleteButton() {
        cy.get('.icon-delete').click();
    }
}
export default new GreenLineCarbonFootprint();
