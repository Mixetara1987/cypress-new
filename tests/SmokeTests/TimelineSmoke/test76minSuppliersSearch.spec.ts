import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CorrosionConditionSelector } from '@/Corosion/corrosionConditionSelector';
import { Dimensions } from '@/Dimensions/dimensionsHome';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { SearchSuppliers } from '@/Suppliers/SearchSuppliers';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { Helpers } from '@/HelpersMethods/helpers';

describe(
    'Smoke Test ( 76:00 min ), Suppliers- Search',
    { tags: ['@smoke', '@suppliers'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            SearchSuppliers.navigateSuppliersPageByMaterial();
        });

        it(`Go to Suppliers module, Search Supllier by Material should be selected by default`, () => {
            SearchSuppliers.colorOfSelectedSupplierTab(
                'Search Supplier by Material',
            ).then((background) => {
                expect(background).to.equal(color.purpleDark);
            });
            cy.step(
                `Suppliers(Search Supplier by Material tab)-check if all filters are visible and their titles and which are preselected 'All' by default, buttons(search, clear), direct data slider`,
            );
            const expectedTitlesAboveFilters = [
                'Material Designation',
                'Standard',
                'Type',
                'Material group',
                'Standard number',
                'Form',
                'Supplier name',
                'Supplier country',
                'Supplier type',
            ];
            cy.wait(2000);
            Dimensions.getTitlesAboveFilters().then(
                (currentTitlesAboveFilters) => {
                    cy.Compare_Arrays(
                        currentTitlesAboveFilters,
                        expectedTitlesAboveFilters,
                    );
                },
            );
        });
        it(`Suppliers(Search Supplier by Material tab)-Supplier type-Producer, enter in Material Designation-11, perform the search, it should show more than 2000 results, and check also  11 are included in suppliers name`, () => {
            CommonSearch.enterMaterialDesignation('11');
            CommonSearch.enterFieldValue(
                'formcontrolname="supplierName"',
                'Arvedi Group',
            );
            Helpers.clickOnFilterOption('Supplier type', [''], ['Producer']);
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Material Designation: 11 )  AND  (  Supplier name: Arvedi Group )  AND  (  Supplier type: Producer ) ',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material / Standard');
                expect(headerTitles).contain('Form');
                expect(headerTitles).contain('Comment');
                expect(headerTitles).contain('Supplier');
                expect(headerTitles).contain('Type');
            });

            ListOfMaterials.getTableColumnValues('suppliersDesignation').then(
                (columnValues) => {
                    expect(columnValues).to.contain('11');
                },
            );
            // });
            // it(`Suppliers(Search Supplier by Material tab)-click on linked Supplier in Supplier column for Tenaris for, check the data also in tables`, () => {
            cy.step(
                `Suppliers(Search Supplier by Material tab)-click on linked Supplier in Supplier column for Tenaris for, check the data also in tables`,
            );
            SearchSuppliers.clickOnLinkedSupplier('Arvedi Group');
            cy.wait(1500);
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material / Standard');
                expect(headerTitles).contain(`Supplier's Designation`);
                expect(headerTitles).contain(`Form`);
            });
            ListOfMaterials.getTableColumnValues('name').should(
                'contain',
                'Arvedi',
            );
            // });
            // it(`Suppliers(Search Supplier by Material tab)-turn back to Search Supplier by Material, Supplier type-Producer and Material Designation- 11 should be still selected(entered)`, () => {
            cy.step(
                `Suppliers(Search Supplier by Material tab)-turn back to Search Supplier by Material, Supplier type-Producer and Material Designation- 11 should be still selected(entered)`,
            );
            TabButtons.clickOnTheTabs('Search Supplier by Material');
            SearchSuppliers.colorOfSelectedSupplierTab(
                'Search Supplier by Material',
            ).then((background) => {
                expect(background).to.equal(color.purpleDark);
            });
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Material Designation: 11 )  AND  (  Supplier name: Arvedi Group )  AND  (  Supplier type: Producer ) ',
            );
        });
        it(`Suppliers(Search Supplier by Material tab)-switch to next tab(Search Supplier by Name), there should be any previuos search parameters`, () => {
            TabButtons.clickOnTheTabs('Search Supplier by Name');
            SearchSuppliers.colorOfSelectedSupplierTab(
                'Search Supplier by Name',
            ).then((background) => {
                expect(background).to.equal(color.purpleDark);
            });
            const expectedTitlesAboveFilters = [
                'Supplier name',
                'Supplier type',
                'Supplier country',
            ];
            Dimensions.getTitlesAboveFilters().then(
                (currentTitlesAboveFilters) => {
                    cy.Compare_Arrays(
                        currentTitlesAboveFilters,
                        expectedTitlesAboveFilters,
                    );
                },
            );
            // });
            // it(`Suppliers(Search Supplier by Name tab) search-enter in Supplier Name field-'arcelor' and perform the search, it should show some results, and check if arcelor apears in Suppliers name in table - first column`, () => {
            cy.step(
                `Suppliers(Search Supplier by Name tab) search-enter in Supplier Name field-'arcelor' and perform the search, it should show some results, and check if arcelor apears in Suppliers name in table - first column`,
            );
            SearchSuppliers.enterSupplierName('arcelor');
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Supplier name: arcelor ) ',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Supplier');
                expect(headerTitles).contain('Address');
                expect(headerTitles).contain('Zip');
                expect(headerTitles).contain('City');
                expect(headerTitles).contain('Country');
                expect(headerTitles).contain('Web site');
                expect(headerTitles).contain('Type');
            });
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            ListOfMaterials.getTableColumnValues('supplierName').then(
                (columnValues) => {
                    expect(columnValues).to.contain('Arcelor');
                },
            );
            // });
            // it(`Suppliers(Search Supplier by Name tab) search-click on the 12th linked Supplier from the list(ArcelorMittal International),  it should lead you to to his Supplier page`, () => {
            cy.step(
                `Suppliers(Search Supplier by Name tab) search-click on the 12th linked Supplier from the list(ArcelorMittal International),  it should lead you to to his Supplier page`,
            );
            ListOfMaterials.getItemFromColumn(
                'supplierName',
                'ArcelorMittal International Trading & Sales',
            ).click();
            // SearchSuppliers.clickOnLinkedSupplierSupplierByName(
            //     'ArcelorMittal International Trading & Sales',
            // );
            cy.wait(1500);
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text().trim();
                expect(headerTitles).contain('Supplier');
                expect(headerTitles).contain('Address');
                expect(headerTitles).contain('City');
                expect(headerTitles).contain('Country');
                expect(headerTitles).contain('Material / Standard');
                expect(headerTitles).contain(`Supplier's Designation`);
                expect(headerTitles).contain(`Form`);
            });
            ListOfMaterials.getItemFromColumn(
                'name',
                'Flat Carbon Europe (FCE)',
            )
                .parent()
                .invoke('text')
                .should(
                    'contain',
                    'Flat Carbon Europe (FCE)5 Kojimachi 4-ChomeTokyoJapan',
                );
            // });
            // it(`Suppliers(Search Supplier by Name tab)search-click on the 1st linked material from Materials table(1.4504 WL), it should lead you to Physical Properties page for selected material`, () => {
            cy.step(
                `Suppliers(Search Supplier by Name tab)search-click on the 1st linked material from Materials table(1.4504 WL), it should lead you to Physical Properties page for selected material`,
            );
            SearchSuppliers.clickOnLinkedMaterialSupplierByNme('1.4504');
            RightMenu.colorORightMenuModuleLinks(
                ' Physical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            // });
            // it(`Suppliers(Search Supplier by Name tab)search-turn back to Suppliers module by clicking on it, it should lead you to Supplier By Material page by default`, () => {
            cy.step(
                `Suppliers(Search Supplier by Name tab)search-turn back to Suppliers module by clicking on it, it should lead you to Supplier By Material page by default`,
            );
            SearchSuppliers.clickOnSuppliersModule();
            SearchSuppliers.colorOfSelectedSupplierTab(
                'Search Supplier by Material',
            ).then((background) => {
                expect(background).to.equal(color.purpleDark);
            });

            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria',
            );
        });
        it(`Suppliers(Search Supplier by Material tab)-switch to next tab(Search Supplier by Name)again, check Supplier country dropdown(check the list of countries inside)`, () => {
            TabButtons.clickOnTheTabs('Search Supplier by Name');
            SearchSuppliers.colorOfSelectedSupplierTab(
                'Search Supplier by Name',
            ).then((background) => {
                expect(background).to.equal(color.purpleDark);
            });
            const expectedCountries = [
                'EUROPE',
                '- Austria',
                '- Belgium',
                '- Bosnia and Herzegovina',
                '- Bulgaria',
                '- Croatia',
                '- Czech Republic',
                '- Denmark',
                '- Finland',
                '- France',
                '- Germany',
                '- Greece',
                '- Hungary',
                '- Iceland',
                '- Ireland',
                '- Italy',
                '- Latvia',
                '- Liechtenstein',
                '- Lithuania',
                '- Luxembourg',
                '- North Macedonia',
                '- Malta',
                '- Netherlands',
                '- Norway',
                '- Poland',
                '- Portugal',
                '- Romania',
                '- Serbia',
                '- Slovakia',
                '- Slovenia',
                '- Spain',
                '- Sweden',
                '- Switzerland',
                '- Turkey',
                '- Ukraine',
                '- United Kingdom',
                'NORTH AND CENTRAL AMERICA',
                '- Canada',
                '- Costa Rica',
                '- El Salvador',
                '- Guatemala',
                '- Mexico',
                '- Nicaragua',
                '- Panama',
                '- United States',
                'ASIA / PACIFIC',
                '- China',
                '- Japan',
                '- Korea, South',
                '- Taiwan',
                '- Thailand',
                'SOUTH AMERICA',
                '- Argentina',
                '- Bolivia',
                '- Brazil',
                '- Chile',
                '- Colombia',
                '- Cuba',
                '- Dominican Republic',
                '- Ecuador',
                '- Peru',
                '- Puerto Rico',
                '- Trinidad and Tobago',
                '- Uruguay',
                '- Venezuela',
                'SOUTH ASIA',
                '- Bangladesh',
                '- India',
                '- Indonesia',
                '- Malaysia',
                '- Myanmar',
                '- Pakistan',
                '- Philippines',
                '- Singapore',
                '- Sri Lanka',
                '- Vietnam',
                'MIDDLE EAST',
                '- Bahrain',
                '- Cyprus',
                '- Iran',
                '- Iraq',
                '- Israel',
                '- Jordan',
                '- Kuwait',
                '- Lebanon',
                '- Oman',
                '- Qatar',
                '- Saudi Arabia',
                '- Syria',
                '- United Arab Emirates',
                '- Yemen',
                'RUSSIA / CIS',
                '- Azerbaijan',
                '- Belarus',
                '- Estonia',
                '- Kazakhstan',
                '- Russia',
                '- Turkmenistan',
                'AUSTRALIA AND OCEANIA',
                '- Australia',
                '- Fiji',
                '- New Caledonia',
                '- New Zealand',
                '- Vanuatu',
                'AFRICA',
                '- Algeria',
                '- Angola',
                '- Congo, Democratic Republic of the',
                '- Egypt',
                '- Libya',
                '- Madagascar',
                '- Morocco',
                '- Mozambique',
                '- Nigeria',
                '- South Africa',
                '- Tunisia',
            ];
            CorrosionConditionSelector.getAllOptionsInDDOptionThree(
                2,
                'Supplier country',
            ).then((currentCountries) => {
                cy.Compare_Arrays(currentCountries, expectedCountries);
            });
            CommonSearch.clearSearchFilters();
            // });
            // it(`Suppliers(Search Supplier by Name tab)-Check Supplier type dropdown(check the list of types)`, () => {
            cy.step(
                `Suppliers(Search Supplier by Name tab)-Check Supplier type dropdown(check the list of types)`,
            );
            const expectedType = [
                'Distributor',
                'Producer',
                'Producer, Distributor',
            ];
            CorrosionConditionSelector.getAllOptionsInDDOptionThree(
                1,
                'Supplier type',
            ).then((currentOptions) => {
                cy.Compare_Arrays(currentOptions, expectedType);
            });
            CommonSearch.clearSearchFilters();
            // });
            // it(`Suppliers(Search Supplier by Name tab)-choose in Supplier Type-Producer,Distributer and from Supplier country-Austria, perform the search,
            //      it should give some results, check if selected Supplier Type and Supplier country appear in table in List of materials`, () => {

            cy.step(`Suppliers(Search Supplier by Name tab)-choose in Supplier Type-Producer,Distributer and from Supplier country-Austria, perform the search,
                    it should give some results, check if selected Supplier Type and Supplier country appear in table in List of materials`);
            Helpers.clickOnFilterOption(
                'Supplier type',
                [''],
                ['Producer, Distributor'],
            );
            Helpers.clickOnFilterOption(
                'Supplier country',
                [''],
                ['- Austria'],
            );
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Supplier country: Austria )  AND  (  Supplier type: Producer, Distributor ) ',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Supplier');
                expect(headerTitles).contain('Address');
                expect(headerTitles).contain('Zip');
                expect(headerTitles).contain('City');
                expect(headerTitles).contain('Country');
                expect(headerTitles).contain('Web site');
                expect(headerTitles).contain('Type');
            });
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            ListOfMaterials.getAllValuesFromRow(0)
                .should('contain', '1AMAG Austria Metall AG')
                .and('contain', 'Lamprechtshausener Straße 61')
                .and('contain', '5282')
                .and('contain', 'Ranshofen')
                .and('contain', 'Austria')
                .and('contain', 'www.amag.at')
                .and('contain', 'Producer, Distributor');
            // });
            // it(`Suppliers(Search Supplier by Name tab)-click on the 1st supplier from the list(AMAG Austria Metall AG),it should lead you to his Suppliers page, check if Materials table with data are visible`, () => {
            cy.step(
                `Suppliers(Search Supplier by Name tab)-click on the 1st supplier from the list(AMAG Austria Metall AG),it should lead you to his Suppliers page, check if Materials table with data are visible`,
            );
            SearchSuppliers.clickOnLinkedSupplierSupplierByName(
                'AMAG Austria Metall AG',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material / Standard');
                expect(headerTitles).contain(`Supplier's Designation`);
            });
        });
    },
);
