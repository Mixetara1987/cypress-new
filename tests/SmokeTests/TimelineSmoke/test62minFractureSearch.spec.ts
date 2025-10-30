import { Helpers } from '@/HelpersMethods/helpers';
import { color } from 'cypress/fixtures/color';
import { ModuleURLs } from 'cypress/fixtures/modules';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { FractureMechanics } from '@/FractureMechanics/fractureMechanics-Tab';
import { FractureMechanicsHomeDDL } from '@/FractureMechanics/fractureMechanicsHome-DDL';
import { ExtendedRangeSearchFilter } from '@/HelpersMethods/extendedRange';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';

describe(
    'Smoke Test ( 62:00 min ), Fracture Mechanics search',
    {
        tags: ['@smoke', '@extendedRange', '@fractureMechanics'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Fracture Mechanics-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), temperature ranges, and which are checked', () => {
            cy.step('Navigate to Fracture Mechanics search page');
            const expectedTemperatureRanges = [
                '>100°C',
                '30 - 100°C',
                '0 - 30°C',
                '-100 - 0°C',
                '< -100°C',
            ];
            const temperature_100 = 0;
            const temperature_30_100 = 1;
            const temperature_0_30 = 2;
            const temperatureMinus_100_0 = 3;
            const temperatureMinus_100 = 4;
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.FractureMechanics);
            // verify if condition filter Kic (MPa √m) is displayed "all" by default
            TabButtons.colorOfSelectedMainTab('Fracture Mechanics').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                },
            );
            ConditionSelectorHeaders.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filters (Standard, Type, Material group, Heat Treatment, Form and are selected "all" by default
            cy.wait(500);
            JointsSearch.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(1).text()).to.contain('All');
                expect(status.eq(2).text()).to.contain('All');
                expect(status.eq(3).text()).to.contain('All');
                expect(status.eq(4).text()).to.contain('All');
                expect(status.eq(5).text()).to.contain('All');
            });
            // check if titles for Material Designation, Standard, Producer, Type, Material group, Heat Treatment, Form and Direct Data are visible
            const expectedTittlesAboweFilters = [
                'Material Designation',
                'Standard',
                'Producer',
                'Type',
                'Material group',
                'Heat Treatment / Material Processing',
                'Form',
            ];
            ExtendedRangeSearchFilter.getTitlesAboveFilters().then(
                (currentTitlesAboweFilters) => {
                    cy.Compare_Arrays(
                        currentTitlesAboweFilters,
                        expectedTittlesAboweFilters,
                    );
                },
            );
            // Check for options in DDL Kic (MPa √m)
            ConditionSelectorHeaders.getTitlesOfDDLptionThree().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Kic (MPa √m)');
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
            Thermometer.getTemperature(temperature_100).should('be.checked');
            Thermometer.getTemperature(temperature_30_100).should('be.checked');
            Thermometer.getTemperature(temperature_0_30).should('be.checked');
            Thermometer.getTemperature(temperatureMinus_100_0).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperatureMinus_100).should(
                'be.checked',
            );
        });
        it(
            'Fracture Mechanics search-choose from Kic (MPa √m)(90-110), perform the search, it should show more than 2000 results. Turn Direct data-ON, perform the search again, it should have 97 results now' +
                'click on the first material from the list 1.4548 WL, it should lead you to Fracture Mechanics page, check text for selected condition and property table beneath, check if Kic in material details is in range 90-110, turn back to Fracture Mechanics search page, clear the search',
            () => {
                Helpers.totalMateriaNavigateTo(
                    ModuleURLs.Main.FractureMechanics,
                );
                FractureMechanicsHomeDDL.selectKicMPa('90 - 110');
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    ' Selected search criteria  (  Kic (MPa √m): 90 - 110 )  AND  (  Temperature: >100°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C) ',
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
                Sliders.clickOnDirectDataOnlySlider();
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    ' Selected search criteria  (  Kic (MPa √m): 90 - 110 )  AND  (  Temperature: >100°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                cy.wait(2000);
                ListOfMaterials.getListOfResultsFound().then(
                    (listOfResults) => {
                        expect(listOfResults).to.contain('Result(s) found:');
                    },
                );
                // ListOfMaterials.clickOnNextPage();
                ListOfMaterials.clickOnMaterialInListString('1.4548');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Fracture Mechanics',
                );
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'contain',
                    'ProductForged bars; Quenched',
                );
                // verify title and data in property table
                FractureMechanics.getTextInHeaders().then((title) => {
                    expect(title.eq(0).text()).to.equal('Temperature (°C)');
                    expect(title.eq(1).text()).to.equal('Direction');
                    expect(title.eq(2).text()).to.equal('R');
                    expect(title.eq(3).text()).to.equal('KIC (MPa √m)');
                    expect(title.eq(4).text()).to.equal('KC (MPa √m)');
                    expect(title.eq(5).text()).to.equal('Paris Constant c');
                    expect(title.eq(6).text()).to.equal('Paris Constant n');
                });
                FractureMechanics.getValuesInPropertyTable().then((value) => {
                    expect(value.eq(0).text()).to.equal('20');
                    expect(value.eq(1).text()).to.equal('L-T');
                    expect(value.eq(2).text()).to.equal('-');
                    expect(value.eq(3).text()).to.equal('76.1');
                    expect(value.eq(4).text()).to.equal('-');
                    expect(value.eq(5).text()).to.equal('-');
                });
                TabButtons.clickOnTheTabs('Fracture Mechanics');
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    ' Selected search criteria  (  Kic (MPa √m): 90 - 110 )  AND  (  Temperature: >100°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                CommonSearch.clearSearchFilters();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    ' Selected search criteria ',
                );
            },
        );
    },
);
