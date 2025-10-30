function escapeRegExp(string: string): string {
    // eslint-disable-next-line no-useless-escape
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

function generateModuleUrl(template: string, material_id?: number): string {
    if (material_id !== undefined) {
        return template.replace('{material_id}', material_id.toString());
    }
    return template;
}

export class Helpers {
    static waitForloaderIfLoaderExist() {
        cy.get('body').then((page) => {
            if (page.find('.loading-foreground')) {
                cy.get('.loading-foreground').should('not.exist');
            }
            return;
        });
    }

    static mouseHoverToltipAndGetText() {
        cy.get('.selected-condition-body')
            .find('dl')
            .find('.icon-info')
            .trigger('mouseenter');
        return cy.get('ngb-tooltip-window').invoke('text');
    }

    // Helpers.clickOnFilterOption('Coating Group', ['Inorganic coatings'], ['Ag-based']);
    //
    // Similar.clickOnForwardTo(' Advanced Search ');
    // Helpers.clickOnFilterOption('Forward to...', [''], [' Advanced Search ']);
    //
    // CommonSearch.selectMaterialType('Adhesives');
    // Helpers.clickOnfilterOption('title', ['expand the node...'], '[option]');
    // 1. title - naslov ili neki text koji se nalazi u placeholderu, u slucaju da se propusti
    //  tj ne navede clickOnFilterOption() ce kliknuti na navedenu opciju (opcije - niz).
    // 2. expand the node - otvori stablo tj otvaranje (najcesce klik na arrow-down) cvora sa navedenim imenom
    // (prvi u nizu je parent).
    // 3. option - opcija (niz opcija) na koju hocemo select (unselect).

    static clickOnFilterOption(
        ddlTitle: string,
        openTree: string[],
        option?: string[],
    ) {
        let i: number;
        let selector = 'label, span, div, .box-title'; // selectors for titles.
        if (ddlTitle !== '') {
            cy.contains(selector, new RegExp(`^${ddlTitle}$`))
                .parents('div')
                .eq(0)
                .click();
            if (openTree[0] !== '') {
                for (
                    let treeIndex = 0;
                    treeIndex < openTree.length;
                    treeIndex++
                ) {
                    cy.contains(selector, new RegExp(`^${ddlTitle}$`))
                        .parents('div')
                        .eq(0)
                        .contains(openTree[treeIndex])
                        .parents('mat-tree-node')
                        .find('.icon-arrow_right')
                        .realHover()
                        .click();
                }
            }
            {
                for (i = 0; i < option.length; i++) {
                    cy.contains(selector, new RegExp(`^${ddlTitle}$`))
                        .parents('div')
                        .eq(2)
                        .contains(new RegExp(`^${escapeRegExp(option[i])}$`))
                        .click({ force: true });
                }
            }

            cy.get('body').type('{esc}');
            return;
        }
        {
            for (i = 0; i < option.length; i++) {
                cy.contains(new RegExp(`^${escapeRegExp(option[i])}$`))
                    .realHover()
                    .click({ force: true });
            }
        }
    }

    static totalMateriaNavigateTo(
        moduleUrlTemplate: string,
        materialid?: number,
    ) {
        const url = generateModuleUrl(moduleUrlTemplate, materialid);
        cy.visit(url);
    }
}
export default new Helpers();
