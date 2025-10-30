export class ComplianceAssessor {
    /* 

    static getResultsFound() {
        return cy.get('material-search-results-table').find('.results');
    }

    static clickOnSave() {
        cy.get('.tm-filter-button.save-btn').click();
    }

    static getModalMessage() {
        return cy.get('.modal-content').find('.modal-body').invoke('text');
    }

    static closeModal() {
        cy.get('.modal-content').find('button[aria-label="Close"]').click();
    }

     static clickOnCheckboxAll() {
        cy.get('.ag-header-row').should('exist')
            .find('.ag-header-cell')
            .find('[ref="cbSelectAll"]')
            .find('[type="checkbox"]').eq(0)
            .click();
    }*/
}
export default new ComplianceAssessor();
