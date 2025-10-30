export class ComparisonByAnalyticsDiagram {
    static getTitleOn(axis: string) {
        return cy.get(`.highcharts-${axis}axis`).find('span');
    }

    static mouseOverDataPoint(index: number) {
        cy.get('.highcharts-series-group')
            .find('.highcharts-point')
            .eq(index)
            .should('be.visible')
            .realHover();
    }

    static getTextInTooltip() {
        return cy.get('.highcharts-tooltip').invoke('text');
    }

    static getTextInTooltipForMaterialsWithSelectedXandYaxes(
        rgbaColorChart: string,
    ) {
        cy.get(`[fill="${rgbaColorChart}"]`, { timeout: 20000 })
            .should('be.visible')
            .realHover(); // I guess 20 seconds is enough to fill in the graph?
        return cy
            .get('.highcharts-tooltip', { timeout: 5000 })
            .should('be.visible')
            .invoke('text'); // we wait for the tooltip for a maximum of 5 seconds.
    }

    static clickOnDataPoint(index: number) {
        cy.get('.highcharts-series-group')
            .find('.highcharts-point')
            .eq(index)
            .should('be.visible')
            .realClick();
    }

    static clickOnDataPointColor() {
        cy.get('.highcharts-point-hover').click();
    }

    static getValueInPropertyTableFor(property: string) {
        return cy
            .contains('span', property)
            .parent('.analytics-content-wrapper')
            .siblings('.analytics-content-wrapper')
            .find('td.value-cell')
            .eq(0)
            .invoke('text');
    }

    static clickOnBackArrow() {
        cy.get('button').find('.icon-arrow_back').eq(1).click();
    }

    static forDiagramInConditionEnter(property: string, condition: string) {
        cy.contains('span', property)
            .parent('.analytics-content-wrapper')
            .siblings('.analytics-content-wrapper')
            .find('.analytics-table-container')
            .find('.form-group')
            .contains('label', 'Condition')
            .siblings('input')
            .type(condition);
    }

    static clickOnSearchAboveTableFor(property: string) {
        cy.contains('span', property)
            .parent('.analytics-content-wrapper')
            .siblings('.analytics-content-wrapper')
            .find('.analytics-table-container')
            .find('.form-group')
            .contains('button', ' Search ')
            .click();
    }

    static getNumberOfRowsInconditionTable(property: string) {
        return cy
            .contains('span', property)
            .parent('.analytics-content-wrapper')
            .siblings('.analytics-content-wrapper')
            .find('.analytics-table-container')
            .find('.condition-details-table-section')
            .then((rowsLength) => {
                return rowsLength.length;
            });
    }

    static getTextInTooltipForProperty(
        property: string,
        rgbaColorChart: string,
    ) {
        cy.contains('span', property)
            .parent('.analytics-content-wrapper')
            .siblings('.analytics-content-wrapper')
            .find('.analytics-diagram-container')
            .find('.highcharts-root')
            .find(`[fill="${rgbaColorChart}"]`, { timeout: 20000 })
            .should('be.visible')
            .trigger('mouseover'); // I guess 20 seconds is enough to fill in the graph?
        return cy
            .get('.highcharts-tooltip', { timeout: 5000 })
            .should('be.visible')
            .invoke('text'); // we wait for the tooltip for a maximum of 5 seconds.
    }
}
export default new ComparisonByAnalyticsDiagram();
