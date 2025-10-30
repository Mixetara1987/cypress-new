import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';
import { _304_SAE } from 'cypress/fixtures/materials';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CrossReference } from '@/Cross-Reference/CrossReference';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';

const all = 0;
const identical = 1;
const official = 2;
const composition_100 = 3;
const other_sources = 4;
const implicit = 5;
const smart_cross = 6;

function getResultsFound() {
    return cy
        .get('.cross-reference-results')
        .find('.results')
        .should('be.visible')
        .then((results) => {
            return results.text();
        });
}

function checkVisibilityOfHeadersInList() {
    ListOfMaterials.getTableHeaders().then((headerValues) => {
        const headerTitles = headerValues.text();
        expect(headerTitles).contain('Material');
        expect(headerTitles).contain('Standard');
        expect(headerTitles).contain('Country / Producer');
        expect(headerTitles).contain('Equivalence category');
    });
}

function checkResultsByTabs(tabName: string) {
    TabButtons.getNumberOnButton(tabName).then((numberInButton) => {
        TabButtons.clickOnButton(tabName);
        getResultsFound().then((results) => {
            expect(results.split('Result(s) found:')[1].trim()).to.equal(
                numberInButton,
            );
        });
    });
}

describe(
    'Smoke test - Cross Reference Table - test material 304 (SAE)',
    { tags: ['@smoke', '@totalSearch'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Check for visibility for tabs (All, Identical, Official, Composition 100%, Other Sources, Implicit, SmartCross), then check the tooltips on them.', () => {
            Helpers.totalMateriaNavigateTo(
                ModuleURLs.Material.CrossReference,
                _304_SAE.id,
            );
            CrossReference.getTitlesInTabs().then((titlesOfTabs) => {
                cy.Compare_Arrays(titlesOfTabs, [
                    'All',
                    'Identical',
                    'Official',
                    'Composition 100%',
                    'Other Sources',
                    'Implicit',
                    'SmartCross',
                ]);
            });
            CrossReference.mouseHoverToltipAndGetText(identical).should(
                'contain',
                'What is the meaning of these tabs?Identical - Materials explicitly defined as identical' +
                    ' by SDOs.Click here to read more details about Total Materia cross-reference tables categorization.',
            );
            CrossReference.mouseHoverToltipAndGetText(all).should(
                'contain',
                'What is the meaning of these tabs?All - Displays all materials together.Click here to read' +
                    ' more details about Total Materia cross-reference tables categorization.',
            );
            CrossReference.mouseHoverToltipAndGetText(official).should(
                'contain',
                'What is the meaning of these tabs?Official - Equivalents given by the SDOs.',
            );
            CrossReference.mouseHoverToltipAndGetText(composition_100).should(
                'contain',
                'What is the meaning of these tabs?Composition 100% - ' +
                    'Alloys which have 100% identical chemical composition',
            );
            CrossReference.mouseHoverToltipAndGetText(other_sources).should(
                'contain',
                'What is the meaning of these tabs?Other Sources - Producers',
            );
            CrossReference.mouseHoverToltipAndGetText(implicit).should(
                'contain',
                'What is the meaning of these tabs?Implicit - Equivalents defined in a transitional form.',
            );
            CrossReference.mouseHoverToltipAndGetText(smart_cross).should(
                'contain',
                'What is the meaning of these tabs?Smart Cross - Generate global cross-references based on fuzzy sets.',
            );
            // });

            // it('Click on the tab SmartCross, a list with materials and sliders "SELECT SIMILARITY THRESHOLD" and "CHEMICAL VS MECHANICAL" should appear.', () => {
            cy.step(
                'Click on the tab SmartCross, a list with materials and sliders "SELECT SIMILARITY THRESHOLD" and "CHEMICAL VS MECHANICAL" should appear.',
            );
            TabButtons.clickOnButton('SmartCross');
            CrossReference.issmartCrossSlidersVisible(0).should(
                'equal',
                ' Select similarity threshold ',
            );
            CrossReference.issmartCrossSlidersVisible(1).should(
                'equal',
                ' Chemical vs Mechanical ',
            );
            CommonSearch.clickSearchButton();
            checkVisibilityOfHeadersInList();
            // });

            // it('Click on the tab Composition 100%, the list with the same number of materials as in the tab button will appear.', () => {
            cy.step(
                'Click on the tab Composition 100%, the list with the same number of materials as in the tab button will appear.',
            );

            checkResultsByTabs('Composition 100%');
            checkVisibilityOfHeadersInList();
            // });

            // it('Click on the tab Official, the list with the same number of materials as in the tab button will appear.', () => {
            cy.step(
                'Click on the tab Official, the list with the same number of materials as in the tab button will appear.',
            );
            checkResultsByTabs('Official');
            checkVisibilityOfHeadersInList();
            // });

            // it('Click on the tab Implicit, the list with the same number of materials as in the tab button will appear.', () => {
            cy.step(
                'Click on the tab Implicit, the list with the same number of materials as in the tab button will appear.',
            );
            checkResultsByTabs('Implicit');
            checkVisibilityOfHeadersInList();
            // });

            // it('Click on the tab Identical, the list with the same number of materials as in the tab button will appear.', () => {
            cy.step(
                'Click on the tab Identical, the list with the same number of materials as in the tab button will appear.',
            );
            checkResultsByTabs('Identical');
            checkVisibilityOfHeadersInList();
            // });

            // it('Click on the tab Other Sources, the list with the same number of materials as in the tab button will appear.', () => {
            cy.step(
                'Click on the tab Other Sources, the list with the same number of materials as in the tab button will appear.',
            );
            checkResultsByTabs('Other Sources');
            checkVisibilityOfHeadersInList();
            // });

            // it('Check for fuctionalty of COUNTRY / STANDARD DDL, select first standard in list and check for changing results in list.', () => {
            cy.step(
                'Check for fuctionalty of COUNTRY / STANDARD DDL, select first standard in list and check for changing results in list.',
            );
            TabButtons.clickOnButton('All');
            getResultsFound().then((results) => {
                CommonSearch.selectStandards([' Argentina ']);
                getResultsFound().then((resultsAfterSelectingStandard) => {
                    expect(
                        results.split('Result(s) found:')[1].trim(),
                    ).not.to.equal(resultsAfterSelectingStandard);
                });
            });
            checkVisibilityOfHeadersInList();
        });
    },
);
