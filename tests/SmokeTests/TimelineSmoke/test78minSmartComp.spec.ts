import { Buttons } from '@/CommonMethods/Buttons';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { SmartComp } from '@/SmartComp/SmartComp';
import { SmartCompChemicalComposition } from '@/SmartComp/SmartCompChemicalComposition';
import { SmartCompExpertMode } from '@/SmartComp/SmartCompExpertMode';
import { SmartCompQA } from '@/SmartComp/SmartCompQAmode';
import { SmartCompStandardMode } from '@/SmartComp/SmartCompStandardMode';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CommonSearch } from '@/CommonMethods/CommonSearch';

describe(
    'Smoke Test ( 78:00 min ), Smart Comp search',
    { tags: ['@smoke', '@smartComp'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            SmartComp.navigateToSmartCompStandard();
        });

        it(`Go to SmartComp module, check if the base element is Fe and selected standard is 'Standard'`, () => {
            TabButtons.colorOfSelectedMainTab('Standard Mode').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.yellow);
                },
            );
            SmartCompStandardMode.getBaseElement().should('equal', 'Fe');
            CommonSearch.getStandardDDL()
                .invoke('text')
                .should('equal', 'Standard');
        });
        it(`SmartComp, Standard Mode- enter in C-0.3, S-0.003, P-0.0003, perform the search, result shoud be-2000`, () => {
            SmartCompChemicalComposition.enterValue('C', '0.3');
            SmartCompChemicalComposition.enterValue('S', '0.0003');
            SmartCompChemicalComposition.enterValue('P', '0.0003');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Similarity');
            });
            ListOfMaterials.getListOfResultsFound().then((listOfResults) => {
                expect(listOfResults).to.contain('Result(s) found:');
            });
            // });
            // it(`SmartComp, Standard Mode-choose SAE from Standard, perform the search again, some results should be shown`, () => {

            cy.step(
                `SmartComp, Standard Mode-choose SAE from Standard, perform the search again, some results should be shown`,
            );
            CommonSearch.selectStandards([' SAE ']);
            CommonSearch.clickSearchButton();
            cy.wait(1300);
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Similarity');
            });
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });
            // it(`SmartComp, Standard Mode-check if buttons(Add to Materil List Builder, Forward to) are disabled above the list of materials`, () => {

            cy.step(
                `SmartComp, Standard Mode-check if buttons(Add to Materil List Builder, Forward to) are disabled above the list of materials`,
            );
            MaterialConsole.checkIfAddToMaterialisdisabled().should(
                'be.disabled',
            );
            MaterialConsole.checkIfForwardToButtonIsDisabled().should(
                'be.disabled',
            );
            //     });
            //     it(`SmartComp, Standard Mode-check the Chemical composition detals for selected material is changing after you click on different materials in list of materials,
            //  first check 1st material from the list 0030 SAe(as he is selected by default), then click on the second 1025 SAE check if the data is changed`, () => {
            cy.step(`SmartComp, Standard Mode-check the Chemical composition detals for selected material is changing after you click on different materials in list of materials,
    first check 1st material from the list 0030 SAe(as he is selected by default), then click on the second 1025 SAE check if the data is changed`);
            cy.wait(1000);
            SmartComp.getMaterialDetailsDataTitle(0, 0).should(
                'equal',
                'Selected material:',
            );
            SmartComp.getMaterialDetailsDataTitle(0, 1).should('equal', '0030');
            SmartComp.getMaterialDetailsDataTitle(1, 0).should(
                'equal',
                'Selected standard:',
            );
            SmartComp.getMaterialDetailsDataTitle(1, 1).should(
                'equal',
                'United States / SAE',
            );
            // check if Chemical composition details are changed agter clicking on different material
            SmartComp.getMaterialDetailsDataInTableColumnHeaders(0, 0).should(
                'equal',
                'Criteria',
            );
            SmartComp.getMaterialDetailsDataInTableColumnHeaders(0, 1).should(
                'equal',
                'Value',
            );
            SmartComp.getMaterialDetailsDataInTable(0).should(
                'equal',
                'C ≤ 0.30 ',
            );
            cy.wait(1000);
            // change to 2nd material 1025 SAE, check data
            SmartComp.clickOnMaterialFromRow(2);
            SmartComp.getMaterialDetailsDataTitle(0, 1).should('equal', '1025');
            SmartComp.getMaterialDetailsDataTitle(1, 1).should(
                'equal',
                'United States / SAE',
            );
            SmartComp.getMaterialDetailsDataInTable(0).should(
                'equal',
                'C 0.22 – 0.30 ',
            );
            // });
            // it(`SmartComp, Standard Mode-select all material from the list, Add to Materils Listu Builder and Forward to buttons should be enabled now`, () => {

            cy.step(
                `SmartComp, Standard Mode-select all material from the list, Add to Materils Listu Builder and Forward to buttons should be enabled now`,
            );
            ListOfMaterials.clickOnCheckboxAll();
            MaterialConsole.checkIfAddToMaterialisdisabled().should(
                'be.enabled',
            );
            MaterialConsole.checkIfForwardToButtonIsDisabled().should(
                'be.enabled',
            );
            // });
            // it(`SmartComp, Standard Mode-add them all to Material List number, a green message should pop out, close it, check if the green message will disappear`, () => {
            cy.step(
                `SmartComp, Standard Mode-add them all to Material List number, a green message should pop out, close it, check if the green message will disappear`,
            );
            ListOfMaterials.clickOnAddToMaterialListBuilder();
            MaterialConsole.checkIfTextinGreenPopupIsVisible().should(
                'be.visible',
            );
            MaterialConsole.closeGreenMessage();
            MaterialConsole.checkIfTextinGreenPopupIsVisible().should(
                'not.be.enabled',
            );
            // });
            // it(`SmartComp, Standard Mode-move the slider Similarity threshold- to 1.0, perform the search, it should show some results`, () => {
            cy.step(
                `SmartComp, Standard Mode-move the slider Similarity threshold- to 1.0, perform the search, it should show some results`,
            );
            cy.scrollTo('top');
            // slider set to (1.00)
            cy.get('input[formcontrolname="similarityThreshold"]')
                .realHover()
                .click();
            cy.realType(
                '{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}{rightarrow}',
            );
            SmartCompStandardMode.getSimilarityThresholdStandardModeTitle(
                0,
            ).should('equal', 'Select similarity threshold: 1.00');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Similarity');
            });
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            //     });
            //     it(`SmartComp, Standard Mode-clear the previous search in Standard ddl, type in Standard ddl 'en', choose from filtered list (European Union/EN and France/AFCEN),
            //  Similarity threshold is still 1.0, perform the search, check if in the column Standard is only EN, some results should be shown`, () => {
            cy.step(`SmartComp, Standard Mode-clear the previous search in Standard ddl, type in Standard ddl 'en', choose from filtered list (European Union/EN and France/AFCEN),
    Similarity threshold is still 1.0, perform the search, check if in the column Standard is only EN, some results should be shown`);
            CommonSearch.clearStandard();
            CommonSearch.selectStandards([' EN ', ' AFCEN ']);
            CommonSearch.getStandardDDL()
                .invoke('text')
                .should('equal', 'European Union/EN, France/AFCEN');
            SmartCompStandardMode.getSimilarityThresholdStandardModeTitle(
                0,
            ).should('equal', 'Select similarity threshold: 1.00');
            CommonSearch.clickSearchButton();
            cy.wait(2000);
            ListOfMaterials.getTableColumnValues(
                'materialMetadata.standardName',
            ).then((columnValues) => {
                const cleanedValues = columnValues
                    .replace(/[^a-zA-Z0-9]/g, '')
                    .trim()
                    .toUpperCase();
                cy.wait(1500);
                expect(cleanedValues).to.contain('EN');
            });
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });
            //     it(`SmartComp, Standard Mode-switch to Expert Mode, Base el shoul still be Fe, Standard should be-European Union/EN,France/AFCEN, Threshold-0.8,
            //  Threshold sensitivity-HIgh by default, Use virtual limits-ON(by default), add element Si-0.1 to search, perform the search, it should show some results`, () => {
            cy.step(`SmartComp, Standard Mode-switch to Expert Mode, Base el shoul still be Fe, Standard should be-European Union/EN,France/AFCEN, Threshold-0.8,
    Threshold sensitivity-HIgh by default, Use virtual limits-ON(by default), add element Si-0.1 to search, perform the search, it should show some results`);
            SmartComp.clickOnSmartCompTab('Expert Mode');
            SmartComp.colorOfSelectedSmartCompTab('Expert Mode').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.yellow);
                },
            );
            SmartComp.getBaseElement().should('equal', 'Fe');
            CommonSearch.getStandardDDL()
                .invoke('text')
                .should('equal', 'European Union/EN, France/AFCEN');
            SmartCompChemicalComposition.enterValue('Si', '0.1');
            // slider set to (0.80)
            cy.get('input[formcontrolname="similarityThreshold"]')
                .realHover()
                .click();
            cy.realType('{leftarrow}{leftarrow}{leftarrow}{leftarrow}');
            SmartCompChemicalComposition.getValue('C').should('equal', '0.3');
            SmartCompChemicalComposition.getValue('Si').should('equal', '0.1');
            SmartCompChemicalComposition.getValue('P').should(
                'equal',
                '0.0003',
            );
            SmartCompChemicalComposition.getValue('S').should(
                'equal',
                '0.0003',
            );
            // Threshold sensitivity-HIgh by default
            SmartCompExpertMode.getDefaulthresHoldSensitivityExpertModeRadioButton(
                0,
            ).should('be.true');
            // Use virtual limits-ON(by default)
            SmartCompExpertMode.getUseVirtualLImitsSliderExpertMode(0).should(
                'equal',
                'Use virtual limits ',
            );
            // Ignore missing elements turned off by default
            SmartCompExpertMode.getUseVirtualLImitsSliderExpertMode(3).should(
                'equal',
                'Ignore missing elements ',
            );
            // SmartComp, Expert Mode-perform the search, it should show some results
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Similarity');
            });
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });
            // it(`SmartComp, Expert Mode-move slider for Si element all the way to the right(10x), C element-move slider almoust all the way to the left(0.1x), S-(10x), P-(0.1x), perform the search again, it should show some results`, () => {
            cy.step(
                `SmartComp, Expert Mode-move slider for Si element all the way to the right(10x), C element-move slider almoust all the way to the left(0.1x), S-(10x), P-(0.1x), perform the search again, it should show some results`,
            );
            SmartCompChemicalComposition.enterValue('C', '0.3');
            SmartCompChemicalComposition.enterValue('Si', '0.1');
            SmartCompChemicalComposition.enterValue('P', '0.0003');
            SmartCompChemicalComposition.enterValue('S', '0.0003');
            cy.get('input[formcontrolname="relativeImportanceControl"]')
                .eq(0)
                .realHover()
                .click()
                .realType('{leftarrow}'.repeat(50));
            SmartCompChemicalComposition.getChemicalCompositionElementSlider(
                'C',
                '0.3',
            ).should('equal', ' 0.1 ');
            cy.get('input[formcontrolname="relativeImportanceControl"]')
                .eq(1)
                .realHover()
                .click()
                .realType('{rightarrow}'.repeat(50));
            SmartCompChemicalComposition.getChemicalCompositionElementSlider(
                'Si',
                '0.1',
            ).should('equal', ' 10.0 ');
            cy.get('input[formcontrolname="relativeImportanceControl"]')
                .eq(3)
                .realHover()
                .click()
                .realType('{leftarrow}'.repeat(50));
            SmartCompChemicalComposition.getChemicalCompositionElementSlider(
                'P',
                '0.0003',
            ).should('equal', ' 0.1 ');
            cy.get('input[formcontrolname="relativeImportanceControl"]')
                .eq(4)
                .realHover()
                .click()
                .realType('{rightarrow}'.repeat(50));
            SmartCompChemicalComposition.getChemicalCompositionElementSlider(
                'S',
                '0.0003',
            ).should('equal', ' 10.0 ');
            CommonSearch.clickSearchButton();
            cy.wait(1000);
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });
            // it(`SmartComp, Expert Mode-Threshold sensitivity-Medium, perform the search, it should show some results(list should have more results now)`, () => {
            cy.step(
                `SmartComp, Expert Mode-Threshold sensitivity-Medium, perform the search, it should show some results(list should have more results now)`,
            );
            SmartCompExpertMode.clickOnThresHoldSensitivityExpertModeRadioButton(
                1,
            );
            cy.wait(500);
            SmartCompExpertMode.getDefaulthresHoldSensitivityExpertModeRadioButton(
                1,
            ).should('be.true');
            CommonSearch.clickSearchButton();
            cy.wait(500);
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });
            // it(`SmartComp, Expert Mode-Threshold sensitivity-Low, perform the search, it should show some results(list should have even more results now)`, () => {
            cy.step(
                `SmartComp, Expert Mode-Threshold sensitivity-Low, perform the search, it should show some results(list should have even more results now`,
            );
            SmartCompExpertMode.clickOnThresHoldSensitivityExpertModeRadioButton(
                2,
            );
            cy.wait(500);
            SmartCompExpertMode.getDefaulthresHoldSensitivityExpertModeRadioButton(
                2,
            ).should('be.true');
            CommonSearch.clickSearchButton();
            cy.wait(500);
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });
            // it(`SmartComp, Expert Mode-switch Ignore missing elements slider to ON, perform the search, it should show some results`, () => {
            cy.step(
                `SmartComp, Expert Mode-switch Ignore missing elements slider to ON, perform the search, it should show some results`,
            );
            const second = 1;
            SmartCompExpertMode.clickOnSliderExpertMode(second);
            SmartCompExpertMode.getUseVirtualLImitsSliderExpertMode(2).should(
                'equal',
                'On',
            );
            CommonSearch.clickSearchButton();
            cy.wait(500);
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });
            // it(`SmartComp, Expert Mode-switch Use virtual limits slider to Off, perform the search, it should show some results(list should have more results now)`, () => {

            cy.step(
                `SmartComp, Expert Mode-switch Use virtual limits slider to Off, perform the search, it should show some results(list should have more results now)`,
            );
            const first = 0;
            SmartCompExpertMode.clickOnSliderExpertMode(first);
            SmartCompExpertMode.getUseVirtualLImitsSliderExpertMode(1).should(
                'equal',
                'Off',
            );
            cy.wait(1300);
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            //         });
            //         it(`SmartComp, Expert Mode-switch to QA Mode, Base el shoul still be Fe, entered Chemical Composition elements should still be C-0.3; Si-0.1; P-0.0003; S-0.0003,
            //   select material to analyze search box enter-c45e and choose 1st 3 from the list-C45E (B.S.), C45 E(DIN), C45E(EN), perform the search, it should be only 3 selected materilal in the list`, () => {
            cy.step(`SmartComp, Expert Mode-switch to QA Mode, Base el shoul still be Fe, entered Chemical Composition elements should still be C-0.3; Si-0.1; P-0.0003; S-0.0003,
                select material to analyze search box enter-c45e and choose 1st 3 from the list-C45E (B.S.), C45 E(DIN), C45E(EN), perform the search, it should be only 3 selected materilal in the list`);
            SmartComp.clickOnSmartCompTab('QA Mode');
            TabButtons.colorOfSelectedMainTab('QA Mode').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.yellow);
                },
            );
            SmartComp.getBaseElement().should('equal', 'Fe');
            SmartCompChemicalComposition.getValue('C').should('equal', '0.3');
            SmartCompChemicalComposition.getValue('Si').should('equal', '0.1');
            SmartCompChemicalComposition.getValue('P').should(
                'equal',
                '0.0003',
            );
            SmartCompChemicalComposition.getValue('S').should(
                'equal',
                '0.0003',
            );
            // SmartComp, QA Mode-in Select material to analyze search box enter-c45e and choose 1st 3 from the list-C45E (B.S.), C45 E(DIN), C45E(EN)
            Buttons.clickOnAddMaterialsQAModeButton();
            SmartCompQA.enterMaterialInBox('c45e');
            SmartCompQA.clickOnMaterialFromList(0);
            Buttons.clickOnAddMaterialsQAModeButton();
            SmartCompQA.clickOnMaterialFromList(1);
            Buttons.clickOnAddMaterialsQAModeButton();
            SmartCompQA.clickOnMaterialFromList(2);
            SmartComp.getSelectedMaterial().then((selectedMaterial) => {
                expect(selectedMaterial.eq(0).text()).to.contain('C45E');
                expect(selectedMaterial.eq(1).text()).to.contain('C45E');
                expect(selectedMaterial.eq(2).text()).to.contain('C45E');
            });
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues(
                'materialMetadata.designation',
            ).then((columnValues) => {
                expect(columnValues).to.contain('C45E');
            });
            ListOfMaterials.getListOfResultsInMaterialListBuilder().then(
                (listOfResults) => {
                    expect(listOfResults).to.contain('Result(s) found:');
                },
            );
            // });
            // it(`SmartComp, QA Mode-click on button-'View materil properties' fro 1st material (c43E B.S.), it should lead you to his Chemical Composition page`, () => {
            cy.step(
                `SmartComp, QA Mode-click on button-'View materil properties' fro 1st material (c43E B.S.), it should lead you to his Chemical Composition page`,
            );
            SmartComp.clickOnViewMaterialPropertiesButton();
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                'C45E',
            );
            MaterialInfo.findMaterialInfoValue(' United Kingdom / B.S. ');
            ConditionSelectorHeaders.getTitle().should('equal', 'Composition');
        });
    },
);
