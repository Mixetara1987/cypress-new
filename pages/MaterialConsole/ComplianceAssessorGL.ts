import { should } from 'chai';

export class ComplianceAssessorGL {
    static navigateToComplianceSearchPageGL() {
        cy.visit(`en/green-line/materials`);
    }

    static navigateToSubstancesSearchPageGL() {
        cy.visit(`en/green-line/substances`);
    }

    static navigateToBOM() {
        cy.visit(`en/green-line/bom`);
    }

    static getModalCheckBox(index: number) {
        return cy
            .get('.modal-body')
            .find('.form-group')
            .eq(index)
            .find('label')
            .find('.icon-check_box_outline_blank')
            .should('be.visible');
    }

    static getLCACheckBox(name: string) {
        return cy
            .get('.m-3 .d-flex')
            .contains('.form-group label', name)
            .find('input')
            .should('exist');
    }

    static getLCACheckBoxValues(name: string) {
        return cy
            .get('.lca-indicators-panel')
            .contains('div[role="button"] small', name)
            .parent()
            .find('.badge')
            .invoke('text');
    }

    static checkAllMidpointIndicatorsCells() {
        // all indicator fields should be checked(-)
        return cy
            .get('.col-md-7 .lca-indicators-panel i')
            .should('be.visible')
            .each(($chkBox) => {
                cy.wrap($chkBox).should(
                    'have.css',
                    'color',
                    'rgb(109, 169, 47)',
                );
            });
    }

    static clickOnCheckBox(name: string) {
        cy.get('.checkboxes-wrapper').should('be.visible');
        cy.contains('.checkboxes-wrapper', name)
            .find('label')
            .should('be.visible')
            .click();
    }

    static clickOnMethodLCACheckBox(index: number) {
        cy.get('.col-5')
            .should('exist')
            .find('.m-3')
            .find('.tm-checkbox')
            .eq(index)
            .should('be.visible')
            .click();
    }

    static getCountriesOfRegulation() {
        return cy
            .get('[data-qa="regulationDropdown"] mat-tree')
            .find('mat-tree-node')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static selectRegulations(nameOfCountry: string, value: string) {
        return cy
            .get('[data-qa="regulationDropdown"] #multiselectDropdown')
            .should('be.visible')
            .click()
            .get('.mat-tree')
            .contains('mat-tree-node', `${nameOfCountry}`)
            .click()
            .find('.btn')
            .find('.icon-arrow_right')
            .click()
            .get('mat-checkbox')
            .contains('div', `${value}`)
            .click();
    }

    static getTitleOfRegulations(index: number) {
        return cy
            .get('green-line-compliance-filter')
            .find('.flex-wrap.my-4')
            .find('.regulation-block')
            .find('.text-center.mb-4')
            .eq(index)
            .invoke('text');
    }

    static clickOnRegulationDDL() {
        cy.get('[data-qa="regulationDropdown"]').click();
    }

    static enterRegulationMaterials(index: number, regulation: string) {
        return cy
            .get('[data-qa="regulationDropdown"] #multiselectDropdown')
            .should('be.visible')
            .click()
            .get('[placeholder="Search"]')
            .eq(index)
            .type(regulation);
    }

    static enterRegulationCompliance(regulation: string) {
        return cy
            .get('[data-qa="regulationDropdown"] #multiselectDropdown')
            .should('be.visible')
            .click()
            .get('regulation-standard-dropdown [placeholder="Search"]')
            .should('be.visible')
            .type(regulation);
    }

    static getTextForSelectedRegulation() {
        return cy
            .get('[data-qa="regulationDropdown"] #multiselectDropdown')
            .invoke('text');
    }

    static getMidPointIndicators(index: number) {
        return cy
            .get('.col-12')
            .eq(0)
            .find('.row.bg-white')
            .find('.row')
            .eq(index)
            .find('.col-4')
            .find('.form-group')
            .find('.tm-checkbox')
            .find('.icon-check_box_outline_blank');
    }

    static getMidPointIndicatorsSpecificField(row: number, index: number) {
        return cy
            .get('.col-12.col-md-7.my-2')
            .find('.lca-indicators-panel')
            .eq(row)
            .find('.w-100')
            .eq(index)
            .find('.flex-column')
            .find('.d-flex')
            .find('.form-group')
            .find('.tm-checkbox')
            .find('.icon-check_box_outline_blank');
    }

    static ClickOnMidPointIndicatorsSpecificFieldCheckBox(
        row: number,
        index: number,
    ) {
        return cy
            .get('.col-12.col-md-7.my-2')
            .find('.lca-indicators-panel')
            .eq(row)
            .find('.w-100')
            .eq(index)
            .find('.flex-column')
            .find('.d-flex')
            .find('.form-group')
            .find('.tm-checkbox')
            .click();
    }

    static ClickOnMidPointIndicatorsSpecificBox(row: number, index: number) {
        return cy
            .get('.col-12.col-md-7.my-2')
            .find('.lca-indicators-panel')
            .eq(row)
            .find('.w-100')
            .eq(index)
            .click();
    }

    static getMidPointIndicatorsSpecificBoxValue(row: number, index: number) {
        return cy
            .get('.col-12.col-md-7.my-2')
            .find('.lca-indicators-panel')
            .eq(row)
            .find('.w-100')
            .eq(index)
            .find('.badge')
            .invoke('text');
    }

    static getAllMidPointIndicatorFields() {
        return cy
            .get('.col-12.col-md-7.my-2')
            .find('.lca-indicators-panel')
            .find('.w-100')
            .find('.d-flex')
            .find('.form-group')
            .find('.tm-checkbox')
            .find('.icon-check_box_outline_blank');
    }

    static clickOnMidPointIndicators(index: number) {
        return cy
            .get('.col-12')
            .eq(0)
            .find('.col-12.col-md-7.my-2')
            .find('.row')
            .find('.col-4')
            .eq(index)
            .find('.form-group')
            .find('.tm-checkbox')
            .find('.icon-check_box_outline_blank')
            .click();
    }

    static getMidPointIndicatorsTitles() {
        return cy
            .get('.col-12')
            .eq(0)
            .find('.col-12.col-md-7.my-2')
            .find('.row')
            .find('.col-4')
            .find('.form-group')
            .find('.ms-2')
            .should('be.visible');
    }

    static clickOnEndPointIndicators(index: number) {
        return cy
            .get('.col-12')
            .eq(3)
            .find('.row')
            .find('.col-12.px-0')
            .find('.p-2')
            .find('.mt-2')
            .eq(index)
            .find('.d-flex')
            .find('.form-group')
            .find('.tm-checkbox')
            .find('.icon-check_box_outline_blank')
            .click();
    }

    static getEndPointIndicators(index: number) {
        return cy
            .get('.col-12')
            .eq(3)
            .find('.row')
            .find('.col-12.px-0')
            .find('.p-2')
            .find('.mt-2')
            .eq(index)
            .find('.d-flex')
            .find('.form-group')
            .find('.tm-checkbox')
            .find('.icon-check_box_outline_blank');
    }

    static getEndPointIndicatorsTitles() {
        return cy
            .get('.col-12')
            .eq(3)
            .find('.row')
            .find('.col-12.px-0')
            .find('.p-2')
            .get('.mt-2')
            .should('be.visible');
    }

    static getDefaultMaterialFIltersGLRadioButtons(row: number) {
        return cy
            .get('.d-flex')
            .find('.mb-0')
            .eq(row)
            .find('#cumulativeFilter')
            .invoke('prop', 'checked');
    }

    static clickOnMaterialFIltersGLRadioButtons(row: number) {
        return cy.get('.d-flex').find('.mb-0').eq(row).click();
    }

    static getMaterialFIltersGLCheckBoxes(name: string) {
        return cy
            .get('.d-flex')
            .contains('.d-flex.flex-row.align-items-center', name)
            .find('label.tm-checkbox.d-flex');
    }

    static ClickOnMaterialFIltersGLCheckBoxes(name: string) {
        return cy
            .get('.d-flex')
            .contains('.d-flex.flex-row.align-items-center', name)
            .find('label.tm-checkbox.d-flex')
            .click();
    }

    static checkMaterialStatusIconColor(column: number) {
        return cy
            .get('.comparison-view-body-header')
            .find('.status-wrapper')
            .eq(column)
            .find('.status-icon');
    }

    static checkIconRepeat() {
        return cy.get('.icon-repeat');
    }

    static checkExemption() {
        return cy.get('.icon-assignment');
    }

    static getMaterialStatusFromRow(rowIndex: number, row: number) {
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[role="gridcell"]')
            .eq(row)
            .find('status-cell')
            .find('.justify-content-center')
            .find('.ms-auto')
            .find('.status-icon');
    }

    static findMaterialStatusFromRow(materialName: string) {
        return cy
            .contains(
                `[ref="leftContainer"] [role="row"] [role="gridcell"] status-cell`,
                materialName,
            )
            .find('.status-icon');
    }

    static getMaterialFromRow(rowIndex: number, row: number) {
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('.ag-cell')
            .eq(row)
            .invoke('text');
    }

    static getTableTooltipAssesmentInfo(
        materialName: string,
        columnRegulationName: string,
    ) {
        return cy
            .contains('[role="columnheader"]', columnRegulationName)
            .invoke('attr', 'aria-colindex')
            .then((colIndex) => {
                cy.log('Column index: ', colIndex);
                //find row index by name
                cy.contains(
                    `[ref="leftContainer"] [role="row"] [role="gridcell"] status-cell`,
                    materialName,
                )
                    .parent()
                    .parent()
                    .invoke('attr', 'row-index')
                    .then((rowIndex) => {
                        cy.log('Row index: ', rowIndex);
                        cy.get(
                            `[ref="centerContainer"] [row-index="${rowIndex}"]`,
                        )
                            // find assigment for given column Regulation name, cover changed order
                            .find(`div[aria-colindex="${colIndex}"]`)
                            .find('.justify-content-start')
                            .find('.icon-assignment')
                            .trigger('mouseenter')
                            .get('ngb-tooltip-window')
                            .invoke('text');
                    });
            });
    }

    static clickOnApplicableExemptionFromTable(
        rowIndex: number,
        index: number,
    ) {
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('status-cell')
            .eq(index)
            .find('.justify-content-start')
            .find('.btn.ms-3.p-0.status-icon')
            .click();
    }

    static clickOnGeneralExemptions() {
        return cy
            .get('.modal-body')
            .find('.justify-content-center')
            .contains('General exemptions')
            .click();
    }

    static clickOnOptionInGeneralExemptions(index: number) {
        return cy
            .get('.modal-body')
            .find('.justify-content-start')
            .find('.d-flex')
            .eq(index)
            .find('input')
            .click();
    }

    static colorOfSelectedExemption(index: number) {
        return cy.get('.my-1').find('input').eq(index);
    }

    static ClickOnApplyButton() {
        cy.get('.d-flex.flex-row.justify-content-end')
            .contains('.btn-gl-ca', 'Apply')
            .click();
    }

    static ClickOnClearSearchButton() {
        cy.get('.d-flex.flex-row.justify-content-end')
            .contains('.btn-secondary', 'Clear search')
            .click({ force: true });
    }

    static ClickOnViewSettingsButton(index: number) {
        cy.get('.my-3')
            .find('.btn-outline-secondary')
            .eq(index)
            .should('be.enabled')
            .click();
    }

    static ClickOnSaveButton() {
        cy.get('.my-3').get('.icon-save').click();
    }

    static getViewSettingsModuleColumns(index: number) {
        return cy
            .get(`.modal-body`)
            .find('.lca-grid-wrapper')
            .find('.ag-root-wrapper-body')
            .find('.ag-root.ag-unselectable.ag-layout-normal')
            .find('.ag-body-viewport.ag-layout-normal.ag-row-animation')
            .find('.ag-center-cols-container')
            .find('.ag-row')
            .eq(index)
            .find('.ag-cell')
            .eq(1)
            .find('.ag-cell-wrapper')
            .find('.ag-selection-checkbox')
            .find('.ag-labeled')
            .find('.ag-input-field-input');
    }

    static clickOnCheckBoxInViewSettings(index: number) {
        cy.get(`.modal-body`)
            .find('.lca-grid-wrapper')
            .find('.ag-root-wrapper-body')
            .find('.ag-root.ag-unselectable.ag-layout-normal')
            .find('.ag-body-viewport.ag-layout-normal.ag-row-animation')
            .find('.ag-center-cols-container')
            .find('.ag-row')
            .eq(index)
            .find('.ag-cell')
            .eq(1)
            .find('.ag-cell-wrapper')
            .find('.ag-selection-checkbox')
            .click();
    }

    static clickOnSaveSelection() {
        cy.contains('.btn-green-lca', ' Save ').click();
    }

    static clickOnExportButton() {
        cy.contains('.btn-green-lca', ' Export ').click();
    }

    static getComplianceGLHeaderColumns() {
        return cy
            .get('ag-grid-angular [ref="gridHeader"] [role="columnheader"]')
            .then(($title) => {
                return Cypress.$.makeArray($title).map((textTitlte) =>
                    textTitlte.innerText.replace(/\n/g, ''),
                );
            });
    }

    static clickOnCRTButton(index: number) {
        cy.get('gl-tools-cell button')
            // .find('.d-flex')
            // .find('.mr-2')
            .eq(index)
            .find('.icon-gl-cross_reference')
            .click();
    }

    static clickOnPinnButton(index: number) {
        cy.get('gl-tools-cell button')
            // .find('.d-flex')
            // .find('.btn')
            .find('.icon-baseline')
            .eq(index)
            .click({ force: true });
    }

    static getCrossReferenceModal() {
        return cy.get('app-greenlinecrossreferencemodal');
    }

    static getTitlesInCRTTabs() {
        return cy
            .get('.d-flex')
            .find('.filter-buttons')
            .find('.tm-tab-button-wrapper')
            .eq(0)
            .get('.tab-text')
            .then(($title) => {
                return Cypress.$.makeArray($title).map(
                    (textTitlte) => textTitlte.textContent,
                );
            });
    }

    static clickOnReplaceButton(rowIndex: number) {
        cy.get('.ag-root-wrapper-body');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('[col-id="replace"]')
            .click();
    }

    static getConfirmationModalTitle() {
        return cy.get(`confirmation-modal`).find('h3').invoke('text');
    }

    static getSaveModalTitle() {
        return cy.get(`app-saveoverwrite-dialog`).find('b').invoke('text');
    }

    static getExportModalTitle() {
        return cy.get(`app-ca-export-settings-modal`).find('b').invoke('text');
    }

    static getSaveModalBody(index: number) {
        return cy
            .get(`app-saveoverwrite-dialog`)
            .find('.modal-body')
            .find('.content-holder')
            .find('.form-group')
            .eq(index)
            .find('label')
            .invoke('text');
    }

    static getTextInCATitle() {
        return cy
            .get('.content-holder')
            .find('.form-group')
            .eq(0)
            .find('input');
    }

    static enterTextInDescription(description: string) {
        return cy
            .get('.content-holder')
            .find('.form-group')
            .eq(1)
            .find('input')
            .clear()
            .type(description);
    }

    static checkChemicalComposition() {
        return cy.get(`app-ca-export-settings-modal`).find('input');
    }

    static chooseStatusForGL(name: string) {
        return cy
            .get('#phaseDropdown')
            .should('be.visible')
            .click()
            .get('[aria-labelledby="phaseDropdown"]')
            .contains('a', name)
            .should('be.visible')
            .click();
    }

    static getStatusForGL() {
        return cy.get(`#phaseDropdown`).invoke('text');
    }

    static getIssueDateGL() {
        return cy.get('.ms-1.my-2').invoke('text');
    }

    static clickOnRegulationDDl() {
        cy.get('[data-qa="taxonomyDropdown"]').click();
    }

    static getGLMaterialFromRow(rowIndex: number) {
        cy.get('.ag-pinned-left-cols-container');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .eq(0)
            .find('designation-cell')
            .invoke('text');
    }

    static getGLMaterialByName(name: string) {
        // [ref="gridBody"] [ref="eBody"] parent
        return cy
            .contains('[ref="leftContainer"] designation-cell', name)
            .should('exist')
            .invoke('text');
    }

    // ag-grid-angular [ref="gridBody"] [ref="eTop"]
    static getGLPinnMaterialRow(rowIndex: number) {
        return cy
            .get('.ag-pinned-left-floating-top')
            .find('.ag-row')
            .eq(rowIndex)
            .find('.ag-cell')
            .find('designation-cell')
            .find('.flex-row')
            .invoke('text');
    }

    static clickGLMaterialRow(rowIndex: number) {
        cy.get('.ag-pinned-left-cols-container');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('.clickable-designation')
            .click();
    }

    static clickOnLCAMaterilCheckbox(rowIndex: number) {
        cy.get('.ag-pinned-right-cols-container');
        return cy
            .get(`[row-index="${rowIndex}"]`)
            .find('.ag-cell')
            .find('.ag-cell-wrapper')
            .find('.ag-selection-checkbox')
            .find('.ag-labeled')
            .click();
    }

    static clickInIndicatorNameCheckBox() {
        return cy
            .get('[ref="gridHeader"]')
            .find('.ag-header-container')
            .find('.ag-header-row')
            .find('.ag-header-cell')
            .eq(1)
            .find('.ag-header-select-all')
            .click();
    }

    static getOrderingArrows() {
        return cy.get('tools-cell');
    }

    static enterTextInBOMfield(descriptionText: string) {
        cy.get('.col-6').find('.filter-wrapper').eq(1).type(descriptionText);
    }

    static getTitleFields(index: number) {
        return cy
            .get('.col-6')
            .find('.filter-wrapper')
            .eq(index)
            .find('label')
            .should('be.visible')
            .invoke('text');
    }

    static clickAddBOMdata() {
        cy.get('.row').get('.green-button').click();
    }

    static enterTextInBOMAddFields(index: number, name: string) {
        cy.get('.modal-body').find('.filter-wrapper').eq(index).type(name);
    }

    static clickAddValueBOM() {
        cy.get('.modal-footer').should('be.visible');
        cy.contains('.btn-bom', 'Add').click();
    }

    static getFileBoxes(index: number) {
        return cy
            .get('.d-flex')
            .should('be.visible')
            .find('.btn-grosup')
            .find('label')
            .eq(index);
    }

    static getDefaultFileBox(index: number) {
        return cy
            .get('.d-flex')
            .should('be.visible')
            .find('.btn-grosup')
            .find('label')
            .eq(index)
            .find('.justify-content-between')
            .find('.tm-radio')
            .find('.form-control')
            .invoke('prop', 'checked');
    }

    static getDropZone() {
        return cy.get('ngx-dropzone');
    }

    static clickToUploadFile() {
        cy.get('ngx-dropzone').find('.mt-4').should('be.visible');
        cy.contains('.btn-bom', 'Open').click({ force: true });
    }

    static clickOnOrderingArrowDown(index: number) {
        cy.get('[ref="gridHeader"] [role="columnheader"]').eq(index).click();
    }

    static clickToDownloadPDF() {
        cy.get('.d-flex');
        cy.contains('.btn-green-lca', 'Download PDF').click();
    }

    static clickToAddToReport() {
        cy.get('.d-flex');
        cy.contains('.btn-green-lca.ms-2', 'Add to report').click();
    }

    static getLCAModalBody() {
        return cy.get('.lca-indicators-modal').find('.modal-body');
    }

    static clickOnAllInLCAModalWindow() {
        return cy
            .get('.modal-body')
            .find('.form-group')
            .eq(0)
            .find('.tm-checkbox.lca-midpoint-text')
            .click();
    }

    static compareRegulationsForCountries(
        countryDDL: string[],
        accordingTo: { [key: string]: string[] },
    ) {
        // Click on the country dropdown to reveal the available options
        cy.get('regulation-standard-dropdown').should('be.visible').click();

        // Wait for the dropdown menu to become visible
        cy.get('div.dropdown-menu')
            .should('be.visible')
            .then(() => {
                // Iterate over each country in countryDDL
                countryDDL.forEach((country) => {
                    // Click on the current country in the dropdown
                    cy.get('multiselect-tree')
                        .find('mat-tree-node')
                        .contains('mat-checkbox label', country)
                        .should('be.visible') // Ensure the checkbox label is visible
                        .click({ force: true }) // Click on the checkbox label
                        .then(() => {
                            // Find the parent tree node directly
                            cy.get('multiselect-tree')
                                .find('mat-tree-node')
                                .contains('mat-checkbox label', country)
                                .get('.icon-arrow_right')
                                .click({ multiple: true });

                            // Recursively unroll sub-regulations
                            this.unrollSubRegulations();

                            // Retrieve the regulations for the current country
                            ComplianceAssessorGL.getCountriesOfRegulation().then(
                                (regulationsForCountry) => {
                                    // Compare the retrieved list of regulations with the expected regulations for the current country
                                    expect(regulationsForCountry).to.deep.equal(
                                        accordingTo[country],
                                    );
                                },
                            );
                        });
                });
            });
    }

    static unrollSubRegulations() {
        // Click on the arrow next to each regulation to reveal its sub-regulations
        cy.get('.mat-tree-node').each(($node) => {
            const nodeText = $node.text();
            if (
                nodeText.includes('RoHS') ||
                nodeText.includes('OtherRegulation')
            ) {
                cy.wrap($node)
                    .get('.icon-arrow_right')
                    .filter(':visible')
                    .click({ multiple: true });
                this.unrollSubRegulations(); // Recursively unroll sub-regulations
            }
        });
    }

    static getCheckBox(name: string) {
        return cy.get('.d-flex').contains('.checkboxes-wrapper', name);
    }

    static mouseHoverForRegulation() {
        return cy
            .get('regulation-standard-dropdown')
            .find('#multiselectDropdown')
            .realHover()
            .get('ngb-tooltip-window')
            .invoke('text');
    }
}
