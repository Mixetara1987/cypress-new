import { Buttons } from '@/CommonMethods/Buttons';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CreepData } from '@/CreepData/creepData';
import { Weatherability } from '@/Enviro/Weatherability';
import { Formability } from '@/ExtendedRange/Formability';
import { Similar } from '@/Helpers/Similar';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { ComplianceAssessor } from '@/MaterialConsole/compilanceAssessor';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

// General tab should be selected by default and check if property table is visible
const defaultpropertyTableColumnHeadersOptionOne = [
    'CRITERION',
    'STATUS',
    'NOTE',
    '',
];

describe(
    'Smoke test 42 min, material-Apec 1803 (Proprietary), checking functionality on most pages from Right Menu(Mechanical, Physical, Fatigue, SS, Joints, Corrosion..)',
    { tags: ['@smoke', '@totalSearch'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Home page-enter `Apec 1803` in Material designation search field and perform the search, some results should be shown, click on the 1st material from the list(Zytel 101 NC010 (Proprietary)), it should lead you to Mechanical Properties page by default', () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            CommonSearch.enterMaterialDesignation('Apec 1803');
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
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                'Apec 1803',
            );
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            // });
            // it(
            //     'Apec 1803-click on right menu on linked module Irradiation to go to that page,check if condition filters are displayed,' +
            //         'list of conditions,check if the first condition is selected as default,scroll down the page, check if property table with diagram link are displayed,' +
            //         'click on the 2nd diagram link,it should open a diagram with table data,close the diagram,click on the 4th diagram link,it should open a diagram with table data,close the diagram.',
            //     () => {
            RightMenu.clickOnRightMenuPropertyByIndex(15);
            cy.wait(1500);
            RightMenu.colorORightMenuModuleLinks(' Irradiation ').should(
                'have.css',
                'background-color',
                color.beige,
            );
            // check if condition filters are displayed, list of conditions
            const defConditionFiltersIrr = [
                'Irradiation Type',
                'Radiation Dosage',
                'Neutron Fluence',
            ];
            Similar.getTitleOfConditionFilters().should(
                'deep.equal',
                defConditionFiltersIrr,
            );
            ConditionSelectorHeaders.getNumbersOfConditions().should(
                'eq',
                'Conditions (5/5)',
            );
            // check if the first condition is selected as default
            ConditionsSelectorDetailsView.getDefaultCondition().then(
                (defaultCondition) => {
                    expect(defaultCondition).to.equal(
                        'Irradiation Type: Particle Radiation; Irradiation Subtype: β radiation Typical property values for Polycarbonate plastics (PC)',
                    );
                },
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.brown,
            );
            // scroll down the page, check if property table with diagram link are displayed
            cy.scrollTo('bottom');
            const defaultpropertyTableColumnHeader = [
                ' Property ',
                ' T(°C) ',
                ' Value ',
                ' Unit ',
                ' Note ',
                '',
            ];
            ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeader,
                    );
                },
            );
            // click on the 2nd diagram link,it should open a diagram with table data
            PropertyTableDiagram.clickOnDiagramByName(
                'Modulus of Elasticity (GPa) - Radiation Dose (Mrad)',
            );
            Formability.diagramAndTableDataExist().should('exist');
            // close the diagram
            PropertyTableDiagram.closeDiagram();
            PropertyTableDiagram.visibilityOfDiagram().should('not.exist');
            // click on the 4th diagram link,it should open a diagram with table data
            PropertyTableDiagram.clickOnDiagramByName(
                'Yellowness Index - Radiation Dose (Mrad)',
            );
            Formability.diagramAndTableDataExist().should('exist');
            // close the diagram
            PropertyTableDiagram.closeDiagram();
            PropertyTableDiagram.visibilityOfDiagram().should('not.exist');
        });
        it(
            'Apec 1803 Irradiation-click on right menu on linked module Weatherability to go to that page,check text for selected condition and if property table are displayed,' +
                'click diagram link,it should open a diagram with table data,close the diagram',
            () => {
                Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
                CommonSearch.enterMaterialDesignation('Apec 1803');
                CommonSearch.clickSearchButton();
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                RightMenu.clickOnRightMenuPropertyByIndex(14);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinks(' Weatherability ').should(
                    'have.css',
                    'background-color',
                    color.beige,
                );

                // check text for selected condition and if property table are displayed
                Weatherability.getTextSelectedInCondition().should(
                    'equal',
                    'ConditionExposure Type: UV exposure; Test Method: ASTM D4459, in accordance with Method G155-00a; General comment: Atlas Ci65A Weather-Ometer at a xenon irradiance of 0.30 W/m² and a black panel temperature of 55°CComment Typical property values for Polycarbonate plastics (PC), UV Stabilized',
                );
                PropertyTable.getTextInHeaders().should(
                    'eq',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
                // click diagram link,it should open a diagram with table data
                PropertyTableDiagram.clickOnDiagramByName(
                    'Color Change, ∆E - Exposure Time (h)',
                );
                Formability.diagramAndTableDataExist().should('exist');
                // close the diagram
                PropertyTableDiagram.closeDiagram();
                PropertyTableDiagram.visibilityOfDiagram().should('not.exist');
                //     },
                // );
                // it(
                //     'Apec 1803-click on right menu on linked module Ageing to go to that page,check if Fluid Ageing is selected by default and check if selected condition is visible,' +
                //         'check if property table is displayed and click on 1st linked diagram and check if diagram and table with data are displayed,close the diagram',
                //     () => {
                RightMenu.clickOnRightMenuPropertyByIndex(13);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinks(' Ageing ').should(
                    'have.css',
                    'background-color',
                    color.beige,
                );

                // check if Fluid Ageing is selected by default and check if selected condition is visible
                TabButtons.colorOfSelectedTabButton('Fluid Ageing').should(
                    'have.css',
                    'background-color',
                    color.brown,
                );
                Weatherability.getTextSelectedInCondition().should(
                    'equal',
                    'ConditionMedium: Hot waterComment Typical property values for Polycarbonate plastics (PC)',
                );
                // check if property table is displayed and click on 1st linked diagram and check if diagram and table with data are displayed
                PropertyTable.getTextInHeaders().should(
                    'eq',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
                PropertyTableDiagram.clickOnDiagramByName(
                    'Impact Strength (kJ/m²) - Exposure Time (h)',
                );
                Formability.diagramAndTableDataExist().should('exist');
                // close the diagram
                PropertyTableDiagram.closeDiagram();
                PropertyTableDiagram.visibilityOfDiagram().should('not.exist');
            },
        );
        it(
            'Apec 1803-click on right menu on linked module Compliance to go to that page,General tab should be selected by default and check if property table is visible,' +
                'check if condition filters are displayed',
            () => {
                Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
                CommonSearch.enterMaterialDesignation('Apec 1803');
                CommonSearch.clickSearchButton();
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                RightMenu.clickOnRightMenuPropertyByIndex(16);
                cy.wait(1000);
                RightMenu.colorORightMenuModuleLinksCompliance(
                    ' Compliance ',
                ).should('have.css', 'background-color', color.greenLight);

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
                // check if condition filters are displayed
                const defConditionFilters = [
                    'Criterion',
                    'Status',
                    'Country',
                    'According to',
                ];
                Similar.getTitleOfConditionFilters().should(
                    'deep.equal',
                    defConditionFilters,
                );
                //     },
                // );
                // it('Apec 1803Compliance-switch to REACH tab,check if property table is visible,Apec 1803Compliance/REACH, check tooltips over flags in property table', () => {
                cy.step(
                    'Apec 1803Compliance-switch to REACH tab,check if property table is visible,Apec 1803Compliance/REACH, check tooltips over flags in property table',
                );
                TabButtons.clickOnTab('REACH');
                TabButtons.colorOfSelectedTabButton('REACH').should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
                // check if property table is visible
                ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeadersOptionOne,
                    );
                });
                // check tooltips over flags in property table
                ComplianceAssessor.showFlagCompliance(0).should('exist');
                ComplianceAssessor.mouseHoverTooltipOverFlagOptionOne(
                    0,
                    3,
                ).should(
                    'equal',
                    'DetailsCountry: European UnionRegistration, Evaluation, Authorisation and Restriction of Chemicals',
                );
                ComplianceAssessor.clickSomeWhereOnPictogramTable(0);
                cy.wait(1000);
                ComplianceAssessor.mouseHoverTooltipOverFlagOptionOne(
                    1,
                    2,
                ).should(
                    'equal',
                    'DetailsCountry: European UnionRegistration, Evaluation, Authorisation and Restriction of Chemicals (Candidate list of substances of very high concern for authorisation)',
                );
                cy.step(
                    'Apec 1803Compliance-switch to RoHS tab,check if property table is visible,check for data in property table,' +
                        'choose EU from Country filter and check data,clear the Country filter ddl,choose from Criterion ddl-RoHS (Restriction of Hazardous Substances),' +
                        'clear the Criterion filter ddl,click on 1st linked "view" in Exemptions column, it should lead you to RoHS Exemptions page,' +
                        'check if China is selected by default from checkboxes for Country,select All from checkboxes for Country,collapse dropdown `RoHS exemption specific`,' +
                        'choose Cd from dropdown,collapse dropdown `Cadmium general`,close dropdown `Cadmium general`,collapse dropdown `Cadmium in medical devices and monitoring and control instruments`,' +
                        'collapse dropdown `Reference`,try several tooltips if it functional in dropdown `Cadmium in medical devices and monitoring and control instruments`.' +
                        'try several tooltips if it functional in dropdown `Cadmium general`,scroll to top of the page and go back to Compliance page`,click on 1st linked "view" in Substances column,' +
                        ' it should lead you to RoHS Exemptions page,check if China is selected by default from checkboxes for Country,select All from checkboxes for Country,turn back to Compliance page',
                );
                TabButtons.clickOnTab('RoHS');
                TabButtons.colorOfSelectedTabButton('RoHS').should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
                // check if property table is visible
                const defaultpropertyTableColumnHeaders = [
                    'CRITERION',
                    'STATUS',
                    'NOTE',
                    '',
                ];
                // const linkedTableColumnHeaders = ['Substances', 'Exemptions'];
                ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeaders,
                    );
                });

                // check for data in property table
                ComplianceAssessor.getNumberOfRowsInRoHS().then(
                    (numberOfRows) => {
                        const visibleNumberOfRows = numberOfRows.length;
                        expect(visibleNumberOfRows).to.be.equal(7);
                    },
                );
                // choose EU from Country filter and check data
                ConditionSelectorDDLForms.clickOnDDlFilters(
                    'Country',
                    'European Union',
                );
                ConditionSelectorDDLForms.getTextFromDDlFilters(
                    'Country',
                    'European Union',
                );
                ComplianceAssessor.getNumberOfRowsInRoHS().then(
                    (numberOfRows) => {
                        const visibleNumberOfRows = numberOfRows.length;
                        expect(visibleNumberOfRows).to.be.equal(2);
                    },
                );
                // clear the Country filter ddl
                ConditionSelectorDDLForms.clickOnClearOptionDDL('Country');
                ConditionSelectorHeaders.getSelectedOptionInDdl().then(
                    (statusOfFilters) => {
                        expect(statusOfFilters.eq(2).text()).to.equal(
                            '-- All --',
                        );
                    },
                );
                // choose from Criterion ddl-RoHS (Restriction of Hazardous Substances)
                ConditionSelectorDDLForms.clickOnDDlFilters(
                    'Criterion',
                    'RoHS (Restriction of Hazardous Substances)',
                );
                ConditionSelectorDDLForms.getTextFromDDlFilters(
                    'Criterion',
                    'RoHS (Restriction of Hazardous Substances)',
                );
                // clear the Criterion filter ddl
                ConditionSelectorDDLForms.clickOnClearOptionDDL('Criterion');
                ConditionSelectorHeaders.getSelectedOptionInDdl().then(
                    (statusOfFilters) => {
                        expect(statusOfFilters.eq(0).text()).to.equal(
                            '-- All --',
                        );
                    },
                );
                // click on 1st linked "view" in Exemptions column, it should lead you to RoHS Exemptions page
                ComplianceAssessor.clickOnViewLink(0, 5, 'View');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    ' RoHS Exemptions ',
                );
                // check if China is selected by default from checkboxes for Country
                ComplianceAssessor.getDefaultRoHSCheckBOx(2).should('be.true');
                ComplianceAssessor.colorOfSelectedRoHSCountry('China').should(
                    'have.css',
                    'color',
                    color.green,
                );
                ComplianceAssessor.getNumberOfColumnsInRoHS().then(
                    (numberOfColumns) => {
                        const visibleNumberOfColumns = numberOfColumns.length;
                        expect(visibleNumberOfColumns).to.be.equal(2);
                    },
                );
                // select All from checkboxes for Country
                ComplianceAssessor.ClickOnExemptionBox(0);
                ComplianceAssessor.getNumberOfColumnsInRoHS().then(
                    (numberOfColumns) => {
                        const visibleNumberOfColumns = numberOfColumns.length;
                        expect(visibleNumberOfColumns).to.be.equal(7);
                    },
                );

                ComplianceAssessor.getExemptionSubstanceMessage().should(
                    'equal',
                    ' To see specific exemptions, please select the substance. ',
                );
                // choose Cd from dropdown
                ComplianceAssessor.clickOnSubstancesDdl('Cd');
                ConditionSelectorHeaders.getTableHeader(0).should(
                    'eq',
                    'EXEMPTIONS ',
                );
                ConditionSelectorHeaders.getTableHeader(1).should(
                    'eq',
                    ' European Union ',
                );
                ConditionSelectorHeaders.getTableHeader(2).should(
                    'eq',
                    ' China ',
                );
                ConditionSelectorHeaders.getTableHeader(3).should(
                    'eq',
                    ' Japan ',
                );
                ConditionSelectorHeaders.getTableHeader(4).should(
                    'eq',
                    ' Russia ',
                );

                PropertyTable.findAndGetExemptionByName(
                    'Cadmium and its compounds in electrical contacts used in: circuit breakers, thermal sensing controls,',
                );
                PropertyTable.findAndGetExemptionByName(
                    'Exemption number: 8(b)-IApplies to ca ...',
                );

                ConditionSelectorHeaders.clickOnSearchFiltersArrowDropdown(3);
                PropertyTable.getTablePropertyCellText(
                    'Cadmium in metallic bonds creating superconducting magnetic circuits in MRI, SQUID, NMR (Nuclear Magnetic Resonance) or FTMS (Fourier Transform Mass Spectrometer) detectors',
                );

                PropertyTable.getTablePropertyCellText(
                    'Exemption number: 12.Expiration date:',
                );
                // open reference
                ConditionSelectorHeaders.clickOnSearchFiltersArrowDropdownByName(
                    'Reference',
                );
                // PropertyTable.getTablePropertyCellText(
                //     'TR 037/2016: 2016 / On the restriction of the use of hazardous substances in electrical and electronic products',
                // ).should('be.visible');

                // try several tooltips if it functional in dropdown `Cadmium in medical devices and monitoring and control instruments`
                PropertyTable.getTablePropertyCellTooltipText(
                    'Exemption number: 10',
                ).should('contain', 'Exemption number: 10');
                // try several tooltips if it functional in dropdown `Cadmium general`
                ConditionSelectorHeaders.clickOnSearchFiltersArrowDropdownByName(
                    'Cadmium - general',
                );
                PropertyTable.getTablePropertyCellTooltipText(
                    'Exemption number: 22No limitations',
                ).should('contain', 'Exemption number: 22No limitations');
                PropertyTable.getTablePropertyCellTooltipText(
                    'Exemption number: 35No limitations',
                ).should('contain', 'Exemption number: 35No limitations');
                // scroll to top of the page and go back to Compliance page
                cy.scrollTo('top');
                Buttons.clickOnBackButton();
                RightMenu.colorORightMenuModuleLinksCompliance(
                    ' Compliance ',
                ).should('have.css', 'background-color', color.greenLight);
                // click on 1st linked "view" in Substances column, it should lead you to RoHS Exemptions page
                ComplianceAssessor.clickOnViewLink(0, 4, 'View');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    ' RoHS substances and maximum concentration values (%) ',
                );
                // check if China is selected by default from checkboxes for Country
                ComplianceAssessor.getDefaultRoHSCheckBOx(2).should('be.true');
                ComplianceAssessor.colorOfSelectedRoHSCountry('China').should(
                    'have.css',
                    'color',
                    color.green,
                );
                ComplianceAssessor.getNumberOfColumnsInRoHS().then(
                    (numberOfColumns) => {
                        const visibleNumberOfColumns = numberOfColumns.length;
                        expect(visibleNumberOfColumns).to.be.equal(2);
                    },
                );
                // select All from checkboxes for Country
                ComplianceAssessor.ClickOnExemptionBox(0);
                ComplianceAssessor.getNumberOfColumnsInRoHS().then(
                    (numberOfColumns) => {
                        const visibleNumberOfColumns = numberOfColumns.length;
                        expect(visibleNumberOfColumns).to.be.equal(9);
                    },
                );
                // turn back to Compliance page`
                Buttons.clickOnBackButton();
                RightMenu.colorORightMenuModuleLinksCompliance(
                    ' Compliance ',
                ).should('have.css', 'background-color', color.greenLight);
                //     },
                // );
                // it('Apec 1803Compliance-switch to Inventory Lists tab,check if property table is visible, check for data in property table,check if property table is visible', () => {
                TabButtons.clickOnTab('Inventory Lists');
                TabButtons.colorOfSelectedTabButton('Inventory Lists').should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
                // check if property table is visible
                ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeadersOptionOne,
                    );
                });
                // check for data in property table
                ComplianceAssessor.getNumberOfRowsInRoHS().then(
                    (numberOfRows) => {
                        const visibleNumberOfRows = numberOfRows.length;
                        expect(visibleNumberOfRows).to.be.equal(14);
                    },
                );
                // });
                // it('Apec 1803Compliance-switch to Hazard tab, check if property table is visible,check for data in property table', () => {
                TabButtons.clickOnTab('Hazard');
                TabButtons.colorOfSelectedTabButton('Hazard').should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
                // check if property table is visible
                ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeadersOptionOne,
                    );
                });
                // check for data in property table
                ComplianceAssessor.getNumberOfRowsInRoHS().then(
                    (numberOfRows) => {
                        const visibleNumberOfRows = numberOfRows.length;
                        expect(visibleNumberOfRows).to.be.equal(6);
                    },
                );
                // });
                // it('Apec 1803Compliance-switch to Transport tab,check if property table is visible, check for data in property table', () => {
                TabButtons.clickOnTab('Transport');
                TabButtons.colorOfSelectedTabButton('Transport').should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
                // check if property table is visible
                ComplianceAssessor.getColumnHeaders().then((curentHeaders) => {
                    cy.Compare_Arrays(
                        curentHeaders,
                        defaultpropertyTableColumnHeadersOptionOne,
                    );
                });
                // check for data in property table
                ComplianceAssessor.getNumberOfRowsInRoHS().then(
                    (numberOfRows) => {
                        const visibleNumberOfRows = numberOfRows.length;
                        expect(visibleNumberOfRows).to.be.equal(9);
                    },
                );
                // });
                // it('Apec 1803Compliance-switch to Conflict Minerals, check if data is displayed on this tab', () => {
                TabButtons.clickOnTab('Conflict Minerals');
                TabButtons.colorOfSelectedTabButton('Conflict Minerals').should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
                // check if data is displayed on this tab
                ComplianceAssessor.getTextInConflictMinerals().should(
                    'equal',
                    `Using a structured survey process, Covestro verifies that its suppliers and their upstream suppliers are only obtaining materials which do not originate from conflict regions. Confirmations are documented centrally in the respective material/supplier combinations in Covestro's database.Covestro's requirements regarding conflict minerals are clearly communicated in its Supplier Code of Conduct. Covestro has obtained confirmations of compliance as regards conflict minerals from 100% of the suppliers from whom it actively purchases and who were identified as potentially affected by this issue. Covestro updates a list of potentially affected suppliers on an ongoing basis, and monitors the validity of all existing supplier confirmations. To date, there have been no critical results and no need for action regarding this issue.1 Conflict Minerals Statement `,
                    // TODO `Using a structured survey process, Covestro verifies that its suppliers and their upstream suppliers are only obtaining materials which do not originate from conflict regions. Confirmations are documented centrally in the respective material/supplier combinations in Covestro's database.Covestro's requirements regarding conflict minerals are clearly communicated in its Supplier Code of Conduct. Covestro has obtained confirmations of compliance as regards conflict minerals from 100% of the suppliers from whom it actively purchases and who were identified as potentially affected by this issue. Covestro updates a list of potentially affected suppliers on an ongoing basis, and monitors the validity of all existing supplier confirmations. To date, there have been no critical results and no need for action regarding this issue.1 Covestro AG (former Bayer MaterialScience AG), Safety Data Sheets / Available at: www.covestro.com, visited May-2023 `,
                );
            },
        );
        it('Apec 1803-click on right menu on linked module Ageing to go to that page, Fluid Ageing should be selected and diagram should be opened', () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            CommonSearch.enterMaterialDesignation('Apec 1803');
            CommonSearch.clickSearchButton();
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            RightMenu.clickOnRightMenuPropertyByIndex(13);
            cy.wait(1000);
            RightMenu.colorORightMenuModuleLinks(' Ageing ').should(
                'have.css',
                'background-color',
                color.beige,
            );

            // Fluid Ageing should be selected and diagram should be opened
            TabButtons.colorOfSelectedTabButton('Fluid Ageing').should(
                'have.css',
                'background-color',
                color.brown,
            );
            Formability.diagramAndTableDataExist().should('exist');
            // });
            // it('Apec 1803 Ageing-click on right menu on linked module Weatherability to go to that page, diagram should be opened', () => {
            RightMenu.clickOnRightMenuPropertyByIndex(14);
            cy.wait(1000);
            RightMenu.colorORightMenuModuleLinks(' Weatherability ').should(
                'have.css',
                'background-color',
                color.beige,
            );
            PropertyTable.clickOnViewDiagramLink(
                'Color Change, ∆E - Exposure Time (h)',
            );
            // diagram should be opened
            PropertyTableDiagram.getDiagramName().should(
                'equal',
                'Color Change, ∆E - Exposure Time (h)',
            );
            Formability.diagramAndTableDataExist().should('exist');
            // });
            // it('Apec 1803-click on right menu on linked module Irradiation to go to that page, diagram should be opened', () => {
            RightMenu.clickOnRightMenuPropertyByIndex(15);
            cy.wait(1000);
            RightMenu.colorORightMenuModuleLinks(' Irradiation ').should(
                'have.css',
                'background-color',
                color.beige,
            );
            PropertyTable.clickOnViewDiagramLink(
                'Modulus of Elasticity (GPa) - Radiation Dose (Mrad)',
            );
            // Apec 1803 Irradiation-diagram should be opened
            PropertyTableDiagram.getDiagramName().should(
                'equal',
                'Modulus of Elasticity (GPa) - Radiation Dose (Mrad)',
            );
            Formability.diagramAndTableDataExist().should('exist');
            // });
            // it('Apec 1803-go to Stress Strain-change from default condition to 3rd, then change temperature to 40°C, check if the diagram and data are changed', () => {
            RightMenu.clickOnRightMenuPropertyByIndex(7);
            cy.wait(1000);
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'equal',
                ' Experiment Strain Rate: 0.01 1/s; Tensile; Testing Machine: Instron 1331 Specimen Length: 12.8 mm; Diameter: 3.81 mm Comment Stress strain data originating from tensile testing.',
            );
            cy.wait(1000);
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(2).should(
                'have.class',
                'table-cell-radio',
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                'contain',
                ' Experiment Tensile Comment Stress strain data originating from tensile testing',
            );
            Formability.diagramAndTableDataExist().should('exist');
            PropertyTable.getTableValues('0.0078');
            PropertyTable.getTableValues('18.88');
            // StressStrain.clickOnDDl('40°C');
            ConditionSelectorDDLForms.clickOnTemperatureFilter('40°C');
            PropertyTable.getTableValues('0.0055');
            PropertyTable.getTableValues('12.51');
            Formability.diagramAndTableDataExist().should('exist');
        });
    },
);
