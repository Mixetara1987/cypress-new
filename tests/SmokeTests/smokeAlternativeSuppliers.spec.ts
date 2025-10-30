import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { AlternativeSuppliers } from '@/Suppliers/AlternativeSuppliers';
import { DirectSuppliers } from '@/Suppliers/DirectSuppliers';
import { LoginPage } from '@/LoginPage/loginPage';
import { _316L_Properietary } from 'cypress/fixtures/materials';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { Helpers } from '@/HelpersMethods/helpers';

const test_material = _316L_Properietary.id;

describe(
    `Smoke test, Alternative Suppliers- test Material ${_316L_Properietary.name}`,
    { tags: ['@smoke', '@suppliers'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            AlternativeSuppliers.navigateToMaterial(test_material);
        });

        it('Go to page for Alternative Suppliers for material 316L Proprietary, check if filters(Country, Form) are displayed and preselected All by default, check if they can be collapsed, list of results should be displayed with proper columns', () => {
            DirectSuppliers.getSelectedOptionInDdl().each(($status) => {
                const textContent = $status.text();
                expect(textContent).to.contain('All');
            });
            DirectSuppliers.ClickOnDropDownArrowConditionSelector(0).should(
                'to.be.visible',
                '.ng-dropdown-panel',
            );
            DirectSuppliers.ClickOnDropDownArrowConditionSelector(1).should(
                'to.be.visible',
                '.ng-dropdown-panel',
            );
            // Check for the number of Results found is correct
            AlternativeSuppliers.getListOfResultsFound().then(
                (listOfResults) => {
                    expect(listOfResults.text()).to.contain('Result(s) found:');
                },
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Alternative Material');
                expect(headerTitles).contain('Country / Standard');
                expect(headerTitles).contain('Material Equivalency Category');
                expect(headerTitles).contain('Supplier');
            });
        });

        it('Choose from Country-NORTH AND CENTRAL AMERICA, from Form-Welded tubes/pipes, it should filter list of results, then try Reset button, it should be functional', () => {
            Helpers.clickOnFilterOption(
                'Country',
                [''],
                ['NORTH AND CENTRAL AMERICA'],
            );
            Helpers.clickOnFilterOption('Form', [''], ['- Welded tubes/pipes']);
            cy.wait(1000);
            AlternativeSuppliers.getListOfResultsFound().then(
                (numberOfConditions) => {
                    expect(numberOfConditions.text()).to.contain(
                        'Result(s) found:',
                    );
                },
            );
            DirectSuppliers.clickOnReset();
        });

        it('Choose from Country-Denmark, check for the Clear all button inside of the Country filter drop down, it should be functional, then choose from  Form-FINISHED PRODUCTS, check also for the Clear all button inside of the Form filter drop down, it should be functional', () => {
            AlternativeSuppliers.getListOfResultsFound().then((results) => {
                expect(results.text().split(': ')[1]).to.contain('4');
                Helpers.clickOnFilterOption('Country', [''], ['- Denmark']);
                AlternativeSuppliers.getListOfResultsFound().then(
                    (results1) => {
                        expect(results1.text().split(': ')[1]).to.contain('2');
                        AlternativeSuppliers.clickOnClearAll();
                        DirectSuppliers.getSelectedOptionInDdl().then(
                            (status) => {
                                expect(status.eq(1).text()).to.equal(
                                    '-- All --',
                                );
                            },
                        );
                        AlternativeSuppliers.getListOfResultsFound().then(
                            (results2) => {
                                expect(
                                    results2.text().split(': ')[1],
                                ).to.contain('4');
                            },
                        );
                    },
                );
            });
            AlternativeSuppliers.getListOfResultsFound().then((results) => {
                expect(results.text().split(': ')[1]).to.contain('4');
                Helpers.clickOnFilterOption(
                    'Form',
                    [''],
                    ['FINISHED PRODUCTS'],
                );
                AlternativeSuppliers.getListOfResultsFound().then(
                    (results1) => {
                        expect(results1.text().split(': ')[1]).to.contain('1');
                        AlternativeSuppliers.clickOnClearAll();
                        DirectSuppliers.getSelectedOptionInDdl().then(
                            (status) => {
                                expect(status.eq(1).text()).to.equal(
                                    '-- All --',
                                );
                            },
                        );
                        AlternativeSuppliers.getListOfResultsFound().then(
                            (results2) => {
                                expect(
                                    results2.text().split(': ')[1],
                                ).to.contain('4');
                            },
                        );
                    },
                );
            });
        });

        it(`Try to click on 'View Suppliers' link for 'GI HQ4401 Proprietary', it should lead you to Direct Suppliers page for selected material`, () => {
            cy.wait(1000);
            AlternativeSuppliers.clickOnViewSuppliersLink('View Suppliers');
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Direct Suppliers for Material',
            );
            MaterialInfo.findMaterialInfoType('Country/Standard').should(
                'equal',
                'Country/Standard',
            );
            MaterialInfo.findMaterialInfoValue(' China / GB ').should(
                'equal',
                ' China / GB ',
            );
            MaterialInfo.findMaterialInfoType('Material group').should(
                'equal',
                'Material group',
            );
            MaterialInfo.findMaterialInfoValue(
                'Ferrous Alloys / Stainless steels',
            ).should('equal', 'Ferrous Alloys / Stainless steels');
        });
    },
);
