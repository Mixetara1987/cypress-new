/// <reference types="cypress" />

function clickOnDDL(formIndex: number) {
    cy.get('.form-group-wrapper')
        .find('.form-group')
        .eq(formIndex)
        .click()
        .wait(1000);
}
function clickOnDDLOptionTwo(formIndex: number) {
    cy.get('.filter-wrapper')
        .find('.ng-select-container')
        .eq(formIndex)
        .click()
        .wait(1000);
}

export class ConditionSelectorDDLForms {
    static getTitlesOfDDL() {
        return cy.get('.form-group').find('label');
    }

    static getDDLTitles() {
        const titles = [];
        cy.get('.form-group-wrapper');
        return cy.get('.form-group').then((numbersOfFormsLength) => {
            const numberOfForms = numbersOfFormsLength.length;
            for (let count = 0; count < numberOfForms; count++) {
                cy.get('.form-group')
                    .eq(count)
                    .find('label')
                    .first()
                    .each(($X) => {
                        titles.push($X.text());
                    });
            }
            return cy.wrap(titles);
        });
    }

    static getSelectedOptionInDDLwithcheckboxes(ddlName: string) {
        return cy
            .contains('label', ddlName)
            .should('be.visible')
            .parents('.form-group')
            .find('button')
            .find('span')
            .invoke('text');
    }

    static getSelectedOptionInMultiselectDDl(ddlTitle: string) {
        return cy
            .contains('label', ddlTitle)
            .parent('div')
            .find('button#searchableMultiselectDropdown')
            .find('span')
            .then((selectedoption) => {
                return selectedoption.text();
            });
    }

    static getSelectedOptionForConditionFilters() {
        return cy.get('.ng-value-container');
    }

    static getSelectedOptionInDDL(ddlName: string) {
        return cy
            .contains('.form-group', ddlName)
            .should('be.visible')
            .find('.ng-value-label')
            .invoke('text');
    }

    static getSelectedOptionInHeatTreatment(ddlName: string) {
        return cy
            .contains('.form-group', ddlName)
            .should('be.visible')
            .find('#searchableMultiselectDropdown')
            .invoke('text');
    }

    static getSelectedOptionInForm(ddlName: string) {
        return cy
            .contains('.filter-wrapper', ddlName)
            .find('span')
            .invoke('text');
    }

    static getPreselectedoptionAlll(ddlName: string) {
        return cy
            .contains('.form-group', ddlName)
            .find('.ng-value-container')
            .invoke('text');
    }

    static getPreselectedMultiSelectOption(ddlName: string) {
        return cy
            .contains('.form-group', ddlName)
            .find('searchable-multiselect-dropdown button')
            .invoke('text');
    }

    static getAllOptionsInDDL(formIndex: number) {
        clickOnDDL(formIndex);
        return cy
            .get('ng-dropdown-panel')
            .get('.ng-dropdown-panel-items')
            .get('.ng-option')
            .invoke('text');
        // .find('[role="option"]')
    }

    static clickOnOptionDDL(formIndex: number, optionInForm: string) {
        clickOnDDL(formIndex);
        cy.get('.ng-dropdown-panel')
            .contains('.ng-option', optionInForm)
            .click();
    }

    static clickOnOptionDDLOptionTwo(formIndex: number, optionInForm: string) {
        clickOnDDLOptionTwo(formIndex);
        cy.get('.column-2').find('.filter-wrapper');
        cy.get('.ng-dropdown-panel')
            .contains('.ng-option', optionInForm)
            .click();
    }

    // dodata
    static clickOnDDlFilters(nameofDDl: string, value: string) {
        return cy
            .contains('.form-group', `${nameofDDl}`)
            .click()
            .find(`div[title="${value}"]`)
            .click();
    }

    static getTextFromDDlFilters(nameofDDl: string, value: string) {
        return cy
            .contains('.form-group', `${nameofDDl}`)
            .click()
            .find(`div[title="${value}"]`)
            .invoke('text');
    }

    // dodata
    static clickOnTemperatureFilter(temperature: string) {
        cy.wait(500);
        return cy
            .get('.select-temperature-wrapper')
            .click()
            .find('.ng-star-inserted')
            .get('.ng-select.searchable-dropdown')
            .find(`div[title="${temperature}"]`)
            .click();
    }

    static getTemperatureFilterText(temperature: string) {
        cy.wait(500);
        return cy
            .get('.select-temperature-wrapper')
            .click()
            .find('.ng-star-inserted')
            .get('.ng-select.searchable-dropdown')
            .find(`div[title="${temperature}"]`)
            .invoke('text');
    }

    static clickOnClearOptionDDL(property: string) {
        cy.get('.form-group-wrapper')
            .contains('label', property)
            .parent('.form-group')
            .find('.ng-clear-wrapper')
            .click();
    }

    static isEnabledToSelect(index: number) {
        cy.wait(500);
        return cy
            .get('.accordion-body-wrapper')
            .find('.form-group')
            .eq(index)
            .find('input');
    }

    static isEnabled(index: number) {
        cy.wait(500);
        return cy.get('.accordion-body-wrapper').find('.form-group').eq(index);
    }
    // dodata

    static clickAndChooseInFormDdl(index: number) {
        cy.get('searchable-multiselect-dropdown')
            .eq(index)
            .find('.multi-select-container1')
            .find('.multi-select-container2')
            .find('.ng-untouched')
            .click();
        cy.contains('.title', 'Form')
            .parent('.filter-wrapper')
            .find('button')
            .first();
        cy.contains('.title', 'Form')
            .parent('.filter-wrapper')
            .find('.icon-search')
            .parent('.filter-input-wrapper')
            .should('be.visible')
            .type('Bars')
            .get('.filter-item-child')
            .contains('label', 'Bars (rectangular)')
            .should('be.visible')
            .click();
    }

    // dodata
    static clickOnDDl(nameofDDl: string, value: string) {
        cy.contains('#searchDropdown', `${nameofDDl}`)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', value)
            .click();
    }

    static clickOnCountryOFRegulation(nameOfCountry: string, value: string) {
        cy.contains('.searchable-dropdown', `${nameOfCountry}`)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', value)
            .click();
    }

    static clickOnCountryOFRegulationOptionOne(index: number, value: string) {
        cy.get('.condition-select-wrapper')
            .eq(index)
            .click()
            .find('.searchable-dropdown')
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', value)
            .click();
    }

    static checkStatusOfCountryOfRegulations() {
        cy.get('.compliance-header-actions-wrapper')
            .find('.form-group')
            .eq(0)
            .find('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-placeholder')
            .invoke('text')
            .then((placeholder) => {
                if (placeholder !== 'Country of Regulation') {
                    cy.get('.form-group')
                        .eq(0)
                        .find('.ng-clear-wrapper')
                        .click();
                }
                return;
            });
    }

    static checkStatusOfAccordingTo() {
        cy.get('.compliance-header-actions-wrapper')
            .find('.form-group')
            .eq(1)
            .find('.ng-select-container')
            .find('.ng-value-container')
            .find('.ng-placeholder')
            .invoke('text')
            .then((placeholder) => {
                if (placeholder !== 'According to') {
                    cy.get('.form-group')
                        .eq(1)
                        .find('.ng-clear-wrapper')
                        .click();
                }
                return;
            });
    }

    static clickOnAccordingTo(nameOfCountry: string, value: string) {
        cy.contains('.searchable-dropdown', `${nameOfCountry}`)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', value)
            .click();
    }

    static clickOnAccordingTo1(accordingtO: string) {
        return cy
            .contains('.searchable-dropdown', `${accordingtO}`)
            .click()
            .get('.ng-dropdown-panel-items')
            .find('.ng-option-label')
            .invoke('text');
    }

    static clickOnClearOption() {
        cy.get('.ng-select-container').find('.ng-clear-wrapper').click();
    }

    // dodata
    static clickOnAccordingToOption2() {
        cy.contains('label', 'According to')
            .parent('#searchDropdown')
            .find('.ng-arrow-wrapper')
            .click();
    }

    // dodata
    static clickOnAccordingToOption3(nameOfCountry: string, index: number) {
        cy.contains('.searchable-dropdown', `${nameOfCountry}`)
            .click()
            .get('.ng-dropdown-panel-items')
            // .find('.ng-option-label').eq(index).click();
            .find('span')
            .eq(index)
            .click();
    }

    static getAllItemsFromDropDownAccordingTo() {
        return cy.get('.ng-dropdown-panel-items').invoke('text');
    }

    // dodata
    static clickOnDDlForType(option: string) {
        cy.get('[data-qa="typeDropdown"]').click();
        cy.get('[aria-labelledby="typeDropdown"]');
        cy.get('.dropdown-item').contains('div', `${option}`).click();
    }

    // dodata
    static clickOnDDlMeidumAgeing(nameofDDl: string, value: string) {
        return cy
            .contains('.filter-wrapper', `${nameofDDl}`)
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('.ng-option', value)
            .click();
    }

    static clickOnDropDownOptionTwo(index: number, value: string) {
        cy.get('.column-2')
            .find('.filter-wrapper')
            .eq(index)
            .find('.ng-select-container')
            .click()
            .get('.ng-dropdown-panel-items.scroll-host')
            .contains('.ng-option.ng-star-inserted', value)
            .click();
    }

    static clickOnAppDroprown(value: string) {
        cy.get('.ng-select-container')
            .click()
            .get('.ng-dropdown-panel-items.scroll-host')
            .contains('.ng-option.ng-star-inserted', value)
            .click();
    }

    // dodata
    static clickOnSolverInDdl(option: string) {
        cy.get('.form-group')
            .find('.ng-input')
            .click()
            .get('.ng-dropdown-panel')
            .find('.ng-dropdown-panel-items')
            .contains('.ng-option', option)
            .click();
    }

    static clickOnSolverInDdl1(option: string) {
        // Click on the solver in the dropdown
        cy.get('.form-group')
            .find('.ng-input')
            .click()
            .wait(1000)
            .get('.ng-dropdown-panel')
            .should('be.visible')
            .find('.ng-dropdown-panel-items')
            .contains('.ng-option', option)
            .click();

        // Return a Cypress chainable object for further chaining
        return cy.wrap(option);
    }

    static clickOnUpdateAnPropertyGroupTrackerDDL(
        index: number,
        update: string,
    ) {
        return cy
            .get('.searchable-dropdown')
            .eq(index)
            .find('.ng-select-container')
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('[role="option"]', update)
            .click();
    }

    static getTextForUpdateAnPropertyGroupTrackerDDL(
        index: number,
        update: string,
    ) {
        return cy
            .get('.searchable-dropdown')
            .eq(index)
            .find('.ng-select-container')
            .click()
            .get('.ng-dropdown-panel-items')
            .contains('[role="option"]', update)
            .click()
            .invoke('text');
    }

    static getSelectedOptionInDdl() {
        return cy.get('.ng-select-container').find('.ng-value-container');
    }

    static visibleProduceAndType(index: number) {
        return cy.get('.filter-wrapper.ng-star-inserted').eq(index);
    }

    static visibleHeatTreatmentDdl() {
        return cy.contains('label', 'Heat Treatment');
    }

    static visibleFormDdl() {
        return cy.contains('label', 'Form');
    }

    static visibleStrainRateDdl() {
        return cy.contains('label', 'Strain rate (1/s)');
    }

    static visibleCoatingsSearchBoxFilters(index: number) {
        return cy.get('.form-control').eq(index);
    }

    static visibleDDLFilters(index: number) {
        return cy
            .get('.column-2.dropdown-filters')
            .find('.filter-wrapper')
            .eq(index);
    }

    static clearDDl(index: number) {
        return cy
            .get('.accordion-body')
            .find('.column-2.dropdown-filters')
            .find('.filter-wrapper')
            .eq(index)
            .find('.searchable-dropdown')
            .find('.ng-clear-wrapper')
            .click();
    }

    static clickOnImportDDl() {
        cy.get('.searchable-dropdown').click();
    }

    static clickOnPropertyGroupTracker(index: number, update: string) {
        cy.get('.searchable-dropdown')
            .eq(index)
            .find('.ng-select-container')
            .click()
            .get('.ng-dropdown-panel-items');
        return cy
            .contains('[role="option"]', update)
            .click()
            .then(() => {
                return update;
            });
    }
}

export default new ConditionSelectorDDLForms();
