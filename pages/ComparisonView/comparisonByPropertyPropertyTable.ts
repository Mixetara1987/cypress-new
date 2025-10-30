export class ComparisonByPropertyPropertyTable {
    static comparisonPropertyTable() {
        return cy.get('table.property-comparison-table');
    }

    static getHeaderTitlesInTable() {
        return cy.get('table').find('thead').find('tr').find('th');
    }

    static moveMouse() {
        cy.get('footer').click();
    }

    static getAllPropertiesInPropertyTable() {
        return cy.get('.header-title').then((property) => {
            return Cypress.$.makeArray(property).map(
                (textProperty) => textProperty.textContent,
            );
        });
    }

    static getValueForMaterialProperty(material: string, property: string) {
        return cy
            .contains('.header-title', property)
            .parents('.property-comparison-table-header')
            .siblings('.property-comparison-table-body')
            .find('.link-cell')
            .parent('td')
            .siblings('.ng-star-inserted')
            .invoke('text');
    }

    static getTextInDisableTooltipAboveProperty(property: string) {
        return cy
            .get('.property-comparison-table-header')
            .parent('.property-comparison-table')
            .should('be.visible')
            .contains('.header-title', property)
            .should('exist')
            .and('be.visible')
            .parent('.ng-star-inserted')
            .find('.checkbox-details')
            .trigger('mouseenter')
            .get('.property-comparison-table-header')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static getTextInRemoveTooltipAboveProperty(property: string) {
        return cy
            .get('.property-comparison-table-header')
            .contains('.header-title', property)
            .parent('.ng-star-inserted')
            .find('.remove-btn')
            .should('exist')
            .and('be.visible')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static getTextInDisableTooltipInRowMaterial(materialAndStandard: string) {
        return cy
            .get('.property-comparison-table-body')
            .contains('.link-cell', materialAndStandard)
            .parents('.property-comparison-table-body')
            .find('.checkbox-details')
            .should('exist')
            .and('be.visible')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static getTextInRemoveTooltipInRowMaterial(materialAndStandard: string) {
        return cy
            .get('.property-comparison-table-body')
            .contains('.link-cell', materialAndStandard)
            .parents('.property-comparison-table-body')
            .find('.remove-btn')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static clickOnMaterialLinkForMaterial(material: string) {
        cy.get('.toast-message').should('not.exist');
        cy.contains('a.link-cell', material)
            .should('exist')
            .and('be.visible')
            .click();
    }

    static clickOnDisableProperty(property: string) {
        cy.wait(500);
        cy.get('.property-comparison-table-header')
            .contains('.header-title', property)
            .as('propertyRow')
            .get('@propertyRow')
            .parent('.ng-star-inserted')
            .find('.checkbox-details')
            .as('checkbox')
            .get('@checkbox')
            .should('be.visible')
            .trigger('mouseover')
            .click();
    }

    static clickOnRemoveProperty(property: string) {
        cy.get('.property-comparison-table-header')
            .contains('.header-title', property)
            .parent('.ng-star-inserted')
            .find('.remove-btn')
            .click();
    }

    static getTextInModalAlertRemove() {
        return cy
            .get('.modal-body')
            .should('be.visible')
            .find('p')
            .invoke('text');
    }

    static clickOnYesInModalAlertRemove() {
        cy.get('.modal-footer').contains('.tm-filter-button', 'Yes').click();
    }

    static clickOnDisableMaterial(materialAndStandard: string) {
        cy.get('.property-comparison-table-body')
            .contains('.link-cell', materialAndStandard)
            .parents('.property-comparison-table-body')
            .then((body) => {
                body.find('.tm-checkbox').click();
            });
    }

    static clickOnRemoveMatrial(materialAndStandard: string) {
        cy.get('.property-comparison-table-body')
            .contains('.link-cell', materialAndStandard)
            .parents('.property-comparison-table-body')
            .then((body) => {
                body.find('.remove-btn').click();
            });
    }
}
export default new ComparisonByPropertyPropertyTable();
