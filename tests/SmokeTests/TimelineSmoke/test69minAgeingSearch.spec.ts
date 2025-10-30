import { color } from 'cypress/fixtures/color';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { SelectedConditions } from '@/CommonMethods/selectedConditions';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CorrosionConditionSelector } from '@/Corosion/corrosionConditionSelector';
import { CreepData } from '@/CreepData/creepData';
import { Ageing } from '@/Enviro/Ageing';
import { AgeingMetalsPropertyTable } from '@/Enviro/AgeingMetalsPropertyTable';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { CommonSearch } from '@/CommonMethods/CommonSearch';

const defaultpropertyTableColumnHeaders = [
    ' Property ',
    ' T(°C) ',
    ' Value ',
    ' Unit ',
    ' Note ',
    '',
];

describe(
    'Smoke Test ( 69:00 min ), Ageing search',
    { tags: ['@smoke', '@enviro', '@ageing'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            Ageing.navigateAgeingSearchPage();
        });

        it('Ageing search(Time-Temperature dependency tab)-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), direct data slider', () => {
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Enviro Ageing',
            );
            TabButtons.colorOfSelectedTabAgeing(
                'Time-Temperature dependency',
            ).then((background) => {
                expect(background).to.equal(color.brownLight);
            });
            // Check for material designation field
            CommonSearch.getMaterialDesignation().should('be.visible');
            // Check if Standard dropdown is visible
            CommonSearch.getStandardDDL().should('be.visible');
            // Check if Producer and Type field is visible
            ConditionSelectorDDLForms.visibleProduceAndType(0).should(
                'be.visible',
            );
            ConditionSelectorDDLForms.visibleProduceAndType(1).should(
                'be.visible',
            );
            // check if Material group ddl is visible
            CommonSearch.getMaterialGroupDDL().should('be.visible');
            // check if Exposure Temperature  ddl is visible
            Ageing.visibleExposureTemperatureMediumConcentration().should(
                'be.visible',
            );
            // check titles for search filters
            cy.wait(1000);
            ConditionSelectorHeaders.getConditionFiltersTitles().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Material Designation');
                    expect(title.eq(1).text()).to.equal('Standard');
                    expect(title.eq(2).text()).to.equal('Producer');
                    expect(title.eq(3).text()).to.equal('Type');
                    expect(title.eq(4).text()).to.equal('Material group');
                },
            );
            ConditionSelectorHeaders.getTitleForExposureTemperature(
                'Exposure Temperature',
            ).should('equal', 'Exposure Temperature');
            // Verify if condition filter is selected "all" by default for Standard
            CommonSearch.getStandardDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "all" by default for Type
            CommonSearch.getMaterialTypeDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "all" by default for Material group
            CommonSearch.getMaterialGroupDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "all" by default for Exposure Temperature
            Ageing.getSelectedOptionForExposureTemperature().each(($status) => {
                const textContent = $status.text();
                expect(textContent).to.contain('All');
            });
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');
            // check if Direct Data only slider is visible
            Sliders.IsOnDirectDataOnlySliderVisible().should('exist');
        });
        it(
            'Ageing(Time-Temperature dependency tab) search-Exposure Temperature-(<30°C), Direct data-On, Material group-Ceramics, perform the search, it should have 0 results,' +
                'remove <30°C from Exposure Temperature ddl, Direct data-On and Ceramics remain selected, perform the search again, it should show some results',
            () => {
                TabButtons.colorOfSelectedTabAgeing(
                    'Time-Temperature dependency',
                ).then((background) => {
                    expect(background).to.equal(color.brownLight);
                });

                CommonSearch.selectMaterialGroups([''], ['Ceramics']);
                ConditionSelectorDDLForms.clickOnDDl(
                    'Exposure Temperature',
                    '< 30°C',
                );
                Sliders.clickOnDirectDataOnlySlider();
                cy.wait(2000);
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Ceramics )  AND  (  Exposure Temperature: < 30°C )  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getAlertMessage().then((results) => {
                    expect(results).to.contain(' Total items found: 0');
                });
                ConditionSelectorDDLForms.clearDDl(0);
                Ageing.getSelectedOptionForExposureTemperature().each(
                    ($status) => {
                        const textContent = $status.text();
                        expect(textContent).to.contain('All');
                    },
                );
                // Ageing(Time-Temperature dependency tab) search-Direct data-On and Ceramics remain selected, perform the search again, it should show 2 results
                TabButtons.colorOfSelectedTabAgeing(
                    'Time-Temperature dependency',
                ).then((background) => {
                    expect(background).to.equal(color.brownLight);
                });
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Ceramics )  AND  (  Direct data only )  ',
                );
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
                //     },
                // );
                // it(
                //     'Ageing(Time-Temperature dependency tab)search- click on material from the list of materials(Type S),' +
                //         'it should lead you to Ageing page for that material, check property table and data for 1st note(4-point testTest Method: ASTM C1161)',
                //     () => {
                cy.step(
                    'Ageing(Time-Temperature dependency tab)search- click on material from the list of materials(Type S),' +
                        'it should lead you to Ageing page for that material, check property table and data for 1st note(4-point testTest Method: ASTM C1161)',
                );

                TabButtons.colorOfSelectedTabAgeing(
                    'Time-Temperature dependency',
                ).then((background) => {
                    expect(background).to.equal(color.brownLight);
                });
                ListOfMaterials.clickOnMaterialInListByIndex(4);
                ConditionSelectorHeaders.getTitle().should('equal', 'Ageing');
                AgeingMetalsPropertyTable.getSelectedTextInConditions().then(
                    (texInCondition) => {
                        const stringInCondition = texInCondition.text();
                        expect(stringInCondition).to.equal(
                            'Time: 10 h; Temperature: 134 °C; General comment: Accelerated ageing: In Autoclave (0.2 MPa, 134°C)',
                        );
                    },
                );
                ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );
                PropertyTable.findPropertyNameInTable(
                    'Change in Flexural Strength',
                );
                PropertyTable.findNoteInTable(
                    '4-point testTest Method: ASTM C1161',
                );
                //     },
                // );
                // it('Ageing(Time-Temperature dependency tab)search- turn back to Ageing(Time-Temperature dependency tab)search search page, direct data-on and Ceramics should be selected', () => {
                cy.step(
                    'Ageing(Time-Temperature dependency tab)search- turn back to Ageing(Time-Temperature dependency tab)search search page, direct data-on and Ceramics should be selected',
                );
                TabButtons.clickOnTheTabs('Ageing');
                TabButtons.colorOfSelectedTabAgeing(
                    'Time-Temperature dependency',
                ).then((background) => {
                    expect(background).to.equal(color.brownLight);
                });
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Ceramics )  AND  (  Direct data only )  ',
                );
                // TabButtons.clickOnTheTabs('Ageing');
                cy.wait(1000);
                CommonSearch.clearMaterialGroup();
                cy.wait(1000);
                CommonSearch.getMaterialGroupDDL().then((status) => {
                    expect(status.eq(0).text()).to.contain('All');
                });
                CommonSearch.selectMaterialGroups(
                    ['Filler/Reinforcement'],
                    ['Fiber/Fabric'],
                );
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Filler/Reinforcement )  AND  (  Direct data only )  ',
                );
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
                //     },
                // );
                // it('Ageing(Time-Temperature dependency tab)search- click on 1st material from the list, it should lead you to Ageing for this material, check if property table is visible, click on "View daigram" in property table, check if the diagram is displayed, and then close it', () => {
                cy.step(
                    'Ageing(Time-Temperature dependency tab)search- click on 1st material from the list, it should lead you to Ageing for this material, check if property table is visible, click on "View daigram" in property table, check if the diagram is displayed, and then close it',
                );
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitle().should('equal', 'Ageing');
                TabButtons.colorOfSelectedMainTab('Ageing').then(
                    (background) => {
                        expect(background).to.equal(color.brownLight);
                    },
                );
                TabButtons.colorOfSelectedTabButton(
                    'Time-Temperature dependency',
                ).should('have.css', 'background-color', color.brown);

                ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );

                PropertyTable.findPropertyNameInTable(
                    'Retention of Tensile Strength (%) - Exposure Temperature (°C) View diagram ',
                );
                PropertyTableDiagram.clickOnDiagramByName(
                    'Retention of Tensile Strength (%) - Exposure Temperature (°C)',
                );
                PropertyTableDiagram.closeDiagram();
                //     },
                // );
                // it('Ageing(Time-Temperature dependency tab)search- turn back to Ageing search, Fibers should remain checked, uncheck Fibers, select Foams, direct data remain checked to ON, perform the search, it should show some results', () => {
                cy.step(
                    'Ageing(Time-Temperature dependency tab)search- turn back to Ageing search, Fibers should remain checked, uncheck Fibers, select Foams, direct data remain checked to ON, perform the search, it should show some results',
                );
                TabButtons.clickOnTheTabs('Ageing');
                TabButtons.colorOfSelectedTabAgeing(
                    'Time-Temperature dependency',
                ).then((background) => {
                    expect(background).to.equal(color.brownLight);
                });
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Filler/Reinforcement )  AND  (  Direct data only )  ',
                );
                // uncheck fibers
                // CommonSearch.clearMaterialGroup();
                CommonSearch.selectMaterialGroups(
                    [''],
                    ['Filler/Reinforcement'],
                );

                CommonSearch.selectMaterialGroups([''], ['Foams']);
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Foams )  AND  (  Direct data only )  ',
                );
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
                //     },
                // );
                // it(
                //     'Ageing(Time-Temperature dependency tab)search-click on the 2nd material from the list, it should lead you to Ageing(Time-Temperature depedency tab) for this material,' +
                //         ',check if in material info Foam is visible, then Verify data in "Selected Condition" box, it should consist text "Foam" and finally check if property table is visible',
                //     () => {
                cy.step(
                    'Ageing(Time-Temperature dependency tab)search-click on the 2nd material from the list, it should lead you to Ageing(Time-Temperature depedency tab) for this material,' +
                        ',check if in material info Foam is visible, then Verify data in "Selected Condition" box, it should consist text "Foam" and finally check if property table is visible',
                );
                ListOfMaterials.getItemFromColumn(
                    'classification',
                    'Foams / Polymer Foams /',
                );
                ListOfMaterials.clickOnMaterialInListByIndex(1);
                cy.wait(500);
                MaterialInfo.findMaterialInfoValue(
                    'Foams / Polymer Foams / Polyurethane (PUR)',
                );
                ConditionSelectorHeaders.getTitle().should('equal', 'Ageing');
                TabButtons.colorOfSelectedTabButton(
                    'Time-Temperature dependency',
                ).should('have.css', 'background-color', color.brown);
                SelectedConditions.getAllTextInSelectedConditions().then(
                    (textInSelectedConditions) => {
                        expect(
                            textInSelectedConditions.eq(0).text(),
                        ).to.include(
                            'Time: 48 h; Temperature: 121 °C, ±2; Product: Foam',
                        );
                    },
                );
                ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );
                //     },
                // );
                // it('Ageing(Time-Temperature dependency tab)search- turn back to Ageing search, direct dana-on and Foams are still selected, clear the search', () => {
                cy.step(
                    'Ageing(Time-Temperature dependency tab)search- turn back to Ageing search, direct dana-on and Foams are still selected, clear the search',
                );
                TabButtons.clickOnTheTabs('Ageing');
                TabButtons.colorOfSelectedTabAgeing(
                    'Time-Temperature dependency',
                ).then((background) => {
                    expect(background).to.equal(color.brownLight);
                });
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material group: Foams )  AND  (  Direct data only )  ',
                );
                cy.wait(1000);
                CommonSearch.clearSearchFilters();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
            },
        );
        it('Ageing(Time-Temperature dependency tab)search-switch to Fluid Ageing tab, check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), direct data slider', () => {
            TabButtons.clickOnTheTabsOnAgeing('Fluid Ageing');
            TabButtons.colorOfSelectedTabAgeing('Fluid Ageing').then(
                (background) => {
                    expect(background).to.equal(color.brownLight);
                },
            );
            // Check for material designation field
            CommonSearch.getMaterialDesignation().should('be.visible');
            // Check if Standard dropdown is visible
            CommonSearch.getStandardDDL().should('be.visible');
            // Check if Producer and Type field is visible
            ConditionSelectorDDLForms.visibleProduceAndType(0).should(
                'be.visible',
            );
            ConditionSelectorDDLForms.visibleProduceAndType(1).should(
                'be.visible',
            );
            // check if Material group ddl is visible
            CommonSearch.getMaterialGroupDDL().should('be.visible');
            // check if Exposure Temperature, Medium, Contentration  ddl is visible
            Ageing.visibleExposureTemperatureMediumConcentration().each(
                ($status) => {
                    const textContent = $status.text();
                    expect(textContent).to.contain('All');
                },
            );
            cy.wait(1000);
            ConditionSelectorHeaders.getConditionFiltersTitles().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Material Designation');
                    expect(title.eq(1).text()).to.equal('Standard');
                    expect(title.eq(2).text()).to.equal('Producer');
                    expect(title.eq(3).text()).to.equal('Type');
                    expect(title.eq(4).text()).to.equal('Material group');
                },
            );
            ConditionSelectorHeaders.getTitleForExposureTemperature(
                'Exposure Temperature',
            ).should('equal', 'Exposure Temperature');
            ConditionSelectorHeaders.getTitleForExposureTemperature(
                'Medium',
            ).should('equal', 'Medium');
            ConditionSelectorHeaders.getTitleForExposureTemperature(
                'Concentration',
            ).should('equal', 'Concentration');
            // Verify if condition filter is selected "all" by default for Standard
            CommonSearch.getStandardDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "all" by default for Type
            CommonSearch.getMaterialTypeDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "all" by default for Material group
            CommonSearch.getMaterialGroupDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            // Verify if condition filter is selected "all" by default for Exposure Temperature
            Ageing.getSelectedOptionForExposureTemperature().each(($status) => {
                const textContent = $status.text();
                expect(textContent).to.contain('All');
            });
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');

            // check if Direct Data only slider is visible
            Sliders.IsOnDirectDataOnlySliderVisible().should('exist');
        });

        it('Ageing(Fluid Ageing tab)search-choose from Concentration(10-30%), Direct Data-on, perform the search, it should show some results, go to last page of results, click on the material CELANEX 2302SW1 GV1/20, it sohuld lead you to Ageing(Fluid Ageing ta) for this material', () => {
            TabButtons.clickOnTheTabsOnAgeing('Fluid Ageing');
            TabButtons.colorOfSelectedTabAgeing('Fluid Ageing').then(
                (background) => {
                    expect(background).to.equal(color.brownLight);
                },
            );
            ConditionSelectorDDLForms.clickOnDDl('Concentration', '10 - 30%');
            Sliders.clickOnDirectDataOnlySlider();
            CommonSearch.clickSearchButton();
            cy.wait(1000);
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Concentration: 10 - 30% )  AND  (  Direct data only )  ',
            );
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
            ListOfMaterials.getItemFromColumn('designation', 'Ryton XK2340');
            ListOfMaterials.clickOnLastPage();
            ListOfMaterials.clickOnMaterialInListString(
                'CELANEX 2302SW1 GV1/20',
            );
            ConditionSelectorHeaders.getTitle().should('equal', 'Ageing');
            TabButtons.colorOfSelectedTabButton('Fluid Ageing').should(
                'have.css',
                'background-color',
                color.brown,
            );
            // });
            // it('Ageing(Fluid Ageing tab)search-try functionality of changing conditions in the list and verify change data in condition and in property table(click on 3rd and 5th condition)', () => {
            cy.step(
                'Ageing(Fluid Ageing tab)search-try functionality of changing conditions in the list and verify change data in condition and in property table(click on 3rd and 5th condition)',
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.brown,
            );
            ConditionsSelectorDetailsView.getSelectedTextInConditions().then(
                (defaultConditions) => {
                    PropertyTable.getPropertyValuesInTableRow('-5 ');
                    ConditionsSelectorDetailsView.clickOnCheckboxCondition(2);
                    ConditionsSelectorDetailsView.getSelectedTextInConditions().then(
                        (thirdConditions) => {
                            expect(defaultConditions.text()).not.to.equal(
                                thirdConditions.text(),
                            );
                        },
                    );
                    cy.wait(1000);
                    CreepData.colorOfSelectedCondition().should(
                        'have.css',
                        'background-color',
                        color.brown,
                    );
                    PropertyTable.getPropertyValuesInTableRow('-41 ');
                },
            );
            ConditionsSelectorDetailsView.getSelectedTextInConditions().then(
                (thirdConditions) => {
                    ConditionsSelectorDetailsView.clickOnCheckboxCondition(4);
                    ConditionsSelectorDetailsView.getSelectedTextInConditions().then(
                        (fifthConditions) => {
                            expect(thirdConditions.text()).not.to.equal(
                                fifthConditions.text(),
                            );
                        },
                    );
                },
            );
            cy.wait(1000);
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.brown,
            );
            PropertyTable.getPropertyValuesInTableRow('-5.5 ');
            // });

            // it('Ageing(Fluid Ageing tab)search-DDL "Medium", while we on Ageing page for material(CELANEX 3316HR), unroll and check all filters(Medium, Concentration, Exposure Time and Temperature)', () => {
            cy.step(
                'Ageing(Fluid Ageing tab)search-DDL "Medium", while we on Ageing page for material(CELANEX 3316HR), unroll and check all filters(Medium, Concentration, Exposure Time and Temperature)',
            );
            const expectedOptions = [
                'Acetic acid',
                'Acetone',
                'Ammonium hydroxide',
                'Benzene',
                'Brake fluid',
                'Buffer solution',
                'Carbon tetrachloride',
                'Detergents',
                'Diethyl ether',
                'Dishwasher detergent',
                'Ethyl alcohol',
                'Ethylene glycol',
                'Gasoline',
                'Grease',
                'Heptane',
                'Hydraulic fluid',
                'Hydrocarbons',
                'Hydrochloric acid',
                'Motor oil',
                'Oil',
                'Perchloroethylene',
                'Soaps',
                'Sodium chloride',
                'Sodium hydroxide',
                'Sodium hydroxide phosphate silicate',
                'Sulfuric acid',
                'Toluene',
                'Transmission fluids',
                'Trichlorotrifluoroethane',
                'Turbine oils',
                'Water',
            ];
            CorrosionConditionSelector.getAllOptionsInDDL('Medium').then(
                (currentOptions) => {
                    cy.Compare_Arrays(currentOptions, expectedOptions);
                },
            );

            const expectedOptions1 = [
                '1 %',
                '10 %',
                '3 %',
                '40 %',
                '5 %',
                '50 %',
                '95 %',
            ];
            CorrosionConditionSelector.getAllOptionsInDDL('Concentration').then(
                (currentOptions) => {
                    cy.Compare_Arrays(currentOptions, expectedOptions1);
                },
            );

            const expectedOptions2 = [
                '9 days',
                '24 days',
                '30 days',
                '48 days',
                '51 days',
                '60 days',
                '64 days',
                '90 days',
                '100 days',
                '135 days',
                '180 days',
                '240 days',
                '360 days',
            ];
            CorrosionConditionSelector.getAllOptionsInDDL('Exposure Time').then(
                (currentOptions) => {
                    cy.Compare_Arrays(currentOptions, expectedOptions2);
                },
            );

            const expectedOptions3 = [
                '23 °C',
                '38 °C',
                '38 °C',
                '60 °C',
                '82 °C',
                '93 °C',
            ];
            CorrosionConditionSelector.getAllOptionsInDDL(
                'Exposure Temperature',
            ).then((currentOptions) => {
                cy.Compare_Arrays(currentOptions, expectedOptions3);
            });
        });
        it('Ageing(Fluid Ageing tab)search page-go to Fuild Ageing search page, clear the search, then on DDL "Medium", unroll and check for filters, DDL "Exposure Temperature", unroll and check for properties, choose from Material Group-Reinforcement, direct data on, perform the search, it should have some results', () => {
            const expectedOptions = [
                '2-Methyltetrahydrofuran',
                '2,2-dichloro-1,1,1-trifluoroethane',
                'Acetaldehyde',
                'Acetate solvents',
                'Acetic acid',
                'Acetic anhydride',
                'Acetone',
                'Acetonitrile',
                'Acetophenone',
                'Acetylacetone',
                'Acid',
                'Air',
                'Alcohol fuel',
                'Aluminum acetate',
                'Aluminum chloride',
                'Aluminum sulfate',
                'Ammonia',
                'Ammonium bifluoride',
                'Ammonium chloride',
                'Ammonium hydroxide',
                'Ammonium nitrate',
                'Ammonium sulfate',
                'Amyl alcohol',
                'Aniline',
                'Antifreeze',
                'Asphalt',
                'Beer',
                'Benzaldehyde',
                'Benzalkonium chloride',
                'Benzene',
                'Benzoic acid',
                'Benzonitrile',
                'Benzyl alcohol',
                'Benzyltrimethylammonium chloride',
                'Benzyltrimethylammonium hydroxide',
                'Biodiesel fuels',
                'Bleaching agent',
                'Bleaching Solution',
                'Boric acid',
                'Brake fluid',
                'Bromine',
                'Buffer solution',
                'Butadiene',
                'Butyl acetate',
                'Butyl alcohol',
                'Butyl ether',
                'Butylamine',
                'Butyrolactone',
                'Calcium chloride',
                'Calcium hydroxide',
                'Calcium hypochlorite',
                'Calcium phosphate',
                'Calcium sulfate',
                'Carbon disulfide',
                'Carbon tetrachloride',
                'Carbonate salts',
                'Castor oil',
                'Cement',
                'Chloramine',
                'Chloric acid',
                'Chlorine',
                'Chlorine water',
                'Chloroacetic acid',
                'Chlorodifluoromethane',
                'Chloroform',
                'Chlorosulfonic acid',
                'Chocolate syrup',
                'Chromic acid',
                'Citric acid',
                'Citronella oil',
                'Cleaning agent',
                'Cleanser',
                'Coffee',
                'Coolant',
                'Copper sulfate',
                'Copper(I) chloride',
                'Cottonseed oil',
                'Creosote',
                'Cresol',
                'Cresyl diphenyl phosphate',
                'Crude oil',
                'Cyclohexane',
                'Cyclohexanone',
                'Cyclohexyl alcohol',
                'Cyclohexylamine',
                'Decahydronaphthalene',
                'Deicing fluid',
                'Deionized water',
                'Demineralized water',
                'Detergent solution (heavy duty)',
                'Detergents',
                'Dibutoxyethyl phthalate',
                'Dibutyl phthalate',
                'Dibutyl sebacate',
                'Dichlorobenzene',
                'Dichloroethylene',
                'Diesel fuels',
                'Diester oil',
                'Diethanolamine',
                'Diethyl ether',
                'Diethylene glycol',
                'Diethylene glycol monobutyl ether',
                'Diethylene glycol monomethyl ether',
                'Diethylhexyl adipate',
                'Diglycolic amin',
                'Diisopropyl ether',
                'Dimethyl phthalate',
                'Dimethyl sulfoxide',
                'Dimethylacetamide',
                'Dimethylformamide',
                'Dioctyl phthalate',
                'Dioctyl sebacate',
                'Dioxane',
                'Diphenyl amine',
                'Dipropylamine',
                'Dipropylene glycol methyl ether',
                'Dishwasher detergent',
                'Disinfectant: alcohol based',
                'Disinfectant: aldehyde based',
                'Disinfectant: chlorine based',
                'Disinfectants',
                'Distilled water',
                'DOT 4',
                'Esters',
                'Ethers',
                'Ethyl acetate',
                'Ethyl alcohol',
                'Ethyl amine',
                'Ethylene chloride',
                'Ethylene dichloride',
                'Ethylene glycol',
                'Ethylene glycol in water',
                'Ethylene oxide',
                'Ethylenediamine',
                'Eucalyptus oil',
                'Exhaust gas condensate',
                'FAM test fuel',
                'Fats',
                'Ferric acetate',
                'Ferric chloride',
                'Fertilizers',
                'Fluorosilicic acid',
                'Formaldehyde',
                'Formic acid',
                'Freon',
                'Freon and Oil',
                'Fresh water',
                'Fuel A',
                'Fuel oil',
                'Fuel oil and Salt water',
                'Fuels',
                'Gasohol I',
                'Gasohol II',
                'Gasoline',
                'Gear oil',
                'Glycerol',
                'Glycol ethers',
                'Glycols',
                'Glyptal',
                'Glysantin and Water',
                'Grease',
                'Hand sanitizer',
                'Helium',
                'Heptane',
                'Hexane',
                'Hexylene glycol',
                'Hot water',
                'Hydraulan',
                'Hydraulic fluid',
                'Hydraulic fluids',
                'Hydraulic oil',
                'Hydrazine',
                'Hydrobromic acid',
                'Hydrocarbon oil',
                'Hydrocarbons',
                'Hydrochloric acid',
                'Hydrofluoric acid',
                'Hydrogen',
                'Hydrogen peroxide',
                'Hydrogen sulfide',
                'Hydrogen sulfide and Carbon dioxide',
                'Hydroquinone',
                'Ink',
                'Inorganic',
                'Iodine',
                'ISO 1817 Liquid 101',
                'ISO 1817 Liquid 103',
                'ISO 1817 Liquid B',
                'Iso-octane',
                'Iso-octane and Toluene',
                'Isoamyl alcohol',
                'Isophorone',
                'Isopropyl alcohol',
                'Jet fuel',
                'Jet fuel, JP4',
                'Jet fuel, JP5',
                'Jet fuel, JP8',
                'Kerosene',
                'Lacquer',
                'Lactic acid',
                'Lard oil',
                'Latex',
                'Lavender oil',
                'Leaded gasoline',
                'Lemon juice',
                'Lemon oil',
                'Lemonades',
                'Limonene',
                'Linseed oil',
                'Lipides',
                'Liquid A',
                'Liquid B',
                'Lithium bromide',
                'Lubricating oil',
                'Lysol',
                'M15 mixture',
                'Machine oil',
                'Magnesium carbonate',
                'Mayonnaise',
                'Mercaptans',
                'Methyl alcohol',
                'Methyl chloroform',
                'Methyl ethyl ketone',
                'Methyl ethyl ketone and Methyl isobutyl ketone',
                'Methyl isobutyl ketone',
                'Methylene chloride',
                'Mineral oil',
                'Mixed acids',
                'Mixtures',
                'Morpholine',
                'Motor oil',
                'Mouth wash',
                'Mustard',
                'N-Methyl-2-pyrrolidone',
                'N-methyldiethanolamin',
                'Naphtha',
                'Nitric acid',
                'Nitric acid and Hydrofluoric acid',
                'Nitrobenzene',
                'Nitrogen',
                'Nitroglycerine',
                'Nitromethane',
                'Octane',
                'Oil',
                'Oleic acid',
                'Olive oil',
                'Orange oil',
                'Organic compounds',
                'Organophosphorus acid esters',
                'Other',
                'Oxalic acid',
                'Ozone',
                'Palmarosa oil',
                'Paraffin',
                'Penetrating oil',
                'Pentane',
                'Peracetic acid',
                'Perchloroethylene',
                'Perfluorotripentylamine',
                'Perfume',
                'Peroxides',
                'Pesticide',
                'Petrol',
                'Petroleum',
                'Petroleum jelly',
                'Petroleum oils',
                'Phenol',
                'Phenolic resin',
                'Phosphoric acid',
                'Phthalate salts',
                'Pine oil',
                'Polyol',
                'Potassium bromate',
                'Potassium bromide',
                'Potassium chloride',
                'Potassium chromate',
                'Potassium cyanide',
                'Potassium hydroxide',
                'Potassium permanganate',
                'Potassium sulfate',
                'Povidone-iodine',
                'Power Steering Fluid',
                'Propane',
                'Propyl alcohol',
                'Propylene glycol',
                'Pyranol',
                'Pyrogallol',
                'Resorcinol',
                'Rongalite',
                'Salicylic acid',
                'Salt water',
                'Sea water',
                'Silicone fluids',
                'Silicone oil',
                'Silver nitrate',
                'Skin creams',
                'Skin oil',
                'Skydrol',
                'Soaps',
                'Soda',
                'Sodium acetate',
                'Sodium aluminium sulfate',
                'Sodium bicarbonate',
                'Sodium bisulfate',
                'Sodium bisulfite',
                'Sodium borate',
                'Sodium carbonate',
                'Sodium chloride',
                'Sodium chlorite',
                'Sodium chromate',
                'Sodium cyanide',
                'Sodium dithionite',
                'Sodium ferrocyanide',
                'Sodium fluoride',
                'Sodium hydroxide',
                'Sodium hydroxide phosphate silicate',
                'Sodium hypochlorite',
                'Sodium metasilicate',
                'Sodium nitrate',
                'Sodium perborate',
                'Sodium phosphate',
                'Sodium silicate',
                'Sodium sulfide',
                'Sodium sulfite',
                'Sodium thiocyanate',
                'Sodium thiosulfate',
                'Soft drink concentrate',
                'Sour gas',
                'Sperm oil',
                'Steam',
                `Stoddard's solvent`,
                'Sulfonic acid',
                'Sulfur dioxide',
                'Sulfur dioxide and Hydrocarbons',
                'Sulfur hexafluoride',
                'Sulfuric acid',
                'Sulfuryl chloride',
                'Surfactant',
                'Sweat',
                'Tannic acid',
                'Tap water',
                'Tea',
                'Terpineol',
                'Tetra(2-ethylbutyl) silicate',
                'Tetrachloroethylene',
                'Tetrahydrofuran',
                'Tetramethyl ammonium hydroxide',
                'Toluene',
                'Toluene diisocyanate',
                'Tomato juice',
                'Toxaphene',
                'Transformer oil',
                'Transmission fluids',
                'Tributyl phosphate',
                'Trichlorethylene',
                'Trichloroacetic acid',
                'Trichloroethane',
                'Trichloroethylene',
                'Trichlorotrifluoroethane',
                'Tricresyl phosphate',
                'Triethylene glycol',
                'Trimethylpentane',
                'Trimethylpentane and Toluene',
                'Tripropylene glycol monomethyl ether',
                'Turbine oils',
                'Turpentine oil',
                'Unleaded gasoline',
                'Urea',
                'Urine',
                'Vanilla oil',
                'Vegetable oils',
                'Vinegar',
                'Water',
                'Water, deionized',
                'White spirit',
                'Wine',
                'Xylene',
                'Zinc chloride',
            ];
            cy.wait(1000);
            TabButtons.clickOnTheTabs('Ageing');
            TabButtons.clickOnTheTabsOnAgeing('Fluid Ageing');
            cy.wait(1000);
            CommonSearch.clearSearchFilters();
            // cy.wait(1500);
            CorrosionConditionSelector.getAllOptionsInDDOptionTwo(
                0,
                'Medium',
            ).then((currentOptions) => {
                cy.Compare_Arrays(currentOptions, expectedOptions);
            });

            const expectedOptions1 = [
                '< 30°C',
                '30 - 100°C',
                '100 - 300°C',
                '300 - 500°C',
                '> 500°C',
            ];
            CorrosionConditionSelector.getAllOptionsInDDOptionTwo(
                0,
                'Exposure Temperature',
            ).then((currentOptions) => {
                cy.Compare_Arrays(currentOptions, expectedOptions1);
            });
            CommonSearch.selectMaterialGroups(
                ['Composites'],
                ['Reinforcement'],
            );
            Sliders.clickOnDirectDataOnlySlider();
            CommonSearch.clickSearchButton();
            cy.wait(1500);
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Material group: Reinforcement )  AND  (  Direct data only )  ',
            );
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
            // });
            // it('Ageing(Fluid Ageing tab)search page-, turn back to Fluid Ageing search click on 1st material from the list(8.1201.0 WL), it should lead you to Ageing(Fluid Ageing tab) for selected material, switch to 2nd condition in the list and check data', () => {
            cy.step(
                'Ageing(Fluid Ageing tab)search page-, turn back to Fluid Ageing search click on 1st material from the list(8.1201.0 WL), it should lead you to Ageing(Fluid Ageing tab) for selected material, switch to 2nd condition in the list and check data',
            );
            cy.wait(1000);
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            cy.wait(1000);
            ConditionSelectorHeaders.getTitle().should('equal', 'Ageing');
            TabButtons.colorOfSelectedTabButton('Fluid Ageing').should(
                'have.css',
                'background-color',
                color.brown,
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.brown,
            );
            ConditionsSelectorDetailsView.getSelectedTextInConditions().then(
                (defaultConditions) => {
                    cy.wait(1000);
                    PropertyTable.getPropertyValuesInTableRow('165 ');
                    ConditionsSelectorDetailsView.clickOnCheckboxCondition(2);
                    ConditionsSelectorDetailsView.getSelectedTextInConditions().then(
                        (secondCondtions) => {
                            expect(defaultConditions.text()).not.to.equal(
                                secondCondtions.text(),
                            );
                        },
                    );
                    cy.wait(1000);
                    CreepData.colorOfSelectedCondition().should(
                        'have.css',
                        'background-color',
                        color.brown,
                    );
                    PropertyTable.getPropertyValuesInTableRow('1350 ');
                },
            );
        });
    },
);
