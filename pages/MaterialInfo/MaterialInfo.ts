export class MaterialInfo {
    static getMaterialInfoFor(materialInfo: string) {
        return cy
            .get('.material-info')
            .contains('span', materialInfo)
            .should('be.visible')
            .parents('.material-info-item')
            .find('.material-info-value')
            .find('.info-type-text')
            .invoke('text');
    }

    static findMaterialInfoType(name: string) {
        return cy
            .contains(
                '.material-info .material-info-item .material-info-type',
                name,
            )
            .invoke('text');
    }

    static findMaterialInfoValue(name: string) {
        return cy
            .contains('.material-info-value', name)
            .find('.info-type-text')
            .invoke('text');
    }

    static findMaterialDesignationValue(name: string) {
        return cy
            .contains(
                '.material-info .material-info-item .material-info-value',
                name,
            )
            .find('.designation-info')
            .invoke('text');
    }

    static clickOnLinkedMaterial(linkedmaterial: string) {
        return cy
            .get(`.designation-info`)
            .contains('a', `${linkedmaterial}`)
            .click();
    }

    static clickOnAddToMeateialListBuilderbutton() {
        return cy.get('.icon-playlist_add').click({ force: true });
    }

    static showMessageForAddingMaterialForMaterialListBuilder() {
        return cy.get('#toast-container').invoke('text');
    }

    static changeCurrency(valute: string) {
        cy.get('.material-info-item')
            .get('.currency-container')
            .find('.icon-arrow_drop_down')
            .trigger('mouseover')
            .get('.currency-list-container')
            .get('.currency-list')
            .find('.currency-entry')
            .contains('a', valute)
            .click({ force: true });
    }

    static mouseHoverToltipAndGetText() {
        cy.get('.material-info-type').find('.icon-info ').trigger('mouseenter');
        return cy.get('.tooltip-inner').invoke('text');
    }

    static clickOnLinkedTextInsideTooltip(linkedText: string) {
        return cy.get(`.tooltip-inner`).contains('a', `${linkedText}`).click();
    }

    static getMaterialStatus() {
        return cy
            .get('.material-status')
            .find('.status-wrapper')
            .invoke('text');
    }

    static clickOnReplacedLinkedMaterial(linkedmaterial: string) {
        return cy
            .get(`.status-number`)
            .contains('a', `${linkedmaterial}`)
            .click();
    }

    static clickOnMetricImperialUnits() {
        cy.get('.header-tools-wrapper')
            .find('.view-switcher')
            .find('.switch')
            //   .get('.slider').eq(0).click();
            .get('.slider.round')
            .eq(0)
            .click();
    }

    static getMaterialDescriptionReference(row: number) {
        return cy
            .get('.material-description-table-wrapper')
            .find('tr')
            .find('td')
            .find('p')
            .eq(row)
            .invoke('text');
    }

    static getMaterialDetailsTab(titleOFTab: number) {
        return cy
            .get(`.module-split-content-tiles`)
            .find('.tile')
            .get('.tile-header')
            .eq(titleOFTab)
            .invoke('text');
    }

    static getMaterialDetailsTabBody(numberOfRecord: number) {
        return cy.get(`.tile-body-content`).eq(numberOfRecord).invoke('text');
    }

    // dodata
    static isDesignationDisplayed() {
        return cy
            .get('.header-designation-wrapper')
            .find('.material-designation-text')
            .invoke('text');
    }

    static getDiscontiunited() {
        return cy
            .get('.status-wrapper')
            .find('.status-text')
            .should('be.visible')
            .invoke('text');
    }
}
export default new MaterialInfo();
