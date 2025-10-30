export class References {
    static getTitleForReferences() {
        return cy
            .get('.reference-list-wrapper.selected-list')
            .find('h4')
            .invoke('text');
    }

    static getTextInReferences() {
        return cy.get('.selected-list').find('ol').invoke('text');
    }

    static getTitleForAllReferencesAndNotes(index: number) {
        return cy
            .get('.reference-list-wrapper')
            .find('h4')
            .eq(index)
            .invoke('text');
    }

    static getTextInForAllReferences() {
        return cy
            .get('.reference-list-wrapper')
            .find('ol')
            .find('li')
            .invoke('text');
    }

    static getReferencesTribologyNonMetals() {
        return cy
            .get('.reference-list-wrapper')
            .find('.reference-list-title')
            .invoke('text');
    }

    static getTextInReferencesTribologyNonMetals() {
        return cy
            .get('.reference-list')
            .find('.reference-list-item')
            .invoke('text');
    }

    static getTextInReferencesByRows(row: number) {
        return cy
            .get('.reference-list')
            .find('.reference-list-item')
            .eq(row)
            .invoke('text');
    }

    static getReferencesGL() {
        return (
            cy
                .get('.reference-list')
                // .find('ol')
                .find('li')
                .invoke('text')
        );
    }

    static getTextInNotes() {
        return cy.get('.notes-wrapper').find('span').invoke('text');
    }

    static clickOnSDSLink(link: string) {
        return cy.get('.justify-right').contains('a', `${link}`).click();
    }

    static getSDSTable() {
        return cy.get('.table-bordered-wrapper').find('.table-bordered');
    }

    static getTableHeaderValues() {
        const headers = [];
        return cy
            .get('table')
            .find('thead')
            .find('th')
            .each(($X) => {
                headers.push($X.text());
                return cy.wrap(headers);
            });
    }

    static getTableDataValues() {
        const headers = [];
        return cy
            .get('table')
            .find('tbody')
            .find('tr')
            .find('td')
            .each(($X) => {
                headers.push($X.text());
                return cy.wrap(headers);
            });
    }
}
export default new References();
