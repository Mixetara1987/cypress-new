export class CommonSearch {
    // DESIGNATION
    static getMaterialDesignation() {
        return cy.get('[data-qa="searchText"]');
    }

    static getPlaceholderTextInMaterialDesignation() {
        return cy
            .get('[data-qa="searchText"]')
            .should('be.visible')
            .invoke('prop', 'placeholder');
    }

    static getEnteredValueInMaterialDesignation() {
        return cy
            .get('[data-qa="searchText"]')
            .should('be.visible')
            .invoke('prop', 'value');
    }

    static enterMaterialDesignation(designation: string) {
        cy.get('[data-qa="searchText"]')
            .should('be.visible')
            .clear()
            .type(designation);
    }

    // GROUP

    static getMaterialGroupDDL() {
        return cy
            .get('[data-qa="taxonomyDropdown"] #multiselectDropdown')
            .should('exist'); // TODO be.visible
    }

    // Expand a tree node in the material group dropdown
    protected static expandTreeNode(treeNode: string) {
        cy.get('[aria-labelledby="multiselectDropdown"] mat-tree')
            .contains('mat-tree-node', treeNode)
            .find('.icon-arrow_right')
            .click();
    }

    // Select a node from the material group dropdown
    protected static selectNode(node: string) {
        cy.contains('mat-checkbox label', node)
            .scrollIntoView()
            .should('be.visible')
            .click();
    }

    // Select material groups
    static selectMaterialGroups(openTree: string[], nodes: string[]) {
        this.getMaterialGroupDDL().click();

        if (openTree[0] !== '') {
            openTree.forEach((treeNode) => {
                this.expandTreeNode(treeNode);
            });
        }

        nodes.forEach((node) => {
            this.selectNode(`${node}`);
        });
        // Close the material group dropdown
        cy.get('body').type('{esc}');
    }

    static getSelectedMaterialGroups() {
        return this.getMaterialGroupDDL()
            .should('be.visible')
            .find('span')
            .then((materialgroup) => {
                return materialgroup;
            });
    }

    static filterMaterialGroup(groupName: string) {
        return this.getMaterialGroupDDL()
            .click()
            .then(() => {
                cy.get(
                    '[data-qa="taxonomyDropdown"] [aria-labelledby="multiselectDropdown"] input[placeholder="Search"]',
                )
                    .clear()
                    .type(groupName);
            });
    }

    static getItemsListInMaterialGroup() {
        return cy
            .get('mat-tree')
            .find('mat-checkbox label')
            .then((item) => {
                return Cypress.$.makeArray(item).map(
                    (textItem) => textItem.textContent,
                );
            });
    }

    static clearMaterialGroup() {
        cy.get('multiselect-tree #clearAllButton').click({ force: true });
    }

    static mouseHoverMaterialGroupDDl() {
        return (
            cy
                .get('[data-qa="taxonomyDropdown"]')
                // .find('span')
                .realHover({ position: 'right' })
                .realHover()
                .get('ngb-tooltip-window')
                .invoke('text')
        );
    }

    // STANDARD
    static getStandardDDL() {
        cy.log('*');
        return cy.get('[data-qa="standardDropdown"]');
    }

    protected static selectStandard(standard: string) {
        return cy
            .get(
                '[data-qa="standardDropdown"]~[aria-labelledby="standardDropdown"]',
            )
            .should('be.visible')
            .find('.filter-item')
            .find('label')
            .contains('span', standard)
            .click();
    }

    static selectStandards(standards: string[]) {
        this.getStandardDDL()
            .click()
            .then(() => {
                standards.forEach((standard) => {
                    this.selectStandard(standard);
                });
            })
            .then(() => {
                this.getStandardDDL().click();
            });
    }

    static getSelectedStandards() {
        return cy
            .get('[data-qa="standardDropdown"]')
            .should('be.visible')
            .find('span')
            .should('be.visible');
    }

    protected static getFilterStandardTree() {
        return cy
            .get(
                '[data-qa="standardDropdown"]~[aria-labelledby="standardDropdown"] input[placeholder="Search"]',
            )
            .should('be.visible');
    }

    static filterStandardTree(standardName: string) {
        this.getStandardDDL()
            .should('be.visible')
            .click()
            .then(() => {
                this.getFilterStandardTree().clear().type(standardName);
            });
    }

    static clearStandard() {
        cy.get('standards-dropdown')
            .find('button#clearAllButton')
            .should('exist')
            .click({ force: true });
    }

    static getItemsListInStandard() {
        cy.get('[data-qa="standardDropdown"]').click();
        return cy
            .get('.filter-items-wrapper')
            .find('.filter-item')
            .find('label')
            .find('span')
            .then((item) => {
                return Cypress.$.makeArray(item).map(
                    (textItem) => textItem.textContent,
                );
            });
    }

    static showsFilteredListOfStandards() {
        return cy.get('.filter-items-wrapper').invoke('text');
    }

    static mouseHoverStandardDDl() {
        cy.get('a img[alt="TM-logo"]').realHover();
        return (
            cy
                .get('[data-qa="standardDropdown"]')
                // .find('span')
                .realHover({ position: 'right' })
                .realHover()
                .get('ngb-tooltip-window')
                .invoke('text')
        );
    }

    // TYPE
    static getMaterialTypeDDL() {
        return cy.get('[data-qa="typeDropdown"]');
    }

    static getMaterialTypeItemList() {
        this.getMaterialTypeDDL().click();
        return cy
            .get('[aria-labelledby="typeDropdown"]')
            .should('be.visible')
            .find('.dropdown-item')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static clearMaterialType() {
        cy.get(
            'material-type-dropdown > .dropdown > #clearAllButton > .icon-clear',
        )
            .should('exist')
            .click({ force: true });
    }

    static selectMaterialType(materialType: string) {
        this.getMaterialTypeDDL().click();
        cy.get('[aria-labelledby="typeDropdown"]')
            .should('be.visible')
            .find('.dropdown-item')
            .contains('div', `${materialType}`)
            .click();
    }

    static getSelectedMaterialTypeDDL() {
        return cy.get('[data-qa="typeDropdown"]').find('span').invoke('text');
    }

    // PRODUCER
    static getProducer() {
        return cy.get('input[data-qa="producer"]');
    }

    static enterProducer(text: string) {
        cy.get('input[data-qa="producer"]')
            .should('be.visible')
            .clear()
            .type(text, { delay: 300 });
    }

    static getPlaceholderProducer() {
        return cy
            .get('input[data-qa="producer"]')
            .should('be.visible')
            .invoke('prop', 'placeholder');
    }

    static getEnteredTextInProducer() {
        return cy
            .get('input[data-qa="producer"]')
            .should('be.visible')
            .invoke('prop', 'value');
    }

    /////////////////////////////////////
    // SEARCH/CLEAR Filter Buttons
    static searchButton() {
        return cy.get('[data-qa="searchFilterButton"]');
    }

    static clickSearchButton() {
        this.searchButton().should('be.visible').should('be.enabled').click();
    }

    static clearButton() {
        return cy.get('[data-qa="clearFilterButton"]');
    }

    static clearSearchFilters() {
        this.clearButton().should('be.visible').should('be.enabled').click();
    }

    // fill any filter field by locator with value
    static enterFieldValue(fieldLocator: string, fieldValue: string) {
        cy.get(`[${fieldLocator}]`)
            .should('be.visible')
            .clear()
            .type(fieldValue);
    }
}
export default new CommonSearch();
