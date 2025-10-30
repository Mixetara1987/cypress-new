export class MaterialDiscoveryDiagram {
    static getTitleOnX() {
        return cy.get('.highcharts-axis.highcharts-xaxis').should('be.visible');
    }

    static getTitleOnY() {
        return cy.get('.highcharts-axis.highcharts-yaxis').should('be.visible');
    }

    static getAllTitlesOnX() {
        return cy
            .get('.highcharts-xaxis-labels')
            .find('text')
            .then((groupOfMaterials) => {
                return Cypress.$.makeArray(groupOfMaterials).map(
                    (textgroupOfMaterials) => textgroupOfMaterials.textContent,
                );
            });
    }

    static getTextInTooltipForMaterialGroups(index: number) {
        return cy
            .get('.highcharts-series-group')
            .find('path')
            .eq(index)
            .trigger('mouseover')
            .get('.highcharts-tooltip')
            .find('span')
            .should('be.visible')
            .invoke('text');
    }

    static getHeightOfRectangle() {
        return cy
            .get('.highcharts-series-group')
            .should('be.visible')
            .find('path')
            .eq(1)
            .as('path')
            .get('@path')
            .should('exist')
            .invoke('prop', 'outerHTML');
    }

    static clickOnChart(chartOfMaterialGroupIndex: number) {
        cy.get('.highcharts-xaxis-labels')
            .should('be.visible')
            .get('.highcharts-series-group')
            .should('be.visible')
            .find('path')
            .eq(chartOfMaterialGroupIndex)
            .should('be.visible')
            .click();
    }

    static colorOfChart(chartOfMaterialGroupIndex: number) {
        return cy
            .get('.highcharts-xaxis-labels')
            .find('text')
            .eq(chartOfMaterialGroupIndex)
            .invoke('text')
            .get('.highcharts-series-group')
            .find('path')
            .eq(chartOfMaterialGroupIndex)
            .should('be.visible');
    }

    static buttonFullScreen() {
        return cy.get('.icon-fullscreen');
    }

    static getTextInTooltipForMaterialGroupsWithSelectedXandYaxes(
        rgbaColorChart: string,
    ) {
        cy.get(`[fill="${rgbaColorChart}"]`, { timeout: 20000 }).should(
            'be.visible',
        ); // I guess 20 seconds is enough to fill in the graph?
        const fillFirst = '[fill="none"]';
        const fillSecond = '[fill="rgba(192,192,192,0.0001)"]';
        cy.get(`[fill="${rgbaColorChart}"]`)
            .siblings(fillFirst)
            .siblings(fillSecond)
            .should('exist')
            .realHover()
            .realHover({ position: 'topLeft' });
        cy.get(`[fill="${rgbaColorChart}"]`)
            .siblings(fillFirst)
            .siblings(fillSecond)
            .should('exist')
            .realHover()
            .realHover({ position: 'center' });
        return cy.get('.highcharts-tooltip', { timeout: 5000 }).invoke('text'); // we wait for the tooltip for a maximum of 5 seconds.
    }
}
export default new MaterialDiscoveryDiagram();
