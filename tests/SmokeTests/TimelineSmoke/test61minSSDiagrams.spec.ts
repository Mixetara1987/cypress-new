import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CreepData } from '@/CreepData/creepData';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { Formability } from '@/ExtendedRange/Formability';
import { ExtendedRangeSearchFilter } from '@/HelpersMethods/extendedRange';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';

describe(
    'Smoke Test ( 61:00 min ), Stress Strain Diagrams',
    {
        tags: ['@smoke', '@extendedRange', '@stressStrain'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(
            'Stress Strain search-Material group-Foams, Direct data only-ON, perform the search, it should show some results,' +
                'check also if in list of materials appears Foams in Classification column,' +
                'click on the 1st material in the list(Divinycell H100 Proprietary), it should lead you to Stress Strain page for that material',
            () => {
                ExtendedRangeSearchFilter.navigateTo('stress-strain');
                CommonSearch.selectMaterialGroups([''], ['Foams']);
                Sliders.clickOnDirectDataOnlySlider();
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Foams )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
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
                ListOfMaterials.getItemFromColumn(
                    'classification',
                    'Foams / Polymer Foams / Polyvinyl chloride and polyurethane (PVC+PUR)',
                );
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Stress-Strain Diagrams',
                );
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    'Divinycell H100',
                );
                //        },
                //    );
                //    it(
                //        'Check if the 1st condition is selected as default one, scroll down the page and check if diagram and table with data for selected condition are displayed,' +
                //            ' switch to 4th condition,scroll the page down and check if the diagram and table with data for selected condition(4th) is displayed',
                //        () => {
                cy.step(
                    'Check if the 1st condition is selected as default one, scroll down the page and check if diagram and table with data for selected condition are displayed,' +
                        ' switch to 4th condition,scroll the page down and check if the diagram and table with data for selected condition(4th) is displayed',
                );
                // check if the 1st condition is selected as default one
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    ' Experiment Compression Specimen Direction: in plane; Thickness: 25.4 mm; Length: 75 mm Comment Stress strain data originating from compression testing',
                );
                // scroll down the page and check if diagram and table with data for selected condition are displayed
                cy.scrollTo('bottom');
                Formability.diagramAndTableDataExist().should('exist');
                // switch to 4th condition
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                    3,
                ).should('have.class', 'table-cell-radio');
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    ' Experiment Tensile Specimen Direction: in plane; Thickness: 12.7 mm; Width: 25.4 mm; Length: 150 mm Comment Stress strain data originating from tensile testing',
                );
                // scroll the page down and check if the diagram and table with data for selected condition(4th) is displayed
                cy.scrollTo('bottom');
                Formability.diagramAndTableDataExist().should('exist');
                //        },
                //    );
                //    it(
                //        'Stress Strain Diagrams-turn back to Stress Strain search page, it should stayed direct data-ON, Material group-Foams,' +
                //            ' clear the selected value(Foams),from Material group ddl select Filler/Reinforcement, perform the search, it should show some results, check also if in list of materials appears Fibers in Classification column,' +
                //            ' click on the 1st material in the list(DIALEAD K63712 Proprietary), it should lead you to Stress Strain page for that material',
                //        () => {
                cy.step(
                    'Stress Strain Diagrams-turn back to Stress Strain search page, it should stayed direct data-ON, Material group-Foams,' +
                        ' clear the selected value(Foams),from Material group ddl select Filler/Reinforcement, perform the search, it should show some results, check also if in list of materials appears Fibers in Classification column,' +
                        ' click on the 1st material in the list(DIALEAD K63712 Proprietary), it should lead you to Stress Strain page for that material',
                );
                TabButtons.clickOnTheTabs('Stress Strain Diagrams');
                TabButtons.colorOfSelectedMainTab(
                    'Stress Strain Diagrams',
                ).then((backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                });
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Foams )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                // clear the selected value(Foams)
                cy.wait(1500);
                CommonSearch.clearMaterialGroup();
                cy.wait(3000);
                JointsSearch.getSelectedOptionInDdl().then((status) => {
                    expect(status.eq(3).text()).to.equal('-- All --');
                });
                // from Material group ddl select Filler/Reinforcement
                CommonSearch.selectMaterialGroups(
                    [''],
                    ['Filler/Reinforcement'],
                );
                JointsSearch.getSelectedOptionInDdl().then((status) => {
                    expect(status.eq(3).text()).to.equal(
                        'Filler/Reinforcement',
                    );
                });
                // perform the search, it should show some results;
                CommonSearch.clickSearchButton();
                cy.wait(1500);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Filler/Reinforcement )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
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
                ListOfMaterials.getItemFromColumn(
                    'classification',
                    'Filler/Reinforcement / Fiber/Fabric / Ceramic Fibers / Carbon (C)',
                );
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Stress-Strain Diagrams',
                );
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    'DIALEAD K63712',
                );
                //        },
                //    );
                //    it('Scroll the page down and check if the diagram and table with data are displayed for selected material(DIALEAD K63712 Proprietary)', () => {
                cy.step(
                    'Scroll the page down and check if the diagram and table with data are displayed for selected material(DIALEAD K63712 Proprietary)',
                );
                cy.wait(1000);
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    ' Experiment Tensile Comment Stress strain data originating from tensile testing',
                );
                cy.scrollTo('bottom');
                Formability.diagramAndTableDataExist().should('exist');
                //    });
                //    it(
                //        'Stress Strain Diagrams-turn back to Stress Strain search page, it should stayed direct data-ON, Material group-Filler/Reinforcement / Fiber/Fabric / Ceramic Fibers / Carbon (C),' +
                //            ' clear the selected value(Filler/Reinforcement / Fiber/Fabric / Ceramic Fibers / Carbon (C)), from Material group ddl select Composites, perform the search, it should show some results,' +
                //            'perform the search, it should show some results, check also if in list of materials appears Composites in Classification column,' +
                //            ' click on the 1st material in the list(470/438-1/2 Proprietary), it should lead you to Stress Strain page for that material,' +
                //            ' check if the 1st condition is selected as default one, change temperature to 71°C, check if the diagram and data are changed',
                //        () => {
                cy.step(
                    'Stress Strain Diagrams-turn back to Stress Strain search page, it should stayed direct data-ON, Material group-Filler/Reinforcement / Fiber/Fabric / Ceramic Fibers / Carbon (C),' +
                        ' clear the selected value(Filler/Reinforcement / Fiber/Fabric / Ceramic Fibers / Carbon (C)), from Material group ddl select Composites, perform the search, it should show some results,' +
                        'perform the search, it should show some results, check also if in list of materials appears Composites in Classification column,' +
                        ' click on the 1st material in the list(470/438-1/2 Proprietary), it should lead you to Stress Strain page for that material,' +
                        ' check if the 1st condition is selected as default one, change temperature to 71°C, check if the diagram and data are changed',
                );
                TabButtons.clickOnTheTabs('Stress Strain Diagrams');
                TabButtons.colorOfSelectedMainTab(
                    'Stress Strain Diagrams',
                ).then((backgroundColor) => {
                    expect(backgroundColor).to.equal(color.orange);
                });
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Filler/Reinforcement )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
                );
                // clear the selected value(Filler/Reinforcement / Fiber/Fabric / Ceramic Fibers / Carbon (C))
                cy.wait(1000);
                CommonSearch.clearMaterialGroup();
                cy.wait(2000);
                JointsSearch.getSelectedOptionInDdl().then((status) => {
                    expect(status.eq(3).text()).to.equal('-- All --');
                });
                // from Material group ddl select Composites
                CommonSearch.selectMaterialGroups([''], ['Composites']);
                JointsSearch.getSelectedOptionInDdl().then((status) => {
                    expect(status.eq(3).text()).to.equal('Composites');
                });
                // perform the search, it should show some results
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Composites )  AND  (  Temperature: > 900°C  OR  700 - 900°C  OR  500 - 700°C  OR  300 - 500°C  OR  100 - 300°C  OR  30 - 100°C  OR  0 - 30°C  OR  -100 - 0°C  OR  < -100°C)  AND  (  Direct data only )  ',
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
                ListOfMaterials.getItemFromColumn(
                    'classification',
                    'Composites / Reinforcement / Fiber reinforced / Glass fiberComposites / Matrix / Polymer matrix / EP',
                );
                cy.wait(1000);
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Stress-Strain Diagrams',
                );
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    '470/438-1/2',
                );
                //        },
                //    );
                //    it('Stress Strain Diagrams check if the 1st condition is selected as default one, change temperature to 71°C, check if the diagram and data are changed for material470/438-1/2 Proprietary)', () => {
                // check if the 1st condition is selected as default one
                cy.step(
                    'Stress Strain Diagrams check if the 1st condition is selected as default one, change temperature to 71°C, check if the diagram and data are changed for material470/438-1/2 Proprietary)',
                );
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    ' Product Molded Experiment Compression Comment Stress strain data originating from compression testing',
                );
                // scroll the page down and check if the diagram and table with data are displayed
                cy.scrollTo('bottom');
                Formability.diagramAndTableDataExist().should('exist');
                // change temperature to 71°C, check if the diagram and data are changed

                PropertyTable.getTableValues('0.0009');
                PropertyTable.getTableValues('20.88');
                ConditionSelectorDDLForms.clickOnTemperatureFilter('71°C');
                PropertyTable.getTableValues('0.0013');
                PropertyTable.getTableValues('13.95');
                Formability.diagramAndTableDataExist().should('exist');
            },
        );
    },
);
