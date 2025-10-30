import { AddToReport } from '@/HelpersMethods/AddToReport';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { ReportBuilderHome } from '@/MaterialConsole/reportBuilderHome';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';

describe(
    'Smoke Test Material Console/MyConsole/Saved Reports',
    { tags: ['@smoke', '@myConsole'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(`Go to Saved Reports page, click on share link option, on the new page in browser it should load the report`, () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Saved Reports');
            MaterialConsole.colorOfSelectedTab('Saved Reports').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            cy.wait(1000);
            MaterialConsole.clickOnShareButton(0);
            ReportBuilderHome.getMessageInShareModal().then((message) => {
                expect(message.text()).to.equal(
                    'Copy shareable link and send it to other users to share the current resource with them.',
                );
            });
            ReportBuilderHome.getUrlInShareModal().then((urlForSharing) => {
                expect(urlForSharing).to.contains(
                    Cypress.env('environmentUrl'),
                );
                expect(urlForSharing).to.contains('/sharing/');
            });
            ReportBuilderHome.onXCloseSharingModal();
        });

        it(`On the Saved Reports page, click on load button it should lead you to that saved page`, () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Saved Reports');
            MaterialConsole.colorOfSelectedTab('Saved Reports').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            MaterialConsole.clickOnForwardButton(0);
            AddToReport.checkIfPdfModalIsOpen().should('be.visible');
        });
    },
);
