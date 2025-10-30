import { EquivalentsFinder } from '@/EquivalentsFinder/equivalentsFinderHome';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { _304_SAE } from 'cypress/fixtures/materials';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';
import { CommonSearch } from '@/CommonMethods/CommonSearch';

let mechanical_property = 'Rockwell Hardness (HR)';
let physical_property = 'Melting Temperature (°C)';
let chemical_property = 'Chemical Composition';
let standard_for_search = 'DIN';

describe(
    `Equivalents Finder - test Material ${_304_SAE.name}`,
    { tags: ['@smoke', '@totalSearch'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Go to Equivalent finder, and check the functionality of adding properties by checking the checkbox from Mechanical, Physical and Chemical properties.', () => {
            Helpers.totalMateriaNavigateTo(
                ModuleURLs.Material.EquivalentsFinder,
                _304_SAE.id,
            );
            EquivalentsFinder.getTitleEquivalentsFinder().should(
                'eq',
                'Equivalents Finder',
            );
            EquivalentsFinder.clickOnPropertyCheckbox(mechanical_property);
            EquivalentsFinder.getTextInselectedPropertiesTable().should(
                'eq',
                mechanical_property,
            );
            Helpers.clickOnFilterOption(
                'Properties',
                [''],
                ['Physical Properties'],
            );
            EquivalentsFinder.clickOnPropertyCheckbox(physical_property);
            EquivalentsFinder.getTextInselectedPropertiesTable().should(
                'eq',
                mechanical_property + physical_property,
            );
            Helpers.clickOnFilterOption(
                'Properties',
                [''],
                ['Chemical Composition '],
            );
            EquivalentsFinder.clickOnPropertyCheckbox(chemical_property);
            EquivalentsFinder.getTextInselectedPropertiesTable().should(
                'eq',
                mechanical_property + physical_property + chemical_property,
            );
            // });

            // it('Check the functionality of the "ACTIVE" switch on all property contents, the contents of the property change color.', () => {
            EquivalentsFinder.getColorOfContentForProperty(
                mechanical_property,
            ).should('have.css', 'background-color', color.blue);
            EquivalentsFinder.clickOnActiveSwitchForProperty(
                mechanical_property,
            );
            EquivalentsFinder.getColorOfContentForProperty(
                mechanical_property,
            ).should('have.css', 'background-color', color.none);
            EquivalentsFinder.getColorOfContentForProperty(
                physical_property,
            ).should('have.css', 'background-color', color.blue);
            EquivalentsFinder.clickOnActiveSwitchForProperty(physical_property);
            EquivalentsFinder.getColorOfContentForProperty(
                physical_property,
            ).should('have.css', 'background-color', color.none);
            EquivalentsFinder.getColorOfContentForProperty(
                chemical_property,
            ).should('have.css', 'background-color', color.blue);
            EquivalentsFinder.clickOnActiveSwitchForProperty(chemical_property);
            EquivalentsFinder.getColorOfContentForProperty(
                chemical_property,
            ).should('have.css', 'background-color', color.none);
            // });

            // it(`Select Mechanical Property ${mechanical_property}, and select ${standard_for_search} then click on "Search". A list of materials should appear with only selected ${standard_for_search} standard.`, () => {
            EquivalentsFinder.clickOnActiveSwitchForProperty(
                mechanical_property,
            );
            Helpers.clickOnFilterOption(
                'Standard',
                [''],
                [` ${standard_for_search} `],
            );
            CommonSearch.clickSearchButton();
            ListOfMaterials.getNumberOfVisbleRows().then((number_of_rows) => {
                Cypress._.times(number_of_rows, (rowIndex) => {
                    ListOfMaterials.getTableColumnValueByIndex(
                        'standard',
                        rowIndex,
                    ).then((standard_in_list) => {
                        expect(standard_in_list.text()).to.be.equal(
                            standard_for_search,
                        );
                    });
                });
            });
            // });

            // it(`Try to delete on "X" all selected properties: Rockwell Hardness (HR), Melting Temperature (°C), Chemical Composition from criteria.`, () => {
            EquivalentsFinder.clickOnClearButtonX(physical_property);
            EquivalentsFinder.clickOnClearButtonX(chemical_property);
            EquivalentsFinder.clickOnClearButtonX(mechanical_property);
            EquivalentsFinder.isPresentSelectedPropertiesTableWrapper().should(
                'not.exist',
            );
        });

        xit('Check for tooltip "?" for Chemical Property and for tooltip for "Defining Parameters".', () => {
            EquivalentsFinder.mouseHoverToltipAndGetText(0).should(
                'contains',
                'Equivalents Finder allows you to find even more similar and equivalent material options' +
                    ', based on the most critical properties for your specific application!',
            );
            Helpers.clickOnFilterOption(
                'Properties',
                [''],
                ['Chemical Composition '],
            );
            EquivalentsFinder.mouseHoverChemicalCompositionToltipAndGetText(
                1,
            ).should(
                'equal',
                'For all non-metallic material groups, selection of chemical composition will restrict the search to materials from the same chemical family.',
            );
        });
    },
);
