/// <reference types="cypress" />

export class CorrosionConditionSelector {
    static getTitlesInCascadeFilters() {
        return cy.get('.box-wrapper').find('.form-group mat-tree-node');
    }

    static enterInSearchMediumTree(medium: string) {
        cy.get('.corrosion-selector-medium')
            .find('input[placeholder="Search"]')
            .clear()
            .type(medium);
    }

    static getVisibleMediums() {
        return cy
            .get('.corrosion-selector-medium')
            .find('mat-tree')
            .find('a')
            .should('be.visible')
            .then((medium) => {
                return Cypress.$.makeArray(medium).map(
                    (textMedium) => textMedium.textContent,
                );
            });
    }

    static getAllOptionsInDDL(property: string) {
        return cy
            .get('.form-group-wrapper')
            .should('exist')
            .contains('label', property)
            .should('be.visible')
            .parent('.form-group')
            .should('be.enabled')
            .click()
            .find('.ng-dropdown-panel-items')
            .find('.ng-option')
            .then((option) => {
                return Cypress.$.makeArray(option).map(
                    (textOption) => textOption.textContent,
                );
            });
    }

    static getAllOptionsInDDOptionOne(index: number, property: string) {
        return cy
            .get('.column-2')
            .find('.filter-wrapper')
            .eq(index)
            .contains('label', property)
            .parent('.search-dropdown-wrapper')
            .click()
            .find('.ng-dropdown-panel-items')
            .get('.ng-option')
            .then((option) => {
                return Cypress.$.makeArray(option).map(
                    (textOption) => textOption.textContent,
                );
            });
    }

    static getAllOptionsInDDOptionTwo(index: number, property: string) {
        return cy
            .get('.column-2')
            .contains('label', property)
            .parent('#searchDropdown')
            .eq(index)
            .click()
            .find('.ng-dropdown-panel')
            .find('.ng-dropdown-panel-items')
            .get('.ng-option')
            .then((option) => {
                return Cypress.$.makeArray(option).map(
                    (textOption) => textOption.textContent,
                );
            });
    }

    static getAllOptionsInDDOptionThree(index: number, property: string) {
        return (
            cy
                .get('.column-2')
                .find('.filter-wrapper')
                .eq(index)
                .contains('label', property)
                .parent('.form-group')
                .click()
                .find('.ng-select-container')
                // .find('.ng-dropdown-panel')
                // .find('.ng-dropdown-panel-items')
                .get('.ng-option')
                .then((option) => {
                    return Cypress.$.makeArray(option).map(
                        (textOption) => textOption.textContent,
                    );
                })
        );
    }

    static getAllOptionsInDDOptionFour(index: number, property: string) {
        return (
            cy
                .get('.column-1')
                .find('.filter-wrapper')
                .eq(index)
                .contains('label', property)
                .parent('material-type-dropdown')
                .click()
                // .find('.ng-dropdown-panel')
                .find('.show')
                .find('.dropdown-item.ng-star-inserted')
                .then((option) => {
                    return Cypress.$.makeArray(option).map(
                        (textOption) => textOption.textContent,
                    );
                })
        );
    }

    static getAllOptionsInDDOptionFive(property: string) {
        return cy
            .get('.column-2')
            .contains('label', property)
            .parent('.filter-wrapper')
            .click()
            .find('.ng-dropdown-panel-items')
            .find('.ng-option')
            .then((option) => {
                return Cypress.$.makeArray(option).map(
                    (textOption) => textOption.textContent,
                );
            });
    }

    static getAllOptionsInDDOptionSix(property: string) {
        return cy
            .get('.column-3')
            .contains('label', property)
            .parent('.form-group')
            .click()
            .find('.ng-dropdown-panel-items')
            .find('.ng-option.ng-star-inserted')
            .then((option) => {
                return Cypress.$.makeArray(option).map(
                    (textOption) => textOption.textContent,
                );
            });
    }

    static getAllOptionsInDDOptionSeven(index: number, property: string) {
        return cy
            .get('.form-group-wrapper')
            .contains('label', property)
            .parent('.form-group')
            .click()
            .eq(index)
            .find('.ng-dropdown-panel-items')
            .find('.ng-option')
            .then((option) => {
                return Cypress.$.makeArray(option).map(
                    (textOption) => textOption.textContent,
                );
            });
    }

    // conditions in "SELECTED CONDITION"
    static getTextInSelectedCondition() {
        return cy
            .get('.selected-condition')
            .find('.selected-condition-body dl')
            .find('dd')
            .invoke('text');
    }

    static clickOnConcentrationDDLOption(index: number) {
        cy.get('.corrosion-selector-medium')
            .find('ng-select')
            .get('.ng-select-container')
            .eq(0)
            .click()
            .get('.ng-option')
            .eq(index)
            .click();
    }

    static clickOnMediumTreeArrowFor(medium: string) {
        cy.get('mat-tree-node')
            .contains('a.btn', medium)
            .parent('mat-tree-node')
            .find('button')
            .click();
    }

    static clickOnMediumTreeOption(mediumOption: string) {
        cy.get('.mat-tree').contains('.btn', mediumOption).click();
    }

    static getTextInSelectedMediumBellowTree() {
        return cy
            .get('.corrosion-selector-medium')
            .find('.selected-medium')
            .invoke('text');
    }

    static fieldsForMinAndMax() {
        return cy
            .get('.box-wrapper')
            .get('.form-group')
            .find('.input-numbers-wrapper');
    }
}

export default new CorrosionConditionSelector();
