import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { color } from 'cypress/fixtures/color';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CompositionPropertyTable } from '@/Composition/CompositionPropertyTable';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { Tracker } from '@/Tracker/Tracker';

describe('Smoke test Tracker', { tags: ['@smoke', '@tracker'] }, () => {
    beforeEach(() => {
        LoginPage.loginUser(
            Cypress.env('environmentLoginUrl'),
            Cypress.env('username'),
            Cypress.env('password'),
        );
    });

    it(
        'Tracker search page-Material Designation-A 240 S31740, Standard-ASTM, Type-Bulk, Material group-Stainless steels, Update-2023-08, Property group-Mechanical Properties and perform the search,' +
            ' click on the material from the list, it should lead you Tracker page on Mechanical Properties tab, check if property table is displayed',
        () => {
            TotalSearchHomePage.clickOnTracker();
            CommonSearch.enterMaterialDesignation('A 240 S31740');
            CommonSearch.selectStandards([' ASTM ']);
            CommonSearch.selectMaterialType(' Bulk Materials ');
            CommonSearch.selectMaterialGroups(
                ['Ferrous Alloys'],
                ['Stainless steels'],
            );
            ConditionSelectorDDLForms.clickOnUpdateAnPropertyGroupTrackerDDL(
                0,
                '2023-08',
            );
            ConditionSelectorDDLForms.clickOnUpdateAnPropertyGroupTrackerDDL(
                1,
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
            //     },
            // );
            // it('Compare values inside Property table on Tracker and on Mechanical Properties page for Brinell Hardness, Elongation and Rockwell Hardness(click on Mechanical Properties from right menu, it should lead you to Synthetic view page by default, switch to Details, property table should be displayed)', () => {
            cy.step(
                'Compare values inside Property table on Tracker and on Mechanical Properties page for Brinell Hardness, Elongation and Rockwell Hardness(click on Mechanical Properties from right menu, it should lead you to Synthetic view page by default, switch to Details, property table should be displayed)',
            );
            Tracker.getPropertyValue('Brinell Hardness (HB)');
            Tracker.getPropertyValue('HBW');
            Tracker.getPropertyValue('Brinell Hardness (HB)');
            Tracker.getPropertyValue('217');
            Tracker.getPropertyValue('Elongation, A (%)');
            Tracker.getPropertyValue('L0 = 50 mm');
            Tracker.getPropertyValue('Elongation, A (%)');
            Tracker.getPropertyValue('35');
            Tracker.getPropertyValue('Rockwell Hardness (HR)');
            Tracker.getPropertyValue('HRBW');
            Tracker.getPropertyValue('Rockwell Hardness (HR)');
            Tracker.getPropertyValue('95');
            RightMenu.clickOnRightMenuPropertyByIndex(4);
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
            PropertyTable.getValueInRow(2).should('eq', '≥ 35');
            PropertyTable.getNoteInRow(2).should('eq', 'L0 = 50 mm');
            PropertyTable.getValueInRow(3).should('eq', '≤ 217');
            PropertyTable.getNoteInRow(3).should('eq', 'HBW');
            PropertyTable.getValueInRow(4).should('eq', '≤ 95');
            PropertyTable.getNoteInRow(4).should('eq', 'HRBW');
            // });
            // it('Click on Tracker Module card, it should lead you to Tracker page for selected material(Mechanical tab should be defaulted), switch to Composition tab, check min and max values for C(0.005-0.020), then click on the Composition from the right menu, it should lead you to Composition page with property table, check if the value are the same for C', () => {
            cy.step(
                'Click on Tracker Module card, it should lead you to Tracker page for selected material(Mechanical tab should be defaulted), switch to Composition tab, check min and max values for C(0.005-0.020), then click on the Composition from the right menu, it should lead you to Composition page with property table, check if the value are the same for C',
            );
            MaterialDetails.clickOnTrackerTab();
            TabButtons.colorOfSelectedTabButton('Mechanical Properties').should(
                'have.css',
                'background-color',
                color.pinkLightPale,
            );
            TabButtons.clickOnTab('Composition');
            Tracker.getPropertyValue('C (%)');
            Tracker.getPropertyValue('0.005');
            Tracker.getPropertyValue('C (%)');
            Tracker.getPropertyValue('0.02');
            RightMenu.clickOnRightMenuPropertyByIndex(3);
            RightMenu.colorORightMenuModuleLinks(' Composition ').should(
                'have.css',
                'background-color',
                color.seablue,
            );
            CompositionPropertyTable.getValueInPropertyTableRowMetals(0).then(
                (propertyTableValues) => {
                    cy.wait(1000);
                    expect(propertyTableValues.eq(0).text()).to.equal('C');
                    expect(propertyTableValues.eq(1).text()).to.equal(
                        '0.005 – 0.020',
                    );
                },
            );
        },
    );
});
