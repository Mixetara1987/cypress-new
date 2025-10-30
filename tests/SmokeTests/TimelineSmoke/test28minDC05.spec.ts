import { color } from 'cypress/fixtures/color';
import { Buttons } from '@/CommonMethods/Buttons';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { Bookmarks } from '@/HelpersMethods/Bookmarks';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { LoginPage } from '@/LoginPage/loginPage';
import { ReportBuilderModal } from '@/MaterialConsole/reportBuilderModal';

describe(
    'Smoke test 28 min, material-DC 05 (AFNOR NF), checking functionality on most pages (Formability, Cross Reff...)',
    { tags: ['@smoke', '@totalSearch'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(
            'Home page-enter `Dc05` in Material designation search field and perform the search, click on 1st material from the list, DC 05 AFNOR NF,' +
                ' it should automatically lead you to Mechanical Properties page, synthetic view should be selected by default,' +
                ' switch to details view, select all conditions from the list, check property table again, check also tooltips for first 2 references',
            () => {
                // Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
                CommonSearch.enterMaterialDesignation('Dc05');
                CommonSearch.clickSearchButton();
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    'DC 05',
                );
                RightMenu.colorORightMenuModuleLinks(
                    ' Mechanical Properties ',
                ).should('have.css', 'background-color', color.seablue);
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
                // select all conditions from the list, check proerty table again
                ConditionsSelectorDetailsView.clickOnCheckboxAllCondition();
                cy.wait(1000);
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'equal',
                    13,
                );
                // check for tooltips for references
                PropertyTable.mouseHoverToltipAndGetTextOptionTwo(1).then(
                    (tooltipText) => {
                        expect(tooltipText).to.contain(
                            'The tensile test values shall apply to longitudinal test pieces; For LC condition: If the yield point is not pronounced, the YS values apply to the 0.2% proof stress, otherwise to the lower yield strength (ReL); For 0.5 < t ≤ 0.7mm, 20 MPa higher max. values are permitted for the YS and HV values increase by 5 units; For t ≤ 0.5mm, 40 MPa higher maximum values are permitted for the YS and HV values increase by 10 units; For surface appearances MB and MC, the YS and TS values increase by 20MPa and the elongation after fracture values fall by 2 units and HV values increase by 5 units.',
                        );
                    },
                );
                cy.get('body').type('{esc}');
                // Helpers.clickSomeWhereOnThePage();
                PropertyTable.mouseHoverToltipAndGetTextOptionTwo(0).then(
                    (tooltipText) => {
                        expect(tooltipText).to.contain(
                            'When 0.5 < t ≤ 0.7 mm the value for YS increased by 20 MPa and the min. value for elongation is reduced by 2 units. For t ≤ 0.5 mm the value is increased by 40 MPa and for elongation value is reduced by 4 units.',
                        );
                    },
                );
                //     },
                // );
                // it('Mechanical Properties- scroll to top and try option to add to Material List Builder, enter in Description filed-`Mechanical Properties- DC 05` and save bookmark, a toast message should appear.', () => {
                cy.step(
                    'Mechanical Properties- scroll to top and try option to add to Material List Builder, enter in Description filed-`Mechanical Properties- DC 05` and save bookmark, a toast message should appear.',
                );
                cy.scrollTo('top');
                ConditionSelectorHeaders.clickOnAddToReportBuilder();
                ReportBuilderModal.clickOnAddtoReportBuilderModal();
                ReportBuilderModal.getTextInAlert().should(
                    'equal',
                    'Selected items successfully added to the report. Go to report... ',
                );
                Bookmarks.clickOnBookmarksPage(3);
                Bookmarks.enterTextInDescriptionModalBox(
                    'Mechanical Properties- DC 05',
                );
                Buttons.clickOnSaveBookmarkButton();
                // ReportBuilderModal.getTextInAlert().should('equal', 'Bookmark is succesfully saved.');
                Buttons.clickOnCancelButton();
            },
        );
    },
);
