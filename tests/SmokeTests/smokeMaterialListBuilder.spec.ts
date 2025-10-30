import { AdvancedHome } from '@/AdvancedSearch/advancedSearchHome';
import { ComparisonViewHome } from '@/ComparisonView/comparisonViewHome';
import { EquivalentsFinder } from '@/EquivalentsFinder/equivalentsFinderHome';
import { ForwardedSearch } from '@/ForwardedSearch/forwardedSearch';
import { ExtendedRangeSearchFilter } from '@/HelpersMethods/extendedRange';
import { Helpers } from '@/HelpersMethods/helpers';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { ComplianceAssessor } from '@/MaterialConsole/compilanceAssessor';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { MaterialListBuilder } from '@/MaterialConsole/materialListBuilder';
import { LoginPage } from '@/LoginPage/loginPage';
import { CommonSearch } from '@/CommonMethods/CommonSearch';

function goToMaterialConsole() {
    cy.get('.navbar-nav').eq(1);
    cy.contains('span', 'Material Console').should('be.visible').click();
}

describe(
    `Material List Builder - test material 1100`,
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

        it('Go to the Material Console, in the Material List Builder is the message "No item in the material list ..." if the user is not added material.', () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            cy.get('body')
                .should('be.visible')
                .then((page) => {
                    if (page.find('[ref="eHeaderViewport"]').length) {
                        cy.get('[ref="eHeaderViewport"]')
                            .find('ag-header-cell')
                            .find('[role="presentation"][ref="cbSelectAll"]')
                            .click();
                        ListOfMaterials.clickOnDelete();
                        ComparisonViewHome.ClickOnYesInModal();
                    }
                });
            MaterialListBuilder.getLabelIfNoMaterials().should(
                'equal',
                'No item in the Material List',
            );
            MaterialListBuilder.getMessageIfNoMaterials().should(
                'equal',
                'You can add items from material details page or from any material list.',
            );
        });

        it(
            'Search for material 1100 and add 6 materials to Material List Builder ( from list of materials ) then' +
                ' go to Material List Builder, the number of results in the list is 6 (Result(s) found: 6).',
            () => {
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.enterMaterialDesignation('1100');
                CommonSearch.clickSearchButton();
                ListOfMaterials.checkRowByMaterialStandard(
                    '1100',
                    'AA',
                    'United States',
                );
                ListOfMaterials.checkRowByMaterialStandard(
                    '1100',
                    'AFNOR NF',
                    'France',
                );
                ListOfMaterials.checkRowByMaterialStandard(
                    '1100',
                    'AS',
                    'Australia',
                );
                ListOfMaterials.checkRowByMaterialStandard(
                    '1100',
                    'CNS',
                    'China',
                );
                ListOfMaterials.checkRowByMaterialStandard(
                    '1100',
                    'GOST',
                    'Russia',
                );
                ListOfMaterials.checkRowByMaterialStandard(
                    '1100',
                    'ISO',
                    'International',
                );
                ListOfMaterials.clickOnAddToMaterialListBuilder();
                MaterialConsole.closeGreenMessage();
                TotalSearchHomePage.clickOnMaterialConsole();
                cy.wait(400);
                MaterialListBuilder.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.equal('Result(s) found: 6');
                });
                //     },
                // );

                // it('Add materials to the Comparison View by Materials and check for added materials number of added materials should be "6" then clear materials from the Comparison View by Materials.', () => {
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.addToComparisonView('Materials');
                MaterialConsole.closeGreenMessage();
                ComparisonViewHome.getNumberInLink('Materials').should(
                    'equal',
                    ' 6 ',
                );
                goToMaterialConsole();
                // });

                // it('Add materials to the Comparison View by Properties and check for added materials number of added materials should be "6" then clear materials from the Comparison View by Properties.', () => {
                TotalSearchHomePage.clickOnMaterialConsole();
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.addToComparisonView('Properties');
                ComparisonViewHome.getNumberInLink('Properties').should(
                    'equal',
                    ' 6 ',
                );
                goToMaterialConsole();
                // });

                // it('Add materials to the Comparison View by Analytics and check for added materials number of added materials should be "6".', () => {
                TotalSearchHomePage.clickOnMaterialConsole();
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.addToComparisonView('Analytics');
                ComparisonViewHome.getNumberInLink('Analytics').should(
                    'equal',
                    ' 6 ',
                );
                goToMaterialConsole();
                // });

                // it('Add materials to the Compliance Assessor and check for added materials number of added materials should be "6" then clear material from the Compliance Assessor.', () => {
                TotalSearchHomePage.clickOnMaterialConsole();
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.addToOldComplianceAssessor();
                MaterialConsole.closeGreenMessage();
                cy.wait(300);
                ComplianceAssessor.getTitle().should(
                    'equal',
                    ' Compliance Assessor 6',
                );
                EquivalentsFinder.clickOnClearAll();
                ComplianceAssessor.getTextInModalMessage().should(
                    'equal',
                    'Are you sure that you want to clear all from the Compliance Assessor?' +
                        ' This will remove all the materials from the list and clear all the assessment results.',
                );
                ComplianceAssessor.clickOnYESinModal();
                goToMaterialConsole();
                //     },
                // );

                // it('Check for functionaliti of "Save" button.', () => {
                TotalSearchHomePage.clickOnMaterialConsole();
                MaterialListBuilder.clickOnSave();
                MaterialListBuilder.getModalMessage().should(
                    'equal',
                    'Create a new listAdd materials to the existing listName:Description:',
                );
                MaterialListBuilder.inModalDialogEnterName(
                    'smoke tests Material List Builder',
                );
                MaterialListBuilder.inModalDialogEnterDescription(
                    'These materials are for testing.',
                );
                MaterialListBuilder.clickOnSaveInModal();
                cy.get('.toast-container').should(
                    'contain.text',
                    'Material list is successfully saved',
                );
            },
        );

        it(
            'Check the functionality of the "Forward to..." button, try to forward the material list from Material List Builder to Advanced Search, Stress-strain,' +
                ' Formability, Fatigue Data, Fracture Mechanics, Creep Data, Corrosion, Dimensions and Joints.',
            { defaultCommandTimeout: 30000 },
            () => {
                TotalSearchHomePage.clickOnMaterialConsole();
                MaterialConsole.clickOnMaterialListBuilder();
                // load from material list to MLB
                MaterialListBuilder.clickOnSeeAllSavedLists();
                MaterialConsole.getTitle().should('equal', 'My Console');
                cy.get('[role="row"]')
                    .contains('div', 'These materials are for testing.')
                    .should('be.visible')
                    .siblings('[col-id="checkbox"]')
                    .find('.ag-selection-checkbox')
                    .click()
                    .parents('div[role="row"]')
                    .find('[role="gridcell"][col-id="add"]')
                    .click();

                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Advanced Search ');
                Helpers.waitForloaderIfLoaderExist();
                AdvancedHome.getModalTitle().then((title) => {
                    expect(title.text()).to.be.equal(
                        ' Advanced Search - Add criteria ',
                    );
                });
                AdvancedHome.closeModal();
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
                // Forward to...
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Stress strain ');
                Helpers.waitForloaderIfLoaderExist();
                cy.url().should('include', 'extended-range/stress-strain');
                ExtendedRangeSearchFilter.getTitleExtendedRange().should(
                    'eq',
                    ' Extended Range Stress Strain Diagrams',
                );
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
                // Forward to...
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Formability ');
                Helpers.waitForloaderIfLoaderExist();
                cy.url().should('include', 'extended-range/formability');
                ExtendedRangeSearchFilter.getTitleExtendedRange().should(
                    'eq',
                    ' Extended Range Formability',
                );
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
                // forward to...
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Fatigue Data ');
                Helpers.waitForloaderIfLoaderExist();
                cy.url().should('include', 'extended-range/fatigue-data');
                ExtendedRangeSearchFilter.getTitleExtendedRange().should(
                    'eq',
                    ' Extended Range Fatigue Data',
                );
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
                // forward to...
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Fracture Mechanics ');
                Helpers.waitForloaderIfLoaderExist();
                cy.url().should('include', 'extended-range/fracture-mechanics');
                ExtendedRangeSearchFilter.getTitleExtendedRange().should(
                    'eq',
                    ' Extended Range Fracture Mechanics',
                );
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
                // forward to...
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Corrosion ');
                Helpers.waitForloaderIfLoaderExist();
                cy.url().should('include', 'enviro/corrosion');
                ExtendedRangeSearchFilter.getTitleExtendedRange().should(
                    'eq',
                    ' Enviro Corrosion',
                );
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
                // forward to...
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Dimensions ');
                Helpers.waitForloaderIfLoaderExist();
                cy.url().should('include', 'data-plus/dimensions');
                ExtendedRangeSearchFilter.getTitleExtendedRange().should(
                    'eq',
                    ' Data Plus Dimensions & Tolerances',
                );
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
                // forward to...
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Joints ');
                Helpers.waitForloaderIfLoaderExist();
                cy.url().should('include', 'data-plus/joints');
                ExtendedRangeSearchFilter.getTitleExtendedRange().should(
                    'eq',
                    ' Data Plus Joints',
                );
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
                // forward to...
                ListOfMaterials.clickOnCheckboxAll();
                ListOfMaterials.clickOnForwardTo(' Creep Data ');
                Helpers.waitForloaderIfLoaderExist();
                cy.url().should('include', 'extended-range/creep-data');
                ExtendedRangeSearchFilter.getTitleExtendedRange().should(
                    'eq',
                    ' Extended Range Creep Data',
                );
                ForwardedSearch.getTextInforwardedSearchParameters().should(
                    'equal',
                    'Forwarded search parametersMaterial List Builder (6 materials) Remove ',
                );
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnMaterialConsole();
            },
        );

        it('Click on "See all saved lists", app leads to "My console"', () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            MaterialListBuilder.clickOnSeeAllSavedLists();
            MaterialConsole.getTitle().should('equal', 'My Console');
            cy.get('[role="row"]')
                .contains('div', 'These materials are for testing.')
                .should('be.visible')
                .siblings('[col-id="checkbox"]')
                .find('.ag-selection-checkbox')
                .click()
                .get('button')
                .contains('span', 'Delete')
                .click();
            ComplianceAssessor.clickOnYESinModal();
            MaterialConsole.clickOnMaterialListBuilder();
        });
    },
);
