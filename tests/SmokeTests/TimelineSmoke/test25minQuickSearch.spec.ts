import { color } from 'cypress/fixtures/color';
import { MaterialDescription } from '@/AdvancedSearch/materialDescription';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { Exporter } from '@/Exporter/Exporter';
import { FavoriteMaterials } from '@/HelpersMethods/FavoriteMaterials';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke test 25 min, Quick Search, try option adding properties to list of Materials, try to add to Favorites, searching for Producers, check Material Description',
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
            'Home page-enter `Zytel` in Material designation search field and perform the search, some results should be shown,' +
                'add Thermal Conducitivy and Thermal Expansion property column click on the 7th value in Thermal Expansion column, it should lead you to Zytel 101L NC010 Proprietary Physical Properties page, Thermal tab should be selected as default one',
            () => {
                Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
                CommonSearch.enterMaterialDesignation('Zytel');
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
                ListOfMaterials.clickOnAddPropertyCheckbox(
                    'Thermal Conductivity',
                );
                ListOfMaterials.clickOnAddPropertyCheckbox('Thermal Expansion');

                ListOfMaterials.findInRowColumnId(
                    'Zytel 101L NC010',
                    'PROPRIETARY',
                    'g2-7022',
                ).click();
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    'Zytel 101L NC010',
                );
                TabButtons.colorOfSelectedTabButton(' Thermal ').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                ConditionSelectorDDLForms.getSelectedOptionInDDL(
                    'Property',
                ).should(
                    'equal',
                    'Coefficient of Linear Thermal Expansion (CLTE)',
                );
            },
        );
        it(
            'Turn back to Quick Search page, reset the search, in Producer search box enter`Cleveland`, Proprietary should be selected automatically in Standard dropdown,' +
                ' perform the search. it should still Thermal columns be visible, click on the 4th material from the list 17-4 PH Proprietary, it should lead you to Mechanical Properties page, check in Material info if Cleveland-Cliffs' +
                ' also add 17-4 PH to Favorites',
            () => {
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.clearSearchFilters();
                CommonSearch.getPlaceholderTextInMaterialDesignation().then(
                    (textInMaterialDesignation) => {
                        expect(textInMaterialDesignation).to.be.equal(
                            'Material Designation',
                        );
                    },
                );
                CommonSearch.enterProducer('Cleveland');
                CommonSearch.getStandardDDL()
                    .invoke('text')
                    .should('equal', 'PROPRIETARY');
                cy.wait(1000);
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
                ListOfMaterials.getTableColumnValues('countryProducer').then(
                    (materialInRows) => {
                        expect(materialInRows).contain('Cleveland-Cliffs');
                    },
                );
                ListOfMaterials.clickOnMaterialInListByIndex(3);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinks(
                    ' Mechanical Properties ',
                ).should('have.css', 'background-color', color.seablue);
                MaterialInfo.findMaterialInfoValue(
                    ' Cleveland-Cliffs; European Powder Metallurgy Association - EPMA; MetalTek International; MIMplus Technologies; Rolled Alloys; Smiths Metal Centres Ltd; The Lincoln Electric Company ',
                );
                FavoriteMaterials.checkIfMaterialIsSelected().should(
                    'not.be.checked',
                );
                FavoriteMaterials.clickOnAddToFavorite();
                cy.wait(600);
                FavoriteMaterials.colorOfFavoriteMaterial().should(
                    'have.css',
                    'color',
                    color.yellowFavourite,
                );
                /*  MaterialDetails.getTextInBluePopup().then(alert => {
                  expect(alert).to.be.equal('×You have successfully added this material to favorites.');
              });*/
                FavoriteMaterials.clickOnAddToFavorite();
                cy.wait(2000);
                Exporter.clickYesButton();
                //     },
                // );
                // it('Switch to Material Description page, check the data inside', () => {
                cy.step(
                    'Switch to Material Description page, check the data inside',
                );

                RightMenu.clickOnRightMenuModuleLinks(' Material Description ');
                RightMenu.colorORightMenuModuleLinks(
                    ' Material Description ',
                ).should('have.css', 'background-color', color.seablue);
                MaterialDescription.getDataTextInRowFirst(' Source ').should(
                    'equal',
                    'MIMplus Technologies',
                );
                MaterialDescription.getDataTextInRow('Comment').should(
                    'equal',
                    'Martensitic, precipitation hardening stainless steel.',
                );
            },
        );
    },
);
