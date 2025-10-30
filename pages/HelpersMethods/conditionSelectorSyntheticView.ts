/// <reference types="cypress" />

export class ConditionSelectorSyntheticView {
    static getSmallFontTextInTab() {
        return cy
            .get('.active > .tile > .tile-body > .tile-body-content')
            .find('.line-row-title');
    }

    static getSyntheticProperties() {
        return cy.get('.property-name');
    }

    static clickOnViewDetailsLink(property: string) {
        cy.get('.property-item')
            .contains('.property-name', property)
            .parents('.property-item')
            .find('.property-actions')
            .find('button.view-details-btn')
            .click();
    }

    static getSyntheticViewPropertyUnits() {
        return cy
            .get('.property-content')
            .find('.property-value')
            .invoke('text');
        // .get('b').invoke('text')
    }

    static getValueProperty(property: string) {
        return cy
            .contains('.property-name', property)
            .parent('.property-content')
            .find('.property-value')
            .invoke('text');
        // .find('b').invoke('text');
    }
}
export default new ConditionSelectorSyntheticView();
