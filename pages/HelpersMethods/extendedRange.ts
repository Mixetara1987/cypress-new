export class ExtendedRangeSearchFilter {
    static goTo(property: string) {
        cy.get('extended-range')
            .find('ul.navbar-nav')
            .contains('.nav-link', property)
            .click({ force: true });
    }

    // dodata
    static navigateTo(destination: string) {
        cy.visit(`en/extended-range/${destination}`);
        cy.get('h1');
    }

    static getTitleExtendedRange() {
        return cy
            .get('.module-header-title')
            .should('exist')
            .and('be.visible')
            .invoke('text');
    }

    static getTitlesAboveFilters() {
        cy.get('.title');
        cy.wait(500);
        cy.contains('span', 'Direct data only').should('be.visible');
        return cy
            .get('.temperature-table')
            .should('exist')
            .and('be.visible')
            .get('material-search-common-values')
            .should('exist')
            .and('be.visible')
            .get('.accordion-body')
            .should('exist')
            .and('be.visible')
            .find('label.title')
            .should('exist')
            .and('be.visible')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static selectHeatTreatment(option: string) {
        cy.get('.ng-select-container').eq(0).click();
        cy.get('.ng-dropdown-panel-items')
            .contains('.ng-option', `${option}`)
            .click();
    }

    static selectForm(option: string) {
        cy.get('.ng-select-container').eq(1).click();
        cy.get('.ng-dropdown-panel-items')
            .contains('.ng-option', `${option}`)
            .click();
    }

    static clickOnClearOptionDDL(index: number) {
        cy.get('.icon-clear').eq(index).click();
    }

    static enterCreepRuptureStrenghtMin(min: string) {
        cy.get('table.temperature-table').should('be.visible');
        cy.get('.input-numbers-wrapper')
            .should('exist')
            .find('input[placeholder="Min"]')
            .type(min);
    }

    static enterCreepRuptureStrenghtMax(max: string) {
        cy.get('table.temperature-table').should('be.visible');
        cy.get('.input-numbers-wrapper')
            .should('exist')
            .find('input[placeholder="Max"]')
            .type(max);
    }

    static getSelectedTextinDDL(index: number) {
        return cy
            .get('.accordion-body')
            .find('.column-2')
            .find('.filter-wrapper')
            .eq(index)
            .find('span.ng-value-label')
            .invoke('text');
    }

    static clickOnDirectDataOnly() {
        cy.get('.tm-switch-thumb').click();
    }

    static removeForwardedSearch() {
        cy.get('main').then((page) => {
            if (page.find('.forwarded-search').length > 0) {
                cy.get('forwarded-search-context')
                    .should('be.visible')
                    .find('.forwarded-search')
                    .should('be.visible')
                    .find('.alert-info')
                    .contains('button', ' Remove ')
                    .should('be.visible')
                    .click();
            } else {
                return;
            }
        });
    }
}

export default new ExtendedRangeSearchFilter();
