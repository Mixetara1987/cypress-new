export class StressStrain {
    static getConditionFiltersTitles() {
        return cy.get('.form-group').find('label');
    }

    static sourceTreeExist() {
        cy.get('.temperature-table');
        return cy.get('.box');
    }

    static checkbox(index: number) {
        return cy
            .get('ul.jqx-tree-dropdown-root')
            .get('.jqx-tree-item-li')
            .find('.jqx-checkbox-default')
            .find('span')
            .eq(index);
    }

    static getAllTemperaturesRange() {
        const temperature = [];
        return cy
            .get('.temperature-table')
            .find('.tm-checkbox')
            .each(($X) => {
                temperature.push(parseInt($X.text(), 10));
                return cy.wrap(temperature);
            });
    }

    static getListOfResultsFound(indexOfResult: number) {
        return cy
            .get('material-search-results-table')
            .get('.grid-tools-wrapper')
            .eq(indexOfResult)
            .get('.results')
            .invoke('text');
    }

    static clickOnTab(nameOfTAb: string) {
        cy.get('.tab-extended-range-selected');
        cy.contains('.tab-text', nameOfTAb).click();
    }

    static colorOfSelectedTab(tabName: string) {
        return cy
            .get('.type-buttons-wrapper')
            .contains('.ng-star-inserted', tabName)
            .should('have.class', 'tab-extended-range-selected')
            .then(($tab) => {
                const computedStyle = window.getComputedStyle($tab[0]);
                return computedStyle.getPropertyValue('background');
            });
    }

    static clickOnCheckboxCondition(indexOfRow: number) {
        return cy.get('.custom-grid-wrapper tr').eq(indexOfRow).click();
    }

    static clickOnCheckboxConditionId(id: string) {
        return cy
            .get(`label[for="condition${id}"]`)
            .should('be.visible')
            .first()
            .click();
    }

    static getValueInDDl(index: number) {
        return (
            cy
                .get('.searchable-dropdown')
                .find('.ng-select-container')
                .find('.ng-value-container')
                .get('.ng-value')
                // .find('span')
                .eq(index)
                .invoke('text')
        );
    }

    static getValueInDDlForUnitConversion() {
        return cy
            .get('.temperature-wrapper')
            .find('.enter-temperature-wrapper')
            .find('.enter-temperature-input-wrapper')
            .find('.form-control')
            .invoke('prop', 'value');
    }
}
export default new StressStrain();
