import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { color } from 'cypress/fixtures/color';
import {
    expectedDdlTitlesInFatigueData,
    expectedDdlTitlesInFormability,
    expectedDdlTitlesInStressStrainDiagrams,
} from 'cypress/fixtures/ddlTitles';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { ConditionSelectorReferenceTree } from '@/CommonMethods/conditionSelectorReferencesTree';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { SelectedConditions } from '@/CommonMethods/selectedConditions';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { Formability } from '@/ExtendedRange/Formability';
import { StressStrain } from '@/ExtendedRange/StressStrain';
import { FatigueDataConditionSelector } from '@/FatigueData/FatigueData-ConditionSelector';
import { FatigueDataDiagram } from '@/FatigueData/fatigueData-Diagram';
import { FatigueProperty } from '@/FatigueData/fatigueProperty';
import { HeatTreatment } from '@/HeatTreatment/HeatTreatment';
import { ConditionSelectorSyntheticView } from '@/HelpersMethods/conditionSelectorSyntheticView';
import { Helpers } from '@/HelpersMethods/helpers';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { LoginPage } from '@/LoginPage/loginPage';
import { Metallography } from '@/Metallography/Metallography';
import { Similarity } from '@/Similarity/similarity';
import { ModuleURLs } from 'cypress/fixtures/modules';

const all = 0;

describe(
    'Smoke Test ( 15 min1 )',
    { tags: ['@smoke', '@totalSearch', '@extendedRange'] },
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
                CommonSearch.clickSearchButton();
                ListOfMaterials.clickOnRowMaterialStandard('C45E', 'EN');
            },
        );

        it(
            '1. Mechanical Properties - In TOTAL SEARCH, in the Material Designation field  enter C45E en and click on SEARCH button,' +
                ' click on first material in the list C45 E European Union, then check for Mechanical Properties - Synthetic view.',
            () => {
                cy.step('In Material designation enter C45e en');
                Thermometer.getTemperatureState('≥ 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('≤ 0°C').should(
                    'not.be.checked',
                );

                ConditionSelectorSyntheticView.getSmallFontTextInTab().then(
                    (properties) => {
                        ConditionSelectorSyntheticView.getSyntheticProperties().then(
                            (properties1) => {
                                expect(
                                    properties
                                        .eq(0)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                ).to.be.equals(
                                    properties1
                                        .eq(0)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                );
                                expect(
                                    properties
                                        .eq(1)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                ).to.be.equals(
                                    properties1
                                        .eq(1)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                );
                                expect(
                                    properties
                                        .eq(2)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                ).to.be.equals(
                                    properties1
                                        .eq(2)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                );
                            },
                        );
                    },
                );
                //     },
                // );

                // it('3. Mechanical Properties - In the Mechanical tab in the synthetic view, select all temperatures then go to details and check if all temperatures are selected.', () => {
                cy.step('Selecting all temperatures.');
                Thermometer.selectAllTeperatures();

                Thermometer.getTemperatureState('≥ 300°C').should('be.checked');
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                // Thermometer.getTemperatureState('≤ 0°C').should('be.checked'); dissabled

                ConditionSelectorSyntheticView.getValueProperty(
                    ' Tensile Strength ',
                ).should('equal', '510 — 1500 MPa');

                // '4. Mechanical Properties - Go to details and check if all temperatures are selected.'
                cy.step('Go to Deatails.');
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();

                Thermometer.getTemperatureState('≥ 300°C').should('be.checked');
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                // });

                // it('5. Mechanical Properties - In the Mechanical tab in the synthetic view, select all temperatures then go to details then back to synthetic view and check if all temperatures are selected.', () => {
                cy.step('Go to synthetic.'); // 110 in excel
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();

                Thermometer.getTemperatureState('≥ 300°C').should('be.checked');
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                //     },
                // );

                // it('6. Mechanical Properties - Deselect all temperatures except default temp. 0-30 C', () => {
                cy.step('Deselect all temperatures except 0-30 C.');
                Thermometer.clickOnCheckboxForTemperature([
                    '≥ 300°C',
                    '100 - 300°C',
                    '30 - 100°C',
                ]);

                Thermometer.getTemperatureState('≥ 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                // });

                // it('7. Mechanical Properties - Go to details check if all temperatures are selected.', () => {
                cy.step('Go to Details view.');
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();

                Thermometer.getTemperatureState('≥ 300°C').should('be.checked');
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                // });

                // it('8. Mechanical Properties - Go to synthetic view check if all temperatures are selected.', () => {
                cy.step('Go to Synthetic view.');
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();

                Thermometer.getTemperatureState('≥ 300°C').should('be.checked');
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                // });

                // it('9. Mechanical Properties - In the Synthetic view click on the Yield Strength RP 02 view details link and check for Property DDL ( text Yield Strength RP 02 ).', () => {
                cy.step('Click on Yield Strength RP 02.');
                ConditionSelectorSyntheticView.clickOnViewDetailsLink(
                    ' Yield Strength, Rp0.2 ',
                );
                ConditionSelectorDDLForms.getSelectedOptionInDDL(
                    'Property',
                ).then((selectedOption) => {
                    expect(selectedOption).to.be.equal('Yield Strength, Rp0.2');
                });
                cy.wait(2000);
                // });

                // it('10. Mechanical Properties - Select all conditions by click on "all" conditions, in property table all conditions should appear.', () => {
                cy.step('Select "All" conditions');
                ConditionsSelectorDetailsView.clickOnCheckboxAllCondition();
                cy.wait(1000);
                ConditionsSelectorDetailsView.getNumbersOfConditions().then(
                    (num) => {
                        const numc = num.match(/\d+/)[0];
                        PropertyTable.getPropertiesInGreyRows().then(
                            (conditions) => {
                                expect(
                                    conditions.length.toString(),
                                ).to.be.equal(numc);
                            },
                        );
                    },
                );
                // });

                // it('11. Mechanical Properties - Check for tooltip in property table ( black "i" dot).', () => {
                cy.step('Mouse over first "i" dot, and check for tooltip.');
                PropertyTable.mouseHoverToltipAndGetText().then(
                    (tooltipText) => {
                        expect(tooltipText).to.contain('The same values for');
                    },
                );
                // });

                // it(
                //     '12. Mechanical Properties - In "details view", select Yield Strength RP 02 in DDL property, then select temperatures' +
                //         ' >300, 100-300, 30-100, in the condition selector table check for conditions there is only one condition.',
                //     () => {
                cy.step('Deselect temperature 0-30 C.'); // 116
                Thermometer.clickOnCheckboxForTemperature(['0 - 30°C']);
                ConditionsSelectorDetailsView.getNumbersOfConditions().then(
                    (num) => {
                        const numberOfConditions = num.match(/\d+/)[0];
                        expect(numberOfConditions).to.be.equal('1');
                    },
                );
                cy.wait(1100);
                PropertyTable.getPropertiesInGreyRows().then((conditions) => {
                    expect(conditions.length.toString()).to.be.equal('1');
                });
                //     },
                // );

                // it('13. Mechanical Properties - Go to Physical properties and check for Synthetic view.', () => {
                cy.step('Click on Physical tab.');
                RightMenu.clickOnRightMenuModuleLinks(' Physical Properties ');

                Thermometer.getTemperatureState('≥ 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('≤ 0°C').should(
                    'not.be.checked',
                );

                ConditionSelectorSyntheticView.getSmallFontTextInTab().then(
                    (properties) => {
                        ConditionSelectorSyntheticView.getSyntheticProperties().then(
                            (properties1) => {
                                expect(
                                    properties
                                        .eq(0)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                ).to.be.equals(
                                    properties1
                                        .eq(0)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                );
                                expect(
                                    properties
                                        .eq(1)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                ).to.be.equals(
                                    properties1
                                        .eq(2)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                );
                                expect(
                                    properties
                                        .eq(2)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                ).to.be.equals(
                                    properties1
                                        .eq(3)
                                        .text()
                                        .split('\n')[0]
                                        .toUpperCase()
                                        .trim(),
                                );
                            },
                        );
                    },
                );
                // });

                // it('14. Physical Properties - Select > 300 C and 100 - 300 C check is selecting work.', () => {
                cy.step('Select temperatures > 300 C and 100 - 300 C.');

                Thermometer.getTemperatureState('≥ 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('≤ 0°C').should(
                    'not.be.checked',
                );

                Thermometer.clickOnCheckboxForTemperature([
                    '≥ 300°C',
                    '100 - 300°C',
                ]);

                Thermometer.getTemperatureState('≥ 300°C').should('be.checked');
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('≤ 0°C').should(
                    'not.be.checked',
                );
                // });

                // it('15. Physical Properties - In Synthetic view click on view details link "Electrical Resistivity" then check for sesected temperatures ( only default 0-30 C is selected and in DDL Propery is Eletrical Resistivity).', () => {
                cy.step('Clik on details link "Eletrical Resistivity".');
                ConditionSelectorSyntheticView.clickOnViewDetailsLink(
                    ' Electrical Resistivity ',
                );

                Thermometer.getTemperatureState('≥ 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('100 - 300°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('30 - 100°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                Thermometer.getTemperatureState('≤ 0°C').should(
                    'not.be.checked',
                );

                ConditionSelectorDDLForms.getSelectedOptionInDDL(
                    'Property',
                ).then((selectedOption) => {
                    expect(selectedOption).to.be.equal(
                        'Electrical Resistivity',
                    );
                });
                // });

                // it('16. Physical Properties - Click on property table "Group By Property" and check for property table changing.', () => {
                cy.step('Click on property table "Group By Property".');
                PropertyTable.getPropertiesInGreyRows().then((property) => {
                    expect(property.text()).to.contain('Reference:');
                });
                PropertyTable.clickOnRadioButtonGroupBy(' Property ');
                PropertyTable.getPropertiesInGreyRows().then((property) => {
                    expect(property.text()).to.be.equal(
                        'Electrical Resistivity',
                    );
                });
                // });

                // it('17. Heat Treatment - In right nav, click on Heat Treatment and check for the title, tab buttons, and diagrams.', () => {
                cy.step('In right nav click on Heat Treatment.'); // 122
                RightMenu.clickOnRightMenuModuleLinks(' Heat Treatment ');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Heat Treatment',
                );
                TabButtons.colorOfSelectedTabButton('Diagrams').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                HeatTreatment.isDiagramsPicturesDisplayed().should('exist');
                // });

                // it('18. Heat Treatment - Click on diagram TTT (Reference "1 Structural Metallic Materials / Kainer Ulrich K. / 2003")and check for visibility and title then close diagram on "x" and check for invisibility of diagram.', () => {
                cy.step('Click on TTT diagram.');
                HeatTreatment.clickOnDiagramPicture(6);
                HeatTreatment.selectedDiagram().should('exist');
                HeatTreatment.getImageTitle().should('equal', 'TTT');
                HeatTreatment.isDiagramsPicturesDisplayed().should('exist');
                HeatTreatment.closeDiagram();
                HeatTreatment.selectedDiagram().should('not.exist');
                // });

                // it('19. Heat Treatment - Click on tab button "Descriptions" and check for table of references and descriptions.', () => {
                cy.step('Click on tab button Descriptions.');
                TabButtons.clickOnButton('Descriptions');
                TabButtons.colorOfSelectedTabButton('Descriptions').should(
                    'have.css',
                    'background-color',
                    color.blue,
                );
                HeatTreatment.getFirstColumnTitles().should(
                    'equal',
                    'Reference',
                );
                HeatTreatment.getSecondColumnTitles().should(
                    'equal',
                    'Descriptions',
                );
                // });

                // it('20. Heat Treatment - In right nav click on Physical Prop. there is selected Electrical Resistivity and the same conditions as before.(in relation to 16 "it" )', () => {
                cy.step('In right nav click on Physical Properties.');
                RightMenu.clickOnRightMenuModuleLinks(' Physical Properties ');
                ConditionSelectorDDLForms.getSelectedOptionInDDL(
                    'Property',
                ).then((selectedOption) => {
                    expect(selectedOption).to.be.equal(
                        'Electrical Resistivity',
                    );
                });
                PropertyTable.getPropertiesInGreyRows().then((property) => {
                    expect(property.text()).to.be.equal(
                        'Electrical Resistivity',
                    );
                });
                // });

                // it('21. Physical Properties - In righ nav click on Metallography,check for title.', () => {
                cy.step('In right nav click on  Metallography.');
                RightMenu.clickOnRightMenuModuleLinks(' Metallography ');
                // });

                // it('22. Metallography - Click on first image, check for selected image ( title, table beside image )', () => {
                cy.step('Click on first image.');
                Metallography.clickOnDiagramPicture(0);
                Metallography.getTextOfCondition().should(
                    'equal',
                    'Hot rolled; Acicular ferrite (white) and sorbite; 2%Nital',
                );
                //                                                  Hot rolled; Lamellar pearlite (dark),acicular ferrite (white) within austenitic grain boundaries; 2%Nital
                // });

                // it('23. Metallography - Check for functionality of > arrow ( images are changed ), clocse image.', () => {
                cy.step('Click on ">" for next image.');
                Metallography.getImageIsDisplayed().should('exist');
                Metallography.changeTheImage();
                Metallography.getImageIsDisplayed().should('exist');
                Metallography.closeTheImage();
                // });

                // it('24. Metallography - In right nav click on Machinability and check for list of materials.', () => {
                cy.step('In right nav click on Machinability.');
                RightMenu.clickOnRightMenuModuleLinks(' Machinability ');
                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Machinability',
                );
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
                // });
                /*
    it('25. Machinability - In list of materials click on material 1045 SAE United States, check for title and property table.', () => {
        cy.step('Click on material 1045 SAE United States.');
        ListOfMaterials.clickOnMaterialInList(2);
        ConditionSelectorHeaders.getTitle().should('equal', 'Machinability');
        Machinability.getTextInReference(0).then(textInReference => {
            expect(textInReference).to.contain('Machinability');
        });
        Machinability.getValueInReference(1).then(valueInReference => {
            expect(valueInReference).to.contain('%');
        });
    });
    */
            },
        );
        it('CK45 en Stress Strain Diagrams', () => {
            cy.step(
                'In right nav click on Stress Strain Diagrams then check for thermometer, DDL-s conditions, selected condition and diagram.',
            );
            cy.step('In right nav click on Stress Strain Diagrams.');
            const expectedTemperatureRangesSSD = [
                '> 900°C700 - 900°C500 - 700°C300 - 500°C100 - 300°C30 - 100°C0 - 30°C-100 - 0°C< -100°C',
            ];
            RightMenu.clickOnRightMenuModuleLinks(' Stress Strain Diagrams ');
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Stress-Strain Diagrams',
            );
            StressStrain.getAllTemperaturesRange()
                .invoke('text')
                .should('deep.equal', `${expectedTemperatureRangesSSD}`);
            ConditionSelectorDDLForms.getDDLTitles().then((currentTitles) => {
                cy.Compare_Arrays(
                    currentTitles,
                    expectedDdlTitlesInStressStrainDiagrams.metals,
                );
            });

            PropertyTableDiagram.visibilityOfDiagram().should('exist');
            PropertyTableDiagram.getHeaderTextInPointTable().should(
                'equal',
                'Strain (m/m)Stress (MPa)',
            );
            // });

            // it(
            //     '27. Stress Strain Diagrams - Click on condition "Product As rolled, Chem.comp.(0.45C, 0.125, 0.48Mn), Hardness (HV 30) 164, Experiment Strain Rate (1/s) 1.6 Compression,' +
            //         ' Hot forming" and check for DDL in diagram table ( selecting temperatures and check for values in table ).',
            //     () => {
            cy.step(
                'Stress Strain Diagrams - Click on condition "Product As rolled, Chem.comp.(0.45C, 0.125, 0.48Mn), Hardness (HV 30) 164, Experiment Strain Rate (1/s) 1.6 Compression,' +
                    ' Hot forming" and check for DDL in diagram table ( selecting temperatures and check for values in table ).',
            );
            StressStrain.clickOnCheckboxConditionId('4334192');
            ConditionSelectorDDLForms.clickOnTemperatureFilter('200°C');
            PropertyTableDiagram.visibilityOfDiagram().should('exist');
            PropertyTableDiagram.getTitleOnX().should('equal', 'Strain (m/m)');
            PropertyTableDiagram.getTitleOnY().should('equal', 'Stress (MPa)');
            ConditionSelectorDDLForms.clickOnTemperatureFilter('400°C');
            PropertyTableDiagram.visibilityOfDiagram().should('exist');
            PropertyTableDiagram.getTitleOnX().should('equal', 'Strain (m/m)');
            PropertyTableDiagram.getTitleOnY().should('equal', 'Stress (MPa)');
            ConditionSelectorDDLForms.clickOnTemperatureFilter('600°C');
            PropertyTableDiagram.visibilityOfDiagram().should('exist');
            PropertyTableDiagram.getTitleOnX().should('equal', 'Strain (m/m)');
            PropertyTableDiagram.getTitleOnY().should('equal', 'Stress (MPa)');
        });

        it('28. Formability - In right nav click on Formability and check for tab buttons condition selector (temperatures,reference,DDL-S), selected conditions.', () => {
            cy.step('In right nav click on Formability.');
            RightMenu.clickOnRightMenuModuleLinks(' Formability ');
            const expectedTemperatureRanges = [
                '> 1000°C800 - 1000°C600 - 800°C400 - 600°C200 - 400°C50 - 200°C< 50°C',
            ];
            ConditionSelectorHeaders.getTitle().should('equal', 'Formability');
            Formability.getAllTemperaturesRange()
                .invoke('text')
                .should('deep.equal', `${expectedTemperatureRanges}`);
            ConditionSelectorDDLForms.getDDLTitles().then((currentTitles) => {
                cy.Compare_Arrays(
                    currentTitles,
                    expectedDdlTitlesInFormability.metals,
                );
            });
            Formability.sourceTreeExist().should('exist');
            // });

            // it('29. Formability - Click on tab button Bendability* check for list of materials.', () => {
            cy.step('Click on Bendability*.');
            TabButtons.clickOnButton('Bendability');
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
            // });

            // it('30. Formability - Click on first material in list ( XC 45-FNOR NF-France ) check for selected condition, property table,references below table.', () => {
            cy.step('Click on first material in list - XC 45-FNOR NF-France.');
            ListOfMaterials.clickOnRowMaterialStandard('XC 45', 'AFNOR');
            SelectedConditions.getAllTextInSelectedConditions().then(
                (selectedConditiontext) => {
                    expect(selectedConditiontext.text()).to.contain('Standard');
                },
            );
            ConditionSelectorHeaders.getTableHeader(0).should(
                'equal',
                'PROPERTY',
            );
            ConditionSelectorHeaders.getTableHeader(1).should('equal', 'VALUE');
        });

        it('31. Fatigue Data - In right nav click on Fatigue Data the check for tab buttons, condition selector (temperatures,references,DDL-s) selected condition and diagram.', () => {
            cy.step('In right nav click on Fatigue Data.');
            RightMenu.clickOnRightMenuModuleLinks(' Fatigue Data ');
            ConditionSelectorHeaders.getTitle().should('equal', 'Fatigue Data');
            TabButtons.getButtonTitle(0).should('eq', 'Strain Life Parameters');
            TabButtons.getButtonTitle(1).should('eq', 'Stress Life Parameters');
            ConditionSelectorDDLForms.getDDLTitles().then((currentTitles) => {
                cy.Compare_Arrays(
                    currentTitles,
                    expectedDdlTitlesInFatigueData.metals,
                );
            });

            Thermometer.getAllTemperaturesInThermometer()
                .then((temperature) => {
                    expect(temperature.eq(0).text()).to.equals('> 500°C');
                    expect(temperature.eq(1).text()).to.equals('300 - 500°C');
                    expect(temperature.eq(2).text()).to.equals('100 - 300°C');
                    expect(temperature.eq(3).text()).to.equals('30 - 100°C');
                    expect(temperature.eq(4).text()).to.equals('0 - 30°C');
                    expect(temperature.eq(5).text()).to.equals('-100 - 0°C');
                    expect(temperature.eq(6).text()).to.equals('< -100°C');
                })
                .and('have.length', 7);
            FatigueDataConditionSelector.getParametersInSelectedConditionsRow().then(
                (parameter) => {
                    expect(parameter.eq(0).text()).to.equal('Product:');
                    expect(parameter.eq(1).text()).to.equal('Experiment:');
                    expect(parameter.eq(2).text()).to.equal('Specimen:');
                },
            );
            // let all = 0;
            ConditionSelectorReferenceTree.checkbox(all).should(
                'have.class',
                'jqx-checkbox-check-checked',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display experimental data ',
            ).should('be.checked');
            // });

            // it(
            //     '32. Fatigue Data - Go to Fatigue Data and select condition  "Product Bars; Diameter (mm) 20; Annealed; Annealing at 1100°C for 2h; Grain size of ferrite [µm] ～50' +
            //         ' Experiment Stress control; Frequency 0.5 Hz; Test temperature 23 °C' +
            //         ' Specimen Direction T; Grinded; Roughness [µm] 1; Flat bar; Thickness [mm] 8; Width [mm] 14; Gauge length [mm] 40" and check for diagram "display curve" and diagram table (DDL and  points table),' +
            //         ' then select "display cyclic curve" and check for changes in the diagram and diagram table (DDL and  points table).',
            //     () => {
            cy.step('Select "display curve".');
            FatigueDataDiagram.clickOnRadioButtonDisplay(' display curve ');
            FatigueDataDiagram.isRadioButtonSelected(' display curve ').should(
                'be.checked',
            );
            FatigueDataDiagram.getTitleOnX().should(
                'eq',
                'Reversals to failure, 2Nf (log scale)',
            );
            FatigueDataDiagram.getTitleOnY().should(
                'eq',
                'Strain Amplitude (log scale)',
            );
            FatigueDataDiagram.getTableHeader().should(
                'eq',
                'Reversals to failure, 2NfStrain Amplitude',
            );
            // });

            // it('33. Fatigue Data - Select "display cyclic curve" and check for diagram, diagram table (DDL and  points table).', () => {
            cy.step('Select "display cyclic curve".');
            FatigueDataDiagram.clickOnRadioButtonDisplay(
                ' display cyclic curve ',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display cyclic curve ',
            ).should('be.checked');
            FatigueDataDiagram.getTitleOnX().should('eq', 'Strain (m/m)');
            FatigueDataDiagram.getTitleOnY().should('eq', 'Stress (MPa)');
            FatigueDataDiagram.getTableHeader().should(
                'eq',
                'Strain (m/m)Stress (MPa)',
            );
            //     },
            // );

            // it('34. Fatigue Data - Select the last condition and check for the diagram (display experimental data is checked) and diagram table (DDL and points table).', () => {
            cy.step('Select last condition.');
            ConditionsSelectorDetailsView.scrollDownConditios();
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(13);
            FatigueDataDiagram.isRadioButtonSelected(
                ' display experimental data ',
            ).should('be.checked');
            FatigueDataDiagram.getTitleOnX().should(
                'eq',
                'Cycles to failure, Nf (log scale)',
            );
            FatigueDataDiagram.getTitleOnY().should(
                'eq',
                'Strain Amplitude (log scale)',
            );
            FatigueDataDiagram.getTableHeader().should(
                'eq',
                'Cycles to failure, NfStrain Amplitude',
            );
            // });

            // it('35. Fatigue Data - Select "display curve" and check for diagram, diagram table (DDL and  points table).', () => {
            cy.step('Select "display curve".');
            FatigueDataDiagram.clickOnRadioButtonDisplay(' display curve ');
            FatigueDataDiagram.isRadioButtonSelected(' display curve ').should(
                'be.checked',
            );
            FatigueDataDiagram.getTitleOnX().should(
                'eq',
                'Reversals to failure, 2Nf (log scale)',
            );
            FatigueDataDiagram.getTitleOnY().should(
                'eq',
                'Strain Amplitude (log scale)',
            );
            FatigueDataDiagram.getTableHeader().should(
                'eq',
                'Reversals to failure, 2NfStrain Amplitude',
            );
            // });

            // it(
            //     '36. Fatigue Data -Select condition "Product Rounds; Diameter (mm) 14.3; Cold drawn, tempered; Tempering at 260°C ' +
            //         'Experiment Stress control; R: -1; Frequency 0.016-0.05 Hz; Test temperature 23 °C ' +
            //         'Specimen Direction L; Mechanically polished; Cylindrical; Diameter [mm] 4.8; Gauge length [mm] 19" ' +
            //         'then in the diagram point table change all items in DDL (total, plastic, elastic) and check if the values in the diagram table change.',
            //     () => {
            cy.step('Select all options in DDL in diagram table.');
            PropertyTableDiagram.getSelectedTemperatureValue().should(
                'equal',
                'total',
            );
            FatigueDataDiagram.inDiagramTableSelect('plastic');
            PropertyTableDiagram.checkForDiagramXY(
                'Reversals to failure, 2Nf (log scale)',
                'Strain Amplitude (log scale)',
            );
            PropertyTableDiagram.getSelectedTemperatureValue().should(
                'equal',
                'plastic',
            );

            FatigueDataDiagram.inDiagramTableSelect('elastic');
            PropertyTableDiagram.checkForDiagramXY(
                'Reversals to failure, 2Nf (log scale)',
                'Strain Amplitude (log scale)',
            );
            PropertyTableDiagram.getSelectedTemperatureValue().should(
                'equal',
                'elastic',
            );
            // });

            // it('37. Fatigue Data - Select "display cyclic curve" and check for diagram.', () => {
            cy.step('Select "display cyclic curve".');
            FatigueDataDiagram.clickOnRadioButtonDisplay(
                ' display cyclic curve ',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display cyclic curve ',
            ).should('be.checked');
            FatigueDataDiagram.getTitleOnX().should('eq', 'Strain (m/m)');
            FatigueDataDiagram.getTitleOnY().should('eq', 'Stress (MPa)');
            FatigueDataDiagram.getTableHeader().should(
                'eq',
                'Strain (m/m)Stress (MPa)',
            );
            // });

            // it('39. Fatigue Data - in Heat Treatment select "Annealed and normalized", and check for diagram.', () => {
            cy.step('In Heat Treatment select "Annealed and normalized".');
            Helpers.clickOnFilterOption(
                'Heat Treatment / Material Processing',
                [''],
                ['Annealed and normalized'],
            );
            FatigueDataConditionSelector.getSelectedTextInDDLHeatTreatment().should(
                'equal',
                'Annealed and normalized',
            );
            SelectedConditions.getAllTextInSelectedConditions().then((text) => {
                expect(text.text()).to.contain('Annealed and normalized');
            });
            // });

            // it('40. Fatigue Data - Select "display curve" and check for diagram, in the DDL for the diagram "elastic" is selected.', () => {
            cy.step('Select "display curve".');
            FatigueDataDiagram.clickOnRadioButtonDisplay(' display curve ');
            FatigueDataDiagram.isRadioButtonSelected(' display curve ').should(
                'be.checked',
            );
            PropertyTableDiagram.checkForDiagramXY(
                'Reversals to failure, 2Nf (log scale)',
                'Strain Amplitude (log scale)',
            );
            PropertyTableDiagram.getSelectedTemperatureValue().should(
                'equal',
                'elastic',
            );
            // });

            // it('41. Fatigue Data - Select "display cyclic curve" and check for diagram.', () => {
            cy.step('Select "display cyclic curve".');
            FatigueDataDiagram.clickOnRadioButtonDisplay(
                ' display cyclic curve ',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display cyclic curve ',
            ).should('be.checked');
            FatigueDataDiagram.getTitleOnX().should('eq', 'Strain (m/m)');
            FatigueDataDiagram.getTitleOnY().should('eq', 'Stress (MPa)');
            FatigueDataDiagram.getTableHeader().should(
                'eq',
                'Strain (m/m)Stress (MPa)',
            );
            //     },
            // );

            // it(
            //     '38. Fatigue Data - Select condition "Product Bars; Diameter (mm) 20; Annealed; Annealing at 1100°C for 2h; Grain size of ferrite [µm] ～50' +
            //         'Experiment Stress control; Frequency 0.5 Hz; Test temperature 23 °C' +
            //         'Specimen Direction T; Grinded; Roughness [µm] 1; Flat bar; Thickness [mm] 8; Width [mm] 14; Gauge length [mm] 40" and check for tooltips on diagram tools.',
            //     () => {
            cy.step('Mouse over tools in the diagram.');
            PropertyTableDiagram.hoverTooltip(0)
                .should('eq', 'Zoom in')
                .and('exist');
            PropertyTableDiagram.hoverTooltip(1)
                .should('eq', 'Zoom out')
                .and('exist');
            PropertyTableDiagram.hoverTooltip(2)
                .should('eq', 'Autoscale')
                .and('exist');
            PropertyTableDiagram.hoverTooltip(3)
                .should('eq', 'Reset axes')
                .and('exist');
            //     },
            // );

            // it('42. Fatigue Data -  Click on "Reset" check for condition selector (temperaturre,reference,DDL-s).', () => {
            cy.step(' Click on "Reset" .');
            ConditionSelectorHeaders.clickOnReset();
            ConditionSelectorHeaders.getTitle().should('equal', 'Fatigue Data');
            TabButtons.getButtonTitle(0).should('eq', 'Strain Life Parameters');
            TabButtons.getButtonTitle(1).should('eq', 'Stress Life Parameters');
            ConditionSelectorDDLForms.getDDLTitles().then((currentTitles) => {
                cy.Compare_Arrays(
                    currentTitles,
                    expectedDdlTitlesInFatigueData.metals,
                );
            });
            Thermometer.getAllTemperaturesInThermometer()
                .then((temperature) => {
                    expect(temperature.eq(0).text()).to.equals('> 500°C');
                    expect(temperature.eq(1).text()).to.equals('300 - 500°C');
                    expect(temperature.eq(2).text()).to.equals('100 - 300°C');
                    expect(temperature.eq(3).text()).to.equals('30 - 100°C');
                    expect(temperature.eq(4).text()).to.equals('0 - 30°C');
                    expect(temperature.eq(5).text()).to.equals('-100 - 0°C');
                    expect(temperature.eq(6).text()).to.equals('< -100°C');
                })
                .and('have.length', 7);
            FatigueDataConditionSelector.getParametersInSelectedConditionsRow().then(
                (parameter) => {
                    expect(parameter.eq(0).text()).to.equal('Product:');
                    expect(parameter.eq(1).text()).to.equal('Experiment:');
                    expect(parameter.eq(2).text()).to.equal('Specimen:');
                },
            );
            // let all = 0;
            ConditionSelectorReferenceTree.checkbox(all).should(
                'have.class',
                'jqx-checkbox-check-checked',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display experimental data ',
            ).should('be.checked');
            // });

            // it(
            //     '43. Fatigue Data - For condition "Product Bars; Diameter (mm) 20; Annealed; Annealing at 1100°C for 2h; Grain size of ferrite [µm] ～50' +
            //         'Experiment Stress control; Frequency 0.5 Hz; Test temperature 23 °C' +
            //         'Specimen Direction T; Grinded; Roughness [µm] 1; Flat bar; Thickness [mm] 8; Width [mm] 14; Gauge length [mm] 40" ' +
            //         'in "Reference" deselect "Other" to check if are all temperatures disabled, all references are disabled, and all DDLs are disabled.',
            //     () => {
            cy.step('In "REFERENCE" deselect other .');
            const other = 3;
            const heatTreatment = 0;
            const form = 1;
            const specimen = 2;
            const direction = 3;
            const loading_condition = 4;
            const stress_ratio = 5;
            ConditionSelectorReferenceTree.clickOnCheckBox(other);
            ConditionSelectorDDLForms.isEnabled(heatTreatment).should(
                'not.be.enabled',
            );
            ConditionSelectorDDLForms.isEnabled(form).should('not.be.enabled');
            ConditionSelectorDDLForms.isEnabled(specimen).should(
                'not.be.enabled',
            );
            ConditionSelectorDDLForms.isEnabled(direction).should(
                'not.be.enabled',
            );
            ConditionSelectorDDLForms.isEnabled(loading_condition).should(
                'not.be.enabled',
            );
            ConditionSelectorDDLForms.isEnabled(stress_ratio).should(
                'not.be.enabled',
            );
            Thermometer.getDisabledTemperaturesInThermometer().then(
                (disabledTemperature) => {
                    expect(disabledTemperature).to.have.length(7);
                    expect(disabledTemperature.eq(0).text()).to.equal(
                        '> 500°C',
                    );
                    expect(disabledTemperature.eq(1).text()).to.equal(
                        '300 - 500°C',
                    );
                    expect(disabledTemperature.eq(2).text()).to.equal(
                        '100 - 300°C',
                    );
                    expect(disabledTemperature.eq(3).text()).to.equal(
                        '30 - 100°C',
                    );
                    expect(disabledTemperature.eq(4).text()).to.equal(
                        '0 - 30°C',
                    );
                    expect(disabledTemperature.eq(5).text()).to.equal(
                        '-100 - 0°C',
                    );
                    expect(disabledTemperature.eq(6).text()).to.equal(
                        '< -100°C',
                    );
                },
            );
            //     },
            // );

            // it('44. Fatigue Data - Select reference "Zum Wechselverformungsverhalten ..." ( first below "Other" ) and check for diagram.', () => {
            cy.step('In Reference select first below "Other".');
            ConditionSelectorReferenceTree.clickOnCheckBox(4);
            FatigueDataDiagram.isRadioButtonSelected(
                ' display experimental data ',
            ).should('be.checked');
            PropertyTableDiagram.checkForDiagramXY(
                'Cycles to failure, Nf (log scale)',
                'Strain Amplitude (log scale)',
            );
            // });

            // it('45. Fatigue Data - select "display curve" (check for diagram, in the DDL for the diagram "elastic" is selected.', () => {
            cy.step('Select "display curve".');
            FatigueDataDiagram.clickOnRadioButtonDisplay(' display curve ');
            FatigueDataDiagram.isRadioButtonSelected(' display curve ').should(
                'be.checked',
            );
            PropertyTableDiagram.checkForDiagramXY(
                'Reversals to failure, 2Nf (log scale)',
                'Strain Amplitude (log scale)',
            );
            PropertyTableDiagram.getSelectedTemperatureValue().should(
                'equal',
                'elastic',
            );
            // });

            // it('46. Fatigue Data - select "display cyclic curve", and check for diagram.', () => {
            cy.step('Select "display cyclic curve".');
            FatigueDataDiagram.clickOnRadioButtonDisplay(
                ' display cyclic curve ',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display cyclic curve ',
            ).should('be.checked');
            PropertyTableDiagram.checkForDiagramXY(
                'Strain (m/m)',
                'Stress (MPa)',
            );
            // });

            // it('47. Fatigue Data -  Click on "Reset" check for condition selector (temperaturre, reference, DDL-s).', () => {
            cy.step(' Click on "Reset" .');
            ConditionSelectorHeaders.clickOnReset();
            ConditionSelectorHeaders.getTitle().should('equal', 'Fatigue Data');
            TabButtons.getButtonTitle(0).should('eq', 'Strain Life Parameters');
            TabButtons.getButtonTitle(1).should('eq', 'Stress Life Parameters');
            ConditionSelectorDDLForms.getDDLTitles().then((currentTitles) => {
                cy.Compare_Arrays(
                    currentTitles,
                    expectedDdlTitlesInFatigueData.metals,
                );
            });
            Thermometer.getAllTemperaturesInThermometer()
                .then((temperature) => {
                    expect(temperature.eq(0).text()).to.equals('> 500°C');
                    expect(temperature.eq(1).text()).to.equals('300 - 500°C');
                    expect(temperature.eq(2).text()).to.equals('100 - 300°C');
                    expect(temperature.eq(3).text()).to.equals('30 - 100°C');
                    expect(temperature.eq(4).text()).to.equals('0 - 30°C');
                    expect(temperature.eq(5).text()).to.equals('-100 - 0°C');
                    expect(temperature.eq(6).text()).to.equals('< -100°C');
                })
                .and('have.length', 7);
            FatigueDataConditionSelector.getParametersInSelectedConditionsRow().then(
                (parameter) => {
                    expect(parameter.eq(0).text()).to.equal('Product:');
                    expect(parameter.eq(1).text()).to.equal('Experiment:');
                    expect(parameter.eq(2).text()).to.equal('Specimen:');
                },
            );
            // let all = 0;
            ConditionSelectorReferenceTree.checkbox(all).should(
                'have.class',
                'jqx-checkbox-check-checked',
            );
            FatigueDataDiagram.isRadioButtonSelected(
                ' display experimental data ',
            ).should('be.checked');
            // });

            // it(
            //     '48. Fatigue Data -  Click on Stress Life Parameters check for condition selector ( temperatures, refernces, DDL-s), check for diagram. ' +
            //         'Condition "Product Bars; Diameter (mm) 20; Annealed; Annealing at 1100°C for 2h; Grain size of ferrite [µm] ～50' +
            //         'Experiment Stress control; Frequency 0.5 Hz; Test temperature 23 °C' +
            //         'Specimen Direction T; Grinded; Roughness [µm] 1; Flat bar; Thickness [mm] 8; Width [mm] 14; Gauge length [mm] 40"',
            //     () => {
            cy.step('Click on Stress Life Parameters.');
            TabButtons.clickOnButton('Stress Life Parameters');
            ConditionSelectorDDLForms.getTitlesOfDDL().then((title) => {
                expect(title.eq(0).text()).to.equal(
                    'Heat Treatment / Material Processing',
                );
                expect(title.eq(1).text()).to.equal('Form');
                expect(title.eq(2).text()).to.equal('Specimen');
                expect(title.eq(3).text()).to.equal('Direction');
                expect(title.eq(4).text()).to.equal('Loading Condition');
                expect(title.eq(5).text()).to.equal('Stress Ratio');
            });
            FatigueDataConditionSelector.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.orangeLight,
            );
            Thermometer.getAllTemperaturesInThermometer()
                .then((temperature) => {
                    expect(temperature.eq(0).text()).to.equals('> 500°C');
                    expect(temperature.eq(1).text()).to.equals('300 - 500°C');
                    expect(temperature.eq(2).text()).to.equals('100 - 300°C');
                    expect(temperature.eq(3).text()).to.equals('30 - 100°C');
                    expect(temperature.eq(4).text()).to.equals('0 - 30°C');
                    expect(temperature.eq(5).text()).to.equals('-100 - 0°C');
                    expect(temperature.eq(6).text()).to.equals('< -100°C');
                })
                .and('have.length', 7);
            FatigueProperty.getValuesInPropertyTable().then((property) => {
                expect(property.eq(0).text()).to.equal('Kt');
                expect(property.eq(1).text()).to.equal('Orientation');
                expect(property.eq(2).text()).to.equal('Specimen');
                expect(property.eq(3).text()).to.equal(
                    'Fatigue strength (MPa)',
                );
                expect(property.eq(4).text()).to.equal('Number of cycles');
            });
            PropertyTableDiagram.checkForDiagramXY(
                'Cycles to failure, Nf (log scale)',
                'Stress Amplitude (MPa) (log scale)',
            );
            //     },
            // );

            // it(
            //     '49. Fatigue Data - Select condition "Product Bars; Diameter (mm) 20; Annealed; Annealing at 870°C for 0.5h, air; Grain size of ferrite [µm] ～6' +
            //         ' Experiment Stress control; Frequency 0.5 Hz; Test temperature 23 °C' +
            //         ' Specimen Direction: L; Turned; Roughness [µm] 1; Flat bar; Thickness [mm] 8; Width [mm] 14; Gauge length [mm] 25" then check for selected condition and visibility of diagram.',
            //     () => {
            cy.step('Select second condition.');
            ConditionsSelectorDetailsView.clickOnCheckboxCondition(1);
            PropertyTableDiagram.checkForDiagramXY(
                'Cycles to failure, Nf (log scale)',
                'Stress Amplitude (MPa) (log scale)',
            );
            FatigueDataConditionSelector.getParametersInSelectedConditionsRow().then(
                (parameter) => {
                    expect(parameter.eq(0).text()).to.equal('Product:');
                    expect(parameter.eq(1).text()).to.equal('Experiment:');
                    expect(parameter.eq(2).text()).to.equal('Specimen:');
                },
            );
            //     },
            // );

            // it(
            //     '50. Fatigue Data - Select condition "Product Semi finished products; Thickness <= 8 mm; Diameter <= 16 mm; Quenched and tempered (+QT) ' +
            //         'Experiment Reversed bending; Test temperature 20 °C" then check for selected condition and visibility of diagram.',
            //     () => {
            cy.step(
                'Select condition: Rounds; Diameter (mm): 14.3; Cold drawn, tempered; Tempering at 182°C',
            );
            // ConditionsSelectorDetailsView.clickOnCheckboxCondition(13);
            ConditionsSelectorDetailsView.findAndClickConditionByName(
                'Rounds; Diameter (mm): 14.3; Cold drawn, tempered; Tempering at 182°C',
            );
            PropertyTableDiagram.checkForDiagramXY(
                'Cycles to failure, Nf (log scale)',
                'Stress Amplitude (MPa) (log scale)',
            );
            FatigueDataConditionSelector.getParametersInSelectedConditionsRow().then(
                (parameter) => {
                    expect(parameter.eq(0).text()).to.equal('Product:');
                    expect(parameter.eq(1).text()).to.equal('Experiment:');
                },
            );
            //     },
            // );
            /*
    it('51. Fatigue Data - Select the next condition then check for visibility of the selected condition and visibility of the diagram.', () => {
        cy.step('Select before the last one condition.');
        ConditionsSelectorDetailsView.clickOnCheckboxCondition(12);
        PropertyTableDiagram.checkForDiagramXY('Cycles to failure, Nf (log scale)', 'Stress Amplitude (MPa) (log scale)');
        FatigueDataConditionSelector.getParametersInSelectedConditionsRow().then(parameter => {
            expect(parameter.eq(0).text()).to.equal('Product:');
            expect(parameter.eq(1).text()).to.equal('Experiment:');
        });
    });
    */
            // it(
            //     '52. Fatigue Data - In Heat Treatment select option "Quenched and tempered (+QT)", in Form select "Semi finished products" then check for selected condition\n' +
            //         ' and chck for options in "Loading Condition" there only "Reversed bending".',
            //     () => {
            cy.step(
                'In Heat Treatment select option "Quenched and tempered (+QT)".',
            );
            const loadingCondition = 4;
            Helpers.clickOnFilterOption(
                'Form',
                [''],
                ['Semi finished products'],
            );
            cy.step('In Form select option "Semi finished products"');
            Helpers.clickOnFilterOption(
                'Heat Treatment / Material Processing',
                [''],
                ['Quenched and tempered (+QT)'],
            );
            ConditionSelectorDDLForms.getAllOptionsInDDL(loadingCondition).then(
                (options) => {
                    expect(options).to.be.equal('Reversed bending');
                },
            );
            //     },
            // );

            // it('54. Fatigue Data - In Loading Condition select "Completely reversed bending stress (amplitude)" and check for conditions".', () => {
            cy.step(
                'In Loading Condition select select "Completely reversed bending stress (amplitude)".',
            );
            ConditionSelectorHeaders.clickOnReset();
            // const loadingCondition = 4;
            ConditionSelectorDDLForms.clickOnOptionDDL(
                loadingCondition,
                'Completely reversed bending stress (amplitude)',
            );
            ConditionSelectorHeaders.clickOnReset();
        });
    },
);
