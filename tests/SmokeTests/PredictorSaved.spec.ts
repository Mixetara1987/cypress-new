import { Buttons } from '@/CommonMethods/Buttons';
import { Bookmarks } from '@/HelpersMethods/Bookmarks';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { Predictor } from '@/Predictor';
import { SmartComp } from '@/SmartComp/SmartComp';
import { WelcomePage } from '@/WelcomePage';
import { LoginPage } from '@/LoginPage/loginPage';

describe(
    'Smoke test, Saved Prediction',
    { tags: ['@smoke', '@predictor'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        xit(
            'Go to Material Console tab, then My Console tab, then Saved Predictions tab, click on the Load button for the 1st from the list,' +
                ' it should lead you to Predictor page, final step 4/4 Prediction results, Model prediction results should be displayed,' +
                ' click on Save button, Save Prediction window should open, try ty edit Prediction by added `test` to title, and click Save. It should be functional',
            () => {
                MaterialConsole.clickOnMaterialConsole();
                cy.wait(500);
                MaterialConsole.clickOnMyConsole();
                cy.wait(500);
                MaterialConsole.selectMyConsoleSubTab('Saved Predictions');
                cy.wait(500);
                MaterialConsole.clickOnForwardButton(12);
                Predictor.getProgresBar().should(
                    'equal',
                    ' Final step 4/4Prediction results',
                );
                Predictor.checkProductResult().should('be.visible');
                Predictor.clikOnNextStepButton();
                WelcomePage.showPopUpWindow().should('be.visible');
                SmartComp.getImportTitle().should('equal', 'Save Prediction');
                Bookmarks.getTextInModal(0).should('includes', '');
                Bookmarks.getTextInModal(1).should('includes', 'temperature');
                Bookmarks.enterTextInTitleCA(' test');
                Buttons.clickOnSaveSearchButton();
                WelcomePage.showPopUpWindow().should('not.exist');
            },
        );
        xit('Turn back to Material Console/My Console/Saved Predictions. Try to delete edited  prediction(with test in name), it should be functional', () => {
            MaterialConsole.clickOnMaterialConsole();
            cy.wait(2000);
            MaterialConsole.clickOnMyConsole();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Saved Predictions');
            cy.wait(1000);
            MaterialConsole.clickOnSelectedMaterial(0);
            Bookmarks.clickToDeleteFromList();
            MaterialConsole.clickOnYESinModal();
        });
        xit('By Clicking on the title on `Title` column sorting titles should be functional', () => {
            cy.wait(2000);
            const getOrderBefore = () => {
                return cy.get('.ag-center-cols-container').invoke('index');
            };
            ListOfMaterials.clickOnColumnTitle(0);
            cy.wait(500);
            const getOrderAfter = () => {
                return cy.get('.ag-center-cols-container').invoke('index');
            };
            cy.then(() => {
                getOrderBefore().then((orderBefore) => {
                    getOrderAfter().then((orderAfter) => {
                        expect(orderBefore).to.deep.equal(orderAfter);
                    });
                });
            });
        });
    },
);
