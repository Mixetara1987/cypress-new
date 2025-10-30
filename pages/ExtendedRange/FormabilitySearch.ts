export class FormabilitySearch {
    static navigateFormabilityPage() {
        cy.visit(`en/extended-range/formability`);
        cy.intercept('GET', '*/extended-range/formability/search/filters').as(
            'searchFilters',
        );
        cy.wait('@searchFilters').then(() => {
            cy.get('h1');
        });
    }

    static clickSearchButton() {
        cy.get('.tm-filter-button-submit').find('i').click();
    }
}
export default new FormabilitySearch();
