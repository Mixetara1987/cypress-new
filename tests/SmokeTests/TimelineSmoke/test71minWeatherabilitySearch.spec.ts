import { color } from 'cypress/fixtures/color';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { SelectedConditions } from '@/CommonMethods/selectedConditions';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CorrosionConditionSelector } from '@/Corosion/corrosionConditionSelector';
import { Ageing } from '@/Enviro/Ageing';
import { Weatherability } from '@/Enviro/Weatherability';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { LoginPage } from '@/LoginPage/loginPage';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';

describe(
    'Smoke Test ( 71:00 min ), Weatherabilty search',
    { tags: ['@smoke', '@enviro', '@weatherability'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            Weatherability.navigateWeatherabiltySearchPage();
        });

        it('Weatherability search-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear)', () => {
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Enviro Weatherability',
            );

            // Check if material designation field is visible
            CommonSearch.getMaterialDesignation().should('be.visible');
            // Check if Standard dropdown is visible
            CommonSearch.getStandardDDL().should('be.visible');
            // Check if Producer and Type field is visible
            CommonSearch.getMaterialTypeDDL().should('be.visible');
            CommonSearch.getProducer().should('be.visible');
            // Check if Material group ddl is visible
            CommonSearch.getMaterialGroupDDL().should('be.visible');
            // Check if Exposure Temperature  ddl is visible
            Ageing.visibleExposureTemperatureMediumConcentration().should(
                'exist',
            );
            // Check if Weatherability Type  ddl is visible
            Ageing.visibleExposureTemperatureMediumConcentration().should(
                'exist',
            );
            // Check titles for search filters
            cy.wait(1000);
            ConditionSelectorHeaders.getConditionFiltersTitles().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Material Designation');
                    expect(title.eq(1).text()).to.equal('Standard');
                    expect(title.eq(2).text()).to.equal('Producer');
                    expect(title.eq(3).text()).to.equal('Type');
                    expect(title.eq(4).text()).to.equal('Material group');
                },
            );
            ConditionSelectorHeaders.getTitleForExposureTemperature(
                'Exposure Temperature',
            ).should('equal', 'Exposure Temperature');
            ConditionSelectorHeaders.getTitleForExposureTemperature(
                'Weatherability Type',
            ).should('equal', 'Weatherability Type');

            // Verify if condition filter is selected "All" by default for Standard
            //CommonSearch.getStandardDDL()
            CommonSearch.getStandardDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "All" by default for Type
            //ConditionSelectorHeaders.getSelectedOptionInDdlDataPLusSearchType()
            CommonSearch.getMaterialTypeDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "All" by default for Material group
            // getMaterialGroupDDL()
            CommonSearch.getMaterialGroupDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "all" by default for Exposure Temperature
            Ageing.getSelectedOptionForExposureTemperature().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "all" by default for Weatherability Type
            Ageing.getSelectedOptionForExposureTemperature().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');
            // check if Direct Data only slider is visible
            Sliders.IsOnDirectDataOnlySliderVisible().should('exist');
        });
        it('Weatherability search-check for the functionality of DDL "Exposure Temperature" (Click on it and check for the list in it), it should contains-(<30°C, 30 - 100°C, 100 - 300°C, 300 - 500°C), check for the functionality of DDL "WEatherability Type" (Click on it and check for the list in it), it should contains-Atmospheric exposure, Exposure to Pollutans and UV exposure, choose Exposure to Pollutans', () => {
            const expectedListinExposureTemperature = [
                '< 30°C30 - 100°C100 - 300°C300 - 500°C',
            ];
            Weatherability.getItemsListInForWeatherabilityDDL(0, 0).then(
                (currentListOfTypeDDl) => {
                    cy.Compare_Arrays(
                        currentListOfTypeDDl,
                        expectedListinExposureTemperature,
                    );
                    cy.get('body').type('{esc}');
                },
            );

            // Weatherability search-check for the functionality of DDL "WEatherability Type" (Click on it and check for the list in it)
            // it should contains-Atmospheric exposure, Exposure to Pollutans and UV exposure, choose Exposure to Pollutans
            const expectedListWeatherabilityType = [
                'Atmospheric exposure',
                'Exposure to Pollutants',
                'UV exposure',
            ];

            Helpers.clickOnFilterOption(
                'Weatherability Type',
                [''],
                ['Exposure to Pollutants'],
            );

            CorrosionConditionSelector.getAllOptionsInDDOptionOne(
                1,
                'Weatherability Type',
            ).then((currentOptions) => {
                cy.Compare_Arrays(
                    currentOptions,
                    expectedListWeatherabilityType,
                );
            });

            // it('Weatherability search-turn Direct data to ON, and perform the search, it should be functional, it should show some results', () => {
            cy.step(
                'Weatherability search-turn Direct data to ON, and perform the search, it should be functional, it should show some results',
            );
            Sliders.clickOnDirectDataOnlySlider();
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Weatherability Type: Exposure to Pollutants )  AND  (  Direct data only )  ',
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
            // });
            // it('Weatherability search- click on the 1st material form list of materials(CELSTRAN PPS-CF50-02), it should lead you to Weatherability page for that material, check for this material if in Weatherability Type dropdown is selected-Exposure Pollutans and Verify data in "Condition :",should consist text "Exposure to Pollutans and finally check if data is visible in property table', () => {
            cy.step(
                'Weatherability search- click on the 1st material form list of materials(CELSTRAN PPS-CF50-02), it should lead you to Weatherability page for that material, check for this material if in Weatherability Type dropdown is selected-Exposure Pollutans and Verify data in "Condition :",should consist text "Exposure to Pollutans and finally check if data is visible in property table',
            );
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Weatherability',
            );
            TabButtons.colorOfSelectedMainTab('Weatherability').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.brownLight);
                },
            );
            // Weatherability search- check for this material if in Weatherability Type dropdown is selected-Exposure Pollutans and Verify data in "Condition :",should consist text "Exposure to Pollutans and finally check if data is visible in property table
            ConditionSelectorDDLForms.getSelectedOptionInDDL(
                'Weatherability Type',
            ).should('eq', 'Exposure to Pollutants');
            SelectedConditions.getAllTextInSelectedConditions().then(
                (textInSelectedConditions) => {
                    expect(textInSelectedConditions.eq(0).text()).to.include(
                        'Type: Exposure to Pollutants, 0.00005% Ozone; Time: 192 h; Temperature: 23 °C; Heat treatment: Cured, Cond., 30 min at 141°C',
                    );
                },
            );
            const defaultpropertyTableColumnHeaders = [
                ' Property ',
                ' T(°C) ',
                ' Value ',
                ' Unit ',
                ' Note ',
                '',
            ];
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaders,
                    );
                },
            );
            PropertyTable.findPropertyNameInTable(
                'Resistance to Ozone Cracking',
            );
            PropertyTable.findNoteInTable('at 20% StrainCracked');
        });
    },
);
