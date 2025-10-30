export class WeatherabilityNonMetalsPropertyTable {
    static clickOnCheckboxCondition(indexOfRow: number) {
        cy.get('.custom-grid-wrapper').find('tr').eq(indexOfRow).click();
    }

    static getTextSelectedInCondition() {
        return cy.get('.selected-condition-body').invoke('text');
    }

    static getColumnTitles() {
        return cy
            .get('.condition-details-table-head')
            .find('.condition-details-table-cell');
    }
}
export default new WeatherabilityNonMetalsPropertyTable();
