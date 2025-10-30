import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { LoginPage } from '@/LoginPage/loginPage';
import { ComplianceAssessor } from '@/MaterialConsole/compilanceAssessor';
import { SearchSuppliers } from '@/Suppliers/SearchSuppliers';

describe(
    'Smoke Test ( 72:00 min ), Compliance Materials search: perform seacrh',
    {
        defaultCommandTimeout: 28000,
        tags: ['@smoke', '@greenLine', '@compliance'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('usernameComp'),
                Cypress.env('passwordComp'),
            );
            ComplianceAssessor.navigateToComplianceSearchPage();
        });

        it('Check the page for Compliance/Materials tab search-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), direct data slider', () => {
            ConditionSelectorHeaders.getTitle().should('equal', ' Compliance ');
            SearchSuppliers.colorOfSelectedSupplierTab('Materials').then(
                (background) => {
                    expect(background).to.equal(color.greenLight);
                },
            );

            // Check if DDL filters Criterion, Status, Country, According to are visible
            ConditionSelectorDDLForms.visibleDDLFilters(0).should('exist');
            ConditionSelectorDDLForms.visibleDDLFilters(1).should('exist');
            ConditionSelectorDDLForms.visibleDDLFilters(2).should('exist');
            ConditionSelectorDDLForms.visibleDDLFilters(3).should('exist');
            // Check if material designation field is visible
            CommonSearch.getMaterialDesignation().should('exist');
            // Check if Producer field is visible
            ConditionSelectorDDLForms.visibleProduceAndType(0).should('exist');
            ConditionSelectorDDLForms.visibleProduceAndType(1).should('exist');
            // Check if Standard dropdown is visible
            CommonSearch.getStandardDDL().should('exist');
            // check if Material group ddl is visible
            CommonSearch.getMaterialGroupDDL().should('exist');
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');
            // check titles for search filters Criterion, Status, Country, According to
            ComplianceAssessor.getConditionDDlFiltersTitles().then((title) => {
                expect(title.eq(0).text()).to.equal('Criterion');
                expect(title.eq(1).text()).to.equal('Status');
                expect(title.eq(2).text()).to.equal('Country');
                expect(title.eq(3).text()).to.equal('According to');
            });
            // Verify if condition filters (Criterion, Status, Country, According to) are selected "all" by default`
            ConditionSelectorHeaders.getSelectedOptionInDdl().each(
                ($status) => {
                    const textContent = $status.text();
                    expect(textContent).to.contain('All');
                },
            );
            // Verify if condition filters (Material Designation, Standard, Producer, Type, Material group) are selected "all" by default`
            JointsSearch.getSelectedOptionInDdl().then((statusOfFilters) => {
                expect(statusOfFilters.eq(1).text()).to.contain('All');
                expect(statusOfFilters.eq(2).text()).to.contain('All');
                expect(statusOfFilters.eq(3).text()).to.contain('All');
            });
        });
        it(`Check Type ddl it should be displayed some properties`, () => {
            const typeDDlList = [
                ' Bulk Materials ',
                ' Additive Manufacturing ',
                ' Adhesives ',
                ' Lubricants ',
            ];
            CommonSearch.getMaterialTypeItemList().should(
                'deep.equal',
                typeDDlList,
            );
            CommonSearch.getMaterialTypeDDL().type('{esc}');
            // });
            // it(`Check Material Group ddl it should be displayed some properties`, () => {
            cy.step(
                'Check Material Group ddl it should be displayed some properties',
            );
            const materialGroupDdlListList = [
                'Polymers',
                'Ceramics',
                'Composites',
                'Filler/Reinforcement',
                'Honeycombs',
                'Foams',
                'Lubricants',
                'Coolants',
            ];
            CommonSearch.getMaterialGroupDDL().click();
            CommonSearch.getItemsListInMaterialGroup().should(
                'deep.equal',
                materialGroupDdlListList,
            );
        });
        it(`Check Criterion ddl it should be displayed some properties`, () => {
            const criterionDdlListList = [
                'Biocompatibility',
                'Chemical Safety Compliance',
                'Conflict Minerals',
                'Drinking Water Contact',
                // 'ELVs (End of Life Vehicles)',
                'Food Contact',
                'Hazard Classification',
                'Packaging and Packaging Waste',
                'REACH',
                'RoHS (Restriction of Hazardous Substances)',
                'Safety of Toys',
                'Water Hazard Class (WGK)',
                'WEEE (Waste Electrical and Electronic Equipment)',
            ];
            ComplianceAssessor.getCriterionDdlList().should(
                'deep.equal',
                criterionDdlListList,
            );
        });
        it('Compliance Materials search-Choose from Material Group-Matrix, enter in Material Designation- carbon/Epoxy ,perform the search, it should it should show some results', () => {
            // wait for load all filters and type designation
            cy.intercept('GET', '*/compliance/search/filters').as('getFilters');
            // Wait for the GET request to complete
            cy.wait('@getFilters');

            CommonSearch.enterMaterialDesignation('carbon/epoxy');
            CommonSearch.selectMaterialGroups(['Composites'], ['Matrix']);
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Material Designation: carbon/epoxy )  AND  (  Material group: Matrix ) ',
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
            // });

            // it('Compliance Materials search-click on the 1st material from the list, it should lead you to Compliance page for selected material', () => {
            cy.step(
                'Compliance Materials search-click on the 1st material from the list, it should lead you to Compliance page for selected material',
            );
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            ConditionSelectorHeaders.getTitle().should('equal', 'Compliance');
            SearchSuppliers.colorOfSelectedSupplierTab('Materials').then(
                (background) => {
                    expect(background).to.equal(color.greenLight);
                },
            );
            // });
            // it('Compliance Materials search-turn back to Compliance/Materials search page, clear the search', () => {
            cy.step(
                'Compliance Materials search-turn back to Compliance/Materials search page, clear the search',
            );
            TabButtons.clickOnComplianceTab('Compliance');
            SearchSuppliers.colorOfSelectedSupplierTab('Materials').then(
                (background) => {
                    expect(background).to.equal(color.greenLight);
                },
            );
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Material Designation: carbon/epoxy )  AND  (  Material group: Matrix ) ',
            );
            CommonSearch.clearSearchFilters();
            cy.wait(1000);
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria',
            );
        });
        it('Compliance Materials search-choose from Criterion dropdown- Biocompatibility, perform the search, it should show more than 2000 results', () => {
            ConditionSelectorDDLForms.clickOnDDl(
                'Criterion',
                'Biocompatibility',
            );
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Criterion: Biocompatibility ) ',
            );
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
            // });
            // it('Compliance Materials search-click on the 1st material from the list and check property table(for Biocompatibility and his data) for default selected tab General', () => {
            cy.step(
                'Compliance Materials search-click on the 1st material from the list and check property table(for Biocompatibility and his data) for default selected tab General',
            );
            // ListOfMaterials.clickOnMaterialInList(0);
            ListOfMaterials.findMaterialNamePagination('Eltex MED PH23T630');
            ConditionSelectorHeaders.getTitle().should('equal', 'Compliance');
            const defaultpropertyTableColumnHeadersOptionOne = [
                'CRITERION',
                'STATUS',
                'NOTE',
                '',
            ];
            TabButtons.colorOfSelectedTabButton('General').should(
                'have.css',
                'background',
                'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
            );
            ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                cy.Compare_Arrays(
                    curentHeaders,
                    defaultpropertyTableColumnHeadersOptionOne,
                );
            });
            PropertyTable.findAndGetExemptionByName('Biocompatibility');
            PropertyTable.findAndGetExemptionByName('CompliantClass VI');
            PropertyTable.findAndGetExemptionByName('According to: USP');
            ComplianceAssessor.showFlagCompliance(3).should('exist');
        });
    },
);
