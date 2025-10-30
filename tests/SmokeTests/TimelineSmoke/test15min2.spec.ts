import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { ConditionSelectorReferenceTree } from '@/CommonMethods/conditionSelectorReferencesTree';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { SelectedConditions } from '@/CommonMethods/selectedConditions';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CreepData } from '@/CreepData/creepData';
import { Dimensions } from '@/Dimensions/dimensionsHome';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { ReferencesList } from '@/HelpersMethods/referencesList';
import { Similarity } from '@/Similarity/similarity';
import { expectedDdlTitlesInFractureMechanics } from 'cypress/fixtures/ddlTitles';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke Test ( 15 min2 )',
    { tags: ['@smoke', '@totalSearch', '@extendedRange', '@dataPlus'] },
    () => {
        beforeEach(
            'Log in user, save local storage and save session storage, ',
            () => {
                LoginPage.loginUser(
                    Cypress.env('environmentLoginUrl'),
                    Cypress.env('username'),
                    Cypress.env('password'),
                );
                Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
                CommonSearch.getMaterialDesignation().should('be.visible');
                CommonSearch.enterMaterialDesignation('C45e en');
                CommonSearch.getEnteredValueInMaterialDesignation().then(
                    (textInMaterialDesignation) => {
                        expect(textInMaterialDesignation).to.be.equal(
                            'C45e en',
                        );
                    },
                );
                cy.step('click on SEARCH button');
                CommonSearch.clickSearchButton();
                ListOfMaterials.clickOnRowMaterialStandard('C45E', 'EN');
            },
        );

        it(
            '58. Fracture Mechanics - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                '*Fracture Mechanics, in list of materials click on first material (1045 SAE - United States) check for condition selector(temp. refer. DDl-s, selected condition).',
            () => {
                RightMenu.clickOnRightMenuModuleLinks(' Fracture Mechanics ');
                const all = 0;
                cy.step(
                    'In list of materials click on first material (1045 SAE - United States).',
                );
                ListOfMaterials.clickOnRowMaterialStandard('1045', 'SAE');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Fracture Mechanics',
                );
                ConditionSelectorReferenceTree.checkbox(all).should(
                    'have.class',
                    'jqx-checkbox-check-checked',
                );
                // DDL titles
                ConditionSelectorDDLForms.getDDLTitles().then(
                    (currentTitles) => {
                        cy.Compare_Arrays(
                            currentTitles,
                            expectedDdlTitlesInFractureMechanics.metals,
                        );
                    },
                );
                //     },
                // );

                // // it('59. Fracture Mechanics - In Fracture Mechanic for material 1045 (SAE) in DDL "Heat Treatment / Material Processing" select "Normalized" then check for the DDL Heat Treatment ("Normalized" should be visible).', () => {
                // cy.step('In Heat Treatment select "Normalized".');
                // const heatTreatment = 0;
                // Helpers.clickOnFilterOption(
                //     'Heat Treatment / Material Processing',
                //     [''],
                //     ['Normalized'],
                // );
                // // ConditionSelectorDDLForms.clickOnOptionDDL(
                // //     heatTreatment,
                // //     'Normalized',
                // // );
                // ConditionSelectorDDLForms.getSelectedOptionInDDL(
                //     'Heat Treatment / Material Processing',
                // ).should('equal', 'Normalized');
                // // });

                // it('60. Fracture Mechanics - Check functionality of "Reset" button.(Click on "Reset" and check for DDLs).', () => {
                cy.step('Clcik on "Reset".');
                ConditionSelectorHeaders.clickOnReset();
                ConditionSelectorDDLForms.getPreselectedMultiSelectOption(
                    'Heat Treatment / Material Processing',
                ).should('equal', '-- All --');
                ConditionSelectorDDLForms.getPreselectedMultiSelectOption(
                    'Form',
                ).should('equal', '-- All --');
                ConditionSelectorDDLForms.getPreselectedoptionAlll(
                    'Specimen',
                ).should('equal', '-- All --');
                ConditionSelectorDDLForms.getPreselectedoptionAlll(
                    'Direction',
                ).should('equal', '-- All --');
                ConditionSelectorDDLForms.getPreselectedoptionAlll(
                    'Loading Condition',
                ).should('equal', '-- All --');
                ConditionSelectorDDLForms.getPreselectedoptionAlll(
                    'Stress Ratio',
                ).should('equal', '-- All --');
                // });

                // it(
                //     '61. Fracture Mechanics - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                //         '*Fracture Mechanics, in list of materials click on first material (1045 SAE - United States), then check for functiionality for arrow "BACK TO SIMILAR MATERIALS".',
                //     () => {
                cy.step('Click on "BACK TO SIMILAR MATERIALS".');
                Similarity.clickOnBackToSimilarMaterials();
                RightMenu.clickOnRightMenuModuleLinks(' Fracture Mechanics ');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Fracture Mechanics',
                );
                ListOfMaterials.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.contain('Result(s) found:');
                });
                Similarity.getMesageSimilarity()
                    .should(
                        'include',
                        'The material does not have direct properties.',
                    )
                    .and(
                        'deep.include',
                        'Similar materials that have these properties are listed in the table below.',
                    )
                    .and(
                        'deep.include',
                        'Click on the material to view properties.',
                    );
            },
        );
        /*
    it('62. Fracture Mechanics - Click on second material in material list (45-GOST-Russia) and check for property table.', () => {
        cy.step('Click on second material in material list (45-GOST-Russia).');
        ListOfMaterials.clickOnRowMaterialStandard('45', 'GOST');
        ConditionSelectorHeaders.getTitle().should('equal', 'Fracture Mechanics');
        Similarity.getSimilarityMaterialInfo()
            .should('deep.include', 'Equivalent material')
            .and('deep.include', '45')
            .and('deep.include', 'Country / Standard')
            .and('deep.include', 'Russia / GOST')
            .and('deep.include', 'Material group')
            .and('deep.include', ' Ferrous Alloys / Structural and constructional steels ')
            .and('deep.include', 'Equivalency Category')
            .and('deep.include', 'Other sources');
    });
    */
        it(
            '63. Creep Data - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                '*Creep Data, check for title "Creep Data", and message of similarity.',
            () => {
                cy.step('In right nav click on *Creep Data.');
                RightMenu.clickOnRightMenuModuleLinks(' Creep Data ');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Creep Data',
                );
                ListOfMaterials.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.contain('Result(s) found:');
                });
                Similarity.getMesageSimilarity()
                    .should(
                        'include',
                        'The material does not have direct properties.',
                    )
                    .and(
                        'deep.include',
                        'Similar materials that have these properties are listed in the table below.',
                    )
                    .and(
                        'deep.include',
                        'Click on the material to view properties.',
                    );
                //     },
                // );

                // it(
                //     '64. Creep Data - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                //         '*Creep Data, click on the first material in the list (1.1191-DIN-Germany) of materials then check for the tab buttons, material info, and the time table.',
                //     () => {
                cy.step(
                    'Click on the first material in the list (1.1191-DIN-Germany).',
                );
                ListOfMaterials.clickOnRowMaterialStandard('1.1191', 'DIN');
                TabButtons.getButtonTitle(0)
                    .should('equal', 'Creep Data')
                    .and('exist');
                TabButtons.getButtonTitle(2)
                    .should('equal', 'Allowable Stress')
                    .and('exist');
                Similarity.getSimilarityMaterialInfo()
                    .should('deep.include', 'Equivalent material')
                    .and('deep.include', '1.1191')
                    .and('deep.include', 'Country / Standard')
                    .and('deep.include', 'Germany / DIN')
                    .and('deep.include', 'Material group')
                    .and(
                        'deep.include',
                        ' Ferrous Alloys / Structural and constructional steels ',
                    )
                    .and('deep.include', 'Equivalency Category')
                    .and('deep.include', 'Identical');
                CreepData.getTextInDataTableHeaders()
                    .should('deep.includes', 'Time')
                    .and('deep.includes', 'T(°C)')
                    // 'Check the third column in data table,it should be "creep limit (MPa)"'
                    .and('deep.includes', 'creep limit (MPa)')
                    // 'Check the fourth column in data table,it should be "Creep Rupture Strength CRS (MPa)"'
                    .and('deep.includes', 'Creep Rupture Strength CRS (MPa)');

                // 'Check the first row and the first column (check Time h - column data) it should be "0.1h"'
                CreepData.getValueInDataTableRowColumn(0, 0).should(
                    'eq',
                    '10000h',
                );
                //     },
                // );

                // it('65. Creep Data - Check for data in table and tooltips in "i" dots.', () => {
                cy.step('Check for tooltips in "i" dots.');
                const firstTooltip = 0;
                CreepData.mouseHoverToltipAndGetText(firstTooltip).should(
                    'eq',
                    'Creep stress for reaching 1% strain in t and specified T',
                );
                CreepData.mouseHoverToltipAndGetText(firstTooltip).should(
                    'exist',
                );
                // });

                // it(
                //     '66. Creep Data - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                //         '*Creep Data, then click on "Allowable Stress" tab button, check for list of materials.',
                //     () => {
                cy.step('Click on "Allowable Stress".');
                TabButtons.clickOnButton('Allowable Stress');
                cy.wait(1000);
                ListOfMaterials.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.contain('Result(s) found:');
                });
                //     },
                // );

                // it(
                //     '67. Creep Data - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                //         '*Creep Data, then click on "Allowable Stress" tab button, then click on first material in the list (S45C-JIS-Japan) and check for selected condition, diagram and diagram table.',
                //     () => {
                cy.step(
                    'Click on first material in the list (S45C-JIS-Japan).',
                );
                TabButtons.getButtonTitle(0)
                    .should('equal', 'Creep Data')
                    .and('exist');
                TabButtons.getButtonTitle(2)
                    .should('equal', 'Allowable Stress')
                    .and('exist');
                TabButtons.colorOfSelectedTabButton('Allowable Stress').should(
                    'have.css',
                    'background-color',
                    color.orangeLight,
                );
                ListOfMaterials.clickOnRowMaterialStandard('S45C', 'JIS');
                Similarity.getSimilarityMaterialInfo()
                    .should('deep.include', 'Equivalent material')
                    .and('deep.include', 'S45C')
                    .and('deep.include', 'Country / Standard')
                    .and('deep.include', 'Japan / JIS')
                    .and('deep.include', 'Material group')
                    .and(
                        'deep.include',
                        ' Ferrous Alloys / Structural and constructional steels ',
                    )
                    .and('deep.include', 'Equivalency Category');
            },
        );

        // 5:29 --------------------------------------------------------------------------------------------------------------------------------------
        /*
    it('68. Creep Data - Click on "BACK TO SIMILAR MATERIALS" check for list of material.', () => {
        cy.step('Click on "BACK TO SIMILAR MATERIALS".');
        Similarity.clickOnBackToSimilarMaterials();
        ConditionSelectorHeaders.getTitle().should('equal', 'Creep Data');
        ListOfMaterials.getResultsFound().then(results => {
            const resultsFound = results.text();
            expect(resultsFound).to.contain('Result(s) found:');
        });
        Similarity.getMesageSimilarity()
            .should('include', 'The material does not have direct properties.')
            .and('deep.include', 'Similar materials that have these properties are listed in the table below.')
            .and('deep.include', 'Click on the material to view properties.');
    });

    it('69. Creep Data - Click on second material in list (SM570-JIS-Japan) and check for selected condition, check for diagram.', () => {
        cy.step('Click on second material in list (SM570-JIS-Japan).');
        ListOfMaterials.clickOnMaterialInList(10);
        PropertyTableDiagram.checkForDiagramXY('Temperature (°C)', 'Allowable Stress (MPa)');
        ConditionsSelectorDetailsView.getNumbersOfConditions().then(num => {
            const numberOfConditions = num.match(/\d+/)[0];
            expect(numberOfConditions).to.be.equal('4');
        });
    });

    it('70. Creep Data - Click on "BACK TO SIMILAR MATERIALS" check for list of material.', () => {
        cy.step('Click on "BACK TO SIMILAR MATERIALS".');
        Similarity.clickOnBackToSimilarMaterials();
        ConditionSelectorHeaders.getTitle().should('equal', 'Creep Data');
        ListOfMaterials.getResultsFound().then(results => {
            const resultsFound = results.text();
            expect(resultsFound).to.contain('Result(s) found:');
        });
        Similarity.getMesageSimilarity()
            .should('include', 'The material does not have direct properties.')
            .and('deep.include', 'Similar materials that have these properties are listed in the table below.')
            .and('deep.include', 'Click on the material to view properties.');
    });
    */

        it(
            '71. Joints - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                '*Joints, check for title,tab buttons, list of materials.',
            () => {
                cy.step('In right nav click on *Joints.');
                RightMenu.clickOnRightMenuModuleLinks(' Joints ');
                ConditionSelectorHeaders.getTitle().should('equal', 'Joints');
                ListOfMaterials.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.contain('Result(s) found:');
                });
                Similarity.getMesageSimilarity()
                    .should(
                        'include',
                        'The material does not have direct properties.',
                    )
                    .and(
                        'deep.include',
                        'Similar materials that have these properties are listed in the table below.',
                    )
                    .and(
                        'deep.include',
                        'Click on the material to view properties.',
                    );
                TabButtons.getButtonTitle(0)
                    .should('equal', 'Welding')
                    .and('exist');
                TabButtons.getButtonTitle(2)
                    .should('equal', 'Adhesion')
                    .and('exist');
                //     },
                // );

                // it(
                //     '72. Joints - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                //         '*Joints, then click on first material in list (1.0503-ONORM-Austria) check selected condition, properties of Joint, property table, references below table.',
                //     () => {
                cy.step(
                    'Click on first material in list (1.0503-ONORM-Austria).',
                );
                ListOfMaterials.clickOnRowMaterialStandard('1.0503', 'ONORM');
                ConditionSelectorHeaders.getTitle().should('equal', 'Joints');

                ReferencesList.getAllReferencesForSelectedMaterialTitle().should(
                    'contain',
                    'Reference for the selected material and condition',
                );
                //     },
                // );

                // Joints - click on Electrode (blue link in selected condition) then check for properties of joint table
                // Joints - click on left arrow  back app lead to Joints (C45E-EN-Europian Union) check for the list of materials

                // it(
                //     '73. Dimensions & Tolerances - In TOTAL SEARCH in the Material Designation field enter C45E, click on the "Search" then click on material C45E standard EN, in right nav click on ' +
                //         'Dimensions check for References, selected References and table with values.',
                //     () => {
                cy.step('In right nav click on Dimensions & Tolerances.');
                RightMenu.clickOnRightMenuModuleLinks(' Dimensions ');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Dimensions & Tolerances',
                );
                Dimensions.getTextInSelectedReferencesTable().then(
                    (selectedReferences) => {
                        expect(selectedReferences.text()).to.contain(
                            'European Union / ENEN 10058Hot rolled flat steel bars for general purposes - Dimensions and tolerances on shape and dimensions2018',
                        );
                    },
                );
                Dimensions.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.pinkLight,
                );
                //     },
                // );

                // it(
                //     '74. Dimensions & Tolerances - In TOTAL SEARCH in the Material Designation field enter C45E, click on "Search" then click on material C45E standard EN, in the right nav click on ' +
                //         'Dimensions, select all References, and check if a number of tables is the same as the number in the right nav.',
                //     () => {
                cy.step(
                    'Select all References and check if is a number of tables greater than 50',
                );
                Dimensions.clickOnAllReferencesCheckbox();
                Dimensions.getNumberOfTables().then((tables) => {
                    RightMenu.getNumberOfPropertiesForModule(
                        ' Dimensions ',
                    ).then((numberInRightMenu) => {
                        const numberOfTables = tables.length.toString();
                        expect(numberOfTables.trim()).to.be.equal(
                            numberInRightMenu.trim(),
                        );
                    });
                });
            },
        );

        it(
            '75. Tribology - In TOTAL SEARCH in the Material Designation field enter C45E, click on "Search" then click on material C45E standard EN, in the right nav click on ' +
                '*Tribology, check for list of materials and similarity message.',
            () => {
                cy.step('In right nav click on *Tribology');
                RightMenu.clickOnRightMenuModuleLinks(' Tribology ');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Tribology',
                );
                ListOfMaterials.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.contain('Result(s) found:');
                });
                Similarity.getMesageSimilarity()
                    .should(
                        'include',
                        'The material does not have direct properties.',
                    )
                    .and(
                        'deep.include',
                        'Similar materials that have these properties are listed in the table below.',
                    )
                    .and(
                        'deep.include',
                        'Click on the material to view properties.',
                    );
                //     },
                // );

                // it(
                //     '76. Tribology - In TOTAL SEARCH in the Material Designation field enter C45E, click on "Search" then click on material C45E standard EN, in the right nav click on ' +
                //         '*Tribology, click on first material and check selected condition and property table.',
                //     () => {
                cy.step(
                    'Click on first material and check selected condition and property table.',
                );
                RightMenu.clickOnRightMenuModuleLinks(' Tribology ');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Tribology',
                );
                ListOfMaterials.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                SelectedConditions.getTitle().then((title) => {
                    expect(title.text()).to.equal(' Selected Condition ');
                });
                SelectedConditions.getAllParameters().then((parameter) => {
                    expect(parameter.eq(0).text()).to.equal(
                        'Mechanical properties',
                    );
                    expect(parameter.eq(1).text()).to.equal('Heat treatment');
                    expect(parameter.eq(2).text()).to.equal('General comment');
                });
                PropertyTable.getTextInHeaders().should(
                    'contain',
                    ' Property  T(°C)  Value  Unit  Note ',
                );
            },
        );

        it(
            '77. Corrosion - In TOTAL SEARCH in the Material Designation field enter C45E, click on "Search" then click on material C45E standard EN, in the right nav click on ' +
                '*Corrosion check for list of materials.',
            () => {
                cy.step('In right nav click on *Corrosion');
                RightMenu.clickOnRightMenuModuleLinks(' Corrosion ');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Corrosion',
                );
                ListOfMaterials.getResultsFound().then((results) => {
                    const resultsFound = results.text();
                    expect(resultsFound).to.contain('Result(s) found:');
                });
                Similarity.getMesageSimilarity()
                    .should(
                        'include',
                        'The material does not have direct properties.',
                    )
                    .and(
                        'deep.include',
                        'Similar materials that have these properties are listed in the table below.',
                    )
                    .and(
                        'deep.include',
                        'Click on the material to view properties.',
                    );
            },
        );
        // Corrosion - click on first material in list of materials (340-550W--ISO--International) check for condition selector(temperatures,Medium,DDL-s), conditions, slected conditions
        //             property table,for tooltip in selected condition
        // Corrosion - in Property select "Depth of Corrosion" then check for selected condition, check for tooltip in selected condition, property table
        // Corrosion - select second condition and check for selected condition, for DDL (Property > "Depth of Corrosion"
    },
);
