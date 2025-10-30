export class MyConsole {
    static getTitleOfFilters() {
        return cy
            .get('.predictions-search-wrapper')
            .find('[for="exampleFormControlInput1"]');
    }

    static selectStandard(index: number, standard: string) {
        cy.get('.predictions-search-wrapper')
            .get('.form-group')
            .eq(index)
            .click()
            .contains('.ng-option-label', standard)
            .click();
    }

    static getMaterialFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="material"]')
            .invoke('text');
    }

    static getPropertyFromRow(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="property"]')
            .invoke('text');
    }

    static clickOnPropertyDdl(row: number) {
        return cy
            .get('.predictions-search-wrapper')
            .find('.form-group')
            .eq(4)
            .click()
            .get('.dropdown-menu.show')
            .find('mat-tree')
            .find('.btn')
            .get('.icon-arrow_right')
            .eq(2)
            .click()
            .get('mat-tree-node')
            .eq(row)
            .click();
    }

    static clickSomeWhereOnMyConsole() {
        cy.get('.pt-4').click();
    }

    static enterMaterial(designation: string) {
        cy.get('.predictions-search-wrapper')
            .find('.form-group')
            .eq(1)
            .click()
            .find('input')
            .should('be.visible')
            .clear()
            .type(designation);
    }
}
export default new MyConsole();
