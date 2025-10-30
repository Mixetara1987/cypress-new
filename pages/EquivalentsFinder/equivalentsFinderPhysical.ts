export class EquivalentsFinderPhysicalProperty {
    static getValueInColumn(property: string, index: number) {
        return cy
            .get('.accordion-body-wrapper')
            .find('.show-controls-and-list-wrapper')
            .find('.selected-properties-table-wrapper')
            .find(`.body-cell-` + property)
            .find('.property-value')
            .eq(index)
            .invoke('text');
    }

    static getPropertyCheckbox(property: string) {
        return cy
            .get('.form-group-wrapper')
            .find('[formarrayname="physicalProperties"]')
            .contains('span', property)
            .parent('.tm-checkbox')
            .find('.form-control');
    }
}
export default new EquivalentsFinderPhysicalProperty();
