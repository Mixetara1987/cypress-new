import { Coatings } from '@/Coatings/Coatings';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { Dimensions } from '@/Dimensions/dimensionsHome';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { StandardListHome } from '@/StandardList/standardListHome';
import { LoginPage } from '@/LoginPage/loginPage';
import { Helpers } from '@/HelpersMethods/helpers';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ModuleURLs } from 'cypress/fixtures/modules';
import { PropertyTable } from '@/HelpersMethods/propertyTable';

describe(
    'Smoke test 54 min, Standard list',
    { tags: ['@smoke', '@totalSearch', '@dataPlus'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(
            'Standard list-enter 77.14 in ICS Number search field, it should show some results, then clear the search, in Standard Description field' +
                ' enter:`specification for steel` in Standard dropdown search field enter-`ASTM` and choose that standard from the list and perform the search again.' +
                ' Click on R button for 1st standard from the list(ASTM A1011/A1011M), list of materials should reschedule. Then check for the number inside of the "M" box' +
                ' also for the 1st in the list(ASTM A1011/A1011M) and click on it, which should lead you to list with the same number of the materials.',
            () => {
                Helpers.totalMateriaNavigateTo(ModuleURLs.Main.StandardList);
                StandardListHome.enterStandardNumber('77.140');
                CommonSearch.clickSearchButton();
                CommonSearch.clearSearchFilters();
                StandardListHome.enterStandardDescription(
                    'specification for steel',
                );
                Helpers.clickOnFilterOption('--All--', [''], [' ASTM ']);
                CommonSearch.clickSearchButton();
                cy.wait(1000);

                cy.get('table.details-table tr').then((rows) => {
                    expect(rows.length).to.be.greaterThan(0);

                    StandardListHome.clickOnBlueButtonType('R');
                });
                StandardListHome.getNumberInBlueButtonType('M').then(
                    (numberOfMaterials) => {
                        const numberInMaterialsButton = numberOfMaterials
                            .text()
                            .split('M')[1]
                            .trim();
                        StandardListHome.clickOnBlueButtonType('M');
                        ListOfMaterials.getResultsFound().then(
                            (resultsFound) => {
                                const resultsInList = resultsFound
                                    .text()
                                    .split('Result(s) found:')[1]
                                    .trim();
                                expect(resultsInList).to.equal(
                                    numberInMaterialsButton,
                                );
                            },
                        );
                    },
                );
                //     },
                // );
                // it('Standard List-turn back to Standard list page, click on C button, for 20th in the list standard(ASTM A742/A742M) it should lead you to Coatings page', () => {
                TabButtons.clickOnTheTabs('Standard list');
                cy.wait(2000);
                StandardListHome.enterStandardNumber('A1003/A1003M');
                CommonSearch.clickSearchButton();
                StandardListHome.clickOnBlueButtonType('C'); // TODO not visible in test
                ConditionSelectorHeaders.getTitle().should('equal', 'Coatings');
                Coatings.getTitleOfPropertyTable(0).should(
                    'equal',
                    'Coating Weight (Mass) Requirements (Metallic Coatings)',
                );
                PropertyTable.findDataInTableCoatings('Type H and Type L');
                //     },
                // );
                // it('Standard List-turn back to Standard list page, click on D button for the 2nd in the list(ASTM A1035/A1035M), it should lead you to Dimensions page, turn back to Standard List page and clear the search', () => {
                TotalSearchHomePage.clickOnLeftArrowBack();
                CommonSearch.clearSearchFilters();
                StandardListHome.enterStandardNumber('A268/A268M');
                CommonSearch.clickSearchButton();
                StandardListHome.clickOnBlueButtonType('D');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Dimensions & Tolerances',
                );
                Dimensions.getNameOfPropertyTable(0).should(
                    'eq',
                    'Permissible Variations in Dimensions',
                    // TODO 'Permitted Variations in Size of Hot-Finished Round, Turned A and Square Bars',
                );
                const Thickness_Tolerances = 0;
                Dimensions.getHeaderTextInTable(Thickness_Tolerances).then(
                    (headerText) => {
                        expect(headerText.eq(0).text()).to.equal(
                            'Group', // TODO 'Specified Size, in. [mm]',
                        );
                        expect(headerText.eq(1).text()).to.equal(
                            'Size, Outside Diameter (in.)',
                        );
                        expect(headerText.eq(2).text()).to.equal(
                            'Permissible Variations in Outside (in.) Diameter',
                        );
                        expect(headerText.eq(4).text()).to.equal(
                            'Permissible Variations in Cut Length, in.B [mm]',
                        );
                        expect(headerText.eq(5).text()).to.equal(
                            'Thin-Walled TubesC',
                        );
                        expect(headerText.eq(9).text()).to.equal('Over');
                        expect(headerText.eq(10).text()).to.equal('Under');
                    },
                );
                TotalSearchHomePage.clickOnLeftArrowBack();
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Standard list',
                );
                CommonSearch.getStandardDDL()
                    .invoke('text')
                    .should('equal', 'United States/ASTM');
                StandardListHome.getStandardDescriptionValue().should(
                    'eq',
                    'specification for steel',
                );
                CommonSearch.clearSearchFilters();
                CommonSearch.getStandardDDL()
                    .invoke('text')
                    .should('equal', '--All--');
                StandardListHome.getStandardDescriptionValue().should('eq', '');
            },
        );
    },
);
