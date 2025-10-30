export class ComparisonByPropertiesDiagram {
    static propertyComparisonDiagram() {
        return cy.get('.property-comparison-diagram');
    }

    static getDiagramTitle() {
        return cy.get('.ng-value').invoke('text');
    }

    static getTitleOnX() {
        return cy.get('.g-xtitle').invoke('text');
    }

    static getTitleOnY() {
        return cy.get('.g-ytitle').invoke('text');
    }

    static getValuesOnX() {
        const dataOnX = [];
        return cy
            .get('g.xtick')
            .find('text')
            .each(($X) => {
                dataOnX.push($X.text());
                return cy.wrap(dataOnX);
            });
    }

    static getLegendText() {
        return cy.get('.highcharts-legend').find('span').invoke('text');
    }

    static getAxisTitlesOnRadarChart() {
        return cy
            .get('.highcharts-axis-labels')
            .find('span')
            .then((titles) => {
                return Cypress.$.makeArray(titles).map(
                    (textTitles) => textTitles.textContent,
                );
            });
    }

    static getTextInTooltipForMaterialsWithSelectedXandYaxes(
        rgbaColorChart: string,
    ) {
        cy.get(
            `[style="opacity: 1; stroke-width: 0px; fill: ${rgbaColorChart}; fill-opacity: 1;"]`,
            { timeout: 20000 },
        )
            .should('be.visible')
            .parent('.points')
            .realHover();
    }

    static getTitlesOfRadioButtons() {
        return cy
            .get('.radio-groups-wrapper')
            .find('label.tm-radio')
            .should('be.visible');
    }

    static selectChart(chart: string) {
        cy.contains('span', chart).click();
    }

    static getSelectedPropertyInDDL() {
        return cy
            .get('app-property-comparison-diagram')
            .find('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-value')
            .invoke('text');
    }

    static selectInDDLproperty(property: string) {
        cy.get('.property-comparison-diagram')
            .find('.form-group')
            .find('.ng-arrow-wrapper')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .contains('div', property)
            .click();
    }

    static getAllPropertiesInDDl() {
        return cy
            .get('.property-comparison-diagram')
            .find('.form-group')
            .find('.ng-arrow-wrapper')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option');
    }

    static getTextInAlertBellowDiagram() {
        return cy
            .get('.property-comparison-table-component-wrapper')
            .find('.tm-alert.tm-alert-warning')
            .find('p')
            .then((text) => {
                return text.text();
            });
    }

    static getMaterialsInAlertBelowDiagram() {
        return cy
            .get('.property-comparison-table-component-wrapper')
            .find('.tm-alert.tm-alert-warning')
            .find('td')
            .invoke('text');
    }
}
export default new ComparisonByPropertiesDiagram();
