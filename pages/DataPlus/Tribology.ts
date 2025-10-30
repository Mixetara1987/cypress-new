/// <reference types="cypress" />

export class Tribology {
    static getTHeadlineProperties() {
        return cy.get('.tribology-headline-properties').invoke('text');
    }

    static getMessageTextAboveListOfResult() {
        return cy.get('.no-original-info-wrapper').find('span').invoke('text');
    }
}
export default new Tribology();
