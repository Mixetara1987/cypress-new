/// <reference types="cypress" />

export class SelectedConditions {
    static getAllParameters() {
        return cy
            .contains('.selected-condition-header', ' Selected Condition ')
            .get('.selected-condition-body')
            .find('dd')
            .find('b');
    }

    static getLeftText() {
        return cy.get('.selected-condition-body').find('dt').invoke('text');
    }

    static getRightText() {
        return cy.get('.selected-condition-body').find('dd').invoke('text');
    }

    static getAllTextInSelectedConditions() {
        cy.get('.selected-condition-header');
        return cy
            .contains('.selected-condition-header', ' Selected Condition ')
            .parent('.selected-condition')
            .find('.selected-condition-body')
            .should('exist')
            .find('dd')
            .should('not.be.empty')
            .and('be.visible')
            .then((textInSelectedcConditions) => {
                return textInSelectedcConditions;
            });
    }

    static getTitle() {
        return cy.contains(
            '.selected-condition-header',
            ' Selected Condition ',
        );
    }
}
export default new SelectedConditions();
