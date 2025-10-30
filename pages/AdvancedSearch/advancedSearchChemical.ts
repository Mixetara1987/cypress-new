export class AdvancedChemicalComposition {
    static openListAndGetFirstOption() {
        return cy
            .get('advanced-search-chemical')
            .get('ng-select')
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option')
            .eq(0)
            .invoke('text');
    }

    static typeWord(word: string) {
        cy.get('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-input')
            .find('input')
            .type(word);
    }

    static enterMinPercent(minPercent: string) {
        cy.get('.chemical-element-list')
            .get('input')
            .eq(2)
            .clear()
            .type(minPercent);
    }

    static minPercentBoxExist() {
        return cy.get('.chemical-element-list').get('input').eq(2);
    }

    static enterMaxPercent(maxPercent: string) {
        cy.get('.chemical-element-list')
            .get('input')
            .eq(3)
            .clear()
            .type(maxPercent);
    }

    static maxPercentBoxExist() {
        return cy.get('.chemical-element-list').get('input').eq(3);
    }

    static clickOnClearElementPercent() {
        cy.get('.chemical-element-list').find('button.clear-btn').click();
    }
}
export default new AdvancedChemicalComposition();
