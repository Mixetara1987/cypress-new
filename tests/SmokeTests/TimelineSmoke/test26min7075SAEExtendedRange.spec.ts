import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { ComparisonByAnalytics } from '@/ComparisonView/comparisonByAnalytics';
import { CorrosionHome } from '@/Corosion/corrosionHome';
import { CreepData } from '@/CreepData/creepData';
import { Formability } from '@/ExtendedRange/Formability';
import { StressStrain } from '@/ExtendedRange/StressStrain';
import { StressStrainDiagram } from '@/ExtendedRange/StressStrainDiagram';
import { Helpers } from '@/HelpersMethods/helpers';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { LoginPage } from '@/LoginPage/loginPage';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke test 26 min, material-7075 SAE, checking functionality on Extended Range pages from Right Menu(Fracture ,Stress Strain, Formability)',
    { tags: ['@smoke', '@extendedRange'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Home page-enter `7075 SAE` in Material designation search field and perform the search, some results should be shown, click on the material from the list(7075 (SAE)), it should lead you to Mechanical Properties page by default', () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            CommonSearch.enterMaterialDesignation('7075 SAE');
            CommonSearch.clickSearchButton();
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
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                '7075',
            );
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            // });
            // it(
            //     '7075 SAE -select Formability page, check for default temperatures,' +
            //         'check also if reference tree and dropdown filters are visible.High Strain Curves tab should be selected by default,' +
            //         'check list of conditions and if 1st condition is selected by default.scroll down the page and check if the diagram and table with data are displayed and check data for default condition, change for defaulted 250°C to 450°C' +
            //         'check data and the switch to 4th condition,  check data in table data next to diagram. change temperature to 450°C, check if the diagram and data are changed.',
            //     () => {
            //  cy.scrollTo('top');
            cy.step(
                '7075 SAE -select Formability page, check for default temperatures,' +
                    'check also if reference tree and dropdown filters are visible.High Strain Curves tab should be selected by default,' +
                    'check list of conditions and if 1st condition is selected by default.scroll down the page and check if the diagram and table with data are displayed and check data for default condition, change for defaulted 250°C to 450°C' +
                    'check data and the switch to 4th condition,  check data in table data next to diagram. change temperature to 450°C, check if the diagram and data are changed.',
            );
            RightMenu.clickOnRightMenuPropertyByIndex(10);
            cy.wait(1000);
            RightMenu.colorORightMenuModuleLinks(' Formability ').should(
                'have.css',
                'background-color',
                color.orange,
            );
            // check for default temperatures,check also if reference tree and dropdown filters are visible
            const temperature_400_600 = 3;
            const temperature_200_400 = 4;
            const all = 0;
            Thermometer.getTemperature(temperature_400_600).should(
                'be.checked',
            );
            Thermometer.getTemperature(temperature_200_400).should(
                'be.checked',
            );
            StressStrain.checkbox(all).should(
                'have.class',
                'jqx-checkbox-check-checked',
            );
            const expectedTitles = [
                'Heat Treatment / Material Processing',
                'Form',
                'Strain rate (1/s)',
            ];
            CorrosionHome.getTitlesForDDLists().then((currentTitles) => {
                cy.Compare_Arrays(currentTitles, expectedTitles);
            });
            // High Strain Curves tab should be selected by default, check list of conditions and if 1st condition is selected by default
            TabButtons.colorOfSelectedTabButton('High Strain Curves').should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            ConditionSelectorHeaders.getNumbersOfConditions().should(
                'eq',
                'Conditions (4/4)',
            );
            ConditionsSelectorDetailsView.getDefaultCondition();
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'equal',
                ' Experiment Strain Rate: (1/s): 0.05; Testing Type: Compression Comment Flow stress flow strain data originating from compression testing',
            );
            // scroll down the page and check if the diagram and table with data are displayed and check data for default condition
            cy.scrollTo('bottom');
            Formability.diagramAndTableDataExist().should('exist');
            PropertyTable.getTableValues('0.0014');
            PropertyTable.getTableValues('115');
            cy.wait(1000);
            // change temperature to 450°C, check if the diagram and data are changed
            ConditionSelectorDDLForms.clickOnTemperatureFilter('450°C');
            PropertyTable.getTableValues('0.0321');
            PropertyTable.getTableValues('61');
            Formability.diagramAndTableDataExist().should('exist');
            // switch to 4th condition, check data in table data next to diagram
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(3).should(
                'have.class',
                'table-cell-radio',
            );
            cy.wait(1000);
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            Formability.diagramAndTableDataExist().should('exist');
            PropertyTable.getTableValues('0.0025');
            PropertyTable.getTableValues('135');
            // change temperature to 450°C, check if the diagram and data are changed
            ConditionSelectorDDLForms.clickOnTemperatureFilter('450°C');
            PropertyTable.getTableValues('0.0133');
            PropertyTable.getTableValues('99');
            Formability.diagramAndTableDataExist().should('exist');
            //     },
            // );
            // it('7075 SAE Formability-turn back to High Strain Curves, choose in Strain rate ddl(0.1 - 1),check number of conditions and check if Strain rate is in range 0.1-1 in selected condition, and finally check if diagram is visible', () => {
            cy.step(
                '7075 SAE Formability-turn back to High Strain Curves, choose in Strain rate ddl(0.1 - 1),check number of conditions and check if Strain rate is in range 0.1-1 in selected condition, and finally check if diagram is visible',
            );
            TabButtons.clickOnTab(`High Strain Curves`);
            TabButtons.colorOfSelectedTabButton('High Strain Curves').should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            // choose in Strain rate ddl(0.1 - 1)
            cy.scrollTo('top');
            ConditionSelectorDDLForms.clickOnDDlFilters(
                'Strain rate (1/s)',
                '0.1 - 1',
            );
            ConditionSelectorDDLForms.getSelectedOptionInDDL(
                'Strain rate (1/s)',
            ).should('eq', '0.1 - 1');
            // check number of conditions and check text of selected one and also if diagram is visible
            ConditionSelectorHeaders.getNumbersOfConditions().should(
                'eq',
                'Conditions (1/4)',
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'contain',
                ' Experiment Strain Rate: (1/s): 0.5; Testing Type: Compression Comment Flow stress',
            );
            Formability.diagramAndTableDataExist().should('exist');
            // });
            // it(
            //     '7075 SAE Stress Strain Strain/True Stress Strain tab- choose 70th condition, check if diagram is displayed. Clear default temperature(29.6), enter new one:160.' +
            //         'Click on calculate,clear again temperature, then enter:`23` and click on calculate, and check pop out message',
            //     () => {
            cy.step(
                '7075 SAE Stress Strain Strain/True Stress Strain tab- choose 70th condition, check if diagram is displayed. Clear default temperature(29.6), enter new one:160.' +
                    'Click on calculate,clear again temperature, then enter:`23` and click on calculate, and check pop out message',
            );
            RightMenu.clickOnRightMenuPropertyByIndex(9);
            cy.wait(1000);
            RightMenu.colorORightMenuModuleLinks(
                ' Stress Strain Diagrams ',
            ).should('have.css', 'background-color', color.orange);
            ConditionsSelectorDetailsView.scrollDownConditios();
            cy.wait(1500);
            // ConditionsSelectorDetailsView.clickOnCheckboxCondition(12).should(
            //     'have.class',
            //     'table-cell-radio',
            // );
            ConditionsSelectorDetailsView.clickOnCheckboxConditionWithText(
                'Product: Solution heat treated and artificially aged (T6)' +
                    'Experiment: Tensile',
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'include',
                'Product Solution heat treated and artificially aged (T6) Experiment Tensile Comment',
            );
            Formability.diagramAndTableDataExist().should('exist');
            // clear default temperature(23.9), enter new one: 160
            PropertyTableDiagram.clickInTemperatureBox();
            PropertyTableDiagram.clearTemperature();
            PropertyTableDiagram.enterTemperature('160');
            // click on calculate
            PropertyTable.getTableValues('0.0005');
            PropertyTable.getTableValues('36');
            StressStrainDiagram.clickOnCalculate();
            cy.wait(1000);
            PropertyTable.getTableValues('0.0005');
            PropertyTable.getTableValues('36');
            Formability.diagramAndTableDataExist().should('exist');
            // clear again temperature, enter: 23
            PropertyTableDiagram.clickInTemperatureBox();
            PropertyTableDiagram.clearTemperature();
            PropertyTableDiagram.enterTemperature('23');
            // click on calculate, and check pop out message
            PropertyTable.getTableValues('0.0005');
            PropertyTable.getTableValues('29.99');
            StressStrainDiagram.clickOnCalculate();
            cy.wait(1500);
            ComparisonByAnalytics.getTextInPopup().then((alert) => {
                expect(alert).to.be.equal(
                    '× You have entered temperature that is outside of the given limits ',
                );
            });
            PropertyTable.getTableValues('0.0005');
            PropertyTable.getTableValues('29.99');
            Formability.diagramAndTableDataExist().should('exist');
            // });
            // it(
            //     '7075 SAE Stress Strain Strain/True Stress Strain tab-switch to Enineering Stress-Strain tab, scroll up page,' +
            //         'select in Heat Treatment-Solution heat treated and artificially aged (T6, T651), it should filter conditions and to turn back to True Stress-Strain tab,' +
            //         'check list of conditions and if 1st condition is selected by default, and also check if selected criteria appear in condition. Check if diagram is visible,',
            //     () => {
            StressStrain.clickOnTab('Engineering Stress-Strain');
            StressStrain.colorOfSelectedTab('Engineering Stress-Strain').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(
                        'rgb(255, 238, 223) none repeat scroll 0% 0% / auto padding-box border-box',
                    );
                },
            );
            // scroll up page, select in Heat Treatment-Solution heat treated and artificially aged (T6, T651)
            cy.scrollTo('top');
            cy.wait(1000);
            Helpers.clickOnFilterOption(
                'Heat Treatment / Material Processing',
                [''],
                ['Solution heat treated and artificially aged (T6, T651)'],
            );
            // check list of conditions and if 1st condition is selected by default and also if diagram is visible, now is True Stress Strain selected tab, daigram also should be visible
            ConditionSelectorHeaders.getNumbersOfConditions().should(
                'eq',
                'Conditions (2/72)',
            );
            ConditionsSelectorDetailsView.getDefaultCondition();
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            StressStrain.colorOfSelectedTab('True Stress-Strain').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(
                        'rgb(255, 238, 223) none repeat scroll 0% 0% / auto padding-box border-box',
                    );
                },
            );
            cy.wait(1400);
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'contain',
                ' Product Bars; Solution heat treated and artificially aged (T6, T651); Typical; rolled or cold-finished Experiment Tensile',
            );
            Formability.diagramAndTableDataExist().should('exist');
            //     },
            // );
            // it('7075 SAE Stress Strain Strain-switch to 2nd diagram, diagram also should be visible, check if the data in table and on diagram differ from Engineering tab, click on reset selected filters', () => {
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(1).should(
                'have.class',
                'table-cell-radio',
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'contain',
                ' Product Rolled bars, rods and shapes; Solution heat treated and artificially aged (T6, T651); Typical; Thickness <= 76.2 mm',
            );
            const expectedValuesOnX = [
                '0',
                '0.002',
                '0.004',
                '0.006',
                '0.008',
                '0.01',
                '0.012',
            ];
            const expectedValuesOnY = ['0', '100', '200', '300', '400', '500'];
            cy.wait(1000);
            PropertyTableDiagram.getActualValuesOnXexponent().should(
                'deep.equal',
                expectedValuesOnX,
            );
            PropertyTableDiagram.getActualValuesOnYexponent().should(
                'deep.equal',
                expectedValuesOnY,
            );
            PropertyTable.getTableValues('0.0005');
            PropertyTable.getTableValues('36');
            StressStrain.clickOnTab('Engineering Stress-Strain');
            StressStrain.colorOfSelectedTab('Engineering Stress-Strain').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(
                        'rgb(255, 238, 223) none repeat scroll 0% 0% / auto padding-box border-box',
                    );
                },
            );
            PropertyTableDiagram.getActualValuesOnXexponent().should(
                'deep.equal',
                expectedValuesOnX,
            );
            PropertyTableDiagram.getActualValuesOnYexponent().should(
                'deep.equal',
                expectedValuesOnY,
            );
            PropertyTable.getTableValues('0.0005');
            PropertyTable.getTableValues('35');
            // click on reset selected filters
            ConditionSelectorHeaders.clickOnReset();
            ConditionSelectorHeaders.getNumbersOfConditions().should(
                'eq',
                'Conditions (72/72)',
            );
        });
    },
);
