export class GreenLineCarbonFootprintChemicalConditionModal {
    static clikOnCheckboxForCondition(index: number) {
        cy.get('.modal-content [ref="eCheckbox"]')
            .eq(index)
            .should('be.visible')
            .click();
    }

    static clickOn(button: string) {
        cy.contains('.modal-content button', button).realClick();
    }

    static getSelectedConditionText() {
        return cy
            .get('.modal-content div[ref="eWrapper"].ag-checked')
            .parents('div[role="row"]')
            .find('div.ag-cell-wrapper')
            .then((selectedText) => {
                return selectedText.text();
            });
    }
}
export default new GreenLineCarbonFootprintChemicalConditionModal();
