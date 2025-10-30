export class CompositionPropertyTable {
    static getAllPropertyValuesInRowNonMetas(row: number) {
        cy.wait(1500);
        return cy.get('.points-table-body').eq(row).invoke('text');
    }

    static getValueInPropertyTableRowMetals(row: number) {
        cy.wait(1500);
        return cy
            .get('.points-table-body')
            .find('tr.ng-star-inserted')
            .eq(row)
            .find('td');
    }

    static clickOnCriteriaRowElement(
        row: number,
        column: number,
        criteriaElement: string,
    ) {
        cy.get('.points-table-body')
            .find('table')
            .find('tbody')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(column)
            .contains('a', criteriaElement)
            .click();
    }
}
export default new CompositionPropertyTable();
