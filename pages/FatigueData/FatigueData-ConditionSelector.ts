/// <reference types="cypress" />

export class FatigueDataConditionSelector {
    static getTiitleConditionSelector() {
        return cy.get('.accordion-title').invoke('text');
    }

    static getSelectedTextInDDLForm() {
        cy.get('.form-group-wrapper')
            .should('exist')
            .find('span')
            .should('exist')
            .and('be.visible')
            .then((selectedText) => {
                cy.wrap(selectedText).realHover();
            });
        return cy
            .contains('label', 'Form')
            .should('be.visible')
            .parent('div')
            .find('button')
            .should('exist')
            .and('be.visible')
            .find('span')
            .should('exist')
            .and('be.visible')
            .wait(600)
            .then((selectedText) => {
                return selectedText.text();
            });
    }

    static getSelectedTextInDDLHeatTreatment() {
        return cy
            .get(
                ':nth-child(1) > searchable-multiselect-dropdown > .multi-select-container1 >' +
                    ' .multi-select-container2 > .ng-untouched > #searchableMultiselectDropdown > span',
            )
            .invoke('text');
    }

    // conditions in "SELECTED CONDITION"
    static getTextInSelectedCondition() {
        return cy
            .get('.selected-condition')
            .find('.selected-condition-body dl')
            .find('dd')
            .invoke('text');
    }

    static colorOfSelectedCondition() {
        return cy.get('.selected-condition-body');
    }

    static getParametersInSelectedCondition() {
        return cy
            .get('.selected-condition')
            .find('.selected-condition-body dl')
            .find('dt');
        // .invoke('text');
    }

    static getParametersInSelectedConditionsRow() {
        return cy.get('.selected-row').find('b');
        // .invoke('text');
    }

    static getTextInSelectedConditionProduct() {
        return cy
            .get('.selected-condition')
            .find('.selected-condition-body dl')
            .find('dd')
            .should('be.visible')
            .eq(0);
        // .invoke('text');
    }

    static getTextInSelectedConditionExperiment() {
        return cy
            .get('.selected-condition')
            .find('.selected-condition-body dl')
            .find('dd')
            .eq(1);
        // .invoke('text');
    }

    static getTextInSelectedConditionSpecimen() {
        return cy
            .get('.selected-condition')
            .find('.selected-condition-body dl')
            .find('dd')
            .eq(2);
        // .invoke('text');
    }

    static getTextInSelectedConditionComment() {
        return cy
            .get('.selected-condition')
            .find('.selected-condition-body dl')
            .find('dd')
            .then((field) => {
                if (field.length > 3) {
                    return cy
                        .get('.selected-condition')
                        .find('.selected-condition-body dl')
                        .find('dd')
                        .eq(3);
                }
                cy.get('.selected-condition-body dl')
                    .invoke('prop', 'id')
                    .then((prop) => {
                        expect(prop).to.be.equal('');
                    });
            });
    }

    static getTextInSelectedConditionRow() {
        return cy.get('.selected-row').find('label');
        // .find('dd').eq(0)
        // .invoke('text');
    }

    static clickOnCheckboxCondition(indexOfCondition: number) {
        cy.get('.table-cell-checkbox').eq(indexOfCondition).click();
    }
}
export default new FatigueDataConditionSelector();
