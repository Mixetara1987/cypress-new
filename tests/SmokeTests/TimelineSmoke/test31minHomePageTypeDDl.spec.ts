import { Coatings } from '@/Coatings/Coatings';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CompositionPropertyTable } from '@/Composition/CompositionPropertyTable';
import { EquivalentsFinder } from '@/EquivalentsFinder/equivalentsFinderHome';
import { ConditionSelectorSyntheticView } from '@/HelpersMethods/conditionSelectorSyntheticView';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PhysicalProperties } from '@/HelpersMethods/physicalProperties';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { ComplianceAssessor } from '@/MaterialConsole/compilanceAssessor';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { SearchSuppliers } from '@/Suppliers/SearchSuppliers';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { Lubricants } from '@/DataPlus/Lubricants';
import { typeDDlList } from 'cypress/fixtures/ddlTitles';
import { Helpers } from '@/HelpersMethods/helpers';

describe(
    'Smoke test 31 min, Material Type dropdown list(Coatings,Lubricants, Substances...)',
    { tags: ['@smoke', '@totalSearch', '@dataPlus'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('greenLineusername'),
                Cypress.env('greenLinepassword'),
            );
        });

        it('Home page-choose Coatings from Material Type ddl, and perform the search, it should show more than 2000 results, check if in List of materials in Classification should appear Coatings', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.selectMaterialType('Coatings');
            CommonSearch.getSelectedMaterialTypeDDL().should(
                'equal',
                'Coatings',
            );
            CommonSearch.getMaterialTypeItemList().should(
                'deep.equal',
                typeDDlList,
            );
            // Home page/Type ddl(Coatings)-perform the search, it should show more than 2000 results
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('classification').then(
                (columnValues) => {
                    expect(columnValues).to.contain('Coatings');
                },
            );
            // });
            // it('Home page/Type ddl(Coatings)-click on the 1st material from the list(100 JIS), it should lead you to Coatings page for that material, check data in all 4 tables,and also notes beneath text of selected condition', () => {
            cy.step(
                'Home page/Type ddl(Coatings)-click on the 1st material from the list(100 JIS), it should lead you to Coatings page for that material, check data in all 4 tables,and also notes beneath text of selected condition',
            );
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            ConditionSelectorHeaders.getTitleOptionTwo(0).should(
                'equal',
                'Coatings',
            );
            // Coatings.clickOnTab('Table');
            TabButtons.colorOfSelectedMainTab('Coatings').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleLight);
                },
            );
            // });
            // it('Composition tab should be selected by default, switch to Table and check data in all 4 tables for selected material 100 JIS, and also notes beneath text of selected condition', () => {
            cy.step(
                'Composition tab should be selected by default, switch to Table and check data in all 4 tables for selected material 100 JIS, and also notes beneath text of selected condition',
            );

            TabButtons.colorOfSelectedTabButton('Composition').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            TabButtons.clickOnTab('Table');
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'equal',
                'StandardJapan / JISStandard NumberG 3314Standard DescriptionHot-dip aluminium-coated steel sheet and stripLast version2022',
            );
            PropertyTable.findDataInTableCoatings('SA1C');
            PropertyTable.findDataInTableCoatings('45 g/m2');
            PropertyTable.findDataInTableCoatings('0.033 mm');
            PropertyTable.findDataInTableCoatings('150 g/m2');
            Coatings.getTitleofNotes()
                .should('equal', 'Notes:')
                .should('exist');
            // });
            // it('Home page/Type ddl-turn back to home page and clear Coatings from Type ddl, then choose Lubricants, perform the search, it should have more than 2000 results, check if in List of materials in Classification should appear Lubricants', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialType();
            CommonSearch.getSelectedMaterialTypeDDL().should('equal', 'Type');
            // Home page/Type ddl-choose Lubricants from Type DDL
            CommonSearch.selectMaterialType(' Lubricants ');
            CommonSearch.getSelectedMaterialTypeDDL().should(
                'equal',
                'Lubricants',
            );
            // Home page/Type ddl(Lubricants)-perform the search, it should show more than 2000 results
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('classification').then(
                (columnValues) => {
                    expect(columnValues).to.contain('Lubricants');
                },
            );
            // });
            // it('Home page/Type ddl(Lubricants)-click on the 13th material from the list(300V 4T Factory Line 5W-30 Double Ester Proprietary), it should lead you to Lubricants page for that material, Material Description tab should be selected by default, check if property table is visible', () => {
            // ListOfMaterials.clickOnMaterialInList(12);
            ListOfMaterials.clickOnMaterialInListString(
                '300V 4T Factory Line 5W-30 Double Ester',
            );
            Lubricants.getTitleOfLubricants().should(
                'equal',
                'Lubricants & Coolants',
            );
            TabButtons.colorOfSelectedMainTab('Lubricants').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleLight);
                },
            );
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                '300V 4T Factory Line 5W-30 Double Ester',
            );
            // Home page/Type ddl(Lubricants)-Material Description tab should be selected by default, check if property table is visible
            Lubricants.getTitleOfLubricants().should(
                'equal',
                'Lubricants & Coolants',
            );
            TabButtons.colorOfSelectedTabButton('Material Description').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            PropertyTable.findSourcePropertyInTable(' Source ');
            PropertyTable.findSourceValueInTable('Motul');
            PropertyTable.findSourcePropertyInTable(' General comment ');
            PropertyTable.findSourceValueInTable(
                '100% synthetic, Double Ester technology. Engine protection. Gearbox protection. Extra power at the rear wheel.',
            );
            // });
            // it('Home page/Type ddl(Lubricants)-switch to Properties tab, check if property table is visible', () => {
            const defaultpropertyTableColumnHeadersLub = [
                ' Property ',
                ' T(°C) ',
                ' Value ',
                ' Unit ',
                ' Note ',
                '',
            ];
            TabButtons.clickOnTab('Properties');
            TabButtons.colorOfSelectedTabButton('Properties').should(
                'have.css',
                'background-color',
                color.pinkLight,
            );
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeadersLub,
                    );
                },
            );
            PropertyTable.findPropertyNameInTable('Kinematic Viscosity');
            PropertyTable.getPropertyValuesInTableRow('100');
            PropertyTable.getPropertyValuesInTableRow('11.4 ');
            PropertyTable.getPropertyValuesInTableRow('mm²/s');
            PropertyTable.getPropertyValuesInTableRow(
                ' Test Method: ASTM D445 ',
            );
        });
        it('Home page/Type ddl(Lubricants)-turn back to home page and clear Lubricants, then choose Substances, perform the search, it should show more than 2000 results, check if in List of materials in Classification should appear Substances', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialType();
            CommonSearch.enterMaterialDesignation('1,3-Propanesultone');
            CommonSearch.getSelectedMaterialTypeDDL().should('equal', 'Type');
            // Home page/Type ddl-choose Substances in Type ddl
            CommonSearch.selectMaterialType(' Substances ');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('classification').then(
                (columnValues) => {
                    expect(columnValues).to.contain('Substances');
                },
            );
            // });
            // it('Home page/Type ddl(Substances)-click on the 1st substance from the list((Perfluorohexyl)ethyl)-2-chloropropenoate), it should lead you to Substances page', () => {
            const defaultHeaders = ['Status', 'According to', ''];
            ListOfMaterials.clickColumnFromRowByIndex(0, 'designation');
            ConditionSelectorHeaders.getTitle().should('equal', 'Substances');
            SearchSuppliers.colorOfSelectedSupplierTab('Substances').then(
                (background) => {
                    expect(background).to.equal(color.greenGL);
                },
            );
            ComplianceAssessor.getColumnHeadersOptionThree().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(curentHeaders, defaultHeaders);
                },
            );
            cy.step(
                'Home page/Type ddl(Substances)-Inventory lists tab should be selected as default, check if data is displayed',
            );
            TabButtons.colorOfSelectedTabButton('Inventory Lists')
                .should('have.css', 'background')
                .and('include', color.greenTabGL);
            ComplianceAssessor.getColumnHeadersOptionThree().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(curentHeaders, defaultHeaders);
                },
            );
            // TODO this should be more precise
            PropertyTable.findAndGetExemptionByName('Listed');
            PropertyTable.findAndGetExemptionByName('AICS');
            ComplianceAssessor.showFlagCompliance(0).should('exist');
            cy.step(
                'Home page/Type ddl(Substances)-switch to GADSL tab, check the data',
            );
            const defaultHeadersSubs = ['Criterion', 'Status/Value'];
            TabButtons.clickOnTab('GADSL');
            TabButtons.colorOfSelectedTabButton('GADSL')
                .should('have.css', 'background')
                .and('include', color.greenTabGL);

            ConditionSelectorHeaders.getPropertyTableHeaderColumnsCompliance().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(curentHeaders, defaultHeadersSubs);
                },
            );
            PropertyTable.findAndGetExemptionByName('Reporting threshold');
            PropertyTable.findAndGetExemptionByName('0.1%');

            cy.step(
                'Home page/Type ddl(Substances)-switch to Hazard tab, check the data and tooltips for pictograms and flags',
            );

            cy.intercept('GET', '**/compliance/hazard/**').as('hazard');
            TabButtons.clickOnTab('Hazard');
            TabButtons.colorOfSelectedTabButton('Hazard')
                .should('have.css', 'background')
                .and('include', color.greenTabGL);

            cy.wait('@hazard', { timeout: 10000 });
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsCompliance().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(curentHeaders, [
                        'Status',
                        'According to',
                        '', // flags
                        'PICTOGRAM',
                        'H CODE',
                        'P CODES',
                    ]);
                },
            );
            PropertyTable.findAndGetExemptionByName('H350;H302;H312');
            PropertyTable.findAndGetExemptionByName('CLP (EC) No 1272/2008');
            ComplianceAssessor.showFlagCompliance(0).should('exist');
        });
        it('Home page/Type ddl-turn back to home page and clear Substances, choose Adhevise from Type DDl, perform the search, it should show more than 2000 results, check if in List of materials in Classification should appear Adhevises', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialType();
            CommonSearch.getSelectedMaterialTypeDDL().should('equal', 'Type');
            cy.wait(1000);
            // Home page/Type ddl-choose Adhevise from Type DDl
            CommonSearch.selectMaterialType(' Adhesives ');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('classification').then(
                (columnValues) => {
                    const cleanedValues = columnValues
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .trim()
                        .toLowerCase();
                    expect(cleanedValues).to.include('adhesivespolymers');
                },
            );
            // });
            // it('Home page/Type ddl(Adhesives)-click on the 4th material(108401/HTS/900025RO Proprietary) from the list, it should lead you to Physical Properties page for this material', () => {
            ListOfMaterials.clickOnMaterialInListByIndex(3);
            TabButtons.colorOfSelectedMainTab('Quick Search').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.seablue);
                },
            );
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                '108401/HTS/900025RO',
            );
            RightMenu.colorORightMenuModuleLinks(
                ' Physical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            // });
            // it('Home page/Type ddl(Adhesives)-switch to Manufactoring processes', () => {
            RightMenu.clickOnRightMenuPropertyByIndex(6);
            RightMenu.colorORightMenuModuleLinks(
                ' Manufacturing Processes ',
            ).should('have.css', 'background-color', color.seablue);
            cy.wait(1200);
            // });
            // it('Home page/Type ddl(Adhesives)-turn back to Physical Properties again', () => {
            RightMenu.clickOnRightMenuPropertyByIndex(5);
            RightMenu.colorORightMenuModuleLinks(
                ' Physical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            PhysicalProperties.getSelectedView().should(
                'eq',
                ' Synthetic view ',
            );
            ConditionSelectorSyntheticView.getSyntheticViewPropertyUnits().then(
                (propertyUnits) => {
                    expect(propertyUnits).to.deep.includes('White≤ 155 °C');
                },
            );
            // });
            // it('Home page/Type ddl(Adhesives)-switch to Material Description', () => {
            RightMenu.clickOnRightMenuModuleLinks(' Material Description ');
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Material Description',
            );
            PropertyTable.findSourcePropertyInTable(' Source ');
            PropertyTable.findSourcePropertyInTable(' Comment ');
            // });
            // it('Home page/Type ddl(Adhesives)-switch then to Equivalents Finder, Physical Properties should be selected by default', () => {
            RightMenu.clickOnRightMenuPropertyByIndex(2);
            RightMenu.colorORightMenuModuleLinks(' Equivalents Finder ').should(
                'have.css',
                'background-color',
                color.seablue,
            );
            Helpers.clickOnFilterOption(
                'Properties',
                [''],
                ['Physical Properties'],
            );
            // });
            // it('Home page/Type ddl(Adhesives)-select `Service Temperature (°C)` in Physical Properties', () => {
            EquivalentsFinder.clickOnPropertyCheckbox(
                'Service Temperature (°C)',
            );
            EquivalentsFinder.getTextInselectedPropertiesTable().should(
                'equal',
                'Service Temperature (°C)',
            );
            // });
            // it('Home page/Type ddl(Adhesives)-check the values for selected `Service Temperature in property table`', () => {
            EquivalentsFinder.getValueInTypeDDL().should('eq', ' Max ');
            EquivalentsFinder.isSelectedActive().should('be.visible');
            EquivalentsFinder.getValueInSensitivity().should('eq', 'Medium');
        });
        it('Home page/Type ddl-turn back to home page and clear Adhesives, choose Additive Manufacturing Materials in Type ddl, perform the search, it should show more than 2000 results, check if in List of materials in  Classification should appear Additive Manufacturing Materials', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialType();
            CommonSearch.getSelectedMaterialTypeDDL().should('equal', 'Type');
            // Home page/Type ddl- choose Additive Manufacturing Materials in Type ddl
            CommonSearch.selectMaterialType(' Additive Manufacturing ');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('classification').then(
                (columnValues) => {
                    expect(columnValues).to.contain('Manufacturing');
                },
            );
            // });
            // it('Home page/Type ddl(Additive Manufacturing))-click on the 2nd material(09H16N4B Proprietary) from the list, it should lead you to Composition page for this material', () => {
            ListOfMaterials.clickOnMaterialInListByIndex(1);
            TabButtons.colorOfSelectedMainTab('Quick Search').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.seablue);
                },
            );
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                '09H16N4B',
            );
            RightMenu.colorORightMenuModuleLinks(' Composition ').should(
                'have.css',
                'background-color',
                color.seablue,
            );
            // });
            // it('Home page/Type ddl(Additive Manufacturing)) check if composition table is displayed with data and chemical elements inside(especially for P)', () => {
            const defaultpropertyTableColumnHeaders = [
                'CRITERIA',
                'VALUE',
                'UNIT',
                'NOTE',
                'CAS NUMBER',
                ' CRITICAL RAW MATERIALSCONFLICT MINERALS ',
            ];
            ConditionSelectorHeaders.getHeaderValuesComposition().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaders,
                    );
                },
            );
            CompositionPropertyTable.getValueInPropertyTableRowMetals(7).then(
                (propertyTableValues) => {
                    cy.wait(1000);
                    expect(propertyTableValues.eq(0).text()).to.equal('P');
                    expect(propertyTableValues.eq(1).text()).to.equal('≤ 0.03');
                    expect(propertyTableValues.eq(2).text()).to.equal('%');
                    expect(propertyTableValues.eq(4).text()).to.equal(
                        '7723-14-0',
                    );
                    expect(propertyTableValues.eq(5).text()).to.equal('Listed');
                },
            );
            // });
            // it('Home page/Type ddl(Additive Manufacturing))-click on linked `listed` from Composition property table, it should lead you to Substances page for P', () => {
            CompositionPropertyTable.clickOnCriteriaRowElement(7, 5, 'Listed');
            ConditionSelectorHeaders.getTitle().should('equal', 'Substances');
            cy.wait(300);
            MaterialInfo.findMaterialInfoType(' Substance Name ');
            MaterialInfo.findMaterialInfoValue('P');
            cy.wait(1000);
            const defaultHeaders = ['Status', 'According to', ''];
            ComplianceAssessor.getColumnHeadersOptionThree().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(curentHeaders, defaultHeaders);
                },
            );
            // });
            // it('Home page/Type ddl(Additive Manufacturing))-turn back to Home Page and clear Additive Manufacturing', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialType();
            CommonSearch.getSelectedMaterialTypeDDL().should('equal', 'Type');
        });
    },
);
