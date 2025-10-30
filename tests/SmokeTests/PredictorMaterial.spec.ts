import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { Buttons } from '@/CommonMethods/Buttons';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { AddToReport } from '@/HelpersMethods/AddToReport';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { ReportBuilderHome } from '@/MaterialConsole/reportBuilderHome';
import { ReportBuilderModal } from '@/MaterialConsole/reportBuilderModal';
import { Predictor } from '@/Predictor';
import { SmartComp } from '@/SmartComp/SmartComp';
import { WelcomePage } from '@/WelcomePage';
import { Helpers } from '@/HelpersMethods/helpers';

describe(
    'Smoke test Predictor, Material, GRNN tab, Mechanical vs Temperature',
    { tags: ['@smoke', '@predictor'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            TotalSearchHomePage.clickOnPredictor();
        });

        it('On the Material Tab choose `EN` from Standard, in Material group select `Medium carbon, low alloyed steels`, in material designation enter `1C` and perform the search, it should show some results', () => {
            Predictor.getProgresBar().should(
                'equal',
                ' Step 1/4Material composition',
            );
            CommonSearch.selectStandards([' EN ']);
            CommonSearch.selectMaterialGroups(
                ['Ferrous Alloys'],
                ['Medium carbon, low alloyed steels'],
            );
            CommonSearch.enterMaterialDesignation('1 C');
            Buttons.clickSearchButtonOnExporter();
            cy.wait(1000);
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });

            // it('Click on the 6th material(1 C 50 (EN)) from the list  move to the 2nd Step', () => {
            cy.step(
                'Click on the 6th material(1 C 50 (EN)) from the list  move to the 2nd Step',
            );
            Predictor.getMaterialDataForChemical(7).should(
                'equal',
                'Mn 0.40 – 0.70 ',
            );
            ListOfMaterials.clickOnMaterialInListByIndex(5);
            Predictor.getMaterialTitleForChemical().should(
                'equal',
                ' 1 C 50 (EN) ',
            );
            Predictor.getMaterialDataForChemical(7).should(
                'equal',
                'Mn 0.60 – 0.90 ',
            );
            Predictor.clikOnNextStepButton();
            Predictor.getProgresBar().should('equal', ' Step 2/4Select model');
        });
        xit(
            'Move to the 3rd step, there choose Mechanical vs Temperature, and in Property ddl choose Yield Strength, Rp0.2 / Rp (MPa), beneath from Heat Treatment-Strain-hardened (H112),' +
                ' in Dimensions enter-10, Product-Bars and Dimension-45° and click on Predict button, window should pop out with inputs that are out of applicability model range,' +
                ' click on Proceed button, it should move to the 4th final step',
            () => {
                Predictor.clikOnNextStepButton();
                Predictor.getProgresBar().should(
                    'equal',
                    ' Step 3/4Model parameters',
                );
                Helpers.clickOnFilterOption(
                    'Property',
                    [''],
                    ['Yield Strength, Rp0.2 / Rp (MPa)'],
                );
                Helpers.clickOnFilterOption(
                    'Heat Treatment',
                    [''],
                    ['Strain-hardened (H112)'],
                );
                Helpers.clickOnFilterOption('Product', [''], ['Bars']);
                Helpers.clickOnFilterOption('Dimension', [''], ['45°']);
                Predictor.clikOnNextStepButton();
                WelcomePage.showPopUpWindow().should('be.visible');
                SmartComp.getImportTitle().should(
                    'equal',
                    'Extrapolation warning',
                );
                const defaultHeaders = [
                    'Input',
                    'Inserted value',
                    'Applicability range',
                ];
                ConditionSelectorHeaders.getHeaderValuesColumTitles().should(
                    'deep.equal',
                    defaultHeaders,
                );
                PropertyTable.getTableValues('Al');
                PropertyTable.getTableValues('99.56586');
                PropertyTable.getTableValues('87.15444 – 96.49593');
                Buttons.clickOnProceeed();
                WelcomePage.showPopUpWindow().should('not.exist');
            },
        );
        xit('On the 4th final step, check parameters info for added steps(now it should be dusplayed all 4), check if Predictor results are displayed (`Model Prediction` visible, with diagram and table with values, `Model Testing performance` with data), try Export button, it should be functional', () => {
            cy.wait(1000);
            Predictor.getProgresBar().should(
                'equal',
                ' Final step 4/4Prediction results',
            );
            Predictor.getParametersInfo().should(
                'equal',
                'Step 1Material:Al 99.6E (EN);Material group:Aluminium;Base Element:Al;Reference:EN 576: 2003 / Aluminium and aluminium alloys - Unalloyed aluminium ingots for remelting - SpecificationsStep 2Implementation Type:Total Materia AI GRNNStep 3Property Group:Mechanical vs. Temperature;Property:Yield Strength, Rp0.2 / Rp;Conditions:Heat Treatment: Strain-hardened (H112); Dimension (mm): 10; Product: Bars; Direction: 45°;Temperature:-270 °C – 300 °C (Step : 50)Step 4Prediction results',
            );
            Predictor.checkProductResult().should('be.visible');
        });
        xit('Click on Add to Report button, it should be functional, go to Report Builder page, it should be forwarded report, save report, then do download pdf and to share, it should be functional', () => {
            ReportBuilderModal.clickOnAddtoReportBuilderModal();
            ReportBuilderModal.getTextInAlert().should(
                'equal',
                'Selected items successfully added to the report. Go to report... ',
            );
            MaterialConsole.clickOnMaterialConsole();
            cy.wait(2000);
            TabButtons.clickOnTheTabs('Report Builder');
            AddToReport.ReportBodyContent().should(
                'equal',
                'Predictor - Predicted valuesMaterial: Al 99.6E (EN)Reference: EN 576: 2003 / Aluminium and aluminium alloys - Unalloyed aluminium ingots for remelting - SpecificationsImplementation Type: Total Materia GRNNPredictor - Model performanceMaterial: Al 99.6E (EN)Reference: EN 576: 2003 / Aluminium and aluminium alloys - Unalloyed aluminium ingots for remelting - SpecificationsImplementation Type: Total Materia GRNN',
            );
            AddToReport.clickOnReportButtons(0);
            Buttons.clickOnSaveSearchButton();
            PropertyTableDiagram.getAlert().should(
                'equal',
                'Report successfully saved.',
            );
            AddToReport.clickOnReportButtons(1);
            ReportBuilderHome.clickOnGreenButton(' Share ');
            ReportBuilderHome.getMessageInShareModal().then((message) => {
                expect(message.text()).to.equal(
                    'Copy shareable link and send it to other users to share the current resource with them.',
                );
            });
            ReportBuilderHome.getUrlInShareModal().then((urlForSharing) => {
                expect(urlForSharing).to.contains(
                    Cypress.env('environmentUrl'),
                );
                expect(urlForSharing).to.contains('/sharing/'); // https://uat.portal.totalmat.pri/en/sharing/reports/BrV57XtlYUa19XO9EQqg
            });
            ReportBuilderHome.onXCloseSharingModal();
        });
    },
);
