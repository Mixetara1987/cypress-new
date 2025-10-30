export class StandardListResults {
    static getLegendTitles() {
        return cy
            .get('.standard-list-results-wrapper')
            .find('.table-legend')
            .find('.legend-item')
            .should('be.visible')
            .then((item) => {
                cy.wrap(item);
            });
    }

    static getPageNumber() {
        return cy.get('#lbCurrent');
    }

    static clickOnNextPage() {
        cy.contains('button', 'Next').click();
    }

    static clickOnFirstPage() {
        cy.contains('button', 'First').click();
    }

    static clickOnLastPage() {
        cy.contains('button', 'Last').click();
    }

    static getNumberOfRow(row: number) {
        return cy.get(`[rowspan="${row + 1}"]`);
    }
}

export default new StandardListResults();
