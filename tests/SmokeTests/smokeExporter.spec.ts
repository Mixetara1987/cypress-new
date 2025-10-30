import { Buttons } from '@/CommonMethods/Buttons';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Exporter } from '@/Exporter/Exporter';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { LoginPage } from '@/LoginPage/loginPage';
import { _1100_AA } from 'cypress/fixtures/materials';
import { color } from 'cypress/fixtures/color';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

const test_material = _1100_AA.id;

describe(
    `Smoke test, check Exporter for 1100 AA and Zytel NC010 Proprietary test Material ${_1100_AA.name}`,
    { tags: ['@smoke', '@exporter'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Go to Mechanical Properties page for material 1100 AA, click on eXport To CAx button, it should be functional, open solver ddl and check if all solvers are displayed and ordered', () => {
            const defaultSolverOrderedList = [
                'Abaqus',
                'ANSYS',
                'Ansys Electronics Desktop',
                'ANSYS Fluent Solid',
                'Autoform',
                'CATIA',
                'COLDFORM/FORGE',
                'COMSOL Multiphysics',
                'Deform',
                'Dynaform',
                'ESI Pam-Crash',
                'ESI PAM-STAMP',
                'ESI ProCAST',
                'Excel',
                'FEMAP',
                'Hyperform',
                'HyperWorks/Optistruct',
                'HyperWorks/Radioss',
                'Inventor Nastran (.nas)',
                'Inventor Nastran (.nasmat)',
                'LS-DYNA',
                'MSC Nastran',
                'nCode',
                'PTC Creo',
                'QForm',
                'Siemens NX',
                'Simufact',
                'SolidEdge',
                'SolidWorks',
                'Star CCM+ Solid',
                'XML',
            ];
            Helpers.totalMateriaNavigateTo(
                ModuleURLs.Material.MechanicalProperties,
                test_material,
            );
            MaterialInfo.getMaterialInfoFor('Material group').should(
                'contains',
                'Nonferrous Alloys / Aluminium',
            );
            Exporter.clickOnExporterButton();
            Exporter.checkIfExporterModalIsOpen().should('be.visible');
            ConditionSelectorHeaders.getSolverDdllistOptionTwo().then(
                (currentSolver) => {
                    cy.Compare_Arrays(currentSolver, defaultSolverOrderedList);
                },
            );
            // });
            // it('Choose Excel from the list, button for `Next step` should be disabled if there is none selected property, select all Properties, now `Next step` is enabled, then try to go throw every from 1-7th of 13 selected properties and try to select some condition, temperature, value etc..', () => {
            ConditionSelectorDDLForms.clickOnSolverInDdl('Excel');
            Exporter.getTextForSelectedSolver(0).should('equal', 'Excel');
            Exporter.checkNextStepButton().should('be.disabled');
            Exporter.clickOnCheckBoxForAllProperties();
            Exporter.checkChosenProperties(1).should(
                'have.css',
                'color',
                color.green,
            );
            Exporter.checkNextStepButton().should('be.enabled');
            Exporter.clikOnNextStepButton();
            cy.step(
                'check text for selected condition and title of title `Modulus of Elasticity` and subtitle `STEP 1/13`',
            );
            Exporter.getPropertyTitle().should(
                'equal',
                ' Modulus of Elasticity ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 1/13');
            Exporter.getDefaultConditionInExporter(0).then(
                (defaultCondition) => {
                    expect(defaultCondition).to.equal(
                        'Annealed (O); Reference: Properties of aluminum alloys: tensile, creep, and fatigue data at high and low temperatures / ed. by J. G. Kaufman / ASM International, Metals Park, Ohio / 1999',
                    );
                },
            );
            Exporter.colorOfSelectedCondition(0).should(
                'have.css',
                'color',
                color.green,
            );
            cy.step('Check if the property table is displayed');
            const defaultpropertyTableColumnHeaders = [
                '',
                'T(°C)',
                'VALUE',
                'UNIT',
                'NOTES',
            ];
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsExporter().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaders,
                    );
                },
            );
            cy.step(
                'click on 3rd row checkbox to select -28 and data for excel exporter file',
            );
            Exporter.clickOnCheckBox(2);
            Exporter.isCheckedPropertyInNextStepsModal(2);

            cy.step('go to next page for Poisson Coefficient');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should(
                'equal',
                ' Poisson Coefficient ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 2/13');
            cy.step(
                'Check if the property table is displayed for Poisson Coeffictinet',
            );
            const defaultpropertyTableColumnHeadersPoisson = [
                '',
                'T(°C)',
                'VALUE',
                'UNIT',
                'NOTES',
            ];
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsExporter().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeadersPoisson,
                    );
                },
            );
            cy.step(
                'click on 4th row checkbox to select 27 and data for excel exporter file',
            );
            Exporter.clickOnCheckBox(3);
            cy.step('go to next page for Density');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should('equal', ' Density ');
            Exporter.getPropertySubTitle().should('equal', ' STEP 3/13');
            cy.step('select 7th conditions and check data');
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(6).should(
                'have.class',
                'table-cell-radio',
            );
            cy.step(
                'click on only checkbox to select 20 °C data for excel exporter file',
            );
            Exporter.clickOnCheckBox(0);
            Exporter.isCheckedPropertyInNextStepsModal(0);
            cy.step('go to next page for Thermal Expansion');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should('equal', ' Thermal Expansion ');
            Exporter.getPropertySubTitle().should('equal', ' STEP 4/13');
            cy.step('select 2nd conditions and check data');
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(1).should(
                'have.class',
                'table-cell-radio',
            );
            Exporter.colorOfSelectedCondition(1).should(
                'have.css',
                'color',
                color.green,
            );
            cy.step(
                'click on 10th row checkbox to select 0 and for excel exporter file',
            );
            cy.wait(1000);
            Exporter.clickOnCheckBox(9);
            Exporter.isCheckedPropertyInNextStepsModal(9);
            cy.step('go to next page for Thermal Conductivity');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should(
                'equal',
                ' Thermal Conductivity ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 5/13');
            cy.step('select 4th conditions and check data');
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(3).should(
                'have.class',
                'table-cell-radio',
            );
            Exporter.colorOfSelectedCondition(3).should(
                'have.css',
                'color',
                color.green,
            );
            cy.step(
                'click on 1st row checkbox to select -269 and for excel exporter file',
            );
            Exporter.clickOnCheckBox(0);
            Exporter.isCheckedPropertyInNextStepsModal(0);
            cy.step('go to next page for Yield Strength, Rp0.2 / Rp');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should(
                'equal',
                ' Yield Strength, Rp0.2 / Rp ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 6/13');
            ConditionsSelectorDetailsView.checkNumbersOfConditionsInExporter().then(
                (numberOfConditions) => {
                    expect(numberOfConditions).to.be.equal(
                        'Conditions (69/69)',
                    );
                },
            );
            cy.step(
                'try search filter by typing `drawn tubes` in filter search box and click to search for results',
            );
            Exporter.enterCondition('drawn tubes');
            Buttons.clickSearchButtonOnExporter();
            ConditionsSelectorDetailsView.checkNumbersOfConditionsInExporter().then(
                (numberOfConditions) => {
                    expect(numberOfConditions).to.be.equal('Conditions (6/69)');
                },
            );
            cy.step('select 6th conditions and check data');
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(5).should(
                'have.class',
                'table-cell-radio',
            );
            Exporter.colorOfSelectedCondition(5).should(
                'have.css',
                'color',
                color.green,
            );
            cy.step(
                'click on 1st row checkbox to select ≥ 25 and for excel exporter file',
            );
            // Exporter.colorOfSelectedTemperature(0).should(
            //     'have.css',
            //     'color',
            //     color.gray,
            // );
            cy.step('go to next page for Tensile Strength');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should('equal', ' Tensile Strength ');
            Exporter.getPropertySubTitle().should('equal', ' STEP 7/13');
            cy.step(
                'scroll down in the list list of conditions and choose 84th from the list',
            );
            ConditionsSelectorDetailsView.checkNumbersOfConditionsInExporter().then(
                (numberOfConditions) => {
                    expect(numberOfConditions).to.be.equal(
                        'Conditions (84/84)',
                    );
                },
            );
            cy.wait(1800);
            ConditionsSelectorDetailsView.scrollDownConditios();
            cy.wait(3000);
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(13);
            Exporter.getTextForSelectedConditionExporter(13).should(
                'equal',
                'Wires; Strain-hardened - extra hard (H19); 0.15 <= t <= 1.60 mm; (t) - thickness; Reference: Tempers for Aluminum and Aluminum Alloy Products - Tan Sheets / The Aluminum Association / 2018',
            );
            Exporter.clickOnCheckBox(0);
            // });
            // it('Then try to go throw every from the 8th to 13th selected properties and try to select some condition, temperature, value etc..', () => {
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should(
                'equal',
                ' Elongation / Strain ',
            );
            cy.step(
                'click on 1st row checkbox to select ≥ 165 and for excel exporter file',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 8/13');
            cy.step(
                'try search filter by typing `bars` in filter search box and click to search for results, then clear the saerch, it should reset search results',
            );
            Exporter.enterCondition('bars');
            Buttons.clickSearchButtonOnExporter();
            ConditionsSelectorDetailsView.checkNumbersOfConditionsInExporter().then(
                (numberOfConditions) => {
                    expect(numberOfConditions).to.be.equal('Conditions (8/67)');
                },
            );
            cy.step('try CLear button');
            CommonSearch.clearSearchFilters();
            ConditionsSelectorDetailsView.checkNumbersOfConditionsInExporter().then(
                (numberOfConditions) => {
                    expect(numberOfConditions).to.be.equal(
                        'Conditions (67/67)',
                    );
                },
            );
            cy.step('select 8th conditions and check data');
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(7).should(
                'have.class',
                'table-cell-radio',
            );
            Exporter.colorOfSelectedCondition(7).should(
                'have.css',
                'color',
                color.green,
            );
            cy.step(
                'click on 5th row checkbox to select -100 and for excel exporter file',
            );
            // Exporter.colorOfSelectedTemperature(4).should(
            //     'have.css',
            //     'color',
            //     color.gray,
            // );
            cy.wait(1000);
            cy.step('go to next page for Chemical Composition');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should(
                'equal',
                ' Chemical Composition ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 9/13');
            cy.step('1st condition is selected by default');
            Exporter.getDefaultConditionInExporter(0).then(
                (defaultCondition) => {
                    expect(defaultCondition).to.equal(
                        'Aluminum Standards and Data Metric SI / The Aluminum Association / 2017',
                    );
                },
            );
            Exporter.colorOfSelectedCondition(0).should(
                'have.css',
                'color',
                color.green,
            );
            cy.step('check if property table is displayed beneath');
            const defaultpropertyTableColumnHeaderChemcialComposition = [
                'Criteria',
                'Value',
                'Note',
            ];
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsExporter().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaderChemcialComposition,
                    );
                },
            );
            cy.step('data should be inside the property table');
            PropertyTable.findAndGetExemptionByName('Be');
            PropertyTable.findAndGetExemptionByName('≤ 0.0003');
            PropertyTable.findAndGetExemptionByName(
                'For welding electrode and welding rode only',
            );
            cy.step('go to next page for Fatigue Strain Life parameters');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should(
                'equal',
                ' Fatigue Strain Life parameters ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 10/13');
            cy.step('check if property table is displayed beneath');
            const defaultpropertyTableColumnHeaderFatigue = ['Name', 'Value'];
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsExporter().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaderFatigue,
                    );
                },
            );
            cy.step('select 3rd conditions and check data');
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(2).should(
                'have.class',
                'table-cell-radio',
            );
            Exporter.colorOfSelectedCondition(2).should(
                'have.css',
                'color',
                color.green,
            );
            cy.step('data should be inside the property table');
            PropertyTable.findAndGetExemptionByName(
                'Cyclic strength coefficient K´',
            );
            PropertyTable.findAndGetExemptionByName('154');
            cy.step('go to next page for Fatigue Stress Life parameters');
            Exporter.clikOnNextStepButton();
            cy.wait(1000);
            Exporter.getPropertyTitle().should(
                'equal',
                ' Fatigue Stress Life parameters ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 11/13');
            cy.step('check if property table is displayed beneath');
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsExporter().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaderFatigue,
                    );
                },
            );
            cy.step('select 7th conditions and check data');
            cy.wait(1500);
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(6).should(
                'have.class',
                'table-cell-radio',
            );
            cy.step('data should be inside the property table');
            PropertyTable.findAndGetExemptionByName(
                '“Nf_max value for S-N diagram”',
            );
            PropertyTable.findAndGetExemptionByName('500000000');
            cy.step('go to next page for R factors');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should('equal', ' R factors ');
            Exporter.getPropertySubTitle().should('equal', ' STEP 12/13');
            cy.step('select 2nd conditions and check data');
            cy.wait(1800);
            Exporter.getTableHeader().should('equal', 'Plastic Strain Ratio');
            cy.wait(1000);
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(1).should(
                'have.class',
                'table-cell-radio',
            );
            Exporter.colorOfSelectedCondition(1).should(
                'have.css',
                'color',
                color.green,
            );
            cy.wait(1000);
            Exporter.getTableDetails(1).should('equal', 'r0');
            Exporter.getTableDetails(2).should('equal', ' 0.43 ');
            Exporter.clickOnCheckBox(1);

            cy.step('go to next page for Fatigue Stress Strain Diagrams');
            Exporter.clikOnNextStepButton();
            Exporter.getPropertyTitle().should(
                'equal',
                ' Stress Strain Diagrams ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 13/13');
            cy.step('select 3rd conditions and select 21,1°C');
            cy.wait(1000);
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(2).should(
                'have.class',
                'table-cell-radio',
            );
            Exporter.colorOfSelectedCondition(2).should(
                'have.css',
                'color',
                color.green,
            );
            Exporter.getTemperatureForStressStrain(3);

            cy.step('check if diagram is displayed');
            PropertyTableDiagram.getTitleOnX().should('equal', 'Strain (m/m)');
            PropertyTableDiagram.getTitleOnY().should('equal', 'Stress (MPa)');
            // });
            // it('Go to Export review page(final) page', () => {
            const defaultpropertyTableColumnHeadersFinalScreen = [
                'Name',
                'T',
                'Value',
                'Unit',
                'Note',
                '',
            ];
            cy.wait(1000);
            Exporter.clikOnNextStepButton();
            cy.wait(1000);
            Exporter.getPropertyTitle().should('equal', ' Export review ');
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsExporter().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeadersFinalScreen,
                    );
                },
            );
            cy.wait(1500);
            PropertyTable.findAndGetExemptionByName(
                '“K parameter for Stress-Strain calculation”',
            );
            PropertyTable.findAndGetExemptionByName('21.1 °C');
            PropertyTable.findAndGetExemptionByName('149.444690');
            PropertyTable.findAndGetExemptionByName(
                'Product: Bars; Annealed (O); Dimension: 1.905 mmExperiment: Tensile',
            );
            Exporter.clickOnClearButtonX(0, 5);
            Exporter.removeFromTheListBox().should('be.visible');
            cy.wait(500);
            Exporter.confirmationDialog().should(
                'equal',
                ' This will remove item from the list. Do you want to continue? ',
            );
            cy.wait(500);
            Exporter.clickYesButton();
            cy.wait(1000);
            PropertyTable.findAndGetExemptionByName(
                '“n parameter for Stress-Strain calculation”',
            );
            Exporter.clickOnBackButton();
            // });
            // it('Try functionality of going back and forward from one to another properties page, from 13th to 12th page, from 12th to 10th', () => {
            Buttons.clickOnButtonPrevious();
            cy.wait(1000);
            cy.step('from 13th to 12th page');
            Exporter.getPropertyTitle().should('equal', ' R factors ');
            Exporter.getPropertySubTitle().should('equal', ' STEP 12/13');
            Buttons.clickOnButtonPrevious();
            Buttons.clickOnButtonPrevious();
            cy.step('from 12th to 10th page');
            cy.wait(1000);
            Exporter.getPropertyTitle().should(
                'equal',
                ' Fatigue Strain Life parameters ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 10/13');
            // });
            // it('Try functionality of back button in the bottom left corner to also go back to previous page, it should lead you from  `STEP 10/13` to `STEP 09/13`', () => {
            Exporter.clickOnBackButton();
            Exporter.getPropertyTitle().should(
                'equal',
                ' Chemical Composition ',
            );
            Exporter.getPropertySubTitle().should('equal', ' STEP 9/13');
            // });
            // it('Try functionality of clicking on Solver name:Excel beneath the title Export to CAx-1100 AA on top left corner, it should return to Welcome page for Exporter', () => {
            Exporter.clickOnSolverName();
            Exporter.getWelcomeText().should(
                'equal',
                ' Welcome to eXporter! To get started, simply select the format you want to export to, and the wizard will guide you through the simple export set up process. ',
            );
        });
    },
);
