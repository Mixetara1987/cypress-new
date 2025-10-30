/// <reference types="cypress" />

export class PhysicalProperties {
    // ?
    static getSelectedView() {
        return cy.get('.selected-view').invoke('text');
    }
}

export default new PhysicalProperties();
