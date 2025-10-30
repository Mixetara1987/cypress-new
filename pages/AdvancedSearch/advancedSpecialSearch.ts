export class AdvancedSpecialSearch {
    static getHeatTreatmentDiagramTitle() {
        return cy
            .get('advanced-search-special-search')
            .get('.form-group-title')
            .invoke('text');
    }

    static clickOnCheckboxProperty(property: string) {
        cy.get('advanced-search-special-search')
            .contains('span', property)
            .siblings('.icon-check_box_outline_blank')
            .click();
    }

    static clickOnCheckboxes(property: string[]) {
        Cypress._.times(property.length, (propertyIndex) => {
            AdvancedSpecialSearch.clickOnCheckboxProperty(
                property[propertyIndex],
            );
        });
    }
}
export default new AdvancedSpecialSearch();
