/// <reference types="cypress" />

export class FatigueProperty {
    static getTextInMonotonicProperties() {
        return cy.get('.monotonic-holder').invoke('text');
    }

    static getTextInMonotonicPropertiesTypical() {
        return cy.get('.monotonic-typical-holder').invoke('text');
    }

    static getValuesInPropertyTable() {
        return cy.get('.custom-table-header').find('tr').find('th');
        // .invoke('text');
    }
}
export default new FatigueProperty();
