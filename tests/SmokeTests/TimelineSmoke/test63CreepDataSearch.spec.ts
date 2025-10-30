import { Buttons } from '@/CommonMethods/Buttons';
import { Sliders } from '@/CommonMethods/Sliders';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { SelectedConditions } from '@/CommonMethods/selectedConditions';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { SavedLists } from '@/HelpersMethods/SavedLists';
import { ExtendedRangeSearchFilter } from '@/HelpersMethods/extendedRange';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke Test ( 63:00 min ), Creep Data search',
    {
        tags: ['@smoke', '@extendedRange', '@creepData'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Creep Data-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), temperature ranges, and which are checked', () => {
            const expectedTemperatureRanges = [
                '>900°C',
                '700 - 900°C',
                '500 - 700°C',
                '300 - 500°C',
                '100 - 300°C',
                '<100°C',
            ];
            cy.step('Navigate to Fracture Mechanics search page');
            const temperature_900 = 0;
            const temperature_700_900 = 1;
            const temperature_500_700 = 2;
            const temperature_300_500 = 3;
            const temperature_100_300 = 4;
            const temperature_100 = 5;
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.CreepData);
            CommonSearch.getMaterialGroupDDL();
            // Verify if condition filters (Standard, Type, Material, Heat Treatment and Form group are selected "all" by default`

            JointsSearch.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(3).text()).to.contain('All');
                expect(status.eq(4).text()).to.contain('All');
            });
            // check if titles for Material Designation, Standard, Producer, Type, Material group, Heat Treatment, Form and Direct Data are visible
            TabButtons.colorOfSelectedMainTab('Creep Data').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                },
            );
            const expectedTittlesAboweFilters = [
                'Material Designation',
                'Standard',
                'Producer',
                'Type',
                'Material group',
                'Heat Treatment / Material Processing',
                'Form',
                'Creep Rupture Strength  (MPa)',
            ];
            cy.wait(500);
            ExtendedRangeSearchFilter.getTitlesAboveFilters().then(
                (currentTitlesAboweFilters) => {
                    cy.Compare_Arrays(
                        currentTitlesAboweFilters,
                        expectedTittlesAboweFilters,
                    );
                },
            );
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');

            // Check for temperature ranges
            Thermometer.getAllTemperatures().then((currentTemperatures) => {
                cy.Compare_Arrays(
                    currentTemperatures,
                    expectedTemperatureRanges,
                );
            });
            // Check for the default selected temperatures
            Thermometer.getTemperature(temperature_900).should('be.checked');
            Thermometer.getTemperature(temperature_700_900).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperature_500_700).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperature_300_500).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperature_100_300).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperature_100).should('be.checked');
        });

        it('Creep Data search-enter in Creep Rupture Strength min(10), in max(50), direct data-ON, perform the search, it should show some results. Click on the 4th material(X 45 CrSi 9-3 UNI) from the list, it should lead you to Creep Data page, ', () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.CreepData);
            ExtendedRangeSearchFilter.enterCreepRuptureStrenghtMin('10');
            ExtendedRangeSearchFilter.enterCreepRuptureStrenghtMax('50');
            Sliders.clickOnDirectDataOnlySlider();
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                ' Selected search criteria  (  Creep Rupture Strength  (MPa): 10-50 )  AND  (  Temperature: >900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  <100°C)  AND  (  Direct data only )  ',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
            cy.contains('p', 'List of results too large to display.');
            // ListOfMaterials.getListOfResultsInMaterialListBuilder().then(
            //     (listOfResults) => {
            //         expect(listOfResults).to.contain('Result(s) found:');
            //     },
            // );
            cy.wait(2000);
            // ListOfMaterials.clickOnMaterialInList(3);
            ListOfMaterials.findMaterialNamePagination('X10CrAlSi25');
            ConditionSelectorHeaders.getTitle().should('equal', 'Creep Data');
            SelectedConditions.getAllTextInSelectedConditions().then(
                (selectedCondition) => {
                    expect(selectedCondition.text()).to.be.equal(
                        'Product: Bars, flat products, rods, sections; Annealed (+A)',
                    );
                },
            );
            // });

            // it('Creep Data search - Turn back to Creep data search page, save the search, go to My Console, Saved Search tab and check if search is saved', () => {
            cy.step(
                'Turn back to Creep data search page, save the search, go to My Console, Saved Search tab and check if search is saved',
            );
            TabButtons.clickOnTheTabs('Creep Data');
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                ' Selected search criteria  (  Creep Rupture Strength  (MPa): 10-50 )  AND  (  Temperature: >900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  <100°C)  AND  (  Direct data only )  ',
            );
            Buttons.clickSaveButton();
            SavedLists.getSaveModalWindowHeader().should('equal', 'Save');
            Buttons.clickOnSaveSearchButton();
            MaterialDetails.getTextInBluePopup().then((alert) => {
                expect(alert).to.be.equal('×Search saved successfully.');
            });
            TotalSearchHomePage.clickOnMaterialConsole();
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Saved Searches');
            SavedLists.getSavedLIstInRow(0).should('contain', `Creep Data`);
        });
    },
);
