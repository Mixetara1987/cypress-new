import { AdvancedHome } from '@/AdvancedSearch/advancedSearchHome';
import { AdvancedMechanicalPhysicalProperty } from '@/AdvancedSearch/advancedSearchMechanicalPhysical';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { ConditionSelectorSyntheticView } from '@/HelpersMethods/conditionSelectorSyntheticView';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { ManufacturingProcesses } from '@/ManufacturingProcesses/manufacturingProcessec';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { LoginPage } from '@/LoginPage/loginPage';
import { MechanicalProperties } from '@/mechanicalProperties';
import { color } from 'cypress/fixtures/color';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke test 33 min, Material Group dropdown',
    { tags: ['@smoke', '@totalSearch'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            Helpers.waitForloaderIfLoaderExist();
        });

        it('Home page-check for the functionality of DDL "Material group" (Click on it and check for the list in it).', () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            const expectedListOfItemsInMaterialGroup = [
                'Ferrous Alloys',
                'Nonferrous Alloys',
                'Polymers',
                'Ceramics',
                'Composites',
                'Filler/Reinforcement',
                'Cements',
                'Honeycombs',
                'Foams',
                'Wood',
            ];
            CommonSearch.getMaterialGroupDDL().click();
            CommonSearch.getItemsListInMaterialGroup().then(
                (currentListOfItemsInMaterialGroup) => {
                    cy.Compare_Arrays(
                        currentListOfItemsInMaterialGroup,
                        expectedListOfItemsInMaterialGroup,
                    );
                },
            );
        });
        it('Home page/Material group dropdown-expand Nonferrous Alloys, expand Cobalt, select Magnetic materials, perform the search, it should show some results and check if in List of materials in  Classification should appear Cobalt/Magnetic materials', () => {
            CommonSearch.selectMaterialGroups(
                ['Nonferrous Alloys', 'Cobalt'],
                ['Magnetic materials'],
            );
            CommonSearch.mouseHoverMaterialGroupDDl().should(
                'equal',
                'Magnetic materials',
            );
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
            ListOfMaterials.getItemFromColumn(
                'classification',
                'Nonferrous Alloys / Cobalt / Magnetic materials',
            );
            // });
            // it('Home page/Material group dropdown-click on 1st material from the list(SmEr YHG-22, Proprietary), it should lead you to Physical Properties page, check if property table is displayed', () => {
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                '(SmEr)2 (CoTm)17 LTC (YHG-22)',
            );
            RightMenu.colorORightMenuModuleLinks(
                ' Physical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            cy.wait(1000);
            PropertyTable.getTextInHeaders().should(
                'contain',
                ' Property  Value  Unit  Note ',
            );
            // });
            // it('Home page/Material group dropdown-click on linked message `Advanced Search` in Mechancial Properties tab, it should lead you to Advanced Search page', () => {
            AdvancedMechanicalPhysicalProperty.clickOnAdvancedSearhcLink(
                'Advanced Search',
            );
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Advanced Search',
            );
            cy.wait(1000);
            AdvancedHome.closeModal();
            // });
            // it('Home page/Material group dropdown-turn back to Home page, clear Magnetic materials from Material group ddl', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            cy.wait(1000);
            CommonSearch.clearMaterialGroup();
            cy.wait(1000);
            CommonSearch.getMaterialGroupDDL()
                .invoke('text')
                .should('equal', 'Material group');
        });
        it(
            'Home page/Material group dropdown-expand Nonferrous Wood, expand Wood-based panels, select Plywood, perform the search, it should show 3 material as results,' +
                'check if in the List of materials in Classification appears Wood/Plywood, turn back to Home page, clear Plywood from Material group ddl',
            () => {
                CommonSearch.selectMaterialGroups(
                    ['Nonferrous Alloys', 'Wood', 'Wood-based panels'],
                    ['Plywood'],
                );
                CommonSearch.mouseHoverMaterialGroupDDl().should(
                    'equal',
                    'Plywood',
                );
                cy.wait(1000);
                // perform the search, it should show 3 material as results, check if in the List of materials in Classification appears Wood/Plywood, turn back to Home page, clear Plywood from Material group ddl
                CommonSearch.clickSearchButton();
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                ListOfMaterials.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.contain('Result(s) found:');
                });
                ListOfMaterials.getItemFromColumn(
                    'classification',
                    'Wood / Wood-based panels / Plywood',
                );
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.clearMaterialGroup();
                CommonSearch.getMaterialGroupDDL()
                    .invoke('text')
                    .should('equal', 'Material group');
            },
        );

        it('Home page/Material group dropdown-expand Cement, expand Blastfurnace cement, expand Other Cement Types, choose High Alumina Cements, it should show 1 material as result, check if in the List of materials in Classification appears Cements/High Alumina Cements', () => {
            CommonSearch.selectMaterialGroups(
                [
                    'Cements',
                    'Blast furnace cement (CEM III)',
                    'Other Cement Types',
                ],
                ['High Alumina Cements'],
            );
            CommonSearch.mouseHoverMaterialGroupDDl().should(
                'equal',
                'High Alumina Cements',
            );

            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
            ListOfMaterials.getResultsFound().then((results) => {
                const resultsFound = results.text();
                expect(resultsFound).to.contain('Result(s) found:');
            });
            ListOfMaterials.getItemFromColumn(
                'classification',
                'Cements / Other Cement Types / High Alumina Cements',
            );
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialGroup();
            CommonSearch.getMaterialGroupDDL()
                .invoke('text')
                .should('equal', 'Material group');
        });
        it('Home page/Material group dropdown-expand Composites, expand Cements, expand Composite cement, expand Composite Cement(CEM V), choose Composite Cement, perform the search, it should show some results, check if in the List of materials in Classification appears Cements / Composite cement (CEM V) / Composite cement', () => {
            CommonSearch.selectMaterialGroups(
                ['Composites', 'Cements', 'Composite cement (CEM V)'],
                ['Composite cement'],
            );
            CommonSearch.mouseHoverMaterialGroupDDl().should(
                'equal',
                'Composite cement (CEM V)',
            );
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
            ListOfMaterials.getItemFromColumn(
                'classification',
                'Cements / Composite cement (CEM V) / Composite cement',
            );
            // });
            // it('Home page/Material group dropdown-click on the 1st material from the list(CEM V/A 22.5N GOST), it should lead you to Mechanical Properties page', () => {
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            // });
            // it('Home page/Material group dropdown-switch to Physical Properties Material tab', () => {
            MaterialDetails.clickOnPhysicalPropertiesTab();
            RightMenu.colorORightMenuModuleLinks(
                ' Physical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            // });
            // it('Home page/Material group dropdown-click in the right menu to go to Material Description, it should display table with source and Comment for (CEM V/A 22.5N GOST)', () => {
            RightMenu.clickOnRightMenuModuleLinks(' Material Description ');
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Material Description',
            );
            PropertyTable.findSourcePropertyInTable(' Source ');
            PropertyTable.findSourcePropertyInTable(' Comment ');
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialGroup();
            CommonSearch.getMaterialGroupDDL()
                .invoke('text')
                .should('equal', 'Material group');
        });

        it('Home page/Material group dropdown-expand Filler/Reinforcement, expand Fiber/Fabric, expand Ceramics Fibers, choose Alumina (Al2O3), perform the search, it should show some material as results, check if in the List of materials in Classification appears Filler/Reinforcement / Fiber/Fabric / Ceramic Fibers / Alumina (Al2O3)', () => {
            CommonSearch.selectMaterialGroups(
                ['Filler/Reinforcement', 'Fiber/Fabric', 'Ceramic Fibers'],
                ['Alumina (Al2O3)'],
            );
            CommonSearch.mouseHoverMaterialGroupDDl().should(
                'equal',
                'Alumina (Al2O3)',
            );
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
            ListOfMaterials.getResultsFound().then((results) => {
                const resultsFound = results.text();
                expect(resultsFound).to.contain('Result(s) found:');
            });
            ListOfMaterials.getItemFromColumn(
                'classification',
                'Filler/Reinforcement / Fiber/Fabric / Ceramic Fibers / Alumina (Al2O3)',
            );
            // });
            // it('Home page/Material group dropdown-click on the 1st material from the list(Nextel 610 Proprietary), it should lead you to Mechanical Properties page', () => {
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            MechanicalProperties.getSelectedView().should(
                'eq',
                ' Synthetic view ',
            );
            ConditionSelectorSyntheticView.getSyntheticViewPropertyUnits().then(
                (propertyUnits) => {
                    expect(propertyUnits).to.deep.includes('MPa');
                },
            );
            // });
            // it('Home page/Material group dropdown-switch from synthetic to details view (Nextel 610 Proprietary)', () => {
            ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
            PropertyTable.getTextInHeaders().should(
                'deep.include',
                ' Property  T(°C)  Value  Unit  Note ',
            );
            PropertyTable.getTextInGreyGridPropertyTable(0).then(
                (properties) => {
                    expect(properties.text()).contains(
                        'FilamentReference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021Reference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021',
                    );
                },
            );
            // });
            // it('Home page/Material group dropdown-click on Physical Properties Material tab, to go to Physical (Nextel 610 Proprietary)', () => {
            MaterialDetails.clickOnPhysicalPropertiesTab();
            RightMenu.colorORightMenuModuleLinks(
                ' Physical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            MechanicalProperties.getSelectedView().should(
                'eq',
                ' Synthetic view ',
            );
            ConditionSelectorSyntheticView.getSyntheticViewPropertyUnits().then(
                (propertyUnits) => {
                    expect(propertyUnits).to.deep.includes(
                        '370 GPa3.9 kg/dm³4.7 — 6.9 2 E-03 1.74 2000 °C1000 °C',
                    );
                },
            );
            // });
            // it('Home page/Material group dropdown-switch from synthetic to details view (Nextel 610 Proprietary), check if property group tabs are displayed, General should be selected as default', () => {
            ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
            TabButtons.getButtonTitle(0).should('equal', ' General ');
            TabButtons.getButtonTitle(1).should('equal', ' Thermal ');
            TabButtons.getButtonTitle(2).should('equal', ' Electrical ');
            TabButtons.getButtonTitle(3).should('equal', ' Optical ');
            PropertyTable.getTextInHeaders().should(
                'deep.include',
                ' Property  T(°C)  Value  Unit  Note ',
            );
            TabButtons.colorOfSelectedTabButton('General').should(
                'have.css',
                'background-color',
                color.blue,
            );
            // });
            // it('Home page/Material group dropdown-check data in grey grid for property table for General tab, (Nextel 610 Proprietary)', () => {
            PropertyTable.getTextInGreyGridPropertyTable(0).then(
                (properties) => {
                    expect(properties.text()).contains(
                        'FilamentReference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021Reference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021',
                    );
                },
            );
            PropertyTable.getNumberOfVisiblePropertyRows().should('equal', 2);
            // });
            // it('Home page/Material group dropdown-switch to Thermal property group tab, (Nextel 610 Proprietary), select 2nd condition, check data in grey grid for property table, it should be displayed for both selected condition', () => {
            TabButtons.clickOnTab(' Thermal ');
            PropertyTable.getTextInHeaders().should(
                'deep.include',
                ' Property  T(°C)  Value  Unit  Note ',
            );
            TabButtons.colorOfSelectedTabButton('Thermal').should(
                'have.css',
                'background-color',
                color.blue,
            );
            PropertyTable.getNumberOfVisiblePropertyRows().should('equal', 2);
            cy.wait(1000);
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(1);
            cy.wait(1000);
            PropertyTable.getNumberOfVisiblePropertyRows().should('equal', 2);
            PropertyTable.getTextInGreyGridPropertyTable(0).then(
                (properties) => {
                    expect(properties.text()).contains(
                        'FilamentReference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021Reference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021',
                    );
                },
            );
            PropertyTable.getTextInGreyGridPropertyTable(1).then(
                (properties) => {
                    expect(properties.text()).contains(
                        'Tested under 69 MPa after 1000 hReference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021Reference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021',
                    );
                },
            );
            // });
            // it('Home page/Material group dropdown-switch to Electrical property group tab, (Nextel 610 Proprietary), select 2nd condition, check data in grey grid for property table, it should be displayed for both selected condition', () => {
            TabButtons.clickOnTab(' Electrical ');
            PropertyTable.getTextInHeaders().should(
                'deep.include',
                ' Property  T(°C)  Value  Unit  Note ',
            );
            TabButtons.colorOfSelectedTabButton('Electrical').should(
                'have.css',
                'background-color',
                color.blue,
            );
            PropertyTable.getNumberOfVisiblePropertyRows().should('equal', 2);
            cy.wait(1000);
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(1);
            cy.wait(1000);
            PropertyTable.getNumberOfVisiblePropertyRows().should('equal', 4);
            PropertyTable.getTextInGreyGridPropertyTable(0).then(
                (properties) => {
                    expect(properties.text()).contains(
                        'FilamentReference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021Reference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021',
                    );
                },
            );
            PropertyTable.getTextInGreyGridPropertyTable(1).then(
                (properties) => {
                    expect(properties.text()).contains(
                        'Test data after Air part subtractedReference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021Reference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021',
                    );
                },
            );
            // });
            // it('Home page/Material group dropdown-switch to Optical property group tab, (Nextel 610 Proprietary), check data in grey grid for property table for Optical tab', () => {
            TabButtons.clickOnTab(' Optical ');
            PropertyTable.getTextInHeaders().should(
                'deep.include',
                ' Property  T(°C)  Value  Unit  Note ',
            );
            TabButtons.colorOfSelectedTabButton('Optical').should(
                'have.css',
                'background-color',
                color.blue,
            );
            cy.wait(1000);
            PropertyTable.getTextInGreyGridPropertyTable(0).then(
                (properties) => {
                    expect(properties.text()).contains(
                        'FilamentReference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021Reference:  3M Company, Product Data Sheets / Available at: www.3m.com, visited 2021',
                    );
                },
            );
            cy.wait(1000);
            PropertyTable.getNumberOfVisiblePropertyRows().should('equal', 1);
            // });
            // it('Home page/Material group dropdown-switch from Details to Synthetic view, (Nextel 610 Proprietary), if check property values are visible', () => {
            ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
            MechanicalProperties.getSelectedView().should(
                'eq',
                ' Synthetic view ',
            );
            ConditionSelectorSyntheticView.getSyntheticViewPropertyUnits().then(
                (propertyUnits) => {
                    expect(propertyUnits).to.deep.includes(
                        '370 GPa3.9 kg/dm³4.7 — 6.9 2 E-03 1.74 2000 °C1000 °C',
                    );
                },
            );
            // });
            // it('Home page/Material group dropdown-turn back to Home page, clear Alumina (Al2O3) from Material group ddl', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialGroup();
            CommonSearch.getMaterialGroupDDL()
                .invoke('text')
                .should('equal', 'Material group');
        });
        it('Home page/Material group dropdown-expand Polymers, expand Plastics, thermoplasts, expand Biopolymers(CA, CAB, PLA..), choose Celulose acetate butyrate(CAB), perform the search, it should show some material as results, check if in the List of materials in Classification appears Polymers / Plastics, thermoplasts / Biopolymers (CA, CAB, PLA...) / CAB', () => {
            CommonSearch.selectMaterialGroups(
                [
                    'Polymers',
                    'Plastics, thermoplasts',
                    'Biopolymers (CA, CAB, PLA...)',
                ],
                ['Cellulose acetate butyrate (CAB)'],
            );

            CommonSearch.mouseHoverMaterialGroupDDl().should(
                'equal',
                'Cellulose acetate butyrate (CAB)',
            );

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
            ListOfMaterials.getItemFromColumn(
                'classification',
                'Polymers / Plastics, thermoplasts / Biopolymers (CA, CAB, PLA...) / CAB',
            );
            // });
            // it('Home page/Material group dropdown-click on the 1st material from the list(Cellidor B 500-05 Proprietary), it should lead you to Mechanical Properties page', () => {
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            MechanicalProperties.getSelectedView().should(
                'eq',
                ' Synthetic view ',
            );
            ConditionSelectorSyntheticView.getSyntheticViewPropertyUnits().then(
                (propertyUnits) => {
                    expect(propertyUnits).to.deep.includes('MPa');
                },
            );
            // });
            // it('Home page/Material group dropdown-click in the right menu to go to Manufacturing Processes for (Cellidor B 500-05 Proprietary), it should be displayed 2 conditions, 1st `Injection molding` should be selected by default', () => {
            RightMenu.clickOnRightMenuPropertyByIndex(6);
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Manufacturing Processes',
            );
            ManufacturingProcesses.getTextInGreyGridPropertyTable().then(
                (properties) => {
                    expect(properties.length).to.be.equal(1);
                    expect(properties.text()).to.equal('Injection molding');
                },
            );
            // });
            // it('Home page/Material group dropdown- click in the right menu to go back to Mechanical Properties for (Cellidor B 500-05 Proprietary)', () => {
            RightMenu.colorORightMenuModuleLinks(
                ' Manufacturing Processes ',
            ).should('have.css', 'background-color', color.seablue);
            RightMenu.clickOnRightMenuPropertyByIndex(4);
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            MechanicalProperties.getSelectedView().should(
                'eq',
                ' Synthetic view ',
            );
            ConditionSelectorSyntheticView.getSyntheticViewPropertyUnits().then(
                (propertyUnits) => {
                    expect(propertyUnits).to.deep.includes(
                        '50 MPa50 MPa50 MPa4.7 — 10 %10 %4.7 %60 MPa60 MPa15 — 115 kJ/m²15 kJ/m²115 kJ/m²90 MPa',
                    );
                },
            );
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.clearMaterialGroup();
            CommonSearch.getMaterialGroupDDL()
                .invoke('text')
                .should('equal', 'Material group');
        });
    },
);
