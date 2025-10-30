export class MaterialDiscoveryPropertyTable {
    static getTitleInTable(column: number) {
        cy.wait(1000);
        return cy
            .get('.ag-header-cell.ag-focus-managed')
            .eq(column)
            .find('span');
    }

    static getAllMaterialGroupsBellowDiagram() {
        return cy
            .get('.ag-center-cols-container')
            .should('be.visible')
            .find('[role="row"]')
            .find('label.tm-checkbox')
            .find('span')
            .then((group) => {
                return Cypress.$.makeArray(group).map(
                    (textGroup) => textGroup.textContent,
                );
            });
    }

    static getAllDisabledMaterialGroupsBellowDiagram() {
        const disabledMaterialGroups = [];
        return cy
            .get('.ag-center-cols-container')
            .find('[role="row"]')
            .find('label.tm-checkbox')
            .find('input[disabled]')
            .parent('label.tm-checkbox')
            .find('span')
            .each(($group) => {
                disabledMaterialGroups.push($group.text());
                cy.wrap(disabledMaterialGroups);
            });
    }

    static clickOnMaterialGroupsArrowDropdown(materialGroups: string) {
        cy.contains('span', materialGroups)
            .parentsUntil('div')
            .find('child-cell')
            .find('i')
            .first()
            .click();
    }

    static clickOnMaterialGroupsCheckbox(materialGroups: string) {
        cy.get('#myGrid')
            .contains('span', materialGroups)
            .parents('.ag-grid-custom-checkbox-wrapper')
            .find('.icon-check_box_outline_blank')
            .click();
    }

    static clickOnSelectMaterialGroupCheckbox(materialGroups: string) {
        cy.get('#myGrid')
            .contains('span', materialGroups)
            .parents('[role="row"]')
            .find('[ref="eInput"]')
            .click();
    }
}
export default new MaterialDiscoveryPropertyTable();
