import { _304_AISI } from 'cypress/fixtures/materials';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { ReportBuilderHome } from '@/MaterialConsole/reportBuilderHome';
import { ReportBuilderModal } from '@/MaterialConsole/reportBuilderModal';
import { LoginPage } from '@/LoginPage/loginPage';
import { MechanicalProperties } from '@/mechanicalProperties';
import { Helpers } from '@/HelpersMethods/helpers';

const environmentUrl = Cypress.env('environmentUrl');
const testMaterial = _304_AISI.id;

describe(
    'Report Builder test material 304 (AISI).',
    {
        tags: ['@smoke', '@myConsole'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Go to Mechanical Properties and add material to Report Builder, go to Report Builder and check if the page for added material exist.', () => {
            /*
        cy.visit('en/mmc/favorites/favorites-materials');
        cy.contains('span', 'Saved Reports').click();
        cy.get('[role="row"]').contains('div', 'For delete').should('be.visible')
            .siblings('[col-id="checkbox"]').find('.ag-selection-checkbox').click()
            .get('button').contains('span', 'Delete').click();
        MaterialConsole.clickOnYESinModal();
        */
            MechanicalProperties.navigateTo(testMaterial);
            MechanicalProperties.getSelectedView().should(
                'eq',
                ' Synthetic view ',
            );
            ConditionSelectorHeaders.clickOnAddToReportBuilder();
            ReportBuilderModal.getTextInModal().should(
                'equal',
                'Please select the data you want to add to the report.' +
                    ' Data types currently available to add from this page:',
            );
            ReportBuilderModal.clickOnAddtoReportBuilderModal();
            ReportBuilderModal.getTextInAlert().should(
                'equal',
                'Selected items successfully added to the report. Go to report... ',
            );

            ReportBuilderModal.goToReport();
            ReportBuilderHome.getMaterialInReport().then((addedItem) => {
                expect(addedItem.eq(0).text()).to.be.equal(
                    '304  (United States / AISI)',
                );
            });

            cy.step(
                'Check for visibility of the draggable list on left side ( Plain text, Page break and Empty vertical space).',
            );
            const expectedDragableList = [
                ' Plain text ',
                ' Page break ',
                ' Empty vertical space ',
            ];
            ReportBuilderHome.getDragableList().then((currentDragableList) => {
                cy.Compare_Arrays(currentDragableList, expectedDragableList);
            });

            cy.step(
                'Check functionality of Plain text, enter title and content, then try to update content.',
            );
            ReportBuilderHome.dragAndDrop(' Plain text ');
            ReportBuilderHome.clickOnCreatePlainText();
            ReportBuilderHome.inContentEnterText(
                'My favourite material for e2e tests.',
            );
            ReportBuilderHome.inTitleEnterText('e2e Title');
            ReportBuilderHome.clickOnUpdate();
            ReportBuilderHome.getTitle().then((title) => {
                expect(title.text()).to.equal('e2e Title');
            });
            ReportBuilderHome.getTextIn('e2e Title').then((textContent) => {
                expect(textContent.text()).to.equal(
                    ' My favourite material for e2e tests. ',
                );
            });
            ReportBuilderHome.clickOnCreatePlainText();
            ReportBuilderHome.inContentEnterText(
                'Not My favourite material for e2e tests.',
            );
            ReportBuilderHome.clickOnUpdate();
            ReportBuilderHome.getTextIn('e2e Title').then((textContent) => {
                expect(textContent.text()).to.equal(
                    ' Not My favourite material for e2e tests. ',
                );
            });

            cy.step(
                'Save the report and click on "share" message "Copy shareable link and send it to other users to share the current resource with them." appears, check the parts of the link and the function of the "copy" button.',
            );
            ReportBuilderHome.clickOnGreenButton(' Save ');
            Helpers.waitForloaderIfLoaderExist();
            ReportBuilderHome.inSaveReportEnterTitle(
                'For delete_' + Math.random().toString(36).slice(2, 8),
            );
            ReportBuilderHome.inSaveReportEnterDescription('e2e report');
            ReportBuilderHome.inSaveReportClickOnSave();
            Helpers.waitForloaderIfLoaderExist();
            MaterialConsole.waitGreenMessageToNotExist();

            ReportBuilderHome.clickOnGreenButton(' Share ');
            ReportBuilderHome.getMessageInShareModal().then((message) => {
                expect(message.text()).to.equal(
                    'Copy shareable link and send it to other users to share the current resource with them.',
                );
            });
            ReportBuilderHome.getUrlInShareModal().then((urlForSharing) => {
                expect(urlForSharing).to.contains(environmentUrl);
                expect(urlForSharing).to.contains('/sharing/');
            });
            ReportBuilderHome.onXCloseSharingModal();
        });

        it('Go to Saved Reports in My Console, check if there is a saved report, and then delete it from Saved Reports.', () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            MaterialConsole.clickOnMyConsole();
            cy.wait(800);
            cy.contains('span', 'Saved Reports').click();
            cy.get('[role="columnheader"]+[col-id="checkbox"]')
                .should('be.visible')
                .click()
                .get('button')
                .contains('span', 'Delete')
                .click();
            MaterialConsole.clickOnYESinModal();
        });
    },
);
