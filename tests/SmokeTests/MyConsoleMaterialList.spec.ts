import { Buttons } from '@/CommonMethods/Buttons';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { SavedLists } from '@/HelpersMethods/SavedLists';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { ReportBuilderHome } from '@/MaterialConsole/reportBuilderHome';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';

const environmentUrl = Cypress.env('environmentUrl');
describe(
    'Smoke Test Material Console/MyConsole/Material List',
    { tags: ['@smoke', '@myConsole'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                environmentUrl,
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(`Go to the Material Lists page, try to edit Material Lists (add more text to the previously saved) and save, then click on the saved material list, it should lead you to that saved list, select all material from the list, then add them to Material List Builder`, () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            cy.wait(1000);
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Material Lists');
            cy.wait(1000);
            MaterialConsole.colorOfSelectedTab('Material Lists').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            SavedLists.editSavedLists(0);
            SavedLists.geteditModalWindow().should('be.visible');
            SavedLists.enterTextInSavedListBox('1 1');
            cy.wait(1000);
            Buttons.clickOnCancelButton();
            cy.wait(1000);
            SavedLists.clickOnSavedLIstInRow('ML 2023-10-29 21'); // TODO hardcoded values
            cy.wait(1000);
            ListOfMaterials.clickOnCheckboxAll();
            cy.wait(2000);
            ListOfMaterials.clickOnAddToMaterialListBuilder();
            cy.wait(1000);
            TotalSearchHomePage.clickOnMaterialConsole();
            TabButtons.colorOfSelectedMainTab('Material List Builder').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
        });
        it(`On the Material Lists page, click on share link option for 1st saved, on the new page in browser it should open the search`, () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(2000);
            MaterialConsole.selectMyConsoleSubTab('Material Lists');
            cy.wait(2000);
            MaterialConsole.colorOfSelectedTab('Material Lists').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            MaterialConsole.clickOnShareButton(0);
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
    },
);
