import { color } from 'cypress/fixtures/color';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke Test ( 66:00 min ), Tribology search',
    { tags: ['@smoke', '@dataPlus', '@tribology'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.Tribology);
        });

        it('Tribology search-check if all filters are visible and their titles and which are preselected`All` by default, buttons(search, clear)', () => {
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Data Plus Tribology',
            );
            TabButtons.colorOfSelectedMainTab('Tribology').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleLight);
                },
            );
            // Check if material designation field is visible
            CommonSearch.getMaterialDesignation().should('exist');

            // Check if Standard dropdown is visible
            CommonSearch.getStandardDDL().should('exist');

            // Check if Producer and Type field is visible
            ConditionSelectorDDLForms.visibleProduceAndType(0).should('exist');
            ConditionSelectorDDLForms.visibleProduceAndType(1).should('exist');

            // check if Material group ddl is visible
            CommonSearch.getMaterialGroupDDL().should('exist');

            // check titles for search filters
            ConditionSelectorHeaders.getConditionFiltersTitles().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Material Designation');
                    expect(title.eq(1).text()).to.equal('Standard');
                    expect(title.eq(2).text()).to.equal('Producer');
                    expect(title.eq(3).text()).to.equal('Type');
                    expect(title.eq(4).text()).to.equal('Material group');
                },
            );
            // Verify if condition filters are selected "all" by default for Standard, Type and Material group
            CommonSearch.getStandardDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            CommonSearch.getMaterialTypeDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            cy.wait(700);
            CommonSearch.getMaterialGroupDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');

            // check if Direct Data only slider is visible
            Sliders.IsOnDirectDataOnlySliderVisible().should('exist');
            const expectedListOfItemsInMaterialGroup = [
                'Ferrous Alloys',
                'Nonferrous Alloys',
                'Polymers',
                'Ceramics',
                'Composites',
                'Foams',
            ];
            CommonSearch.getMaterialGroupDDL().click();
            CommonSearch.getItemsListInMaterialGroup().then(
                (currentListOfItemsInMaterialGroup) => {
                    cy.Compare_Arrays(
                        currentListOfItemsInMaterialGroup,
                        expectedListOfItemsInMaterialGroup,
                    );
                },
            );
            const expectedListOfItemsType = [
                ' Bulk Materials ',
                ' Additive Manufacturing ',
                ' Adhesives ',
            ];
            CommonSearch.getMaterialTypeItemList().then(
                (currentListOfTypeDDl) => {
                    cy.Compare_Arrays(
                        currentListOfTypeDDl,
                        expectedListOfItemsType,
                    );
                },
            );
        });
        it(
            'Tribology search-check for the functionality of DDL "Material group" (Click on it and check for the list in it), it should contains-Ferrous, NonFerrous, Polymers, Ceramics, Composites and Foams.,' +
                '(Click on it and check for the list in it), choose Additive Manufacturing from Type ddl, direct data-on, perform the search, it should show some results',
            () => {
                // Tribology search-choose Additive Manufacturing from Type ddl, direct data-on, perform the search, it should show some results

                CommonSearch.selectMaterialType(' Additive Manufacturing ');
                Sliders.clickOnDirectDataOnlySlider();
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Type: Additive Manufacturing )  AND  (  Direct data only )  ',
                );
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
                //     },
                // );
                // it('Tribology search-click on 1st material from the list(1.2079 Proprietary), it should lead you to Tribology page for this material, check if property table is visible', () => {
                cy.step(
                    'Tribology search-click on 1st material from the list(1.2079 Proprietary), it should lead you to Tribology page for this material, check if property table is visible',
                );
                const defaultpropertyTableColumnHeaders = [
                    ' Property ',
                    ' T(°C) ',
                    ' Value ',
                    ' Unit ',
                    ' Note ',
                    '',
                ];
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Tribology',
                );
                TabButtons.colorOfSelectedMainTab('Tribology').then(
                    (background) => {
                        expect(background).to.equal(color.purpleLight);
                    },
                );
                cy.wait(1000);
                ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );
                // });
                // it('Tribology search-turn back to Formability search page, Direct Data-ON and 3D Materials should stayed as selected in Type ddl', () => {
                cy.step(
                    'Tribology search-turn back to Formability search page, Direct Data-ON and 3D Materials should stayed as selected in Type ddl',
                );
                TabButtons.clickOnTheTabs('Tribology');
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Type: Additive Manufacturing )  AND  (  Direct data only )  ',
                );
                // Tribology search-clear the search by clicking on Clear button, it should be functional
                CommonSearch.clearSearchFilters();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
            },
        );
        it('Tribology search-type `en` in Standard dropdown list, choose European Union/EN, perform the search, it should show more than 2000 results', () => {
            CommonSearch.selectStandards(['EN']);

            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria ( Country/Standard: European Union/EN ) ',
            );
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
        });
    },
);
