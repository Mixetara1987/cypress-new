export class AgeingMetalsPropertyTable {
    static clickOnCheckboxCondition(indexOfRow: number) {
        return cy.get('.custom-grid-wrapper').find('tr').eq(indexOfRow).click();
    }

    static getSelectedTextInConditions() {
        return cy.get('.selected-row');
    }
}
export default new AgeingMetalsPropertyTable();
