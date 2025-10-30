import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';
import { color } from 'cypress/fixtures/color';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CreepData } from '@/CreepData/creepData';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { Formability } from '@/ExtendedRange/Formability';
import { ExtendedRangeSearchFilter } from '@/HelpersMethods/extendedRange';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';

describe(
    'Smoke Test ( 58:00 min ), Formability search',
    { tags: ['@smoke', '@extendedRange'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            ExtendedRangeSearchFilter.navigateTo('formability');
            Helpers.waitForloaderIfLoaderExist();
        });

        it('Formability search-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), temperature ranges, and which are checked', () => {
            const expectedTemperatureRange = [
                '> 1000°C',
                '800 - 1000°C',
                '600 - 800°C',
                '400 - 600°C',
                '200 - 400°C',
                '50 - 200°C',
                '< 50°C',
            ];
            const tempRange1000 = 0;
            const tempRange8001000 = 1;
            const tempRange600800 = 2;
            const tempRange400600 = 3;
            const tempRange200400 = 4;
            const tempRange50200 = 5;
            const tempRange50 = 6;
            cy.step('Navigate to Formability search page');
            TabButtons.colorOfSelectedMainTab('Formability').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                },
            );
            // check the title
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Extended Range Formability',
            );
            // check for filters title
            ConditionSelectorHeaders.getTitlesOfDDLptionTwo().then((title) => {
                expect(title.eq(0).text()).to.equal('Material Designation');
                expect(title.eq(1).text()).to.equal('Standard');
                expect(title.eq(2).text()).to.equal('Producer');
                expect(title.eq(4).text()).to.equal('Material group');
                expect(title.eq(5).text()).to.equal(
                    'Heat Treatment / Material Processing',
                );
                expect(title.eq(6).text()).to.equal('Form');
            });
            ConditionSelectorHeaders.getTitlesOfDDLptionThree().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Strain rate (1/s)');
                    expect(title.eq(1).text()).to.equal('Type');
                },
            );
            ConditionSelectorHeaders.getSelectedOptionInDdl().each(
                ($status) => {
                    const textContent = $status.text();
                    expect(textContent).to.contain('All');
                },
            );
            cy.wait(500);
            // Verify if condition filters (Standard, Type, Material group, Heat Treatment, Form and Strain Rate) are selected "all" by default`
            JointsSearch.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(1).text()).to.contain('All');
                expect(status.eq(2).text()).to.contain('All');
                expect(status.eq(3).text()).to.contain('All');
                expect(status.eq(4).text()).to.contain('All');
                expect(status.eq(5).text()).to.contain('All');
            });
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');

            // check if Direct Data only slider is visible
            Sliders.IsOnDirectDataOnlySliderVisible().should('exist');

            // Check for temperature ranges
            Thermometer.getAllTemperatures().then((currentTemperatures) => {
                cy.Compare_Arrays(
                    currentTemperatures,
                    expectedTemperatureRange,
                );
            });
            //  Check for the default selected temperatures
            Thermometer.getTemperature(tempRange1000).should('be.checked');
            Thermometer.getTemperature(tempRange8001000).should('be.checked');
            Thermometer.getTemperature(tempRange600800).should('be.checked');
            Thermometer.getTemperature(tempRange400600).should('be.checked');
            Thermometer.getTemperature(tempRange200400).should('be.checked');
            Thermometer.getTemperature(tempRange50200).should('be.checked');
            Thermometer.getTemperature(tempRange50).should('be.checked');
            // });
            // it(
            //     'Formability search-Choose from Heat Treatment-Annealed and hot rolled, direct data-ON, perform the search, it should be 3 results, click on the 1st material from the list (Ti-6Al-4V ELI SAE) and check if selected appears in ddl for Heat Treatment and in selected conditions,' +
            //         'Clear`Annealed and hot rolled` from Heat Treatment ddl, and choose from Form`Die Forgings`, direct Data - ON, perform the search, it should be 2 results, click on the 1st material from the list(Ti - 6Al - 4V ELI SAE) and check if selected appears in selected conditions,' +
            //         'Formability search - turn back to Formability tab, clear the selected option in form, it should be displayed `all`',
            //     () => {
            cy.step(
                'Formability search-Choose from Heat Treatment-Annealed and hot rolled, direct data-ON, perform the search, it should be 3 results, click on the 1st material from the list (Ti-6Al-4V ELI SAE) and check if selected appears in ddl for Heat Treatment and in selected conditions,' +
                    'Clear`Annealed and hot rolled` from Heat Treatment ddl, and choose from Form`Die Forgings`, direct Data - ON, perform the search, it should be 2 results, click on the 1st material from the list(Ti - 6Al - 4V ELI SAE) and check if selected appears in selected conditions,' +
                    'Formability search - turn back to Formability tab, clear the selected option in form, it should be displayed `all`',
            );
            Helpers.clickOnFilterOption(
                'Heat Treatment / Material Processing',
                [''],
                ['Annealed and hot rolled'],
            );
            Sliders.clickOnDirectDataOnlySlider();
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Heat Treatment / Material Processing: Annealed and hot rolled)  AND  (  Temperature: > 1000°C  OR  800 - 1000°C  OR  600 - 800°C  OR  400 - 600°C  OR  200 - 400°C  OR  50 - 200°C  OR  < 50°C)  AND  (  Direct data only )  ',
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
            ListOfMaterials.clickOnMaterialInListByIndex(1);
            ConditionSelectorDDLForms.getSelectedOptionInHeatTreatment(
                'Heat Treatment',
            ).should('contains', 'Annealed and hot rolled');
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'contains',
                ' Product Bars; Annealed and hot rolled',
            );
            // clear- `Annealed and hot rolled` from Heat Treatment ddl, and choose from Form `Die Forgings`,  direct Data-ON, perform the search, it should be 2 results, click on the 1st material from the list (Ti-6Al-4V ELI SAE) and check if selected appears in selected conditions
            TabButtons.clickOnTheTabs('Formability');
            TabButtons.colorOfSelectedMainTab('Formability').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                },
            );
            cy.wait(1000);
            ExtendedRangeSearchFilter.clickOnClearOptionDDL(4);
            JointsSearch.getSelectedOptionInDdlSingleDdl(4).should(
                'equal',
                '-- All --',
            );
            cy.wait(1000);
            Helpers.clickOnFilterOption('Form', [''], ['Die forgings']);
            ConditionSelectorDDLForms.getSelectedOptionInForm('Form').should(
                'contains',
                'Die forgings',
            );
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Form: Die forgings)  AND  (  Temperature: > 1000°C  OR  800 - 1000°C  OR  600 - 800°C  OR  400 - 600°C  OR  200 - 400°C  OR  50 - 200°C  OR  < 50°C)  AND  (  Direct data only )  ',
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
            cy.wait(1000);
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'equal',
                ' Product Die forgings; Disc shaped; Diameter (mm): >420<452; Full range Experiment Testing Type: Tensile Comment Stress strain data originating from tensile testing',
            );
            // turn back to Formability tab,clear the selected option in form, it should be displayed `all`'
            TabButtons.clickOnTheTabs('Formability');
            TabButtons.colorOfSelectedMainTab('Formability').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                },
            );
            cy.wait(1000);
            CommonSearch.clearSearchFilters();
            cy.wait(1000);
            JointsSearch.getSelectedOptionInDdlSingleDdl(5).should(
                'equal',
                '-- All --',
            );
        });
        it(
            'Formability search-Choose from Type ddl-Forming Limit Curves, perform the search, ' +
                ' switch Direct data to ON, perform the search again, it should show some results, click on 1st material from the list(1.0338 CSN),' +
                'it should lead you to Formability/ Forming Limit Curves page, check if 1st condition is selected by default and check if diagram for this condition is visible,' +
                'switch to 2nd condition and check also for diagram and table',
            () => {
                cy.step(
                    'Formability search-Choose from Type ddl-Forming Limit Curves, perform the search, ' +
                        ' switch Direct data to ON, perform the search again, it should show some results, click on 1st material from the list(1.0338 CSN),' +
                        'it should lead you to Formability/ Forming Limit Curves page, check if 1st condition is selected by default and check if diagram for this condition is visible,' +
                        'switch to 2nd condition and check also for diagram and table',
                );
                TabButtons.clickOnTheTabs('Formability');
                CommonSearch.selectStandards([' CSN ']);
                ConditionSelectorDDLForms.clickOnDDl(
                    'Type',
                    'Forming Limit Curves',
                );
                ExtendedRangeSearchFilter.getSelectedTextinDDL(3).should(
                    'equal',
                    'Forming Limit Curves',
                );
                CommonSearch.clickSearchButton();
                cy.wait(2000);
                // ConditionSelectorHeaders.getSearchCriteriaBox().should('includes', 'Selected search criteria ( Country/Standard: Czech Republic/CSN )  AND  (  Heat Treatment / Material Processing: Annealed and hot rolled)  AND  (  Type: Forming Limit Curves )');
                Sliders.clickOnDirectDataOnlySlider();
                CommonSearch.clickSearchButton();
                cy.wait(2000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'includes',
                    '(  Direct data only )',
                );
                cy.wait(3000);
                ListOfMaterials.clickOnMaterialInListByIndex(2);
                // ConditionSelectorHeaders.getTitle().should('equal', 'Formability');
                TabButtons.colorOfSelectedTabButton(
                    'Forming Limit Curves',
                ).should('have.css', 'background-color', color.orangeLight);
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    'ProductSheets; Thickness (mm): 1',
                );
                cy.scrollTo('bottom');
                Formability.diagramAndTableDataExist().should('exist');
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                    1,
                ).should('have.class', 'table-cell-radio');
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    'ProductSheets; Cold rolled; Thickness (mm): 1; Direction: ST',
                );
                cy.scrollTo('bottom');
                Formability.diagramAndTableDataExist().should('exist');
                // });
                // it('Formability-switch to r-factors tab, check if 1st conditions is selected by default, check for property table for selected condition beneath the list of conditions(reference)', () => {
                cy.step(
                    'Formability-switch to r-factors tab, check if 1st conditions is selected by default, check for property table for selected condition beneath the list of conditions(reference)',
                );
                TabButtons.clickOnTab(`r-factors`);
                TabButtons.colorOfSelectedTabButton('r-factors').should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                TabButtons.clickOnTab(`r-factors`);
                TabButtons.colorOfSelectedTabButton('r-factors').should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                Formability.getTextInReferenceOnRfactorsTab(0).then(
                    (textInFirstReference) => {
                        const dataInFirstReference = textInFirstReference;
                        expect(dataInFirstReference).to.equal(
                            'Plastic Strain Ratio',
                        );
                    },
                );
                //     },
                // );
                // it(
                //     'Formability search-turn back to Formability search page, choose in Type DDl High Strain Curves, direct data-ON, perform the search,' +
                //         ' click on 1st material from the list, it should lead you to Formability/ High Strain Curves page,' +
                //         'check if 1st condition is selected by default, scroll down and check if diagram and table are visible',
                //     () => {
                cy.step(
                    'Formability search-turn back to Formability search page, choose in Type DDl High Strain Curves, direct data-ON, perform the search,' +
                        ' click on 1st material from the list, it should lead you to Formability/ High Strain Curves page,' +
                        'check if 1st condition is selected by default, scroll down and check if diagram and table are visible',
                );
                TabButtons.clickOnTheTabs('Formability');
                ConditionSelectorDDLForms.clickOnDDl(
                    'Type',
                    'High Strain Curves',
                );
                ExtendedRangeSearchFilter.getSelectedTextinDDL(3).should(
                    'equal',
                    'High Strain Curves',
                );
                CommonSearch.clickSearchButton();
                // click on material from the list it should lead you to Formability/ High Strain Curves page, check if 1st condition is selected by default, scroll down and check if diagram and table are visible
                cy.wait(2000);
                ListOfMaterials.clickOnMaterialInListByIndex(1);
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Formability',
                );
                TabButtons.colorOfSelectedTabButton(
                    'High Strain Curves',
                ).should('have.css', 'background-color', color.orangeLight);
                cy.scrollTo('bottom');
                cy.wait(700);
                Formability.diagramAndTableDataExist().should('exist');
                //     },
                // );
                it(
                    'Formability search-turn back to Formability search page, choose in Type DDL now `r-factors`, perform the search' +
                        'click on 1st material from the list, it should lead you to Formability/ r-factors, there check for the 1st reference data in property table',
                    () => {
                        cy.step(
                            'Formability search-turn back to Formability search page, choose in Type DDL now `r-factors`, perform the search' +
                                'click on 1st material from the list, it should lead you to Formability/ r-factors, there check for the 1st reference data in property table',
                        );
                        // cy.scrollTo('top');
                        TabButtons.clickOnTheTabs('Formability');
                        cy.wait(1000);
                        ConditionSelectorDDLForms.clickOnDDl(
                            'Type',
                            'r-factors',
                        );
                        ExtendedRangeSearchFilter.getSelectedTextinDDL(
                            3,
                        ).should('equal', 'r-factors');
                        CommonSearch.clickSearchButton();
                        // click on 1st material from the list(1.0338 CSN), it should lead you to Formability/ r-factors, there check for the 1st reference data in property table
                        cy.wait(3500);
                        ListOfMaterials.clickOnMaterialInListByIndex(0);
                        ConditionSelectorHeaders.getTitle().should(
                            'equal',
                            'Formability',
                        );
                        TabButtons.colorOfSelectedTabButton('r-factors').should(
                            'have.css',
                            'background-color',
                            color.orangeLight,
                        );
                        Formability.getTextInReferenceOnRfactorsTab(0).then(
                            (textInFirstReference) => {
                                const dataInFirstReference =
                                    textInFirstReference;
                                expect(dataInFirstReference).to.equal(
                                    'Plastic Strain Ratio',
                                );
                            },
                        );
                    },
                );
                it(
                    'Formability search-turn back to Formability search page, choose in Type DDL now `Bendability`, perform the search' +
                        ' click on the 1st from the list, it should lead you to Bendability page for this material, check the poperty table beneath text for selected condition',
                    () => {
                        cy.step(
                            'Formability search-turn back to Formability search page, choose in Type DDL now `Bendability`, perform the search' +
                                ' click on the 1st from the list, it should lead you to Bendability page for this material, check the poperty table beneath text for selected condition',
                        );
                        cy.scrollTo('top');
                        TabButtons.clickOnTheTabs('Formability');
                        cy.wait(1000);
                        ConditionSelectorDDLForms.clearDDl(3);
                        ConditionSelectorDDLForms.clickOnDDl(
                            'Type',
                            'Bendability',
                        );
                        ExtendedRangeSearchFilter.getSelectedTextinDDL(
                            3,
                        ).should('equal', 'Bendability');
                        CommonSearch.clickSearchButton();
                        cy.wait(3000);
                        ListOfMaterials.clickOnMaterialInListByIndex(0);
                        ConditionSelectorHeaders.getTitle().should(
                            'equal',
                            'Formability',
                        );
                        TabButtons.colorOfSelectedTabButton(
                            'Bendability',
                        ).should(
                            'have.css',
                            'background-color',
                            color.orangeLight,
                        );
                        cy.wait(1000);
                        Formability.getTextInReference(0).then(
                            (textInFirstReference) => {
                                const dataInFirstReference =
                                    textInFirstReference;
                                expect(dataInFirstReference).to.equal(
                                    ' Flat products; Hot rolled; Thickness: 1 < t <= 1.5 mm; Transverse direction ',
                                );
                            },
                        );
                    },
                );
            },
        );
    },
);
