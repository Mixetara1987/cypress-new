export class CrossReference {
    static getTitlesInTabs() {
        return cy
            .get('.tm-tab-selected')
            .get('.tab-text')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static getStandardFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="standard"]')
            .invoke('text');
    }

    static getTabCounter() {
        const numberOfCounters = [];
        return cy
            .get('.tm-tab-button-wrapper')
            .find('.tab-counter')
            .each(($X) => {
                numberOfCounters.push($X.text());
                cy.wrap(numberOfCounters);
            });
    }

    static checkTabCounter() {
        return cy.get('.tm-tab-button-wrapper').find('.tab-counter');
    }

    static clickOnSelectedMaterial(row: number) {
        cy.get('.ag-selection-checkbox').eq(row).click();
    }

    static isSmartCrossSlidersDisplayed() {
        return cy.get('.smart-cross').invoke('text');
    }

    static basicInformationBox(indexOfTab: number) {
        return cy
            .get('.basic-info-compare-wrapper')
            .find('.basic-info')
            .find('.basic-info-value')
            .eq(indexOfTab)
            .invoke('text');
    }

    static moveSlider(index: number, axisX: number) {
        cy.get('.tm-slider')
            .eq(index)
            .trigger('mousedown', { button: 0 })
            .trigger('mousemove', { clientX: axisX, clientY: 0 })
            .trigger('mouseup');
    }

    static checkIfAddToMaterialisdisabled() {
        return cy.get('.btn.btn-default');
    }

    static mouseHoverToltipAndGetText(indexOfTab: number) {
        cy.get('.tm-tab-selected')
            .get('.tab-text')
            .eq(indexOfTab)
            .trigger('mouseenter');
        return cy.get('.tooltip-inner').invoke('text');
    }

    static getTitleOfTab() {
        return cy.get('.tm-tab-selected').get('.tab-text').invoke('text');
    }

    static issmartCrossSlidersVisible(indexOfTab: number) {
        return cy
            .get('.tm-sliders')
            .get('.panel-box-row')
            .find('.filter-label.panel-label')
            .eq(indexOfTab)
            .invoke('text');
    }
}
export default new CrossReference();
