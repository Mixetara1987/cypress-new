export class Composition {
    static getTextForSelectedInReferenceInFirstColumn(conditionRow: number) {
        return cy
            .get('.selected-condition-body')
            .find('dt')
            .eq(conditionRow)
            .invoke('text');
    }

    static getTextForSelectedInReferenceInSecondColumn(conditionRow: number) {
        return cy
            .get('.selected-condition-body')
            .find('dd')
            .eq(conditionRow)
            .invoke('text');
    }

    static getConditionAtRow() {
        cy.wait(1000);
        return cy
            .get('.composition-nonmetals-wrapper')
            .find('.points-table.noBottomMargin')
            .find('.header-cell')
            .invoke('text');
    }

    static clickOnCASNUMBER(casNumber: string) {
        cy.get('.points-table-body')
            .find('td')
            .find('a')
            .contains('a', casNumber)
            .trigger('mouseover')
            .click();
    }
}

export default new Composition();
