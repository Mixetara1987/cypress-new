export class SmartCompExpertMode {
    static navigateToSmartCompExpert() {
        cy.visit(`en/smart-comp/expert`);
    }

    static mouseOverToolTipExpertMode(row: number) {
        cy.get('.switch-container').find('i').eq(row).trigger('mouseenter');
        return cy
            .get('.header-tooltip')
            .invoke('text')
            .then((tooltipText: string) => {
                return (
                    cy
                        .get('.switch-container')
                        .find('i')
                        .eq(row)
                        .realHover()
                        // .trigger('mouseleave')
                        .realMouseMove(100, 100)
                        .wait(1000)
                        .then(() => tooltipText)
                );
            });
    }

    static clickOnSliderExpertMode(row: number) {
        cy.get('.switch-container')
            .find('.tm-switch-holder')
            .find('.tm-switch')
            .get('.tm-switch-thumb')
            .eq(row)
            .click();
    }

    static moveSliderExpertMode(level: string, value: string) {
        cy.get(`.${level}-search-slider`)
            .find('.tm-slider')
            .invoke('attr', 'value', value);
    }

    static getExpertModeSearchBox() {
        return cy.get('.accordion-body-wrapper');
    }

    static getChemicalCompositionBoxesExpertMode() {
        return cy.get('.expert-search-box-body');
    }

    static getChemicalCompositionBoxesTitleExpertMode() {
        return cy.get('.expert-search-box-body-title').find('p').invoke('text');
    }

    static getBaseElementExpertModeTitle() {
        return cy.get('.expert-search-base-element').find('p').invoke('text');
    }

    static getStandardDropDownExpertModeTitle() {
        return cy
            .get('.expert-search-dropdown-wrapper')
            .find('p')
            .invoke('text');
    }

    static getSimilarityThresholdExpertModeTitle() {
        return cy.get('.expert-search-slider').find('p').invoke('text');
    }

    static getThresholdSensitivityExpertModeTitle(row: number) {
        return cy
            .get('.expert-search-threshold-sensitivity')
            .find('p')
            .eq(row)
            .invoke('text');
    }

    static mouseOverToolTipThreshHoldSensitivityExpertMode(row: number) {
        cy.get('.expert-search-threshold-sensitivity')
            .find('i')
            .eq(row)
            .trigger('mouseenter');
        return cy
            .get('.header-tooltip')
            .invoke('text')
            .then((tooltipText: string) => {
                return cy
                    .get('.expert-search-threshold-sensitivity')
                    .find('i')
                    .eq(row)
                    .realHover()
                    .realMouseMove(100, 100)
                    .wait(1000)
                    .then(() => tooltipText);
            });
    }

    static getThresholdSensitivityExpertModeRadioButtons(row: number) {
        return cy
            .get('.radio-group-holder')
            .find('.radio-group')
            .eq(row)
            .invoke('text');
    }

    static getDefaulthresHoldSensitivityExpertModeRadioButton(row: number) {
        return cy
            .get('.radio-group-holder')
            .find('.radio-group')
            .eq(row)
            .find('label')
            .find('.form-control')
            .invoke('prop', 'checked');
    }

    static clickOnThresHoldSensitivityExpertModeRadioButton(row: number) {
        return cy
            .get('.radio-group-holder')
            .find('.tm-radio')
            .find('.icon-check_box_outline_blank')
            .eq(row)
            .click();
    }

    static getUseVirtualLImitsSliderExpertMode(row: number) {
        return cy
            .get('.switch-container')
            .find('.label-grey')
            .eq(row)
            .invoke('text');
    }

    static clickOnImportChemicalCompositionExpertMode() {
        cy.get('.expert-search-box-body-title')
            .find('.btn.btn-secondary')
            .click();
    }

    static clickOnFormatLinkButtonExpertMode(row: number, link: number) {
        return cy
            .get('.importing-template-wrapper')
            .find('.importing-template')
            .find('span')
            .eq(row)
            .find('button')
            .eq(link)
            .click();
    }
}
export default new SmartCompExpertMode();
