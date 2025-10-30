import { Buttons } from '@/CommonMethods/Buttons';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Bookmarks } from '@/HelpersMethods/Bookmarks';
import { SavedLists } from '@/HelpersMethods/SavedLists';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { WelcomePage } from '@/WelcomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';

describe(
    'Smoke Test Material Console/MyConsole/Saved Searches',
    { tags: ['@smoke', '@myConsole'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(`On the Saved Searches tab, try to edit saved search(add more text to the previously saved) 2nd in the list and save, then click on load button it should lead you to that saved search page with results also`, () => {
            // TODO create and delete saved list at the end?
            TotalSearchHomePage.clickOnMaterialConsole();
            cy.wait(1000);
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Saved Searches');
            cy.wait(1000);
            MaterialConsole.colorOfSelectedTab('Saved Searches').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            SavedLists.editSavedLists(1);
            cy.wait(1000);
            SavedLists.geteditModalWindow().should('be.visible');
            SavedLists.enterTextInSavedListBox('2');
            Buttons.clickOnSaveSearchButton();
            cy.wait(500);
            MaterialConsole.clickOnForwardButton(1);
            cy.wait(2000);
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'contains',
                '(  Direct data only )  ',
            );
            ListOfMaterials.getListOfResultsFound().then((listOfResults) => {
                expect(listOfResults).to.contain('Result(s) found:');
            });
        });

        it(`On the Saved Searches page, click on share link option for 5th saved search in the list, on the new page it should open the search with the saved parameters`, () => {
            cy.wait(1000);
            TotalSearchHomePage.clickOnMaterialConsole();
            cy.wait(1000);
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Saved Searches');
            cy.wait(1000);
            MaterialConsole.colorOfSelectedTab('Saved Searches').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            MaterialConsole.clickOnShareButtonFromRow(1);
            Bookmarks.shareLinkModal().should('be.visible');
            Bookmarks.getModalWindowHeader().should('equal', 'Share');
            Bookmarks.getWindowWithSharedLink().should(
                'contain',
                Cypress.env('environmentUrl') + '/en/sharing/search/',
            );
            Buttons.clickOnShareLInkButton();
            WelcomePage.closePopUpWindow();
        });
    },
);
