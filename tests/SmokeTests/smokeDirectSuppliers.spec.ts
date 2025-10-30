import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { DirectSuppliers } from '@/Suppliers/DirectSuppliers';
import { LoginPage } from '@/LoginPage/loginPage';
import { _304_SAE } from 'cypress/fixtures/materials';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { Helpers } from '@/HelpersMethods/helpers';

const test_material = _304_SAE.id;

describe(`Smoke test, Direct Suppliers- test Material ${_304_SAE.name}`, () => {
    beforeEach(() => {
        LoginPage.loginUser(
            Cypress.env('environmentLoginUrl'),
            Cypress.env('username'),
            Cypress.env('password'),
        );
    });

    it('Go to page for Direct Suppliers for material 304 SAE, check if filters are displayed(Country, Supplier Type, Form) and preselected All by default, they all should be enabled and collapsed, list of results should be displayed with proper columns', () => {
        DirectSuppliers.navigateToMaterial(test_material);
        DirectSuppliers.getSelectedOptionInDdl().then((status) => {
            expect(status.eq(0).text()).to.contain('All');
            expect(status.eq(1).text()).to.contain('All');
            expect(status.eq(2).text()).to.contain('All');
        });
        DirectSuppliers.ClickOnDropDownArrowConditionSelector(0).should(
            'to.be.visible',
            '.ng-dropdown-panel',
        );
        DirectSuppliers.ClickOnDropDownArrowConditionSelector(1).should(
            'to.be.visible',
            '.ng-dropdown-panel',
        );
        DirectSuppliers.ClickOnDropDownArrowConditionSelector(2).should(
            'to.be.visible',
            '.ng-dropdown-panel',
        );
        DirectSuppliers.getListOfResultsFound1().then((results) => {
            expect(results).to.contain('Result(s) found:');
        });
        ListOfMaterials.getTableHeaders().then((headerValues) => {
            const headerTitles = headerValues.text();
            expect(headerTitles).contain('Material/Standard');
            expect(headerTitles).contain(`Supplier's Designation`);
            expect(headerTitles).contain('Comment');
            expect(headerTitles).contain('Supplier');
            expect(headerTitles).contain('Type');
        });
        // });
        // it(`Choose ASIA/ PACIFIC, number of results(44), Choose-Distributor, number of results(38), Form-Bars, number of results(9), at the end try the reset button, it should be functional`, () => {
        Helpers.clickOnFilterOption('Country', [''], ['ASIA / PACIFIC']);
        DirectSuppliers.getListOfResultsFound().then((numberOfConditions) => {
            expect(numberOfConditions.text()).to.contain('Result(s) found:');
        });
        Helpers.clickOnFilterOption('Supplier type', [''], ['Distributor']);
        DirectSuppliers.getListOfResultsFound().then((numberOfConditions) => {
            expect(numberOfConditions.text()).to.contain('Result(s) found:');
        });
        Helpers.clickOnFilterOption('Form', [''], ['- Bars']);
        DirectSuppliers.getListOfResultsFound().then((numberOfConditions) => {
            expect(numberOfConditions.text()).to.contain('Result(s) found:');
        });
        DirectSuppliers.clickOnReset();
        DirectSuppliers.getListOfResultsFound().then((numberOfConditions) => {
            expect(numberOfConditions.text()).to.contain('Result(s) found:');
        });
        // });
        // it(`Select NORTH AND CENTRAL AMERICA, try click on Clear all button inside of the Country dropdown, it should be functional, then choose from Supplier type-Producer, Distributor try click on Clear all button inside of the Supplier type dropdown, it should be functional, from Form-FLAT PRODUCTS, try click on Clear all button inside of the Country dropdown, it should be functional`, () => {
        DirectSuppliers.getListOfResultsFound().then((results) => {
            expect(results.text().split(': ')[1]).to.contain('2');
            Helpers.clickOnFilterOption(
                'Country',
                [''],
                ['NORTH AND CENTRAL AMERICA'],
            );
            DirectSuppliers.getListOfResultsFound().then((results1) => {
                expect(results1.text().split(': ')[1]).to.equal('59');
                DirectSuppliers.clickOnClearAll();
                DirectSuppliers.getSelectedOptionInDdl().then((status) => {
                    expect(status.eq(0).text()).to.equal('-- All --');
                });
                DirectSuppliers.getListOfResultsFound().then((results2) => {
                    expect(results2.text().split(': ')[1]).to.contain('2');
                });
            });
        });
        DirectSuppliers.getListOfResultsFound().then((results) => {
            expect(results.text().split(': ')[1]).to.contain('2');
            Helpers.clickOnFilterOption(
                'Supplier type',
                [''],
                ['Producer, Distributor'],
            );
            DirectSuppliers.getListOfResultsFound().then((results1) => {
                expect(results1.text().split(': ')[1]).to.contain('1');
                DirectSuppliers.clickOnClearAll();
                DirectSuppliers.getSelectedOptionInDdl().then((status) => {
                    expect(status.eq(0).text()).to.equal('-- All --');
                });
                DirectSuppliers.getListOfResultsFound().then((results2) => {
                    expect(results2.text().split(': ')[1]).to.contain('2');
                });
            });
            DirectSuppliers.getListOfResultsFound().then((results) => {
                expect(results.text().split(': ')[1]).to.contain('2');
                Helpers.clickOnFilterOption('Form', [''], ['FLAT PRODUCTS']);
                DirectSuppliers.getListOfResultsFound().then((results1) => {
                    expect(results1.text().split(': ')[1]).to.contain('6');
                    DirectSuppliers.clickOnClearAll();
                    DirectSuppliers.getSelectedOptionInDdl().then((status) => {
                        expect(status.eq(0).text()).to.equal('-- All --');
                    });
                    DirectSuppliers.getListOfResultsFound().then((results2) => {
                        expect(results2.text().split(': ')[1]).to.contain('2');
                    });
                });
            });
        });
        // });
        // it(`Try to go to linked supplier Acciai Vender S.p.A. from the list, it should lead you to suppliers page for selected one`, () => {
        DirectSuppliers.clickOnLinkedSupplier('Acciai Vender S.p.A.');
        ConditionSelectorHeaders.getTitle().should(
            'equal',
            'Acciai Vender S.p.A.',
        );
        MaterialInfo.findMaterialInfoType('Type').should('equal', 'Type');
        MaterialInfo.findMaterialInfoValue('Distributor').should(
            'equal',
            'Distributor',
        );
        MaterialInfo.findMaterialInfoType('Address').should('equal', 'Address');
        MaterialInfo.findMaterialInfoValue(
            'Via Nobel, 4/A, 43100, Parma, Italywww.acciaivender.it',
        ).should(
            'equal',
            'Via Nobel, 4/A, 43100, Parma, Italywww.acciaivender.it',
        );
    });
});
