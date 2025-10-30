export class FractureMechanicsHomePage {
    static selectedSearchCriteria() {
        return cy.get('.heading-box-criteria-text').invoke('text');
    }

    // search criteria
    static clcikOnRemove() {
        cy.get('forwarded-search-context')
            .contains('button', ' Remove ')
            .should('be.visible')
            .click();
    }
}
export default new FractureMechanicsHomePage();
