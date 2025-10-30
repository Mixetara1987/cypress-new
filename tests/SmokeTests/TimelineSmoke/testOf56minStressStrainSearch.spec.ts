import { color } from 'cypress/fixtures/color';
import { AdvancedHome } from '@/AdvancedSearch/advancedSearchHome';
import { Buttons } from '@/CommonMethods/Buttons';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { ExtendedRangeSearchFilter } from '@/HelpersMethods/extendedRange';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { SavedLists } from '@/HelpersMethods/SavedLists';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';

describe(
    'Smoke Test ( 56:00 min ), Stress Strain search',
    {
        tags: ['@smoke', '@stessStrain', '@extendedRange'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            ExtendedRangeSearchFilter.navigateTo('stress-strain');
        });

        it('Stress Strain search-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), temperature ranges, and which are checked', () => {
            const expectedTemperatureRanges = [
                '> 900°C',
                '700 - 900°C',
                '500 - 700°C',
                '300 - 500°C',
                '100 - 300°C',
                '30 - 100°C',
                '0 - 30°C',
                '-100 - 0°C',
                '< -100°C',
            ];
            cy.step('Navigate to Stress Strain search page');

            // check the title
            TabButtons.colorOfSelectedMainTab('Stress Strain Diagrams').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                },
            );
            // Verify if condition filters (Standard, Type, Material group, Heat Treatment and F0rm) are selected "all" by default
            cy.wait(500);
            JointsSearch.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(1).text()).to.contain('All');
                expect(status.eq(2).text()).to.contain('All');
                expect(status.eq(3).text()).to.contain('All');
                expect(status.eq(4).text()).to.contain('All');
                expect(status.eq(5).text()).to.contain('All');
            });
            // Verify if condition filters (Strain rate and Type) are selected "all" by default
            ConditionSelectorHeaders.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
                expect(status.eq(1).text()).to.contain('All');
            });
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
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');

            // check if Direct Data only slider is visible
            Sliders.IsOnDirectDataOnlySliderVisible().should('exist');

            // Check for temperature ranges
            Thermometer.getAllTemperatures().then((currentTemperatures) => {
                cy.Compare_Arrays(
                    currentTemperatures,
                    expectedTemperatureRanges,
                );
            });
            // Check for the default selected temperatures
            Thermometer.getTemperatureState('> 900°C').should('be.checked');
            Thermometer.getTemperatureState('700 - 900°C').should('be.checked');
            Thermometer.getTemperatureState('500 - 700°C').should('be.checked');
            Thermometer.getTemperatureState('300 - 500°C').should('be.checked');
            Thermometer.getTemperatureState('100 - 300°C').should('be.checked');
            Thermometer.getTemperatureState('30 - 100°C').should('be.checked');
            Thermometer.getTemperatureState('0 - 30°C').should('be.checked');
            Thermometer.getTemperatureState('-100 - 0°C').should('be.checked');
            Thermometer.getTemperatureState('< -100°C').should('be.checked');
        });
        it(
            'Stress Strain search-choose cobalt Alloy from material group, perform the search, it should show somde results,' +
                ' turn on Direct data, perform the search again, it should show 13 results, click on the 1st material from the list(GH188),' +
                ' it sohuld lead you to Stress Strain page, scroll down page and check for the diagram on the bottom of the page for defaulted(1st) selected condition',
            () => {
                CommonSearch.selectMaterialGroups(
                    ['Nonferrous Alloys', 'Cobalt'],
                    ['Cobalt Alloy'],
                );
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Cobalt )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C) ',
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
                cy.wait(500);
                Sliders.clickOnDirectDataOnlySlider();
                cy.wait(1000);
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Cobalt )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getTableColumnValues('classification').then(
                    (columnValues) => {
                        expect(columnValues).to.include('Cobalt Alloy');
                    },
                );
                cy.wait(3000);
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    'GH188',
                );
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Stress-Strain Diagrams',
                );
                cy.wait(2000);
                ConditionsSelectorDetailsView.getDefaultCondition().then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.equal(
                            'Sheets; Solution treated; Thickness (mm): 2CompressionDirection: LStress strain data originating from compression testing',
                        );
                    },
                );
                cy.scrollTo('bottom');
                PropertyTableDiagram.DiagramExist().should('exist');
                cy.scrollTo('top');
                //     },
                // );
                // it('Stress Strain search-turn back to Stress Strain Diagrams search page, Direct Data-ON and Cobalt should stayed as selected in Material group ddl, clear the selected value(Cobalt Alloy) from Material group ddl', () => {
                // cy.scrollTo('top');
                cy.step(
                    'Stress Strain search-turn back to Stress Strain Diagrams search page, Direct Data-ON and Cobalt should stayed as selected in Material group ddl, clear the selected value(Cobalt Alloy) from Material group ddl',
                );
                TabButtons.clickOnTheTabs('Stress Strain Diagrams');
                TabButtons.colorOfSelectedMainTab(
                    'Stress Strain Diagrams',
                ).then((backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                });
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Cobalt )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                cy.wait(1000);
                CommonSearch.clearMaterialGroup();
                cy.wait(1000);
                JointsSearch.getSelectedOptionInDdl().then((status) => {
                    expect(status.eq(3).text()).to.contain('All');
                });
                // });
                // it('Stress Strain search-choose from Strain rate ddl-0.01 - 0.1, Type-Dynamic tensile test, perform the search, it should show some results, then save the search, window for saving search should pop out, save the search', () => {
                cy.step(
                    'Stress Strain search-choose from Strain rate ddl-0.01 - 0.1, Type-Dynamic tensile test, perform the search, it should show some results, then save the search, window for saving search should pop out, save the search',
                );
                ConditionSelectorDDLForms.clickOnDDl(
                    'Strain rate (1/s)',
                    '0.01 - 0.1',
                );
                ExtendedRangeSearchFilter.getSelectedTextinDDL(4).should(
                    'equal',
                    '0.01 - 0.1',
                );
                ConditionSelectorDDLForms.clickOnDDl(
                    'Type',
                    'Dynamic tensile test',
                );
                ExtendedRangeSearchFilter.getSelectedTextinDDL(5).should(
                    'equal',
                    'Dynamic tensile test',
                );
                CommonSearch.clickSearchButton();
                cy.wait(2000);
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
                AdvancedHome.clickOnSavesearch();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Strain rate (1/s): 0.01 - 0.1 )  AND  (  Type: Dynamic tensile test )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                SavedLists.getSaveModalWindowHeader().should('equal', 'Save');
                Buttons.clickOnSaveSearchButton();
                MaterialDetails.getTextInBluePopup().then((alert) => {
                    expect(alert).to.be.include('×Search');
                });
                //     },
                // );
                // it('Stress Strain search-click on the 1st material from the list(1.0948 AFNOR NF), it should lead you to Stress Strain page, check in the filters if in Strain rate, 0.01 - 0.1 is selected and scroll down the page to check if diagram is visible for defaulted one selected condition', () => {
                cy.step(
                    'Stress Strain search-click on the 1st material from the list(1.0948 AFNOR NF), it should lead you to Stress Strain page, check in the filters if in Strain rate, 0.01 - 0.1 is selected and scroll down the page to check if diagram is visible for defaulted one selected condition',
                );
                cy.wait(2000);
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Stress-Strain Diagrams',
                );
                // ConditionSelectorDDLForms.getSelectedOptionInDDL('Strain rate (1/s)').should('equal', '0.01 - 0.1');
                ConditionsSelectorDetailsView.getDefaultCondition().then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.equal(
                            'Cold rolled; Thickness (mm): 1.47; SmoothedStrain Rate: (1/s): 0.1; Dynamic tensileDirection: LStress strain data originating from dynamic tensile testing',
                        );
                    },
                );
                cy.scrollTo('bottom');
                PropertyTableDiagram.DiagramExist().should('exist');
                // });
                // it('Stress Strain search-turn back to SS home page Direct Data-ON, clear the search by clicking on Clear button, it should be functional', () => {
                cy.step(
                    'Stress Strain search-turn back to SS home page Direct Data-ON, clear the search by clicking on Clear button, it should be functional',
                );
                TabButtons.clickOnTheTabs('Stress Strain Diagrams');
                TabButtons.colorOfSelectedMainTab(
                    'Stress Strain Diagrams',
                ).then((backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                });
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Strain rate (1/s): 0.01 - 0.1 )  AND  (  Type: Dynamic tensile test )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                CommonSearch.clearSearchFilters();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
            },
        );
        it('Stress Strain search-Choose from Heat Treatment-Age hardened (CH900), turn Direct data only, perform the search it should show one result, click on the material and check Heat Treatment in DDL for HT and in default condition', () => {
            Helpers.clickOnFilterOption(
                'Heat Treatment / Material Processing',
                [''],
                ['Age hardened (CH900)'],
            );
            Sliders.clickOnDirectDataOnlySlider();
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Heat Treatment / Material Processing: Age hardened (CH900))  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
            cy.wait(2000);
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            cy.wait(1000);
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            cy.wait(1000);
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Stress-Strain Diagrams',
            );
            ConditionSelectorDDLForms.getSelectedOptionInHeatTreatment(
                'Heat Treatment',
            ).should('contains', 'Age hardened (CH900)');
            ConditionsSelectorDetailsView.getDefaultCondition().then(
                (defaultCondition) => {
                    expect(defaultCondition).to.equal(
                        'Bars; Age hardened (CH900)TensileStress strain data originating from tensile testing',
                    );
                },
            );
        });
        it(
            'Stress Strain search-turn back to Stress Strain search page, clear the search by clicking on Clear button, Choose from Form-Bars(rectangular),' +
                'turn Direct data only, and perform the search, it should show some results, click on the 1st material from the list 2024(AA),' +
                ' it should lead you to Stress Strain page, check Form in DDL for Form(Bars (rectangular) and in default condition, turn back to Stress Strain home page Direct Data-ON, Form-Bars (rectangular) should be preselected, finally clear the search by clicking on Clear button',
            () => {
                TabButtons.clickOnTheTabs('Stress Strain Diagrams');
                TabButtons.colorOfSelectedMainTab(
                    'Stress Strain Diagrams',
                ).then((backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                });
                cy.wait(1000);
                CommonSearch.clearSearchFilters();
                cy.wait(1500);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
                ConditionSelectorDDLForms.clickAndChooseInFormDdl(1);
                Sliders.clickOnDirectDataOnlySlider();
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Form: Bars (rectangular))  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                cy.wait(2000);
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                cy.wait(3000);
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                cy.wait(1000);
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    '2024',
                );
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Stress-Strain Diagrams',
                );
                ConditionsSelectorDetailsView.getDefaultCondition().then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.equal(
                            'Bars (rectangular); Solution heat treated, cold worked and naturally aged (T3510); Thickness (mm): 50; Width (mm): 300TensileStress strain data originating from tensile testing',
                        );
                    },
                );
                TabButtons.clickOnTheTabs('Stress Strain Diagrams');
                cy.wait(1000);
                CommonSearch.clearSearchFilters();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
            },
        );
    },
);
