export class PropertyTableDiagram {
    // dodata
    static clickOnDiagramByName(diagramName: string) {
        cy.wait(1000);
        cy.contains('.property-cell', diagramName)
            .find('.open-diagram')
            .click({ force: true });
    }

    static getDiagramName() {
        return cy
            .get('.report-property-diagram')
            .find('.header-box')
            .invoke('text');
    }

    static getDdlTitle() {
        return cy
            .get('.grid-box')
            .find('.type-box')
            .find('label')
            .invoke('text');
    }

    static getHeaderTextInPointTable() {
        return cy
            .get('.points-table')
            .find('.points-table-header')
            .invoke('text');
    }

    static getValuesInPointTableFromRow(row: number) {
        return cy
            .get('.points-table')
            .find('tr')
            .eq(row)
            .find('td')
            .invoke('text');
    }

    static getTitleOnX() {
        return cy.get('g.g-xtitle').invoke('text');
    }

    static getTitleOnY() {
        return cy.get('g.g-ytitle').invoke('text');
    }

    static getTemperatureRangeText() {
        return cy.get('.temperature-wrapper').find('.label').invoke('text');
    }

    static getTemperatureUnit() {
        return cy
            .get('.enter-temperature-input-wrapper')
            .find('span')
            .invoke('text');
    }

    static getTemperatureValueForCalucaltion() {
        return cy
            .get('.enter-temperature-input-wrapper')
            .find('[type="text"]')
            .invoke('prop', 'value');
    }

    static getLegendText() {
        const legends = [];
        return cy
            .get('.legend')
            .find('.traces')
            .each(($legend) => {
                legends.push($legend.text());
                cy.wrap(legends);
            });
    }

    static clickOnLegend(legend: string) {
        cy.get('.svg-container')
            .find('.infolayer')
            .get('.legend')
            .contains('text', legend)
            .parent('.traces')
            .find('.legendtoggle')
            .click();
    }

    static getLine() {
        return cy.get('.diagram-cell').find('.lines');
    }

    static getTooltipInAddToDiagramComparison() {
        return cy
            .get('.diagram-comparison-btn')
            .find('.btn')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .should('be.visible')
            .invoke('text');
    }

    static clickOnAddToDiagramComparison() {
        cy.get('.diagram-comparison-btn')
            .should('be.visible')
            .find('.btn')
            .click();
    }

    static clickOnOptionInTable(option: string) {
        cy.get('.type-box')
            .find('.searchable-dropdown')
            .click()
            .contains('.ng-option', option)
            .click();
    }

    static closeDiagram() {
        cy.get('.diagram-close').find('button').click({ force: true });
    }

    static visibilityOfDiagram() {
        return cy.get('.js-plotly-plot');
    }

    static getSelectedTextInFormTestMethod() {
        return cy.get('app-property-diagram').find('.ng-value').invoke('text');
    }

    static clickOnTestMethod(optionInForm: string) {
        cy.get('.diagram-cell.diagram-wrapper')
            .find('.ng-arrow')
            .click({ force: true });
        cy.get(`[title="${optionInForm}"]`)
            .trigger('mouseenter')
            .click({ force: true });
    }

    static hoverTooltip(index: number) {
        return cy
            .get('plotly-plot')
            .realHover()
            .get('.modebar-btn')
            .should('be.visible')
            .eq(index)
            .realHover()
            .invoke('attr', 'data-title');
    }

    static getSelectedtextInDDLDiagram() {
        return cy
            .get('app-multipoint-diagram')
            .find('.ng-value')
            .invoke('text');
    }

    // Larson-Miler Parameters
    static getTitleInCalculator(calculator: number) {
        return cy.get('.calculator-wrapper').eq(calculator).invoke('text');
    }

    static calculatorCreepLimitEnterValueIn(form: number, value: string) {
        cy.get('.text-boxes-wrapper')
            .eq(0)
            .find('.lm-input')
            .find('input')
            .eq(form)
            .clear()
            .type(value);
    }

    static calculatorCreepRuptureStrengthEnterValueIn(
        form: number,
        value: string,
    ) {
        cy.get('.text-boxes-wrapper')
            .eq(1)
            .find('.lm-input')
            .find('input')
            .eq(form)
            .clear()
            .type(value);
    }

    static clickOnCalculate(index: number) {
        cy.get(
            `:nth-child(${index}) >
         .calculator-wrapper > :nth-child(4) >
         .calculate`,
        ).click();
    }

    static clickInTemperatureBox() {
        cy.get(`.enter-temperature-input-wrapper`).find(`input`).click();
    }

    static getCalculationResult(calculatorIndex: number) {
        return cy.get('.calculation-result').eq(calculatorIndex).invoke('text');
    }

    static getAlert() {
        return cy
            .get('[role="alertdialog"]')
            .should('be.visible')
            .then((alert) => {
                const alertLimits = alert.text();
                cy.wrap(alertLimits);
            });
    }
    // Larson-Miler Parameters

    static getActualValuesOnX() {
        const dataOnX = [];
        return cy
            .get('g.xtick')
            .find('text')
            .each(($X) => {
                dataOnX.push(parseInt($X.text(), 10));
                cy.wrap(dataOnX);
            });
    }

    // dodata
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

    // dodata
    static getValuesOnY() {
        const dataOnY = [];
        return cy
            .get('g.ytick')
            .find('text')
            .each(($X) => {
                dataOnY.push($X.text());
                return cy.wrap(dataOnY);
            });
    }

    static getActualValuesOnY() {
        const dataOnY = [];
        return cy
            .get('g.ytick')
            .find('text')
            .each(($X) => {
                dataOnY.push(parseInt($X.text(), 10));
                cy.wrap(dataOnY);
            });
    }

    static enterTemperature(temperature: string) {
        cy.get('.enter-temperature-input-wrapper')
            .find('.form-control')
            .clear()
            .type(temperature);
    }

    static clearTemperature() {
        cy.get('.enter-temperature-input-wrapper')
            .find('.form-control')
            .clear();
    }

    static clearText() {
        return cy.get('[type="text"]').clear({ force: true });
    }

    static getActualValuesOnXexponent() {
        const dataOnX = [];
        return cy
            .get('g.xtick')
            .find('text')
            .each(($X) => {
                dataOnX.push($X.text());
                cy.wrap(dataOnX);
            });
    }

    static getActualValuesOnYexponent() {
        const dataOnX = [];
        return cy
            .get('g.ytick')
            .find('text')
            .each(($X) => {
                dataOnX.push($X.text());
                cy.wrap(dataOnX);
            });
    }

    static getSelectedTemperatureValue() {
        return cy
            .get('.ng-select-container')
            .find('.ng-value-label')
            .invoke('text');
    }

    static displayImperialTemperature() {
        return cy
            .get('.ng-select-container')
            .find('.ng-value')
            .find('.ng-value-label')
            .invoke('text');
    }

    static getTableWithDotsForDiagram() {
        return cy.get('.grid-box').invoke('text');
    }

    static DiagramExist() {
        return cy.get('#diagram').invoke('text');
    }

    static getSomeValueFromTable(row: number) {
        return cy
            .get('.points-table')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(0)
            .then((controlNumber) => {
                const numberOfDcimals = controlNumber
                    .text()
                    .split('.')[1].length;
                return numberOfDcimals;
            });
    }

    static getDecimalRemainderForNumber(
        row: number,
        column: number,
        referenceNumber: number,
    ) {
        return cy
            .get('.points-table')
            .find('tr')
            .eq(row)
            .find('td')
            .eq(column)
            .then((valueInTable) => {
                const numberInTable = Number(valueInTable.text());
                if (numberInTable > referenceNumber) {
                    expect(numberInTable).to.match(/^[0-9]*$/);
                } else {
                    expect(numberInTable).to.match(/^[0-9]\d*(\.\d+)?$/);
                }
            });
    }

    // Stress Strain
    static inDiagramEngineeringStressStraingetText() {
        return cy.get('.engineering-label').should('be.visible');
    }

    static checkForDiagramXY(x: string, y: string) {
        PropertyTableDiagram.visibilityOfDiagram().should('exist');
        PropertyTableDiagram.getLine().should('be.visible');
        PropertyTableDiagram.getTitleOnX().should('equal', x);
        PropertyTableDiagram.getTitleOnY().should('equal', y);
        // PropertyTable.getTableValues(''); // mixa
    }
}

export default new PropertyTableDiagram();
