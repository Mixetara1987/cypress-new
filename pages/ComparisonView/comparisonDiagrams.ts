export class ComparisonDiagrams {
    static getSelectedTextInSelectPropertyDDL() {
        return cy
            .get('ng-select')
            .find('.ng-value')
            .then((selectedTextt) => {
                return selectedTextt.text();
            });
    }

    static getTitleOnX() {
        return cy.get('g.g-xtitle').invoke('text');
    }

    static getTitleOnY() {
        return cy.get('g.g-ytitle').invoke('text');
    }

    static clickOnClearPropertyButton() {
        cy.get('.clear-property-btn').find('button').click();
    }

    static getTooltipOnClearPropertybutton() {
        return cy
            .get('.clear-property-btn')
            .find('button')
            .find('i')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static gettextInConditionTableRowForMaterial(row: number) {
        return cy
            .get('[col-id="0"]')
            .eq(row)
            .parent('[role="row"]')
            .find('[col-id="2"]')
            .find('span')
            .invoke('text');
    }

    static inSelectPropertyDDLSelect(property: string) {
        cy.get('ng-select')
            .find('span.ng-arrow-wrapper')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .contains('div', property)
            .click();
    }

    static inConfirmModalClickOn(buttonName: string) {
        cy.get('confirmation-modal')
            .find('.modal-footer')
            .contains('button', buttonName)
            .click();
    }

    static clickOnClearall() {
        cy.get('.clear-btn-wrapper').contains('button', ' Clear all ').click();
    }

    static getMessageInBlueRibbon() {
        return cy.get('.tm-alert.tm-alert-info').then((message) => {
            message.text();
        });
    }
}
export default new ComparisonDiagrams();
