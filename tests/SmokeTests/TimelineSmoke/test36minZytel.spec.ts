import { LoginPage } from '@/LoginPage/loginPage';
import { Buttons } from '@/CommonMethods/Buttons';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CompositionPropertyTable } from '@/Composition/CompositionPropertyTable';
import { CorrosionConditionSelector } from '@/Corosion/corrosionConditionSelector';
import { CorrosionHome } from '@/Corosion/corrosionHome';
import { CreepData } from '@/CreepData/creepData';
import { EquivalentsFinder } from '@/EquivalentsFinder/equivalentsFinderHome';
import { Exporter } from '@/Exporter/Exporter';
import { Formability } from '@/ExtendedRange/Formability';
import { StressStrain } from '@/ExtendedRange/StressStrain';
import { FatigueDataConditionSelector } from '@/FatigueData/FatigueData-ConditionSelector';
import { Similar } from '@/Helpers/Similar';
import { ConditionSelectorSyntheticView } from '@/HelpersMethods/conditionSelectorSyntheticView';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { ComplianceAssessor } from '@/MaterialConsole/compilanceAssessor';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { color } from 'cypress/fixtures/color';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke test 36 min, material-Zytel 101 NC010 (Proprietary), checking functionality on most pages from Right Menu(Mechanical, Physical, Fatigue, SS, Joints, Corrosion..)',
    { tags: ['@smoke', '@rightMenu'] },
    () => {
        beforeEach(
            'Log in user, save local storage and save session storage, ',
            () => {
                LoginPage.loginUser(
                    Cypress.env('environmentLoginUrl'),
                    Cypress.env('username'),
                    Cypress.env('password'),
                );
                Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
                CommonSearch.enterMaterialDesignation('Zytel 101');
                CommonSearch.clickSearchButton();
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    'Zytel 101 NC010',
                );
            },
        );
        const temperature_0 = 4;
        const temperature_100_300 = 2;
        const temperature_30_100 = 3;
        const temperature_0_30 = 4;
        const all = 0;

        it(
            'Home page-click on the 1st material from the list(Zytel 101 NC010 (Proprietary)), it should lead you to Mechanical Properties page by default,' +
                'switch to Details view, click on linked message `View diagram` for Impact Strength, a diagram should appear,' +
                ' close the diagram. Select all conditions from condition list, select temperature range < 0°C,' +
                'unselect all conditions, property table should disappear. Select again all conditions, property table should appear now',
            () => {
                RightMenu.colorORightMenuModuleLinks(
                    ' Mechanical Properties ',
                ).should('have.css', 'background-color', color.seablue);
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
                const expectedTitles = [
                    'State',
                    'Form',
                    'Dimensions',
                    'Property',
                ];
                CorrosionHome.getTitlesForDDLists().then((currentTitles) => {
                    cy.Compare_Arrays(currentTitles, expectedTitles);
                });
                // check list of conditions and check if 1st is selected by default
                ConditionsSelectorDetailsView.getNumbersOfConditions().should(
                    'eq',
                    'Conditions (3/3)',
                );
                Exporter.getDefaultConditionInExporter(0).then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.includes(
                            'Available at: www.celanese.com, visited 2023',
                        );
                    },
                );
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    11,
                );
                // click on linked message `View diagram` for Impact Strength, a diagram should appear
                PropertyTable.clickOnViewDiagramLink('Impact Strength');
                PropertyTableDiagram.getDiagramName().should(
                    'contain',
                    'Impact Strength',
                );
                PropertyTableDiagram.getHeaderTextInPointTable().should(
                    'eq',
                    'Temperature (°C)Impact Strength (kJ/m²)',
                );
                // close the diagram
                PropertyTableDiagram.closeDiagram();
                PropertyTableDiagram.visibilityOfDiagram().should('not.exist');
                // select all conditions from condition list
                ConditionsSelectorDetailsView.clickOnCheckboxAllCondition();
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    28,
                );
                // select temperature range < 0°C

                Thermometer.clickOnTemperature(temperature_0);
                Thermometer.getTemperature(temperature_0).should('be.checked');
                // unselect all conditions, property table should disappear
                ConditionsSelectorDetailsView.clickOnCheckboxAllCondition();
                PropertyTable.isPropertyTablevisible().should('be.hidden');
                // select again all conditions, property table should appear now
                ConditionsSelectorDetailsView.clickOnCheckboxAllCondition();
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    35,
                );
            },
        );
        it(
            'Zytel 101 NC010 (Proprietary)-click on Physical Properties Material tab, to go to Physical click on view details link "Permeability 12 — 45 cm³/(m²·day·bar)"' +
                'in property table and check DDL "Property", clear the Property dropdown',
            () => {
                MaterialDetails.clickOnPhysicalPropertiesTab();
                RightMenu.colorORightMenuModuleLinks(
                    ' Physical Properties ',
                ).should('have.css', 'background-color', color.seablue);
                // click on view details link "Permeability 12 — 45 cm³/(m²·day·bar)" in property table and check DDL "Property"
                ConditionSelectorSyntheticView.clickOnViewDetailsLink(
                    ' Permeability ',
                );
                ConditionSelectorDDLForms.getSelectedOptionInDDL(
                    'Property',
                ).should('contain', 'Permeability');
                ConditionSelectorHeaders.getNumbersOfConditions().should(
                    'eq',
                    'Conditions (1/18)',
                );
                // clear the Property dropdown
                TabButtons.colorOfSelectedTabButton('General').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                PropertyTable.getTextInHeaders().should(
                    'deep.include',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
                ConditionSelectorDDLForms.clickOnClearOptionDDL('Property');
                ConditionSelectorDDLForms.getPreselectedoptionAlll(
                    'Property',
                ).should('not.contain', 'Permeability');
                ConditionSelectorHeaders.getNumbersOfConditions().should(
                    'eq',
                    'Conditions (8/18)',
                );
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)Physical-switch to Thermal property group tab,' +
                //         '1st condition should be selected by default and property table should be displayed for selected condition.' +
                //         'Check data in property table. Unselect default condition, property table shod disappear. Select all conditions condition, property table shod appear',
                //     () => {
                cy.scrollTo('top');
                cy.wait(1000);
                // ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
                TabButtons.clickOnTab(' Thermal ');
                TabButtons.colorOfSelectedTabButton('Thermal').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                ConditionSelectorHeaders.getNumbersOfConditions().should(
                    'eq',
                    'Conditions (8/18)',
                );
                PropertyTable.getTextInHeaders().should(
                    'deep.include',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
                Exporter.getDefaultConditionInExporter(0).then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.include(
                            'Thickness: (mm): 0.75',
                        );
                    },
                );
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    3,
                );
                PropertyTable.getTextInGreyGridPropertyTable(0).then(
                    (properties) => {
                        expect(properties.text()).to.include(
                            'Thickness: (mm): 0.75',
                        );
                    },
                );
                // unselect default condition, property table shod disappear'
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(0);
                cy.wait(1000);
                PropertyTable.isPropertyTablevisible().should('not.be.visible');
                // select all conditions condition, property table shod appear
                ConditionsSelectorDetailsView.clickOnCheckboxAllCondition();
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    23,
                );
                //     },
                // );
                // it('Zytel 101 NC010 (Proprietary)Thermal-switch to Flammability property group tab, 1st condition should be selected by default and property table should be displayed for selected condition. Unselect default condition, property table should disappear. Select all conditions condition, property table shod appear.', () => {
                cy.wait(1000);
                TabButtons.clickOnTab('Flammability ');
                TabButtons.colorOfSelectedTabButton('Flammability').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                ConditionSelectorHeaders.getNumbersOfConditions().should(
                    'eq',
                    'Conditions (8/18)',
                );
                PropertyTable.getTextInHeaders().should(
                    'deep.include',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
                // 1st condition should be selected by default and property table should be displayed for selected condition
                Exporter.getDefaultConditionInExporter(0).then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.include('As received');
                    },
                );
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    2,
                );
                PropertyTable.getTextInGreyGridPropertyTable(0).then(
                    (properties) => {
                        expect(properties.text()).to.include('As received');
                    },
                );
                // unselect default condition, property table should disappear
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(0);
                cy.wait(1000);
                PropertyTable.isPropertyTablevisible().should('be.hidden');
                // select all conditions condition, property table shod appear
                ConditionsSelectorDetailsView.clickOnCheckboxAllCondition();
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    14,
                );
                // });
                // it(
                //     'Zytel 101 NC010 (Proprietary)Flammability-switch to Electrical property group tab.' +
                //         '1st condition should be selected by default and property table should be displayed for selected condition,' +
                //         'select also and 2nd condition, data should encrease in property table',
                //     () => {
                cy.wait(1000);
                TabButtons.clickOnTab(' Electrical ');
                TabButtons.colorOfSelectedTabButton('Electrical').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                ConditionSelectorHeaders.getNumbersOfConditions().should(
                    'eq',
                    'Conditions (2/18)',
                );
                PropertyTable.getTextInHeaders().should(
                    'deep.include',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
                // 1st condition should be selected by default and property table should be displayed for selected condition
                Exporter.getDefaultConditionInExporter(0).then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.include(
                            'Cond.; Reference:',
                        );
                    },
                );
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    7,
                );
                PropertyTable.getTextInGreyGridPropertyTable(0).then(
                    (properties) => {
                        expect(properties.text()).to.include('Cond.Reference:');
                    },
                );
                // select also and 2nd condition, data should increase in property table
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(1);
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    17,
                );
                //     },
                // );
                // it('Zytel 101 NC010 (Proprietary)Electrical-switch to Rheological property group tab, check if data in property table are displayed', () => {
                cy.wait(1000);
                TabButtons.clickOnTab(' Rheological ');
                TabButtons.colorOfSelectedTabButton('Rheological').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                ConditionSelectorHeaders.getNumbersOfConditions().should(
                    'eq',
                    'Conditions (3/18)',
                );
                PropertyTable.getTextInHeaders().should(
                    'deep.include',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    1,
                );
                // });
                // it(
                //     'Zytel 101 NC010 (Proprietary)Rheological-switch to Optical property group tab.' +
                //         '1st condition should be selected by default and property table should be displayed for selected condition, check if data in property table are displayed',
                //     () => {
                cy.wait(1000);
                TabButtons.clickOnTab(' Optical ');
                TabButtons.colorOfSelectedTabButton('Optical').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                ConditionSelectorHeaders.getNumbersOfConditions().should(
                    'eq',
                    'Conditions (1/18)',
                );
                PropertyTable.getTextInHeaders().should(
                    'deep.include',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
                cy.wait(2000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    2,
                );
                // 1st condition should be selected by default and property table should be displayed for selected condition
                cy.wait(2000);
                Exporter.getDefaultConditionInExporter(0).then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.include('Films; Dry');
                    },
                );
                cy.wait(2000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    2,
                );
                cy.wait(2000);
                PropertyTable.getTextInGreyGridPropertyTable(0).then(
                    (properties) => {
                        expect(properties.text()).to.include('Films; Dry');
                    },
                );
            },
        );
        it(
            'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Manufactoring Processes to go to that page.' +
                'Check if the first condition is selected as default',
            () => {
                RightMenu.clickOnRightMenuPropertyByIndex(6);
                RightMenu.colorORightMenuModuleLinks(
                    ' Manufacturing Processes ',
                ).should('have.css', 'background-color', color.seablue);
                // Check if the first condition is selected as default
                Exporter.getDefaultConditionInExporter(0).then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.equal('Annealing');
                    },
                );
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Stress Strain to go to that page.' +
                //         'Check if 1st condition is selected by default, Zytel 101 NC010 (Proprietary)Stress Strain-scroll down the page' +
                //         'and check if the diagram and table with data are displayed. Switch to 3rd condition, change temperature to 121°C,' +
                //         'check if the diagram and data are changed.',
                //     () => {
                RightMenu.clickOnRightMenuPropertyByIndex(7);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinks(
                    ' Stress Strain Diagrams ',
                ).should('have.css', 'background-color', color.orange);
                // check if 1st condition is selected by default
                ConditionsSelectorDetailsView.getDefaultCondition();
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    ' Product 100% RH Experiment Tensile; Moisture content (%): 8.5 Comment Stress strain data originating from tensile testing',
                );
                // scroll down the page and check if the diagram and table with data are displayed
                cy.scrollTo('bottom');
                Formability.diagramAndTableDataExist().should('exist');
                // switch to 3rd condition
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                    2,
                ).should('have.class', 'table-cell-radio');
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    ' Product 50% RH Experiment Tensile; Test Method: ASTM D 638 Comment Stress strain data originating from tensile testing',
                );
                // change temperature to 121°C, check if the diagram and data are changed
                cy.wait(1000);
                PropertyTable.getTableValues('0.0042');
                PropertyTable.getTableValues('7.27');
                ConditionSelectorDDLForms.clickOnTemperatureFilter('121°C');
                PropertyTable.getTableValues('0.0127');
                PropertyTable.getTableValues('4.36');
                Formability.diagramAndTableDataExist().should('exist');
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Fatigue to go to that page, check for default temperatures,' +
                //         'check also if reference tree and dropdown filters are visible. Check if the first condition is selected as default.' +
                //         'Scroll down the page and check if the diagram and table with data are displayed',
                //     () => {
                RightMenu.clickOnRightMenuPropertyByIndex(8);
                RightMenu.colorORightMenuModuleLinks(' Fatigue Data ').should(
                    'have.css',
                    'background-color',
                    color.orange,
                );
                // check for default temperatures,check also if reference tree and dropdown filters are visible

                Thermometer.getTemperature(temperature_100_300).should(
                    'be.checked',
                );
                Thermometer.getTemperature(temperature_30_100).should(
                    'be.checked',
                );
                Thermometer.getTemperature(temperature_0_30).should(
                    'be.checked',
                );
                StressStrain.checkbox(all).should(
                    'have.class',
                    'jqx-checkbox-check-checked',
                );
                const expectedTitlesSS = [
                    'Heat Treatment / Material Processing',
                    'Cond.',
                    'DAM',
                    'Dimension',
                    'Loading Condition',
                    'Stress Ratio',
                    'Comment',
                ];
                CorrosionHome.getTitlesForDDLists().then((currentTitles) => {
                    cy.Compare_Arrays(currentTitles, expectedTitlesSS);
                });
                // Check if the first condition is selected as default
                Exporter.getDefaultConditionInExporter(0).then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.equal(
                            'Product: Cond.; <30% RHExperiment: Axial; Alternating tension-compression; Frequency: 30 Hz; Test temperature: 66 °C',
                        );
                    },
                );
                FatigueDataConditionSelector.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                // scroll down the page and check if the diagram and table with data are displayed
                cy.scrollTo('bottom');
                Formability.diagramAndTableDataExist().should('exist');
            },
        );
        it(
            'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Creep Data to go to that page, check if property table is visible, then switch to Isochronous Stress-Strain page,' +
                'click on only material in the list, Zytel 101L NC010 Proprietary, it should lead you to Creep DataIsochronous page, click on the 1st linked `View diagram` for 23 °C, it should open a diagram',
            () => {
                RightMenu.clickOnRightMenuPropertyByIndex(9);
                RightMenu.colorORightMenuModuleLinks(' Creep Data ').should(
                    'have.css',
                    'background-color',
                    color.orange,
                );
                // check if property table is visible
                CreepData.colorOfSelectedTabButton().should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                PropertyTable.getTextInHeaders().should(
                    'eq',
                    ' Property  Value  Note  Test Method ',
                );
                CreepData.getPropertiesInGreyRow().should(
                    'contain',
                    'Tensile Creep Modulus (GPa) ',
                );
                TabButtons.clickOnTab(`Isochronous Stress-Strain`);
                TabButtons.colorOfSelectedTabButton(
                    'Isochronous Stress-Strain',
                ).should('have.css', 'background-color', color.orangeLight);
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    'Zytel 101 NC010',
                );
                PropertyTable.getTextInHeaders().should(
                    'eq',
                    ' Property  Value  Note  Test Method ',
                );
                PropertyTableDiagram.clickOnDiagramByName('23 °C; Cond.');
                PropertyTableDiagram.getDiagramName().should(
                    'equal',
                    'Isochronous stress-strain',
                );
                PropertyTableDiagram.closeDiagram();
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Corrosion to go to that page, check for default temperatures,' +
                //         'check also if reference tree and dropdown filters are visible. Check if the first condition is selected as default.',
                //     () => {
                RightMenu.clickOnRightMenuPropertyByIndex(12);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinks(' Corrosion ').should(
                    'have.css',
                    'background-color',
                    color.beige,
                );
                // check for default temperatures,check also if reference tree and dropdown filters are visible
                // const temperature_100_300 = 2;
                // const temperature_30_100 = 3;
                const temperature_30 = 4;
                Thermometer.getTemperature(temperature_100_300).should(
                    'be.checked',
                );
                Thermometer.getTemperature(temperature_30_100).should(
                    'be.checked',
                );
                Thermometer.getTemperature(temperature_30).should('be.checked');
                CorrosionConditionSelector.getTitlesInCascadeFilters().then(
                    (title) => {
                        expect(title.eq(0).text()).to.be.equal(
                            'Beverages and Food',
                        );
                        expect(title.eq(1).text()).to.be.equal('Inorganic');
                        expect(title.eq(2).text()).to.be.equal('Mixtures');
                        expect(title.eq(3).text()).to.be.equal('Organic');
                        expect(title.eq(4).text()).to.be.equal('Other');
                    },
                );
                const expectedTitlesThermo = [
                    'Concentration',
                    'Property',
                    'Corrosion Type',
                    'Test Method',
                    'Diagram',
                ];
                CorrosionHome.getTitlesOnHomePageForTemperatureAndMedium().should(
                    'deep.equal',
                    ['Temperature', 'Medium'],
                );
                CorrosionHome.getTitlesForDDLists().then((currentTitles) => {
                    cy.Compare_Arrays(currentTitles, expectedTitlesThermo);
                });
                // check if the first condition is selected as default
                Exporter.getDefaultConditionInExporter(0).then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.contains(
                            'Oleic acid and 50% Olive oil;',
                        );
                    },
                );
                FatigueDataConditionSelector.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.brown,
                );
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)Corrosion-check property table for default selected condition. Switch to 6th condition, check property table for selected condition.' +
                //         'Then scroll to top of the page and choose Corrosion Resistance from Property ddl, it should switch from selected 6th condition to 1st one',
                //     () => {
                PropertyTable.getTextInHeaders().should(
                    'eq',
                    ' Property  Value  Unit  Note ',
                );
                PropertyTable.getPropertyValuesInTableRow(
                    'Possibly resistant ',
                );
                // switch to 6th condition
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                    5,
                ).should('have.class', 'table-cell-radio');
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.golden,
                );
                Exporter.getTextForSelectedConditionExporter(5).should(
                    'include',
                    'Medium: Acetic acid; Aqueous solution',
                );
                // check property table for selected condition
                PropertyTable.getTextInHeaders().should(
                    'eq',
                    ' Property  Value  Unit  Note ',
                );
                cy.wait(2000);
                PropertyTable.getPropertyValuesInTableRow('≥ 1.5 ');
                // scroll to top of the page and choose Corrosion Resistance from Property ddl
                const property = 2;
                cy.scrollTo('top');
                ConditionSelectorDDLForms.clickOnOptionDDL(
                    property,
                    'Corrosion Resistance',
                );
                ConditionSelectorDDLForms.getSelectedOptionInDDL(
                    'Property',
                ).should('contains', 'Corrosion Resistance');
                cy.wait(1000);
                PropertyTable.getPropertyValuesInTableRow(
                    'Possibly resistant ',
                );
            },
        );
        it(
            'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Ageing to go to that page,' +
                'check if Time-Temperature is selected by default, check list of similar materials for Ageing, it should be displayed only one.' +
                'Click on the material from the list(Zytel NC010) it should lead you his Ageing page, Time-Temperature tab should be defaulted.' +
                'Check for condition filters, if they are displayed, check if the first condition is selected as default. Scroll down the page,' +
                'check if property table with diagram link are displayed, click on the diagram link,it should open a diagram with table data. Close the diagram.' +
                ' Choose 170(°C)6th from the list od conditions.scroll down the page, check if property table with diagram link are displayed,' +
                'click on the diagram link,it should open a diagram with table data. close the diagram.check if the Fluid Ageing tab is disabled.',
            () => {
                RightMenu.clickOnRightMenuPropertyByIndex(13);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinks(' Ageing ').should(
                    'have.css',
                    'background-color',
                    color.beige,
                );
                // check if Time-Temperature is selected by default, check list of similar materials for Ageing, it should be displayed only one
                TabButtons.colorOfSelectedTabButton(
                    'Time-Temperature dependency',
                ).should('have.css', 'background-color', color.golden);
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Equivalence category');
                });
                ListOfMaterials.getListOfResultsFound().then(
                    (listOfResults) => {
                        expect(listOfResults).to.equal('Result(s) found: 1');
                    },
                );
                ListOfMaterials.getRowByMaterialAndStandard(
                    'Zytel 101L NC010',
                    'PROPRIETARY',
                )
                    .invoke('text')
                    .should('contain', 'Zytel 101L NC010')
                    .and('contain', 'PROPRIETARY')
                    .and('contain', 'Celanese Corporation')
                    .and('contain', 'Implicit');
                // click on the material from the list(Zytel NC010) it should lead you his Ageing page, Time-Temperature tab should be defaulted
                TabButtons.colorOfSelectedTabButton(
                    'Time-Temperature dependency',
                ).should('have.css', 'background-color', color.golden);
                const defConditionFilters = [
                    'Exposure Time',
                    'Exposure Temperature',
                    'Heat Treatment',
                    'Form',
                ];
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                Similar.getTitleOfConditionFilters().should(
                    'deep.equal',
                    defConditionFilters,
                );
                // check for condition filters, if they are displayed
                // const defConditionFilters1 = [
                //     'Exposure Time',
                //     'Exposure Temperature',
                //     'Heat Treatment',
                //     'Form',
                // ];
                Similar.getTitleOfConditionFilters().should(
                    'deep.equal',
                    defConditionFilters,
                );
                // Zytel 101 NC010 (Proprietary)Ageing-check if the first condition is selected as default
                ConditionsSelectorDetailsView.getDefaultCondition().then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.equal(
                            'Temperature: 100 °C',
                        );
                    },
                );
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.golden,
                );
                // croll down the page, check if property table with diagram link are displayed, click on the diagram link,it should open a diagram with table data
                cy.scrollTo('bottom');
                const defaultpropertyTableColumnHeader = [
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
                            defaultpropertyTableColumnHeader,
                        );
                    },
                );
                PropertyTableDiagram.clickOnDiagramByName(
                    'Tensile Elongation (%) - Exposure Time (h)',
                );
                Formability.diagramAndTableDataExist().should('exist');
                // close the diagram
                PropertyTableDiagram.closeDiagram();
                PropertyTableDiagram.visibilityOfDiagram().should('not.exist');
                // choose 170(°C)6th from the list od conditions
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                    5,
                ).should('have.class', 'table-cell-radio');
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    'Temperature: 170 °C',
                );
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.golden,
                );
                // scroll down the page, check if property table with diagram link are displayed, click on the diagram link,it should open a diagram with table data
                cy.scrollTo('bottom');
                const defaultpropertyTableColumnHeader1 = [
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
                            defaultpropertyTableColumnHeader1,
                        );
                    },
                );
                PropertyTableDiagram.clickOnDiagramByName(
                    'Tensile Elongation (%) - Exposure Time (h)',
                );
                Formability.diagramAndTableDataExist().should('exist');
                // close the diagram
                PropertyTableDiagram.closeDiagram();
                PropertyTableDiagram.visibilityOfDiagram().should('not.exist');
                // check if the Fluid Ageing tab is disabled
                TabButtons.checkIfTabDisabled('Fluid Ageing').should(
                    'be.disabled',
                );
            },
        );
        it(
            'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Compliance to go to that page,' +
                'General tab should be selected by default.check if condition filters are displayed.',
            () => {
                RightMenu.clickOnRightMenuPropertyByIndex(16);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinksCompliance(
                    ' Compliance ',
                ).should('have.css', 'background-color', color.greenLight);
                // });
                // it('Zytel 101 NC010 (Proprietary)Compliance-General tab should be selected by default', () => {
                const defaultpropertyTableColumnHeadersOptionOne = [
                    'CRITERION',
                    'STATUS',
                    'NOTE',
                    '',
                ];
                TabButtons.colorOfSelectedTabButton('General').should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
                ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeadersOptionOne,
                    );
                });
                // check if condition filters are displayed'
                const defConditionFiltersComplience = [
                    'Criterion',
                    'Status',
                    'Country',
                    'According to',
                ];
                Similar.getTitleOfConditionFilters().should(
                    'deep.equal',
                    defConditionFiltersComplience,
                );
            },
        );
        it(
            'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Equivalents Finder to go to that page,' +
                'Mechanical Properties should be selected as default, select the "Rockwell Hardness (HR)", select the "Yield Strength (MPa)",' +
                'select the "Impact Strength (kJ/m²)", perform the search, it should show some results.clear the search, it should be functional.',
            () => {
                RightMenu.clickOnRightMenuPropertyByIndex(2);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinks(
                    ' Equivalents Finder ',
                ).should('have.css', 'background-color', color.seablue);
                // Mechanical Properties should be selected as default', () => {
                EquivalentsFinder.isPresentFormGroupMechanicalProperties().should(
                    'be.visible',
                );
                EquivalentsFinder.colorOfSelectedProperty().should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                // select the "Rockwell Hardness (HR)"', () => {
                EquivalentsFinder.clickOnPropertyCheckbox(
                    'Rockwell Hardness (HR)',
                );
                cy.wait(1000);
                EquivalentsFinder.getTextInselectedPropertiesTableOptionTwo(
                    0,
                ).should('eq', 'Rockwell Hardness (HR)');
                EquivalentsFinder.isPresentSelectedPropertiesTableWrapper().should(
                    'exist',
                );
                // select the "Yield Strength (MPa)"', () => {
                EquivalentsFinder.clickOnPropertyCheckbox(
                    'Yield Strength (MPa)',
                );
                cy.wait(1000);
                EquivalentsFinder.getTextInselectedPropertiesTableOptionTwo(
                    1,
                ).should('eq', 'Yield Strength (MPa)');
                EquivalentsFinder.isPresentSelectedPropertiesTableWrapper().should(
                    'exist',
                );
                // select the "Impact Strength (kJ/m²)"', () => {
                EquivalentsFinder.clickOnPropertyCheckbox(
                    'Impact Strength (kJ/m²)',
                );
                cy.wait(1000);
                EquivalentsFinder.getTextInselectedPropertiesTableOptionTwo(
                    2,
                ).should('eq', 'Impact Strength (kJ/m²)');
                EquivalentsFinder.isPresentSelectedPropertiesTableWrapper().should(
                    'exist',
                );
                // perform the search, it should show some results
                CommonSearch.clickSearchButton();
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                });
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                // clear the search, it should be functional
                CommonSearch.clearSearchFilters();
                EquivalentsFinder.isListPresent().should('not.exist');
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)Equivalents Finder-swtich to Chemical Composition, choose Chemical Composition from the list of properties,' +
                //         'perform the search, it should show more than 2000 results. Clear the search, it should be functional.',
                //     () => {
                Helpers.clickOnFilterOption(
                    'Properties',
                    [''],
                    ['Chemical Composition '],
                );
                EquivalentsFinder.colorOfSelectedProperty().should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                // choose Chemical Composition from the list of properties
                EquivalentsFinder.clickOnPropertyCheckbox(
                    'Chemical Composition',
                );
                // Exporter.checkChosenProperties(0).should(
                //     'have.css',
                //     'background-color',
                //     color.green,
                // );
                EquivalentsFinder.getTextInselectedPropertiesTable().should(
                    'eq',
                    'Chemical Composition',
                );
                EquivalentsFinder.isPresentSelectedPropertiesTableWrapper().should(
                    'exist',
                );
                // perform the search, it should show more than 2000 results
                CommonSearch.clickSearchButton();
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                });
                ListOfMaterials.showingFirst2000Message().then((message) => {
                    expect(message).to.contain('List of results too large');
                });
                // clear the search, it should be functional
                CommonSearch.clearSearchFilters();
                EquivalentsFinder.isListPresent().should('not.exist');
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)Equivalents Finder-swtich to Physical Properties, select the "Vicat Softening Temperature (°C)",' +
                //         'perform the search, it should show some results, select the "Coefficient of Linear Thermal Expansion (CLTE) Normal (10-6/°C))",' +
                //         'deselect "Vicat Softening Temperature (°C)". perform the search again, it should show some results',
                //     () => {
                Helpers.clickOnFilterOption(
                    'Properties',
                    [''],
                    ['Physical Properties'],
                );
                EquivalentsFinder.colorOfSelectedProperty().should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                // select the "Vicat Softening Temperature (°C)"
                EquivalentsFinder.clickOnPropertyCheckbox(
                    'Vicat Softening Temperature (°C)',
                );
                EquivalentsFinder.getTextInselectedPropertiesTable().should(
                    'eq',
                    'Vicat Softening Temperature (°C)',
                );
                EquivalentsFinder.isPresentSelectedPropertiesTableWrapper().should(
                    'exist',
                );
                // perform the search, it should show some results
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                });
                //  cy.wait(1000);
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                // select the "Coefficient of Linear Thermal Expansion (CLTE) Normal (10-6/°C))"
                EquivalentsFinder.clickOnPropertyCheckbox(
                    'Coefficient of Linear Thermal Expansion (CLTE) Normal (10-6/°C)',
                );
                EquivalentsFinder.getTextInselectedPropertiesTableOptionTwo(
                    1,
                ).should(
                    'eq',
                    'Coefficient of Linear Thermal Expansion (CLTE) Normal (10-6/°C)',
                );
                EquivalentsFinder.isPresentSelectedPropertiesTableWrapper().should(
                    'exist',
                );
                // deselect "Vicat Softening Temperature (°C)"
                cy.wait(1000);
                EquivalentsFinder.clickOnPropertyCheckbox(
                    'Vicat Softening Temperature (°C)',
                );
                EquivalentsFinder.isPresentSelectedPropertiesTableWrapper().then(
                    (propertiesTableWrapper) => {
                        expect(propertiesTableWrapper.length).to.be.equal(1);
                    },
                );
                // perform the search again, it should show some results
                CommonSearch.clickSearchButton();
                // cy.wait(2000);
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                });
                // cy.wait(1000);
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)-click on right menu on linked module Composition to go to that page,' +
                //         'Safety data Sheet should be selected by default, property table should be displayed also.',
                //     () => {
                RightMenu.clickOnRightMenuPropertyByIndex(3);
                RightMenu.colorORightMenuModuleLinks(' Composition ').should(
                    'have.css',
                    'background-color',
                    color.seablue,
                );
                // Safety data Sheet should be selected by default, property table should be displayed also
                const defaultpropertyTableColumnHeaders = [
                    'COMPONENT',
                    'VALUE',
                    'UNIT',
                    'NOTE',
                    'CAS NUMBER',
                ];
                TabButtons.colorOfSelectedTabButton(
                    'Safety Data Sheets',
                ).should('have.css', 'background-color', color.blue);
                ConditionSelectorHeaders.getHeaderValuesComposition().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );
                PropertyTable.getNumberOfVisiblePropertyRowsComposition().should(
                    'equal',
                    2,
                );
                //     },
                // );
                // it(
                //     'Zytel 101 NC010 (Proprietary)Composition/Safety data Sheet, click on linked component from property table "Polyramide 66"' +
                //         'it should lead you to Substances page for Polyramide, Inventiry Lists tab should be selected by default, check also if the property table is displayed.' +
                //         'Switch to Hazard tab, check also if the property table is displayed.turn back to Composition tab, check if property table is displayed.',
                //     () => {
                CompositionPropertyTable.clickOnCriteriaRowElement(
                    1,
                    0,
                    'Polyamide 66',
                );
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Substances',
                );
                MaterialInfo.findMaterialInfoType(' Substance Name ');
                MaterialInfo.findMaterialInfoValue('Polyamide 66');
                const defaultHeaders = ['Status', 'According to', ''];
                ComplianceAssessor.getColumnHeadersOptionThree().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(curentHeaders, defaultHeaders);
                    },
                );
                // Inventiry Lists tab should be selected by default, check also if the property table is displayed
                TabButtons.colorOfSelectedTabButton('Inventory Lists').should(
                    'have.css',
                    'background-color',
                    color.greenTab,
                );
                MaterialInfo.findMaterialInfoType(' Substance Name ');
                MaterialInfo.findMaterialInfoValue('Polyamide 66');
                ComplianceAssessor.getColumnHeadersOptionThree().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(curentHeaders, defaultHeaders);
                    },
                );
                // switch to Hazard tab, check also if the property table is displayed
                TabButtons.clickOnTab('Hazard');
                TabButtons.colorOfSelectedTabButton('Hazard').should(
                    'have.css',
                    'background-color',
                    color.greenTab,
                );
                ComplianceAssessor.getColumnHeadersOptionThree().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(curentHeaders, defaultHeaders);
                    },
                );
                // turn back to Composition tab
                Buttons.clickOnBackButton();
                TabButtons.colorOfSelectedTabButton(
                    'Safety Data Sheets',
                ).should('have.css', 'background-color', color.blue);
                // switch to USA State Regulation tab
                TabButtons.clickOnTab('USA State Regulation');
                TabButtons.colorOfSelectedTabButton(
                    'USA State Regulation',
                ).should('have.css', 'background-color', color.blue);
                // check if property table is displayed

                ConditionSelectorHeaders.getHeaderValuesComposition().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );
                PropertyTable.getNumberOfVisiblePropertyRowsComposition().should(
                    'equal',
                    3,
                );
            },
        );
    },
);
