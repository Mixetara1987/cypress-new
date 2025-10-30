/// <reference types="cypress" />

export class ConditionSelectorReferenceTree {
    static getSelectedReferences() {
        return cy
            .get('.jqx-tree-dropdown')
            .eq(1)
            .find('li[item-checked="true"]');
    }

    static getUnselectedReferences() {
        return cy
            .get('.jqx-tree-dropdown')
            .eq(1)
            .find('li[item-checked="false"]');
    }

    static getDisabledSelectedReferences() {
        return cy
            .get('.jqx-tree-dropdown')
            .eq(1)
            .find('li[item-checked="true"]')
            .find('div.jqx-tree-item-disabled');
    }

    static getDisabledSelectedReferencesTree(branch: number) {
        return cy
            .get('.jqx-tree-dropdown')
            .eq(branch)
            .find('li[item-checked="true"]')
            .find('.jqx-tree-item-disabled');
    }

    static clickOnCheckBox(index: number) {
        cy.get('.jqx-checkbox-default').eq(index).click();
    }

    static clickOnReferenceCheckBox(index: number) {
        cy.get('ul.jqx-tree-dropdown')
            .find('.jqx-checkbox-default')
            .eq(index)
            .click();
    }

    static checkbox(index: number) {
        return cy
            .get('ul.jqx-tree-dropdown-root')
            .get('.jqx-tree-item-li')
            .find('.jqx-checkbox-default')
            .find('span')
            .eq(index);
    }

    static getReferenceTreeText(index: number) {
        return cy
            .get('.jqx-tree-dropdown')
            .find('.jqx-tree-item')
            .eq(index)
            .invoke('text');
    }
}

export default new ConditionSelectorReferenceTree();
