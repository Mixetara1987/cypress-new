/// <reference types="cypress" />

export class NotesList {
    static getTitle() {
        return cy.get('.notes-title').invoke('text');
    }

    static getTextInNotes() {
        return cy.get('.notes-wrapper').find('span.notes-text').invoke('text');
    }
}

export default new NotesList();
