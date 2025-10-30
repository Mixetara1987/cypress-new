export class ComparisonViewPhysical {
    static getSelectedTemperature(index: number) {
        return cy
            .get('.physical-property-element')
            .find('.cmp-header')
            .eq(index)
            .find('.ng-value');
    }

    static getDataInPropertyTable(index: number) {
        cy.get('.physical-properties-wrapper');
        return cy
            .get('.physical-property-element')
            .find('.cmp-table-wrapper')
            .eq(index)
            .find('tbody')
            .find('tr')
            .find('td');
    }

    static selectTemperature(index: number, temperature: string) {
        cy.get('.physical-property-element')
            .find('.condition-select-wrapper')
            .eq(index)
            .find('.ng-select-container')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .contains('div', temperature)
            .click();
    }

    static getTitlesInPropertyTable(index: number) {
        return cy
            .get('.physical-property-element')
            .find('.cmp-table-wrapper')
            .eq(index)
            .find('thead')
            .find('tr')
            .find('th');
    }

    static selectConditionForMaterial(
        materialIndex: number,
        condition: string,
    ) {
        cy.get('.accordion-body-wrapper')
            .get('.physical-property-element')
            .eq(materialIndex)
            .find('.ng-arrow-wrapper')
            .eq(1)
            .click()
            .get('.ng-dropdown-panel')
            .find('.ng-dropdown-panel-items')
            .contains('.ng-option', condition)
            .click();
    }
}
export default new ComparisonViewPhysical();
