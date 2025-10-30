import { Buttons } from '@/CommonMethods/Buttons';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { Predictor } from '@/Predictor';
import { SmartComp } from '@/SmartComp/SmartComp';
import { SmartCompChemicalComposition } from '@/SmartComp/SmartCompChemicalComposition';
import { WelcomePage } from '@/WelcomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';

describe(
    'Smoke test Predictor, Composition tab',
    { tags: ['@smoke', '@predictor'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Go to the Predictor page, Material should be default one, switch to Composition tab', () => {
            TotalSearchHomePage.clickOnPredictor();
            Predictor.getProgresBar().should(
                'equal',
                ' Step 1/4Material composition',
            );
            CommonSearch.getSelectedMaterialGroups().then(
                (textInMaterialGroup) => {
                    expect(textInMaterialGroup.text()).to.be.equal(
                        'Material group',
                    );
                },
            );
            CommonSearch.getSelectedStandards().then((textInStandard) => {
                expect(textInStandard.text()).to.be.equal('Standard');
            });
            Predictor.clickOnPredictorTab(1);
            Predictor.colorOfSelectedPredictorTab('Composition')
                .should('have.css', 'border')
                .and('include', 'rgb(160, 96, 229)');

            // });
            // it(
            //     'Switch base element to Fe,  enter some values and go to the next step(2/4) then click on Predict button, it should lead you to 4th final step,' +
            //         ' Module prediction should be visible. Click on Save button, it should be functional. Save the Prediction.',
            //     () => {
            cy.step(
                'Switch base element to Fe,  enter some values and go to the next step(2/4) then click on Predict button, it should lead you to 4th final step,' +
                    ' Module prediction should be visible. Click on Save button, it should be functional. Save the Prediction.',
            );
            cy.wait(2000);
            SmartComp.clickOnBaseElement(3);
            SmartComp.getBaseElement().should('equal', 'Fe');
            SmartCompChemicalComposition.enterValue('Ag', ' 0.5');
            SmartCompChemicalComposition.enterValue('Al', ' 0.23');
            SmartCompChemicalComposition.enterValue('Cr', ' 0.0126');
            SmartCompChemicalComposition.enterValue('Mn', ' 1.22');
            SmartCompChemicalComposition.enterValue('P', ' 1.2354');
            SmartCompChemicalComposition.enterValue('S', ' 0.522');
            Predictor.clikOnNextStepButton();
            Predictor.getProgresBar().should('equal', ' Step 2/4Select model');
            ListOfMaterials.clickOnMaterialCheckboxPredictor(2);
            Helpers.clickOnFilterOption('Property', [''], ['Tensile Strength']);
        });

        xit('Check if Model Prediction is visible, click on Save button, window will pop out, save prediction, it should be functional', () => {
            Predictor.checkProductResult().should('be.visible');
            Predictor.clikOnNextStepButton();
            WelcomePage.showPopUpWindow().should('be.visible');
            SmartComp.getImportTitle().should('equal', 'Save Prediction');
            Buttons.clickOnSaveSearchButton();
            WelcomePage.showPopUpWindow().should('not.exist');
        });
        xit('Turn back to step 1/4 Material Composition and clear the search, it should be functional.', () => {
            Predictor.clickOnLinkedStep('Step 1');
            Predictor.getProgresBar().should(
                'equal',
                ' Step 1/4Material composition',
            );
            Predictor.clickOnClearAllButton();
            SmartCompChemicalComposition.getValue('Ag').should('equal', '');
        });
    },
);
