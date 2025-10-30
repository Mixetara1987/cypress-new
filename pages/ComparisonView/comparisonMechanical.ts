/// <reference types="cypress" />

export class ComparisonViewMechanical {
    // Mechanical tab

    static getSelectedTemperature(index: number) {
        return cy
            .get('.mechanical-property-element')
            .find('.ng-value-container')
            .eq(index)
            .find('.ng-value');
    }

    static getTitlesInPropertyTable(index: number) {
        return cy
            .get('.mechanical-property-element')
            .find('.cmp-table-wrapper')
            .eq(index)
            .find('thead')
            .find('tr')
            .find('th');
    }

    static getDataInPropertyTable(index: number) {
        cy.get('.mechanical-properties-wrapper');
        return cy
            .get('.mechanical-property-element')
            .find('.cmp-table-wrapper')
            .eq(index)
            .find('tbody')
            .find('tr')
            .find('td')
            .should('be.visible');
    }

    static selectTemperature(index: number, temperature: string) {
        cy.get('.mechanical-property-element')
            .find('.condition-select-wrapper')
            .eq(index)
            .find('.ng-select-container')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .contains('div', temperature)
            .click();
    }

    static selectCondition(index: number, condition: string) {
        cy.get('mechanical-details-compare')
            .eq(index)
            .find('i.icon-keyboard_arrow_down')
            .click()
            .get('.dropdown-menu')
            .contains('.dropdown-item.ng-star-inserted', condition)
            .click();
    }

    // tooltip in mechanical property table
    static getTooltipTextInPropertyTable(index: number, row: number) {
        cy.get('.mechanical-properties-wrapper');
        return cy
            .get('.mechanical-property-element')
            .should('exist')
            .find('.cmp-table-wrapper')
            .eq(index)
            .should('exist')
            .find('tr')
            .eq(row)
            .find('.icon-info')
            .trigger('mouseenter')
            .get('ngb-tooltip-window')
            .invoke('text');
    }

    static inModalmoveMouseOut() {
        cy.get('.modal-header').click();
    }
}
export default new ComparisonViewMechanical();
