export class ForwardedSearch {
    static getTextInforwardedSearchParameters() {
        return cy
            .get('forwarded-search-context')
            .find('.alert')
            .should('be.visible')
            .then((messageAlert) => {
                const message = messageAlert.text();
                return message;
            });
    }

    static clcikOnRemove() {
        cy.get('body').then((page) => {
            if (page.find('.alert').length > 0) {
                cy.get('.alert')
                    .should('be.visible')
                    .contains('button', ' Remove ')
                    .should('be.visible')
                    .click();
            }
        });
    }
}
export default new ForwardedSearch();
