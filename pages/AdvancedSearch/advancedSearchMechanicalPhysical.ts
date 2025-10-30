export class AdvancedMechanicalPhysicalProperty {
    // Mechanical Properties

    static getPropertyHeader() {
        return cy
            .get('table.property-element-table')
            .get('thead')
            .get('tr')
            .get('th');
    }

    static selectProperty(property: string) {
        cy.get('advanced-search-property')
            .get('[bindlabel="propertyName"]')
            .click()
            .get('ng-dropdown-panel')
            // .find('.ng-option-label')
            .contains('.ng-star-inserted', new RegExp(`^${property}$`))
            .click();
    }

    static selectType(type: string) {
        cy.get('.property-element-table')
            .find('td.type')
            .click()
            .find('.ng-dropdown-panel-items')
            .contains('span.ng-option-label', type)
            .click();
    }

    static getTextinPlaceholderType() {
        return cy
            .get('#valueTypeDropdown')
            .find('.ng-select-container')
            .find('.ng-value-label')
            .invoke('text');
    }

    static selectSubProperty(subproperty: string) {
        cy.get('.property-element-table')
            .find('#subPropDropdown')
            .click()
            .get('ng-dropdown-panel')
            .contains('div.ng-option', subproperty)
            .click();
    }

    static getTextInSubPropertyPlacehoder() {
        return cy
            .get('#subPropDropdown')
            .find('.ng-value')
            .find('div')
            .invoke('text');
    }

    static selectSecondSubProperty(subproperty: string) {
        cy.get('.property-element-table')
            .find('#grandChildrenPropDropdown')
            .click()
            .get('ng-dropdown-panel')
            .contains(new RegExp(`^${subproperty}$`))
            .click();
    }

    static getTextInSecondSubPropertyPlacehoder() {
        return cy
            .get('#grandChildrenPropDropdown')
            .find('.ng-value')
            .find('div')
            .invoke('text');
    }

    static selectUnit(unit: string) {
        cy.get('.property-element-table')
            .find('.unit')
            .find('#unitDropdown')
            .click()
            .get('ng-dropdown-panel')
            .find('div.ng-option')
            .contains(new RegExp(`^${unit}$`))
            .click();
    }

    static getTextInUnitPlaceholder() {
        return cy
            .get('.property-element-table')
            .find('.unit')
            .find('#unitDropdown')
            .find('.ng-value')
            .invoke('text');
    }

    static selectUnitInT(unit: string) {
        cy.get('.property-element-table')
            .find('.temperature')
            .find('#unitDropdown')
            .click()
            .get('ng-dropdown-panel')
            .contains('div.ng-option', unit)
            .click();
    }

    static typeInFirstMinValue(value: string) {
        cy.get('.property-element-table')
            .find('td.min')
            .first()
            .click()
            .find('.property-value')
            .find('.input-wrapper')
            .find('.form-control')
            .type(value);
    }

    static typeInFirstMaxValue(value: string) {
        cy.get('.property-element-table')
            .find('td.max')
            .first()
            .click()
            .find('.property-value')
            .find('.input-wrapper')
            .find('.form-control')
            .clear()
            .type(value);
    }

    static getTextInTemperatureUnitPlaceholderT() {
        return cy
            .get('.property-element-table')
            .find('.temperature')
            .find('#unitDropdown')
            .find('span.ng-value-label')
            .invoke('text');
    }

    // click on link Advanced Search from mechanical properties tab
    static clickOnAdvancedSearhcLink(link: string) {
        return cy
            .get('.tile-body-content')
            .find('.line-row')
            .find('.line-row-value')
            .find('span')
            .find('u')
            .contains('a', `${link}`)
            .parents('.line-row-value')
            .click();
    }
}
export default new AdvancedMechanicalPhysicalProperty();
