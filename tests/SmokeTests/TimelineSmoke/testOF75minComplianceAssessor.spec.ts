import { color } from 'cypress/fixtures/color';
import { Buttons } from '@/CommonMethods/Buttons';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { ComparisonViewHome } from '@/ComparisonView/comparisonViewHome';
import { Exporter } from '@/Exporter/Exporter';
import { AddToReport } from '@/HelpersMethods/AddToReport';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { SavedLists } from '@/HelpersMethods/SavedLists';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { ComplianceAssessor } from '@/MaterialConsole/compilanceAssessor';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { SearchSuppliers } from '@/Suppliers/SearchSuppliers';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke Test ( 75:00 min ), Compliance Assessor',
    {
        defaultCommandTimeout: 28000,
        tags: ['@smoke', '@complianceOld'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('usernameComp'),
                Cypress.env('passwordComp'),
            );
        });

        it('Compliance Assesor/Materials page-Enter 1100 in quick search field, and perform the search, it should show some results', () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            CommonSearch.enterMaterialDesignation('1100');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('designation').then(
                (columnValues) => {
                    // Remove non-alphanumeric characters, trim leading and trailing whitespaces, and convert to uppercase
                    const cleanedValues = columnValues
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .trim()
                        .toUpperCase();
                    expect(cleanedValues).to.include('11');
                },
            );
            // });
            // it('Compliance Assesor-Select all materials from the list and add them to material list buider', () => {
            cy.step(
                'Compliance Assesor-Select all materials from the list and add them to material list buider',
            );
            ConditionSelectorHeaders.getTitle().should('equal', 'Quick Search');
            cy.wait(1000);
            ListOfMaterials.clickOnCheckboxAll();
            ListOfMaterials.clickOnAddToMaterialListBuilder();
            // MaterialDiscoveryHome.getAlertMessage().should('equal', '×Property you selected is already assigned for the other axis. Please select another property.')
            // });
            // it('Compliance Assesor-go to Material list Builder page and check if added material from quick search are there', () => {
            cy.step(
                'Compliance Assesor-go to Material list Builder page and check if added material from quick search are there',
            );
            TotalSearchHomePage.clickOnMaterialConsole();
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
            ListOfMaterials.getResultsFound().then((results) => {
                const resultsFound = results.text();
                expect(resultsFound).to.contain('Result(s) found:');
            });
            // });
            // it('Compliance Assesor-select again all materials on the Material List Builder page and add them to Compliance Assessor page, it should open Compliance Assessor page with list of all selected materials', () => {
            cy.step(
                'Compliance Assesor-select again all materials on the Material List Builder page and add them to Compliance Assessor page, it should open Compliance Assessor page with list of all selected materials',
            );
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Material List Builder ',
            );
            ListOfMaterials.clickOnCheckboxAll();
            ListOfMaterials.addToOldComplianceAssessor();
            cy.wait(3000);
            SearchSuppliers.colorOfSelectedSupplierTab(
                'Compliance Assessor',
            ).then((background) => {
                expect(background).to.equal(color.greenLight);
            });
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Compliance Assessor 48',
            );
            cy.wait(1000);
            for (let i = 0; i < 5; i++) {
                ComplianceAssessor.getMaterialDesignationTitle(i).should(
                    'equal',
                    '1100',
                );
            }
            // status icons next to pinn button should not be displayed before clicking on assess all button
            for (let i = 0; i < 5; i++) {
                ComplianceAssessor.checkStatusIconColor(i).should(
                    'not.be.visible',
                );
            }
            for (let i = 0; i < 4; i++) {
                ComplianceAssessor.checkStatusIconOptionThree(
                    i,
                    i === 0 ? 0 : 1,
                ).should('not.exist');
            }
            // });
            // it('Compliance Assessor-choose from Country of Regulations-European Union, from According to-REACH ((EC) No 1907/2006, Annex XVII) and click on Assess all button, color of status icons next to pin button should appear and inside the Chemical Composition table', () => {
            cy.step(
                'Compliance Assessor-choose from Country of Regulations-European Union, from According to-REACH ((EC) No 1907/2006, Annex XVII) and click on Assess all button, color of status icons next to pin button should appear and inside the Chemical Composition table',
            );
            ConditionSelectorDDLForms.checkStatusOfCountryOfRegulations();
            ConditionSelectorDDLForms.checkStatusOfAccordingTo();
            ConditionSelectorDDLForms.clickOnCountryOFRegulation(
                'Country of Regulation',
                'European Union',
            );
            ComplianceAssessor.getTextForSelectedCountryAndAccording(0).should(
                'equal',
                'European Union',
            );
            ConditionSelectorDDLForms.clickOnAccordingTo(
                'According to',
                'REACH ((EC) No 1907/2006, Annex XVII)',
            );
            ComplianceAssessor.getTextForSelectedCountryAndAccording(1).should(
                'equal',
                'REACH ((EC) No 1907/2006, Annex XVII)',
            );
            Buttons.clickOnAssesAllButton();
            cy.wait(1000);
            // status icons next to pinn button should be displayed after clicking on assess all button
            for (let i = 0; i < 5; i++) {
                ComplianceAssessor.checkStatusIconColor(i).should('be.visible');
            }
            // });
            // it(`Compliance Assesor-Check if data is displayed in chemical composition table beneath material info's(some conditions and chemical elements)`, () => {
            cy.step(
                `Compliance Assesor-Check if data is displayed in chemical composition table beneath material info's(some conditions and chemical elements)`,
            );
            ComparisonViewHome.getTextInChemicalParametersForCondition(
                'GB/T 3880: 1997 / Aluminium and aluminium alloy rolled sheet',
            ).should(
                'equal',
                'GB/T 3880: 1997 / Aluminium and aluminium alloy rolled sheet',
            );
            ComplianceAssessor.getTextForSubstances('Cu 0.05 – 0.20 %');
            ComplianceAssessor.getTextForSubstances('Other each ≤ 0.05 %');
            ComplianceAssessor.getTextForSubstances('Zn ≤ 0.10 %');
            // });
            // it('Compliance Assesor-Mouse over on status icons to check if tooltips are displayed', () => {
            cy.step(
                'Compliance Assesor-Mouse over on status icons to check if tooltips are displayed',
            );
            ComplianceAssessor.checkStatusIconColor(2).should(
                'have.css',
                'color',
                color.red,
            );
            ComplianceAssessor.mouseOverCheckMarkAndGetText(2).should(
                'equal',
                'At least one substance is listed in REACH (EC) No 1907/2006, Annex XVII Restricted Substance List',
            );
            ComplianceAssessor.mouseOverCheckMarkAndGetText(3).should(
                'equal',
                'Not assessed',
            );
            // });
            // it('Compliance Assesor-clear selection in both dropdowns for Country of Regulations and According to, all status icons should dissapear', () => {
            cy.step(
                'Compliance Assesor-clear selection in both dropdowns for Country of Regulations and According to, all status icons should dissapear',
            );
            ConditionSelectorDDLForms.checkStatusOfCountryOfRegulations();
            ConditionSelectorDDLForms.checkStatusOfAccordingTo();
            ComplianceAssessor.getTextForSelectedCountryAndAccording(0).should(
                'equal',
                'Country of Regulation',
            );
            ComplianceAssessor.getTextForSelectedCountryAndAccording(1).should(
                'equal',
                'According to',
            );
            for (let i = 0; i < 5; i++) {
                ComplianceAssessor.checkStatusIconColor(i).should(
                    'not.be.visible',
                );
            }
            for (let i = 0; i < 4; i++) {
                ComplianceAssessor.checkStatusIconOptionThree(
                    i,
                    i === 0 ? 0 : 1,
                ).should('not.exist');
            }
            // });
            // it('Compliance Assesor-choose from Country of Regulations-United States, from According to-SARA 302 and click on Assess all button, status icons should appear again', () => {

            cy.step(
                'Compliance Assesor-choose from Country of Regulations-United States, from According to-SARA 302 and click on Assess all button, status icons should appear again',
            );
            ConditionSelectorDDLForms.clickOnCountryOFRegulation(
                'Country of Regulation',
                'United States',
            );
            ComplianceAssessor.getTextForSelectedCountryAndAccording(0).should(
                'equal',
                'United States',
            );
            ConditionSelectorDDLForms.clickOnAccordingTo(
                'According to',
                'SARA 302',
            );
            ComplianceAssessor.getTextForSelectedCountryAndAccording(1).should(
                'equal',
                'SARA 302',
            );
            Buttons.clickOnAssesAllButton();
            cy.wait(1000);
            ComplianceAssessor.checkStatusIconColor(2).should(
                'have.css',
                'color',
                color.brownBright,
            );
            // check if the data is displayed after changing country and regulative
            ComparisonViewHome.getTextInChemicalParametersForCondition(
                'GB/T 3880: 1997 / Aluminium and aluminium alloy rolled sheet',
            ).should(
                'equal',
                'GB/T 3880: 1997 / Aluminium and aluminium alloy rolled sheet',
            );
            ComplianceAssessor.getTextForSubstances('Cu 0.05 – 0.20 %');
            ComplianceAssessor.getTextForSubstances('Other each ≤ 0.05 %');
            ComplianceAssessor.getTextForSubstances('Zn ≤ 0.10 %');
            // clear the filters
            Buttons.ClearAllInComplianceAssesorButton();
            SavedLists.geteditModalWindow().should('be.visible');
            Exporter.clickYesButton();
            MaterialConsole.getAlertNoItem().should(
                'equal',
                'No items for assesmentAdd at least one item to the Compliance assessment to enable the tool',
            );
            // });
            // it('Add list from the Material List Builder to Compliance Assessor and try for visibility of arrows " < "and " > " and their functionality.', () => {
            cy.step(
                'Add list from the Material List Builder to Compliance Assessor and try for visibility of arrows " < "and " > " and their functionality.',
            );
            cy.wait(1000);
            TotalSearchHomePage.clickOnMaterialConsole();
            cy.wait(1000);
            ListOfMaterials.clickOnCheckboxAll();
            ListOfMaterials.addToOldComplianceAssessor();
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Compliance Assessor 48',
            );
            ComparisonViewHome.getLeftArrow().should('be.visible');
            ComparisonViewHome.getRightArrow().should('be.visible');
            cy.wait(500);
            ComplianceAssessor.getMaterialStandardTitle(2).should(
                'equal',
                '(Australia / AS)',
            );
            ComparisonViewHome.clickOnLeftArrow();
            ComplianceAssessor.getMaterialStandardTitle(2).should(
                'equal',
                '(France / AFNOR NF)',
            );
            ComparisonViewHome.clickOnRightArrow();
            ComplianceAssessor.getMaterialStandardTitle(2).should(
                'equal',
                '(Australia / AS)',
            );
            // });
            // it('Choose European Union in Country ddl, from According to-REACH ((EC) No 1907/2006), pinn 1st material in Compliance list, try PDF option for selected material, and also for pinned material try Add to Report option, they should be functional.', () => {
            cy.step(
                'Choose European Union in Country ddl, from According to-REACH ((EC) No 1907/2006), pinn 1st material in Compliance list, try PDF option for selected material, and also for pinned material try Add to Report option, they should be functional.',
            );
            ConditionSelectorDDLForms.checkStatusOfCountryOfRegulations();
            ConditionSelectorDDLForms.checkStatusOfAccordingTo();
            ConditionSelectorDDLForms.clickOnCountryOFRegulation(
                'Country of Regulation',
                'European Union',
            );
            ComplianceAssessor.getTextForSelectedCountryAndAccording(0).should(
                'equal',
                'European Union',
            );
            ConditionSelectorDDLForms.clickOnAccordingTo(
                'According to',
                'REACH ((EC) No 1907/2006)',
            );
            ComplianceAssessor.getTextForSelectedCountryAndAccording(1).should(
                'equal',
                'REACH ((EC) No 1907/2006)',
            );
            Buttons.clickOnAssesAllButton();
            cy.wait(1000);
            ComparisonViewHome.clickOnPinmaterial(0);
            ComparisonViewHome.designationField()
                .eq(0)
                .should('have.css', 'background-color', color.greenTab);
            ComparisonViewHome.basicInformationField()
                .eq(0)
                .should('have.css', 'background-color', color.greenTab);
            ComparisonViewHome.chemicalCompositionField()
                .eq(0)
                .should('have.css', 'background-color', color.greenTab);
            ComparisonViewHome.buttonPinmaterial()
                .eq(0)
                .should('have.css', 'background-color', color.greenLight);
            cy.wait(500);
            ComplianceAssessor.clickOnPrintToPdf().type('{esc}');
            ComplianceAssessor.clickOnAddToReportBuidler();
            AddToReport.checkIfReportModalIsOpen().should('be.visible');
            AddToReport.clickOnCancelButton();
        });
    },
);
