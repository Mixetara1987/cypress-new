import { Helpers } from '@/HelpersMethods/helpers';
import { color } from 'cypress/fixtures/color';
import { ModuleURLs } from 'cypress/fixtures/modules';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CreepData } from '@/CreepData/creepData';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { Formability } from '@/ExtendedRange/Formability';
import { FatigueDataDiagram } from '@/FatigueData/fatigueData-Diagram';
import { FatigueProperty } from '@/FatigueData/fatigueProperty';
import { ExtendedRangeSearchFilter } from '@/HelpersMethods/extendedRange';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { LoginPage } from '@/LoginPage/loginPage';

describe(
    'Smoke Test ( 59:00 min ), Fatigue Data search',
    {
        tags: ['@smoke', '@extendedRange', '@fatigueSearch'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.FatigueData);
        });

        const type = 0;
        it('Fatigue search-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), and temperature ranges', () => {
            const temperature_300_500 = 1;
            const temperature_100_300 = 2;
            const temperature_30_100 = 3;
            const temperature_0_30 = 4;
            const temperatureMinus_100_0 = 5;
            const temperatureMinus_100 = 6;

            TabButtons.colorOfSelectedMainTab('Fatigue Data').then(
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
                'Mean Stress (MPa)',
            ];
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
            // Standard, Type ,Material group ddl is selected all by default
            JointsSearch.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(1).text()).to.contain('All');
                expect(status.eq(2).text()).to.contain('All');
                expect(status.eq(3).text()).to.contain('All');
            });
            // Heat Treatment, Form, Type ddl is selected all by default
            ConditionSelectorHeaders.getSelectedOptionDdlFatigue().then(
                (status) => {
                    expect(status.eq(0).text()).to.contain('All');
                },
            );
            ConditionSelectorHeaders.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            Thermometer.getTemperature(temperature_300_500).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperature_100_300).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperature_30_100).should('be.checked');
            Thermometer.getTemperature(temperature_0_30).should('be.checked');
            Thermometer.getTemperature(temperatureMinus_100_0).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperatureMinus_100).should(
                'be.checked',
            );
            // });
            // it(
            //     'Fatigue search-choose from Type-Cyclic Stress-Strain Diagrams, direct dala-On, perform the search, list of results should be more than 2000, click on 1st material from the list(10CrMo9-10 B.S), it should lead you to Fatigue page/Strain life Parameters tab,' +
            //         'check if 1st condition is default one, check selected radiobutton,(display experimental data) and also check if button display cyclic curve is visible, finally if property table and diagram are displayed',
            //     () => {
            cy.step(
                'Fatigue search-choose from Type-Cyclic Stress-Strain Diagrams, direct dala-On, perform the search, list of results should be more than 2000, click on 1st material from the list(10CrMo9-10 B.S), it should lead you to Fatigue page/Strain life Parameters tab,' +
                    'check if 1st condition is default one, check selected radiobutton,(display experimental data) and also check if button display cyclic curve is visible, finally if property table and diagram are displayed',
            );

            ConditionSelectorDDLForms.clickOnOptionDDLOptionTwo(
                type,
                'Cyclic Stress-Strain Diagrams',
            );
            Sliders.clickOnDirectDataOnlySlider();
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Type: Cyclic Stress-Strain Diagrams )  AND  (  Temperature: > 500°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
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
            ListOfMaterials.findMaterialNamePagination('10CrMo9-10');
            ConditionSelectorHeaders.getTitle().should('equal', 'Fatigue Data');
            TabButtons.colorOfSelectedTabButton(
                'Strain Life Parameters',
            ).should('have.css', 'background-color', color.orangeLight);
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            cy.scrollTo('center');
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'include',
                'ProductPipesExperimentTotal strain control;',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display experimental data ',
            ).should('be.checked');
            FatigueDataDiagram.isRadioButtonVisible(
                ' display cyclic curve ',
            ).should('be.visible');
            FatigueProperty.getValuesInPropertyTable().then((property) => {
                expect(property.eq(0).text()).to.equal(
                    'Cyclic Yield Strength σy´ (MPa)',
                );
                expect(property.eq(1).text()).to.equal(
                    'Cyclic strain exponent n´',
                );
                expect(property.eq(2).text()).to.equal(
                    'Cyclic strength coefficient K´ (MPa)',
                );
                expect(property.eq(3).text()).to.equal(
                    'Fatigue Strength Coefficient, σf (MPa)',
                );
                expect(property.eq(4).text()).to.equal(
                    'Fatigue Strength Exponent, b',
                );
                expect(property.eq(5).text()).to.equal(
                    'Fatigue ductility coefficient εf´',
                );
                expect(property.eq(6).text()).to.equal(
                    'Fatigue ductility exponent c',
                );
            });
            PropertyTable.findAndGetExemptionByName('338');
            Formability.diagramAndTableDataExist().should('exist');
            //     },
            // );
            // it(
            //     'Fatigue search-turn back to Fatigue search page, clear Type ddl, choose- Strain Life Parameters, perform the search again, click on the 1st material from the list (10CrMo9-10 B.S),' +
            //         'it should lead you to Strain Life Parameters tab, check defaulted radio button, then switch to rest of all and check if diagram and table with are changed',
            //     () => {
            cy.step(
                'Fatigue search-turn back to Fatigue search page, clear Type ddl, choose- Strain Life Parameters, perform the search again, click on the 1st material from the list (10CrMo9-10 B.S),' +
                    'it should lead you to Strain Life Parameters tab, check defaulted radio button, then switch to rest of all and check if diagram and table with are changed',
            );

            TabButtons.clickOnTheTabs('Fatigue Data');
            cy.wait(1000);
            ExtendedRangeSearchFilter.getSelectedTextinDDL(3).should(
                'equal',
                'Cyclic Stress-Strain Diagrams',
            );
            ConditionSelectorDDLForms.clearDDl(3);
            cy.wait(1400);
            ConditionSelectorDDLForms.clickOnOptionDDLOptionTwo(
                type,
                'Strain Life Parameters',
            );
            CommonSearch.clickSearchButton();
            ListOfMaterials.showingFirst2000Message().then((message) => {
                expect(message).to.contain('List of results too large');
            });
            cy.wait(3500);
            // ListOfMaterials.clickOnMaterialInList(0);
            ListOfMaterials.findMaterialNamePagination('10CrMo9-10');
            cy.wait(3000);
            TabButtons.colorOfSelectedTabButton(
                'Strain Life Parameters',
            ).should('have.css', 'background-color', color.orangeLight);
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            cy.wait(4000);
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'contain',
                'data and coefficients recalculated and refitted by Key to Metals AG.',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display experimental data ',
            ).should('be.checked');
            FatigueDataDiagram.getTableHeader().should(
                'eq',
                'Cycles to failure, NfStrain Amplitude',
            );
            FatigueDataDiagram.getTableValues(1, 0).should('eq', '2870');
            FatigueDataDiagram.clickOnRadioButtonDisplay(
                ' display cyclic curve ',
            );
            PropertyTableDiagram.checkForDiagramXY(
                'Strain (m/m)',
                'Stress (MPa)',
            );
            FatigueDataDiagram.getTableValues(1, 0).should('eq', '0.002');
            FatigueDataDiagram.clickOnRadioButtonDisplay(' display curve ');
            FatigueDataDiagram.getTableHeader().should(
                'eq',
                'Reversals to failure, 2NfStrain Amplitude',
            );
            PropertyTableDiagram.checkForDiagramXY(
                'Reversals to failure, 2Nf (log scale)',
                'Strain Amplitude (log scale)',
            );
            FatigueDataDiagram.getTableValues(1, 0).should('eq', '1E4');
            //     },
            // );
            // it(
            //     'Fatigue search-turn back again to Fatigue search page, choose now in Type-Stress Life Parameters, perform the search again' +
            //         'click on the 1st material from the list (10CrMo9-10 B.S), it should lead you to Stress Life Paramateres tab page.',
            //     () => {
            cy.step(
                'Fatigue search-turn back again to Fatigue search page, choose now in Type-Stress Life Parameters, perform the search again' +
                    'click on the 1st material from the list (10CrMo9-10 B.S), it should lead you to Stress Life Paramateres tab page.',
            );
            TabButtons.clickOnTheTabs('Fatigue Data');

            ExtendedRangeSearchFilter.getSelectedTextinDDL(3).should(
                'equal',
                'Strain Life Parameters',
            );
            ConditionSelectorDDLForms.clickOnOptionDDLOptionTwo(
                type,
                'Stress Life Parameters',
            );
            cy.wait(1000);
            CommonSearch.clickSearchButton();
            ListOfMaterials.showingFirst2000Message().then((message) => {
                expect(message).to.contain('List of results too large');
            });
            cy.wait(3500);
            // ListOfMaterials.clickOnMaterialInList(0);
            ListOfMaterials.findMaterialNamePagination('10CrMo9-10');
            cy.wait(2000);
            TabButtons.colorOfSelectedTabButton(
                'Stress Life Parameters',
            ).should('have.css', 'background-color', color.orangeLight);
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            cy.scrollTo('center');
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'contains',
                'Fatigue strength is obtained from strain-life data at long life',
            );
            FatigueProperty.getValuesInPropertyTable().then((property) => {
                expect(property.eq(0).text()).to.equal('Kt');
                expect(property.eq(1).text()).to.equal('Orientation');
                expect(property.eq(2).text()).to.equal('Specimen');
                expect(property.eq(3).text()).to.equal(
                    'Fatigue strength (MPa)',
                );
            });

            PropertyTable.findAndGetExemptionByName(
                'Chemically and electrolytically polished; Cylindrical; Diameter [mm]: 14; Gauge length [mm]: 20',
            );
            Formability.diagramAndTableDataExist().should('exist');
        });
        it(
            'Fatigue search-turn back to Fatigue search page, clear the search, choose from Material Group-Composites, perform the search, it should have 233 results,' +
                'click on the 1st material from the list(Biax-CH10-UP2 Proprietary), it should lead you to Fatigue page for this material, check text for selected condition and if property table and diagram are displayed',
            () => {
                cy.step(
                    'Fatigue search-turn back to Fatigue search page, clear the search, choose from Material Group-Composites, perform the search, it should have 233 results,' +
                        'click on the 1st material from the list(Biax-CH10-UP2 Proprietary), it should lead you to Fatigue page for this material, check text for selected condition and if property table and diagram are displayed',
                );
                TabButtons.clickOnTheTabs('Fatigue Data');
                cy.wait(1000);
                CommonSearch.clearSearchFilters();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
                CommonSearch.selectMaterialGroups([''], ['Composites']);
                cy.wait(1000);
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Composites )  AND  (  Temperature: > 500°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C) ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                cy.wait(1000);
                ListOfMaterials.getListOfResultsFound().then(
                    (listOfResults) => {
                        expect(listOfResults).to.contain('Result(s) found:');
                    },
                );
                // ListOfMaterials.clickOnMaterialInList(0);
                ListOfMaterials.findMaterialNamePagination('Biax-CH10-UP2');
                cy.wait(1000);
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'contains',
                    'ProductLaminate; Thickness (mm): 5.56; Width (mm): 25; RTM',
                );
                // removed - Product Backlog Item 17593
                // FatigueProperty.getValuesInPropertyTable().then((property) => {
                //     expect(property.eq(0).text()).to.equal('Stress Ratio');
                //     expect(property.eq(1).text()).to.equal('Frequency (Hz)');
                //     expect(property.eq(2).text()).to.equal(
                //         'Fatigue strength (MPa)',
                //     );
                //     expect(property.eq(3).text()).to.equal('Number of cycles');
                // });
                // PropertyTable.findAndGetExemptionByName('1-1');
                Formability.diagramAndTableDataExist().should('exist');
            },
        );
        it(
            'Fatigue search-turn back to Fatigue search page, clear the search, choose from Material Group-Foams, perform the search, it should have 4 results,' +
                'click on the 1st material from the list(LNPO Stat-Kon Noryl FMC1010 Proprietary), it should lead you to Fatigue page for this material, check text for selected condition and if property table and diagram are displayed',
            () => {
                cy.step(
                    'Fatigue search-turn back to Fatigue search page, clear the search, choose from Material Group-Foams, perform the search, it should have 4 results,' +
                        'click on the 1st material from the list(LNPO Stat-Kon Noryl FMC1010 Proprietary), it should lead you to Fatigue page for this material, check text for selected condition and if property table and diagram are displayed',
                );
                TabButtons.clickOnTheTabs('Fatigue Data');
                cy.wait(1000);
                CommonSearch.clearSearchFilters();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
                CommonSearch.selectMaterialGroups([''], ['Foams']);
                cy.wait(1500);
                CommonSearch.clickSearchButton();
                cy.wait(1500);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Foams )  AND  (  Temperature: > 500°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C) ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                ListOfMaterials.getListOfResultsFound().then(
                    (listOfResults) => {
                        expect(listOfResults).to.contain('Result(s) found:');
                    },
                );
                // ListOfMaterials.clickOnMaterialInList(0);
                ListOfMaterials.findMaterialNamePagination(
                    'LNP Stat-Kon Noryl FMC1010',
                );
                cy.wait(1000);
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'contains',
                    'CommentData points derived from curves',
                );
                FatigueProperty.getValuesInPropertyTable().then((property) => {
                    expect(property.eq(0).text()).to.equal('Stress Ratio');
                    expect(property.eq(1).text()).to.equal('Frequency (Hz)');
                    expect(property.eq(2).text()).to.equal(
                        'Fatigue strength (MPa)',
                    );
                    expect(property.eq(3).text()).to.equal('Number of cycles');
                });
                PropertyTable.findAndGetExemptionByName('1E6');
                Formability.diagramAndTableDataExist().should('exist');
            },
        );
    },
);
