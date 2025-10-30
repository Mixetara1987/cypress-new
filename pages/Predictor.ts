export class Predictor {
    static getProgresBar() {
        return cy.get('.progress-bar-container').find('span').invoke('text');
    }

    static navigatePredictor() {
        cy.visit(`en/predictor`);
    }

    static getParametersInfo() {
        return cy.get('.parameter-wrapper').invoke('text');
    }

    static getMaterialDefintionTabs() {
        return cy.get('.tm-filter-buttons-wrapper').find('.tm-filter-button');
        // .invoke('text');
    }

    static clickOnPredictorTab(index: number) {
        cy.get('.p-4')
            .find('.tm-filter-buttons-wrapper')
            .find('.tm-filter-button')
            .eq(index)
            .click();
    }

    static checkSearchButton() {
        return cy.get('.tm-filter-button-submit');
    }

    static getMaterialTitleForChemical() {
        return cy
            .get('.chemistry-container')
            .find('.pt-3.pb-4')
            .find('span')
            .find('a')
            .invoke('text');
    }

    static getMaterialFilterTitles() {
        return cy.get('.filters-wrapper').find('b');
    }

    static getMaterialReferencesForChemical() {
        return cy
            .get('.chemistry-container')
            .find('.cmp-wrapper')
            .find('.cmp-header')
            .find('.d-flex')
            .find('.pr-2')
            .get('.condition-label-wrapper')
            .invoke('text');
    }

    static getMaterialDataForChemical(index: number) {
        return cy
            .get('.chemical-composition-container')
            .find('table')
            .find('tbody')
            .find('tr')
            .eq(index)
            .invoke('text');
    }

    static clikOnNextStepButton() {
        return cy.contains('.btn-wrapper', ' NEXT STEP').click();
    }

    static getPredictorParameters() {
        return cy.get('app-predictor-parameters');
    }

    static colorOfSelectedPredictorTab(name: string) {
        return cy
            .get('.tm-filter-buttons-wrapper')
            .contains('.tm-filter-button', `${name}`);
    }

    static colorOfSelectedImplementation(name: string) {
        return cy
            .get('.tm-filter-buttons-wrapper')
            .find('.type-wrapper')
            .contains('.tm-filter-button', `${name}`);
    }

    static colorOfSelectedParameter() {
        return cy.get('.tm-filter-button');
    }

    static clickOnEstimateModel(name: string) {
        cy.get('.predictor-wrapper.pt-2')
            .eq(2)
            .contains('.checkboxes-wrapper', name)
            .find('.tm-checkbox')
            .click();
    }

    static getSelectedProperty(index: number) {
        return cy
            .get('.predictor-wrapper')
            .get('.form-group')
            .eq(index)
            .invoke('text');
    }

    static clickOnPredictorSlider() {
        cy.get('app-predictor-parameters')
            .should('be.visible')
            .find('.sliderPointer')
            .parent('.view-switcher')
            .find('label.switch')
            .should('be.visible')
            .click();
        // .get('.slider').eq(1).click();
    }

    static checkIfForMinMaxBoxes() {
        return cy.get('.filter-wrapper.min-height-wrapper').find('.pt-2');
    }

    static getValueInBoxes(row: number, index: number) {
        return cy
            .get('.filter-wrapper.min-height-wrapper')
            .find('.pt-2')
            .find('.inputs')
            .eq(row)
            .find('.d-flex')
            .eq(index)
            .find('input')
            .invoke('prop', 'value');
    }

    static getSliderTitle(index: number) {
        return cy
            .get('.filter-wrapper.min-height-wrapper')
            .find('label')
            .eq(index)
            .find('b')
            .invoke('text');
    }

    static checkProductResult() {
        return cy.get('app-predictor-result');
    }

    static clickOnLinkedStep(link: string) {
        cy.get('.d-flex').contains('b', link).click();
    }

    static enterTemperature(index: number, temperatyre: string) {
        cy.get('.form-group').get('.form-control').eq(index).type(temperatyre);
    }

    static getFillerValues(index: number) {
        return (
            cy
                .get('.predictor-wrapper.pt-2')
                .eq(1)
                .find('.form-group')
                .eq(index)
                .find('[type="number"]')
                // .find('input')
                .invoke('prop', 'value')
        );
    }

    static getDensityValue() {
        return cy.get('.pt-3').find('input').invoke('prop', 'value');
    }

    static enterDensityValue(value: string) {
        return cy.get('.pt-3').find('input').type(value);
    }

    static enterTemperatureValues(
        index: number,
        box: number,
        temperatyre: string,
    ) {
        return (
            cy
                .get('.pt-2')
                .find('.inputs.p-2.form-group')
                .eq(index)
                // .find('.d-flex')
                .get('input')
                .eq(box)
                .clear()
                .type(temperatyre)
        );
    }

    static getModelPredictionResults(index: number) {
        return cy
            .get('.single-wrapper')
            .find('.single-section')
            .eq(index)
            .invoke('text');
    }

    static clickOnClearAllButton() {
        cy.get(
            '.predictor-composition-box-header-content > :nth-child(2) > :nth-child(1) > .tm-filter-button',
        ).click();
    }

    static clickOnClearAllButtonOptionTwo() {
        cy.get('.clear-btn-wrapper > .tm-filter-button').click();
    }

    static getFillerTitle() {
        return cy.get('.predictor-wrapper').eq(1).find('label');
    }

    static getCharacteristicsTitle() {
        return cy.get('.predictor-wrapper').eq(2).find('span');
    }

    static getDensityTitle() {
        return cy.get(':nth-child(4) > .py-4 > b');
    }

    static clickOnEstimateAI() {
        cy.get('.pt-2')
            .find('.button-wrapper')
            .find('.tm-filter-buttons-wrapper')
            .click();
    }

    static colorOfSelectedCheckbox(column: number) {
        return cy
            .get('.predictor-wrapper.pt-2')
            .eq(2)
            .get('.checkboxes-wrapper')
            .eq(column)
            .find('.tm-checkbox')
            .find('.icon-check_box_outline_blank');
    }

    static getAllValuesFromColumn(
        description: string,
    ): Cypress.Chainable<string> {
        return cy
            .get('.ag-body-viewport')
            .find(`[col-id="${description}"]`, { timeout: 1000 })
            .should('be.visible')
            .invoke('text')
            .then((text) => text.trim());
    }

    static clickOnPredictionSlider(index: number) {
        cy.get('.min-height-wrapper')
            .find('.view-switcher')
            .find('.switch')
            .get('.slider.round')
            .eq(index)
            .click();
    }

    static enterValue(index: number, temperatyre: string) {
        cy.get('.form-group')
            .get('.form-control')
            .eq(index)
            .clear()
            .type(temperatyre);
    }

    static getNumberOfPoints() {
        return cy.get('.labelBold').find('.font-normal').invoke('text');
    }

    static chooseYellowStars(numberOfYellowStars: number) {
        cy.get('.form-group').eq(2).click();
        cy.get('[role="option"]').each(($el, index) => {
            const stars = $el.find('.yellow-star').length;
            if (stars === numberOfYellowStars) {
                cy.get('[role="option"]').eq(index).click();
            }
        });
    }

    static clickOnSaveButton() {
        cy.contains('.tm-filter-button', ' Save').click();
    }

    static getNumberOfVisbleRows() {
        return cy.get('[ref="lbLastRowOnPage"]').then((numberOfvisibleRows) => {
            return parseInt(numberOfvisibleRows.text(), 10);
        });
    }

    static getAllValuesFromPerformanceColumn(performance: string) {
        return cy
            .get('.ag-body-viewport')
            .find(`[col-id="${performance}"]`, { timeout: 1000 })
            .find('child-cell > .d-flex > div > .icon-star.yellow-star')
            .each(($el) => {
                // Assertions for each element, including the first and last
                cy.wrap($el);
            });
    }
}
export default new Predictor();
