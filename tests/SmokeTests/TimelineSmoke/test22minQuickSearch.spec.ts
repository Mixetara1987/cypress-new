import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { References } from '@/CommonMethods/References';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CreepData } from '@/CreepData/creepData';
import { Similar } from '@/Helpers/Similar';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { ReferencesList } from '@/HelpersMethods/referencesList';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { ComplianceAssessor } from '@/MaterialConsole/compilanceAssessor';

describe('[BUG 17166] - Smoke test 22 min, adding property column to default Quick search list of results, going to that modules trough the values in columns', () => {
    beforeEach(
        'Log in user, save local storage and save session storage, ',
        () => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        },
    );

    it(
        '[BUG 17166] - Quick Search-enter Zytel in Material designation field, perform the search, add Weatherability, Irradiation and Compliance property column,' +
            ' click on the value in Weatherability column(17) for 1st material Zytel 101NC010, it should lead you to Weatherability page,' +
            ' check if the 1st condition is selected by default, check property table for him',
        () => {
            //  const searchedMaterial = 'Zytel';
            CommonSearch.enterMaterialDesignation('Zytel');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
            // const addDirectSupplierProperty = 'Direct Supplier';
            ListOfMaterials.clickOnAddPropertyCheckbox('Weatherability');
            ListOfMaterials.clickOnAddPropertyCheckbox('Irradiation');
            ListOfMaterials.clickOnAddPropertyCheckbox('Compliance');
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
                expect(headerTitles).contain('Weatherability');
                expect(headerTitles).contain('Irradiation');
                expect(headerTitles).contain('Compliance');
            });
            ListOfMaterials.findInRowColumnId(
                'Zytel 105 BK010A',
                'PROPRIETARY',
                'weatherabilityProperty',
            )
                .invoke('text')
                .then((text) => {
                    const matcher = /\((\d+)\)/;
                    return text.match(matcher)?.groups?.number;
                })
                .then(parseInt)
                .should('be.greaterThan', 0);
            ListOfMaterials.findInRowColumnId(
                'Zytel 105 BK010A',
                'PROPRIETARY',
                'weatherabilityProperty',
            ).click();
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Weatherability',
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.golden,
            );
            const defConditionFilters = [
                'Weatherability Type',
                'Exposure Time',
                'Exposure Temperature',
            ];
            Similar.getTitleOfConditionFilters().should(
                'deep.equal',
                defConditionFilters,
            );
            ConditionsSelectorDetailsView.getDefaultCondition().then(
                (defaultCondition) => {
                    expect(defaultCondition).to.equal(
                        'Exposure Type: Atmospheric exposure; Test Method: ASTM D1435-65; Time: 108 months; Country: USA, Florida',
                    );
                },
            );
            PropertyTable.findPropertyNameInTable('Tensile');
            PropertyTable.getPropertyValuesInTableRow('50');
            PropertyTable.findPropertyNameInTable('Tensile Strength');
            PropertyTable.getPropertyValuesInTableRow('46');
            PropertyTable.findPropertyNameInTable('Yield Strength');
            PropertyTable.getPropertyValuesInTableRow('46');
            //     },
            // );
            // it('Turn back to Quick Search page, click on the value in Compliance column(50) for 1st material Zytel 101NC010, it should lead you to Compliance page, General tab should be selected by default, check for References and SDS versions', () => {
            const defaultHeaders = [
                'General',
                'ELVs',
                'REACH',
                'RoHS',
                'Inventory Lists',
                'Hazard',
                'Transport',
                'Conflict Minerals',
            ];
            TotalSearchHomePage.clickOnLeftArrowBack();
            ConditionSelectorHeaders.getTitle().should('equal', 'Quick Search');
            ListOfMaterials.findInRowColumnId(
                'Zytel 101 NC010',
                'PROPRIETARY',
                'complianceProperty',
            )
                .invoke('text')
                .should((value) => {
                    expect(
                        Number.isInteger(+value),
                        'input should be an integer',
                    ).to.eq(true);
                });
            ListOfMaterials.findInRowColumnId(
                'Zytel 101 NC010',
                'PROPRIETARY',
                'complianceProperty',
            ).click();
            ConditionSelectorHeaders.getTitle().should('equal', 'Compliance');
            cy.wait(1000);
            RightMenu.colorORightMenuModuleLinksCompliance(
                ' Compliance ',
            ).should('have.css', 'background-color', color.greenLight);
            ComplianceAssessor.getTabTitle().then((curentHeaders) => {
                cy.Compare_Arrays(curentHeaders, defaultHeaders);
            });
            cy.wait(1000);
            TabButtons.colorOfSelectedTabButton('General').should(
                'have.css',
                'background-color',
                color.greenTab,
            );
            ReferencesList.getTextInForAllReferences().then((references) => {
                expect(references).equal(
                    '1 DuPont, Regulatory Information Sheets / Available at: www.dupont.com, visited Jan-2022 2 DuPont, Safety Data Sheets / Available at: www.dupont.com, visited Mar-2019 view SDS versions',
                );
            });
            // click on link `view SDS versions`, it should open a small table with Country, flag, year and version columns data
            References.clickOnSDSLink('view SDS versions');
            cy.wait(1000);
            const tableHeaders = ['Country', '', 'Year', 'Version'];
            const tableData = [
                'China',
                '',
                '2018',
                '4.0',
                'France',
                '',
                '2018',
                '3.4',
                'Germany',
                '',
                '2018',
                '3.4',
                'Italy',
                '',
                '2018',
                '3.4',
                'Japan',
                '',
                '2018',
                '2.3',
                'United Kingdom',
                '',
                '2018',
                '3.4',
                'United States',
                '',
                '2018',
                '4.0',
            ];
            References.getSDSTable().should('be.visible');
            References.getTableHeaderValues().should(
                'deep.equal',
                tableHeaders,
            );
            References.getTableDataValues().should('deep.equal', tableData);
            References.clickOnSDSLink('view SDS versions');
            // });

            // it('Compliance page-switch to REACH tab, dropdown filters should be displayed, check property table with data, click on the link `view SDS version` it should open table with data beneath references at the bottom of the page', () => {
            TabButtons.clickOnTab('REACH');
            TabButtons.colorOfSelectedTabButton('REACH').should(
                'have.css',
                'background-color',
                color.greenTab,
            );
            const defaultFIlters = [
                '',
                'Criterion',
                'Status',
                'Country',
                'According to',
            ];
            ComplianceAssessor.getTitlesInDDlFilters().should(
                'deep.equal',
                defaultFIlters,
            );
            const defaultpropertyTableColumnHeaders = [
                'CRITERION',
                'STATUS',
                'NOTE',
                '',
            ];
            ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                cy.Compare_Arrays(
                    curentHeaders,
                    defaultpropertyTableColumnHeaders,
                );
            });
            PropertyTable.findAndGetExemptionByName('REACH');
            PropertyTable.findAndGetExemptionByName('Compliant');
            PropertyTable.findAndGetExemptionByName(
                'According to: REACH ((EC) No 1907/2006)',
            );
            // click on link `view SDS versions`, it should open a small table with Country, flag, year and version columns data
            References.clickOnSDSLink('view SDS versions');
            cy.wait(1000);
            // const tableHeaders = ['Country', '', 'Year', 'Version'];
            // const tableData = [
            // 'China',
            //     '',
            //     '2018',
            //     '4.0',
            //     'France',
            //     '',
            //     '2018',
            //     '3.4',
            //     'Germany',
            //     '',
            //     '2018',
            //     '3.4',
            //     'Italy',
            //     '',
            //     '2018',
            //     '3.4',
            //     'Japan',
            //     '',
            //     '2018',
            //     '2.3',
            //     'United Kingdom',
            //     '',
            //     '2018',
            //     '3.4',
            //     'United States',
            //     '',
            //     '2018',
            //     '4.0',
            // ];
            References.getSDSTable().should('be.visible');
            References.getTableHeaderValues().should(
                'deep.equal',
                tableHeaders,
            );
            References.getTableDataValues().should('deep.equal', tableData);
            References.clickOnSDSLink('view SDS versions');
            // });
            // it('Compliance page-switch to RoHS tab, dropdown filters should be displayed, check property table with data, tooltips and flags', () => {
            TabButtons.clickOnTab('RoHS');
            cy.wait(1000);
            TabButtons.colorOfSelectedTabButton('RoHS').should(
                'have.css',
                'background-color',
                color.greenTab,
            );
            // const defaultFIlters = [
            //     '',
            //     'Criterion',
            //     'Status',
            //     'Country',
            //     'According to',
            // ];
            ComplianceAssessor.getTitlesInDDlFilters().should(
                'deep.equal',
                defaultFIlters,
            );

            ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                cy.Compare_Arrays(
                    curentHeaders,
                    defaultpropertyTableColumnHeaders,
                );
            });
            PropertyTable.findAndGetExemptionByName(
                'RoHS (Restriction of Hazardous Substances)',
            );
            PropertyTable.findAndGetExemptionByName('Compliant');
            ComplianceAssessor.showFlagCompliance(2).should('exist');
            PropertyTable.findAndGetExemptionByName(
                'According to: Official Gazette No. 32055',
            );
            PropertyTable.findAndGetExemptionByName('View');
            PropertyTable.findAndGetExemptionByName('View');
            //     },
            // );
            // it('Compliance page-switch to Inventory Lists tab, dropdown filters should be displayed, check property table with data, tooltips and flags', () => {
            TabButtons.clickOnTab('Inventory Lists');
            TabButtons.colorOfSelectedTabButton('Inventory Lists').should(
                'have.css',
                'background-color',
                color.greenTab,
            );
            // const defaultFIlters = [
            //     '',
            //     'Criterion',
            //     'Status',
            //     'Country',
            //     'According to',
            // ];
            ComplianceAssessor.getTitlesInDDlFilters().should(
                'deep.equal',
                defaultFIlters,
            );
            // const defaultpropertyTableColumnHeaders = [
            //     'CRITERION',
            //     'STATUS',
            //     'NOTE',
            //     '',
            // ];
            ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                cy.Compare_Arrays(
                    curentHeaders,
                    defaultpropertyTableColumnHeaders,
                );
            });
            PropertyTable.findAndGetExemptionByName(
                'Chemical Safety Compliance',
            );
            PropertyTable.findAndGetExemptionByName('Compliant');
            PropertyTable.findAndGetExemptionByName('According to: ENCS');
            ComplianceAssessor.showFlagCompliance(3).should('exist');
            // });
            // it('Compliance page-switch to Hazard tab, dropdown filters should be displayed, check property table with data, tooltips and flags', () => {
            TabButtons.clickOnTab('Hazard');
            TabButtons.colorOfSelectedTabButton('Hazard').should(
                'have.css',
                'background-color',
                color.greenTab,
            );
            // const defaultFIlters = [
            //     '',
            //     'Criterion',
            //     'Status',
            //     'Country',
            //     'According to',
            // ];
            ComplianceAssessor.getTitlesInDDlFilters().should(
                'deep.equal',
                defaultFIlters,
            );
            // const defaultpropertyTableColumnHeaders = [
            //     'CRITERION',
            //     'STATUS',
            //     'NOTE',
            //     '',
            // ];
            ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                cy.Compare_Arrays(
                    curentHeaders,
                    defaultpropertyTableColumnHeaders,
                );
            });
            PropertyTable.findAndGetExemptionByName('Labelling');
            PropertyTable.findAndGetExemptionByName('Not required');
            PropertyTable.findAndGetExemptionByName(
                'According to: GHS - CLP (EC) No 1272/2008',
            );
            ComplianceAssessor.showFlagCompliance(3).should('exist');
            // });
            // it(`Compliance page-switch to Transport tab, there shouldn't be no filters displayed and property table with data, only message`, () => {
            TabButtons.clickOnTab('Transport');
            TabButtons.colorOfSelectedTabButton('Transport').should(
                'have.css',
                'background-color',
                color.greenTab,
            );
            ComplianceAssessor.getTransportMessage().should(
                'equal',
                ' Not classified as dangerous in the meaning of transport regulations. ',
            );
            // });
            // it(`Compliance page-switch to Conflict Minerals tab, there shouldn't be no filters displayed and property table with data, only comment for Conflict Minerals`, () => {
            TabButtons.clickOnTab('Conflict Minerals');
            TabButtons.colorOfSelectedTabButton('Conflict Minerals').should(
                'have.css',
                'background-color',
                color.greenTab,
            );
            ComplianceAssessor.getConflictMinerasComment().should(
                'equal',
                "The Celanese Corporation has conducted a good faith reasonable country of origin inquiry regarding the Conflict Minerals. The good faith reasonable country of origin inquiry was reasonably designed to determine whether any of the Conflict Minerals originated in the Covered Countries (Democratic Republic of the Congo, the Republic of the Congo, the Central African Republic, South Sudan, Uganda, Rwanda, Burundi, Tanzania, Zambia and Angola) and whether any of the Conflict Minerals may be from recycled or scrap sources. Based on this reasonable country of origin inquiry, the Celanese Corporation determined that the Conflict Minerals used in its catalysts did not originate in the Covered Countries. The Celanese's reasonable country of origin inquiry entailed (i) identifying its suppliers of, and lessors that trade in, the Conflict Minerals used in the Celanese's catalysts and (ii) obtaining certifications or written confirmations from these suppliers and lessors, each of which indicated that the Conflict Minerals obtained by the Celanese Corporation from the seller or lessor did not originate in any Covered Country.Reference for the selected material and condition1 Conflict Minerals Statement ",
            );
        },
    );
});
