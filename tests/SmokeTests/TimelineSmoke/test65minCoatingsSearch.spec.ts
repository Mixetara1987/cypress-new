import { Helpers } from '@/HelpersMethods/helpers';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { color } from 'cypress/fixtures/color';
import { expectedListOfItemsInStandard } from 'cypress/fixtures/ddlTitles';
import { Coatings } from '@/Coatings/Coatings';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';

describe(
    'Smoke Test ( 65:00 min ), Coatings search',
    { tags: ['@smoke', '@dataPlus', '@coatings'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            Coatings.navigateTo();
            // wait for load all filters
        });

        it('Coatings search-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear)', () => {
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Data Plus Coatings',
            );
            TabButtons.colorOfSelectedMainTab('Coatings').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleLight);
                },
            );
            // check titles for search filters
            cy.wait(1000);
            ConditionSelectorHeaders.getConditionFiltersTitles().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Coating Designation');
                    expect(title.eq(1).text()).to.equal('Supplier');
                    expect(title.eq(2).text()).to.equal('Standard');
                    expect(title.eq(3).text()).to.equal('Standard Number');
                    expect(title.eq(4).text()).to.equal('Coating Group');
                    expect(title.eq(5).text()).to.equal('Coating Process');
                    expect(title.eq(6).text()).to.equal('Coating Property');
                },
            );
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');

            // Verify if condition filters 'Standard' are selected "all" by default`
            CommonSearch.getStandardDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            CommonSearch.getMaterialGroupDDL()
                .invoke('text')
                .then(($status) => {
                    expect($status).to.contain('All');
                });
            // });
            // it('Check for the functionality of DDL "Standard" (Click on it and check for the list in it).', () => {
            cy.step(
                'Check for the functionality of DDL "Standard" (Click on it and check for the list in it).',
            );

            CommonSearch.getItemsListInStandard().then(
                (currentListOfItemsInStandard) => {
                    cy.Compare_Arrays(
                        currentListOfItemsInStandard,
                        expectedListOfItemsInStandard,
                    );
                },
            );
            // });
            // it('Coatings search-enter 11 in Coating Designation, enter en in Standard dropdown and choose EN(European Union/EN) and perform the search, click on (ZF110 EN ) material, it should lead you to Coatings page for that material', () => {
            cy.step(
                'Coatings search-enter 11 in Coating Designation, enter en in Standard dropdown and choose EN(European Union/EN) and perform the search, click on (ZF110 EN ) material, it should lead you to Coatings page for that material',
            );
            Coatings.enterInSearchBoxField(0, '11'); // TODO frontend refactor
            // CommonSearch.enterMaterialDesignation('11');
            CommonSearch.selectStandards([' EN ']);
            CommonSearch.clickSearchButton();
            cy.wait(1000);
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Coating Designation: 11 )  AND  ( Country/Standard: European Union/EN ) ',
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
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            cy.wait(1000);
            ConditionSelectorHeaders.getTitle().should('includes', 'Coatings');
            ConditionsSelectorDetailsView.getTextSelectedInCondition().then(
                (dataInTable) => {
                    expect(dataInTable).contain(
                        'ReferenceEN 10327: 2004 / Continuously hot-dip coated strip and sheet of low carbon steels for cold forming - Technical delivery conditions',
                    );
                },
            );
            Coatings.clickOnTab('Table');
            Coatings.getTitleOfPropertyTable(0).should(
                'equal',
                'Available coating masses',
            );
            PropertyTable.findDataInTableCoatings('Coating designation');
            PropertyTable.findDataInTableCoatings(
                'Minimum coating mass a, total both surfacesg/m2',
            );
            PropertyTable.findDataInTableCoatings('Range c');
            PropertyTable.findDataInTableCoatings('Z200').should(
                'equal',
                'Z200',
            );
            PropertyTable.findDataInTableCoatings('170').should('equal', '170');
            PropertyTable.findDataInTableCoatings('≥ 10 ≤ 20').should(
                'equal',
                '≥ 10 ≤ 20',
            );
            Coatings.getTitleofNotes()
                .should('equal', 'Notes:')
                .should('exist');
        });
        it(
            'Coatings search-turn back to Coatings search page, prevously selected values should be there, clear the search, enter in standard Number field-11,' +
                ' choose from Coatings group-Cu-based, perform the search, it should show some results, check if in material group for material info,' +
                ' there is (Cu-based) and check if Table 1 tab is visible, turn back to Coatings search and clear the search',
            () => {
                cy.step(
                    'Coatings search-turn back to Coatings search page, prevously selected values should be there, clear the search, enter in standard Number field-11,' +
                        ' choose from Coatings group-Cu-based, perform the search, it should show some results, check if in material group for material info,' +
                        ' there is (Cu-based) and check if Table 1 tab is visible, turn back to Coatings search and clear the search',
                );
                TabButtons.clickOnTheTabs('Coatings');
                Coatings.enterInSearchBoxField(0, '11');
                CommonSearch.selectStandards([' EN ']);
                CommonSearch.clickSearchButton();
                cy.wait(2000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'contain',
                    'Selected search criteria (  Coating Designation: 11 )  AND  ( Country/Standard: European Union/EN ) ',
                );
                CommonSearch.clearSearchFilters();
                cy.wait(2000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );

                CommonSearch.selectMaterialGroups(
                    ['Inorganic coatings'],
                    ['Cu-based'],
                );
                CommonSearch.clickSearchButton();
                cy.wait(500);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Cu-based ) ',
                );
                cy.wait(500);
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                ListOfMaterials.showingFirst2000Message().then((message) => {
                    expect(message).to.contain('List of results too large');
                });
                cy.wait(1000);
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                MaterialInfo.findMaterialInfoValue(
                    `Coatings / Mixed coatingsCoatings / Inorganic coatings / Cu-basedCoatings / Inorganic coatings / Cr-basedCoatings / Inorganic coatings / Ni-based`,
                );
                TabButtons.colorOfSelectedTabButton('Composition').should(
                    'have.css',
                    'background-color',
                    color.pinkLight,
                );
                TabButtons.clickOnTab('Table');
            },
        );
        it(
            'Coatings search-choose from Coatings Process `Diffusion`, perform the search, it should show some results, click on the 1st materal from the list, it should lead you to' +
                ' Coatings page/ Material Description tab by default, check in property table if Coatings process is also Diffusion, finally turn back to Coatings page, clear the search',
            () => {
                cy.step(
                    'Coatings search-choose from Coatings Process `Diffusion`, perform the search, it should show some results, click on the 1st materal from the list, it should lead you to' +
                        ' Coatings page/ Material Description tab by default, check in property table if Coatings process is also Diffusion, finally turn back to Coatings page, clear the search',
                );
                CommonSearch.clearSearchFilters();
                Helpers.clickOnFilterOption(
                    'Coating Process',
                    [''],
                    ['Diffusion'],
                );
                CommonSearch.clickSearchButton();
                cy.wait(1500);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'includes',
                    'Diffusion',
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
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                TabButtons.colorOfSelectedTabButton(
                    'Material Description',
                ).should('have.css', 'background-color', color.pinkLight);
                Helpers.waitForloaderIfLoaderExist();
                PropertyTable.findSourcePropertyInTable(' Coating process ');
                PropertyTable.findSourceValueInTable('Diffusion');
            },
        );
        it('Coatings search-choose from Coatings Property `VOC`, perform the search, it should show some results, click on the 1st material from the list, change to Properties tab, check in Property column if there is displayed Volatile Organic Content(VOC)', () => {
            cy.step(
                'Coatings search-choose from Coatings Property `VOC`, perform the search, it should show some results, click on the 1st material from the list, change to Properties tab, check in Property column if there is displayed Volatile Organic Content(VOC)',
            );
            Helpers.clickOnFilterOption(
                'Coating Property',
                [''],
                ['Volatile Organic Compound Content (VOC)'],
            );
            cy.wait(1500);
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'includes',
                'Volatile Organic Compound Content (VOC)',
            );
            cy.wait(500);
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
            TabButtons.colorOfSelectedTabButton('Material Description').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            TabButtons.clickOnTab('Properties');
            TabButtons.colorOfSelectedTabButton('Properties').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            const defaultpropertyTableColumnHeaders = [
                ' Property ',
                ' T(°C) ',
                ' Value ',
                ' Unit ',
                ' Note ',
                '',
            ];
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaders,
                    );
                },
            );
            PropertyTable.findPropertyNameInTable(
                'Volatile Organic Compound Content (VOC)',
            );
        });
    },
);
