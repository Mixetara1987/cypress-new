export class SmartCompChemicalComposition {
    static enterValue(element: string, value: string) {
        cy.get(`#chemistry-element-control-${element}`)
            .find('.chemical-symbol-holder')
            .find('.chemical-element-input')
            .clear()
            .type(value);
    }

    static getValue(element: string) {
        return cy
            .get(`#chemistry-element-control-${element}`)
            .find('.chemical-element-input')
            .invoke('attr', 'value');
    }

    static clickOnChemicalCompositionOnMaterialToDisallow(index: number) {
        return cy
            .get('.chemical-element-table')
            .find('.chemical-element')
            .eq(index)
            .find('.chemical-element-container')
            .find('.chemical-symbol-holder')
            .find('.actions-wrapper')
            .find('.btn.btn-secondaty')
            .find('i')
            .click();
    }

    static getColorOfChemicalCompositionOnMaterialDisallowed(index: number) {
        return cy
            .get('.chemical-element')
            .eq(index)
            .find('.chemical-element.ng-star-inserted.not-allowed');
    }

    static getTextForDisallowedElement(index: number) {
        return cy
            .get('.chemical-element-table')
            .find('.chemical-element')
            .eq(index)
            .find('.chemical-element-container')
            .find('.chemical-element-holder')
            .find('.chemical-slider-holder')
            .find('#notAllowedLabel')
            .invoke('text');
    }

    static ChemicalCompositionElementSlider(
        element: string,
        value: string,
        relativeImportance: string,
    ) {
        cy.get(`#chemistry-element-control-${element}`)
            .find('.chemical-element-input')
            .clear()
            .type(value)
            .parents('.chemical-element')
            .contains('.chemical-element', element)
            .parents('.chemical-element-container')
            .find('.chemical-slider-holder')
            .find('.tm-slider')
            .invoke('prop', 'value', relativeImportance);
    }

    static checkChangedValueInSlider(element: string) {
        return cy
            .get(`#chemistry-element-control-${element}`)
            .find('.chemical-slider-holder')
            .find('#relativeImportanceLabel')
            .invoke('prop', 'textContent')
            .invoke('text');
    }

    static getChemicalCompositionElementSlider(element: string, value: string) {
        return cy
            .get(`#chemistry-element-control-${element}`)
            .find('.chemical-element-input')
            .clear()
            .type(value)
            .parents('.chemical-element')
            .contains('.chemical-element', element)
            .parents('.chemical-element-container')
            .find('.chemical-slider-holder')
            .find('#relativeImportanceLabel')
            .find('strong')
            .invoke('text');
    }

    static resetChemicalCompositionSliders() {
        cy.get('#buttons')
            .contains('.tm-filter-button', 'Reset sliders')
            .click();
    }
}
export default new SmartCompChemicalComposition();
