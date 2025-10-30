import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { Lubricants } from '@/DataPlus/Lubricants';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke Test ( 67:00 min ), Lubricants search',
    { tags: ['@smoke', '@dataPlus', '@lubricants'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            cy.intercept('GET', '**/lubricants/search/filters').as(
                'waitSearch',
            );
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.Lubricants);
            cy.wait('@waitSearch', { timeout: 10000 });
        });

        it('Lubricants search-check if all filters are visible and their titles and which are preselected`All` by default, buttons(search, clear)', () => {
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Data Plus Lubricants & Coolants',
            );
            TabButtons.colorOfSelectedMainTab('Lubricants').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleLight);
                },
            );

            // Check if material designation field is visible
            CommonSearch.getMaterialDesignation().should('exist');
            // Check if Standard dropdown is visible
            CommonSearch.getStandardDDL().should('exist');
            // Check if Producer field is visible
            ConditionSelectorDDLForms.visibleProduceAndType(0).should('exist');
            // check if Material group ddl is visible
            CommonSearch.getMaterialGroupDDL().should('exist');
            // Check if Application dropdown is visible
            Lubricants.visibleApplicationDdl().should('exist');
            // check titles for search filters
            ConditionSelectorHeaders.getConditionFiltersTitles().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Material Designation');
                    expect(title.eq(1).text()).to.equal('Standard');
                    expect(title.eq(2).text()).to.equal('Producer');
                    expect(title.eq(3).text()).to.equal('Material group');
                    expect(title.eq(4).text()).to.equal('Application');
                    expect(title.eq(5).text()).to.equal(
                        'Kinematic Viscosity (mm²/s)',
                    );
                    expect(title.eq(6).text()).to.equal('Viscosity Index');
                    expect(title.eq(7).text()).to.equal('Density (kg/dm³) ');
                    expect(title.eq(8).text()).to.equal('Pour Point (°C) ');
                    expect(title.eq(9).text()).to.equal('Flash Point (°C)');
                },
            );
            // Verify if condition filters Standard and Material Group are selected "all" by default`
            JointsSearch.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(1).text()).to.contain('All');
                expect(status.eq(2).text()).to.contain('All');
            });
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');
        });
        it(
            'Lubricants search-Kinematic Viscosity(min-1, max-10), perform the search, it should be functional, it should show more than 2000 results, click on the 6th material form the list(CG Proprietary),' +
                'it should lead you to Lubricants page for selected material, Material Description tab should be selected by default, switch to Properties tab and check if Kinematic Viscosity range is in selected range in property table, it should be visible',
            () => {
                cy.wait(1000);
                // Lubricants.enterMinMaxValues(0, '1');
                // Lubricants.enterMinMaxValues(1, '10');
                Lubricants.enterLabelMinMaxValues(
                    'Kinematic Viscosity (mm²/s)',
                    0,
                    '1',
                );
                Lubricants.enterLabelMinMaxValues(
                    'Kinematic Viscosity (mm²/s)',
                    1,
                    '10',
                );
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Kinematic Viscosity (mm²/s):\n        1-10 ) ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                ListOfMaterials.showingFirst2000Message().then((message) => {
                    expect(message).to.contain('List of results too large');
                });
                // Lubricants search-click on the 6th material form the list, it should lead you to Lubricants page for selected material, Material Description tab should be selected by default
                ListOfMaterials.clickOnMaterialInListByIndex(5);
                cy.wait(2000);
                Lubricants.getTitleOfLubricants().should(
                    'contains',
                    'Lubricants & Coolants',
                );
                TabButtons.colorOfSelectedTabButton(
                    'Material Description',
                ).should('have.css', 'background-color', color.pinkLight);
                PropertyTable.findSourcePropertyInTable(' Source ');
                PropertyTable.findSourcePropertyInTable(
                    'Yushiro Chemical Industry Co., Ltd',
                );
                // Lubricants search-switch to Properties tab and check for Kinematic Viscosity in property table, it should be visible
                const defaultpropertyTableColumnHeaders = [
                    ' Property ',
                    ' T(°C) ',
                    ' Value ',
                    ' Unit ',
                    ' Note ',
                    '',
                ];
                TabButtons.clickOnTab('Properties');
                TabButtons.colorOfSelectedTabButton('Properties').should(
                    'have.css',
                    'background-color',
                    color.pinkLight,
                );
                ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );
                PropertyTable.findPropertyNameInTable('Kinematic Viscosity');
                PropertyTable.getPropertyValuesInTableRow('40');
                PropertyTable.getPropertyValuesInTableRow('7 ');
                PropertyTable.getPropertyValuesInTableRow('mm²/s');
                //     },
                // );
                // it('Lubricants search- turn back to Lubricants search page, Kinematic Viscosity(1-10) should be selected, clear the search', () => {
                cy.step(
                    'Lubricants search- turn back to Lubricants search page, Kinematic Viscosity(1-10) should be selected, clear the search',
                );
                TabButtons.clickOnTheTabs('Lubricants');
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Kinematic Viscosity (mm²/s):\n        1-10 ) ',
                );
                cy.wait(1000);
                CommonSearch.clearSearchFilters();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
                // });
                // it(
                //     'Lubricants search-Viscosity Index(min-1, max-10), perform the search, it should be one results in the list, click on the material form the list(CAPELLA WF 32 Proprietary),' +
                //         'it should lead you to Lubricants page for selected material, Material Description tab should be selected by default, check propety table,' +
                //         'switch to Properties tab and check if Viscosity Index is in selected range, turn back to Lubricants search page, Viscosity Index(1-10) should be selected, clear the search',
                //     () => {
                cy.step(
                    'Lubricants search-Viscosity Index(min-1, max-10), perform the search, it should be one results in the list, click on the material form the list(CAPELLA WF 32 Proprietary),' +
                        'it should lead you to Lubricants page for selected material, Material Description tab should be selected by default, check propety table,' +
                        'switch to Properties tab and check if Viscosity Index is in selected range, turn back to Lubricants search page, Viscosity Index(1-10) should be selected, clear the search',
                );
                Lubricants.enterMinMaxValues(2, '1');
                Lubricants.enterMinMaxValues(3, '10');
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Viscosity Index: 1-10 ) ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                // click on the material(CAPELLA WF 32) form the list, it should lead you to Lubricants page for selected material, Material Description tab, check propety table, switch to Properties tab and check if Viscosity Index is in selected
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                Lubricants.getTitleOfLubricants().should(
                    'equal',
                    'Lubricants & Coolants',
                );
                TabButtons.colorOfSelectedTabButton(
                    'Material Description',
                ).should('have.css', 'background-color', color.pinkLight);
                PropertyTable.findSourcePropertyInTable(' Source ');
                PropertyTable.findSourcePropertyInTable(' General comment ');
                TabButtons.clickOnTab('Properties');
                PropertyTable.getPropertyValuesInTableRow('7 ');
                TabButtons.clickOnTheTabs('Lubricants');
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Viscosity Index: 1-10 ) ',
                );
                cy.wait(1000);
                CommonSearch.clearSearchFilters();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
            },
        );
        it('Lubricants search-Pour Point (°C)(1-100), perform the search, it should show some results', () => {
            Lubricants.enterMinMaxValues(6, '1');
            Lubricants.enterMinMaxValues(7, '100');
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Pour Point (°C): 1-100 ) ',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // click on the 4th material form the list, it should lead you to Lubricants page for selected material, Material Description tab should be selected by default, switch to Properties and check If Pour Point is in selected range
            ListOfMaterials.clickOnMaterialInListByIndex(3);
            Lubricants.getTitleOfLubricants().should(
                'equal',
                'Lubricants & Coolants',
            );
            TabButtons.colorOfSelectedTabButton('Material Description').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            PropertyTable.findSourcePropertyInTable(' Source ');
            PropertyTable.findSourceValueInTable('GEO Specialty Chemicals');

            TabButtons.clickOnTab('Properties');
            TabButtons.colorOfSelectedTabButton('Properties').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaders,
                    );
                },
            );
            PropertyTable.findPropertyNameInTable('Pour Point');
            PropertyTable.getPropertyValuesInTableRow('6 ');
            // });

            // it('Lubricants search- turn back to Lubricants search page, Pour Point(1-100) should be selected, clear the search, ', () => {

            cy.step(
                'Lubricants search- turn back to Lubricants search page, Pour Point(1-100) should be selected, clear the search, ',
            );
            TabButtons.clickOnTheTabs('Lubricants');
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Pour Point (°C): 1-100 ) ',
            );
            cy.wait(1000);
            CommonSearch.clearSearchFilters();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria',
            );
            // Lubricants search-Flash Point (°C)(1-10), perform the search, it should have 0 results
            Lubricants.enterMinMaxValues(8, '1');
            Lubricants.enterMinMaxValues(9, '10');
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Flash Point (°C): 1-10 ) ',
            );
            cy.wait(1000);
            ListOfMaterials.getAlertMessage().then((results) => {
                expect(results).to.contain(' Total items found:');
            });
            // });
            // it(
            //     'Add `0` to 100 in max value for Flash Point, and perform the search again, it should show some results, click on the 18th material form the list,' +
            //         'it should lead you to Lubricants page for selected material, Material Description tab should be selected by default, switch to Properties tab and check if Flash Point is in selected range',
            //     () => {
            cy.step(
                'Add `0` to 100 in max value for Flash Point, and perform the search again, it should show some results, click on the 18th material form the list,' +
                    'it should lead you to Lubricants page for selected material, Material Description tab should be selected by default, switch to Properties tab and check if Flash Point is in selected range',
            );
            Lubricants.enterMinMaxValues(9, '0');
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Flash Point (°C): 1-100 ) ',
            );
            cy.wait(1000);
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            ListOfMaterials.clickOnMaterialInListByIndex(18);
            Lubricants.getTitleOfLubricants().should(
                'equal',
                'Lubricants & Coolants',
            );
            TabButtons.colorOfSelectedTabButton('Material Description').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            PropertyTable.findSourcePropertyInTable(' Source ');
            PropertyTable.findSourcePropertyInTable(' General comment ');
            // switch to Properties tab and check for Flash Point(°C) in property table, data should be visible
            const defaultpropertyTableColumnHeaders = [
                ' Property ',
                ' T(°C) ',
                ' Value ',
                ' Unit ',
                ' Note ',
                '',
            ];
            TabButtons.clickOnTab('Properties');
            TabButtons.colorOfSelectedTabButton('Properties').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaders,
                    );
                },
            );
            PropertyTable.findPropertyNameInTable('Flash Point');
            PropertyTable.getPropertyValuesInTableRow('90 ');
            // turn back to Lubricants search page, Flash Point(1-100) should be selected
            TabButtons.clickOnTheTabs('Lubricants');
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Flash Point (°C): 1-100 ) ',
            );
        });
    },
);
