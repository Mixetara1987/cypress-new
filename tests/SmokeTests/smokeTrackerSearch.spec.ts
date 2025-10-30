import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { Tracker } from '@/Tracker/Tracker';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';

const update = 0;
const property = 1;

describe('Smoke test Tracker search', { tags: ['@smoke', '@tracker'] }, () => {
    beforeEach(() => {
        LoginPage.loginUser(
            Cypress.env('environmentLoginUrl'),
            Cypress.env('username'),
            Cypress.env('password'),
        );
    });

    it(
        'Tracker search page-Material Designation-SA-336-GRADE F321H, Standard-ASME ,Type-Bulk, Material group-Stainless steels,' +
            'Update-2023-08, Property group-Composition and perform the search, add Clasification column in the List of materials' +
            'and check if all searched criteria are in List of materials(name of material, Standard, Material group, update, classification)',
        () => {
            Tracker.navigateToTrackerSearchPage();
            TabButtons.colorOfSelectedMainTab('Tracker').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.redTracker);
                },
            );
            CommonSearch.enterMaterialDesignation('SA-336 Grade F321H');
            CommonSearch.selectStandards([' ASME ']);
            CommonSearch.selectMaterialType(' Bulk Materials ');
            // TODO check and remove redudant selectType method
            // CommonSearch.selectMaterialType('Bulk Materials');
            CommonSearch.selectMaterialGroups(
                ['Ferrous Alloys'],
                ['Stainless steels'],
            );
            ConditionSelectorDDLForms.clickOnUpdateAnPropertyGroupTrackerDDL(
                update,
                '2023-08',
            );
            ConditionSelectorDDLForms.clickOnUpdateAnPropertyGroupTrackerDDL(
                property,
                'Composition',
            );
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Material Designation: SA-336 Grade F321H )  AND  ( Country/Standard: United States/ASME )  AND  (  Type: Bulk Materials )  AND  (  Material group: Stainless steels )  AND  (  Update: 2023-08 )  AND  (  Property group: Composition ) ',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Update');
            });
            const addClassification = 'Classification';
            ListOfMaterials.clickOnAddPropertyCheckbox(addClassification);
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Update');
                expect(headerTitles).contain('Classification');
            });
            // Tracker.getClassificationFromRow(0).should('equal', 'Ferrous Alloys / Stainless steels');
            ListOfMaterials.getRowByMaterialAndStandard(
                'SA-336 Grade F321H',
                'ASME',
            )
                .invoke('text')
                .should('contain', 'SA-336 Grade F321H')
                .and('contain', 'ASME')
                .and('contain', 'United States')
                .and('contain', '2023-08')
                .and('contain', 'Ferrous Alloys / Stainless steels');
            //     },
            // );
            // it(
            //     'Click on the material from the list, it should lead you to Tacker page, check if Composition is default tab and check in Material card info for tracker is Composition displayed also,' +
            //         ' finally check if property data is displayed',
            //     () => {
            cy.step(
                'Click on the material from the list, it should lead you to Tacker page, check if Composition is default tab and check in Material card info for tracker is Composition displayed also,' +
                    ' finally check if property data is displayed',
            );
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            TabButtons.colorOfSelectedTabButton('Composition').should(
                'have.css',
                'background-color',
                color.pinkLightPale,
            );
            MaterialInfo.getMaterialDetailsTabBody(3).should(
                'equal',
                'Last update 2023-08Composition',
            );
            Tracker.getPropertyValue('Ti (%)').should('equal', 'Ti (%)');
            Tracker.getPropertyValue('Inserted value').should(
                'equal',
                'Inserted value',
            );
        },
    );
    it(
        'Turn back to Tracker search page, clear the search, Material Designation-A 240 S31740, Standard-ASTM, Type-Bulk, Material group-Stainless steels, Update-2023-08, Property group-Mechanical Properties and perform the search,' +
            'add Clasification',
        () => {
            TotalSearchHomePage.clickOnTracker();
            TabButtons.colorOfSelectedMainTab('Tracker').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.redTracker);
                },
            );
            cy.wait(1000);
            CommonSearch.clearSearchFilters();
            cy.wait(1000);
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria',
            );
            // Tracker.navigateToTrackerSearchPage();
            CommonSearch.enterMaterialDesignation('A 240 S31740');
            CommonSearch.selectStandards([' ASTM ']);
            CommonSearch.selectMaterialType(' Bulk Materials ');
            CommonSearch.selectMaterialGroups(
                ['Ferrous Alloys'],
                ['Stainless steels'],
            );
            ConditionSelectorDDLForms.clickOnUpdateAnPropertyGroupTrackerDDL(
                update,
                '2023-08',
            );
            ConditionSelectorDDLForms.clickOnUpdateAnPropertyGroupTrackerDDL(
                property,
                'Mechanical Properties',
            );
            cy.wait(1000);
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Material Designation: A 240 S31740 )  AND  ( Country/Standard: United States/ASTM )  AND  (  Type: Bulk Materials )  AND  (  Material group: Stainless steels )  AND  (  Update: 2023-08 )  AND  (  Property group: Mechanical Properties ) ',
            );
        },
    );
    it(
        'Turn back to Tracker search page, clear the search, Material Designation-A 240 S31740, Standard-ASTM, Type-Bulk, Material group-Stainless steels, Update-2023-08, Property group-Mechanical Properties and perform the search,' +
            ' click on the material from the list, it should lead you Tracker page on Mechanical Properties tab, check data in property table beneath',
        () => {
            TotalSearchHomePage.clickOnTracker();
            cy.wait(500);
            CommonSearch.clearSearchFilters();
            cy.wait(1200);
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria',
            );
            // Tracker.navigateToTrackerSearchPage();
            CommonSearch.enterMaterialDesignation('A 240 S31740');
            CommonSearch.selectStandards([' ASTM ']);
            CommonSearch.selectMaterialType(' Bulk Materials ');
            CommonSearch.selectMaterialGroups(
                ['Ferrous Alloys'],
                ['Stainless steels'],
            );
            ConditionSelectorDDLForms.clickOnUpdateAnPropertyGroupTrackerDDL(
                update,
                '2023-08',
            );
            ConditionSelectorDDLForms.clickOnUpdateAnPropertyGroupTrackerDDL(
                property,
                'Mechanical Properties',
            );
            cy.wait(500);
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Material Designation: A 240 S31740 )  AND  ( Country/Standard: United States/ASTM )  AND  (  Type: Bulk Materials )  AND  (  Material group: Stainless steels )  AND  (  Update: 2023-08 )  AND  (  Property group: Mechanical Properties ) ',
            );
            cy.wait(500);
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Update');
            });
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            TabButtons.colorOfSelectedTabButton('Mechanical Properties').should(
                'have.css',
                'background-color',
                color.pinkLightPale,
            );
            const defaultHeadersMehcanical = [
                ' Property ',
                ' Note ',
                ' T (°C) ',
                ' Status ',
                ' Field ',
                ' Old value ',
                ' New value ',
            ];
            Tracker.getColumnHeadersOptionOne().then((curentHeaders) => {
                cy.Compare_Arrays(curentHeaders, defaultHeadersMehcanical);
            });

            Tracker.getTextInReference(0).then((textInReference) => {
                const stringInReference = textInReference;
                expect(stringInReference).to.equal(
                    'As ReceivedReference: A240/A240M: 2024 / Standard Specification for Chromium and Chromium-Nickel Stainless Steel Plate, Sheet, and Strip for Pressure Vessels and for General Applications',
                );
            });
            // check for the data in table
            Tracker.getPropertyValue('Elongation, A (%)').should(
                'equal',
                'Elongation, A (%)',
            );
            // Tracker.getPropertyValue('').should('equal', ''); TODO CypressError: `cy.contains()` cannot be passed an empty string.
            Tracker.getPropertyValue('RT').should('equal', 'RT');
            Tracker.getPropertyValue('Inserted value').should(
                'equal',
                'Inserted value',
            );
            Tracker.getPropertyValue('Comment').should('equal', 'Comment');
            // Tracker.getPropertyValue('').should('equal', ''); TODO CypressError: `cy.contains()` cannot be passed an empty string.
            Tracker.getPropertyValue('L0 = 50 mm').should(
                'equal',
                'L0 = 50 mm',
            );
        },
    );
});
