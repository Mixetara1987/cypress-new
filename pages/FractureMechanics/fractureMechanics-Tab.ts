export class FractureMechanics {
    static getParametersInSelectedConditionsRow() {
        return cy.get('.selected-row').find('b').invoke('text');
    }

    static getTextInSelectedCondition() {
        return cy
            .get('.selected-condition')
            .find('.selected-condition-body dl')
            .find('dd')
            .invoke('text');
    }

    static getTextInHeaders() {
        cy.get('app-fracture-mechanics-table-data');
        return cy
            .get('.custom-table-wrapper')
            .find('.custom-table-header')
            .find('th');
    }

    static getValuesInPropertyTable() {
        return (
            cy
                .get('table')
                // .find('.custom-details-table')
                .find('tr')
                .find('td.property-cell-right')
                .then((propertyCell) => {
                    propertyCell.text();
                })
        );
    }

    static getTextInMonotonicProperties() {
        return cy
            .get('.material-preview')
            .find('.monotonic-holder')
            .find('span')
            .invoke('text');
    }
}
export default new FractureMechanics();
