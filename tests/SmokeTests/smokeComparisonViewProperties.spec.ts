import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { ComparisonByProperties } from '@/ComparisonView/comparisonByProperty';
import { ComparisonByPropertiesDiagram } from '@/ComparisonView/comparisonByPropertyDiagram';
import { ComparisonByPropertyPropertyTable } from '@/ComparisonView/comparisonByPropertyPropertyTable';
import { ComparisonViewHome } from '@/ComparisonView/comparisonViewHome';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { MechanicalProperties } from '@/mechanicalProperties';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { Buttons } from '@/CommonMethods/Buttons';
import { AddToMaterialBuilder } from '@/HelpersMethods/AddToMaterialBuilder';

const allSelectedPropertiesInDDLaboveDiagram = [
    'Density (kg/dm³)',
    'Elongation / Strain (%)',
    'Impact (J)',
    'Impact (kJ/m²)',
    'Modulus of Elasticity (GPa)',
    'Thermal Expansion (10-6/°C)',
    '6',
];

describe(
    'Comparison View - Properties - 1100 (AA), Zytel 101 NC010 (PROPRIETARY), Macor (PROPRIETARY)',
    { tags: ['@smoke', '@comparison'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Add materials to Comparison View by Properties, go to Comparison View, check if in counter Properties is a number of materials added to the comparison and check for DDL for Property.', () => {
            AddToMaterialBuilder.addMaterials('1100 AA');
            AddToMaterialBuilder.addMaterials('Zytel 101 NC010 PROPRIETARY');
            AddToMaterialBuilder.addMaterials('Macor PROPRIETARY');
            TotalSearchHomePage.clickOnMaterialConsole();
            ConditionSelectorHeaders.getTitle().should(
                'eq',
                ' Material List Builder ',
            );
            ListOfMaterials.clickOnCheckboxAll();
            ListOfMaterials.addToComparisonView('Properties');
            ComparisonViewHome.getNumberInLink('Properties').should(
                'not.be.empty',
            );
            ComparisonByProperties.checkForVisibilityOfButtonSearch().should(
                'equal',
                'Search',
            );
            ComparisonByProperties.checkForVisibilityOfTextInDDL().should(
                'equal',
                '--Select property--',
            );
            // });

            // it(
            //     'Select properties Charpy Notched Impact Strength (kJ/m²), Impact (kJ/m²), Elongation / Strain (%), Thermal Expansion (10-6/°C), Density (kg/dm³), Modulus of Elasticity (GPa), Impact (J)' +
            //         ' and click on Submit. A diagram will appear with Materials on the x-axis and Property on the y-axis. Try to select different properties in DDl above diagram vitch contains all selected properties, the diagram will change.',
            //     () => {
            ComparisonByProperties.selectProperty(
                'Charpy Notched Impact Strength (kJ/m²)',
            );
            ComparisonByProperties.selectProperty('Impact (kJ/m²)');
            ComparisonByProperties.selectProperty('Elongation / Strain (%)');
            ComparisonByProperties.selectProperty(
                'Thermal Expansion (10-6/°C)',
            );
            ComparisonByProperties.selectProperty('Density (kg/dm³)');
            ComparisonByProperties.selectProperty(
                'Modulus of Elasticity (GPa)',
            );
            ComparisonByProperties.selectProperty('Impact (J)');
            ComparisonViewHome.clickOnSubmit();
            ComparisonByPropertiesDiagram.getDiagramTitle().then((title) => {
                ComparisonByPropertiesDiagram.getTitleOnY().should(
                    'equal',
                    title,
                );
            });
            ComparisonByPropertiesDiagram.getTitleOnX().should(
                'equal',
                'Materials',
            );

            ComparisonByPropertiesDiagram.selectInDDLproperty(
                'Density (kg/dm³)',
            );
            ComparisonByPropertiesDiagram.getDiagramTitle().then((title) => {
                ComparisonByPropertiesDiagram.getTitleOnY().should(
                    'equal',
                    title,
                );
            });
            ComparisonByPropertiesDiagram.getTitleOnX().should(
                'equal',
                'Materials',
            );

            ComparisonByPropertiesDiagram.selectInDDLproperty('Impact (kJ/m²)');
            ComparisonByPropertiesDiagram.getDiagramTitle().then((title) => {
                ComparisonByPropertiesDiagram.getTitleOnY().should(
                    'equal',
                    title,
                );
            });
            ComparisonByPropertiesDiagram.getTitleOnX().should(
                'equal',
                'Materials',
            );
            //     },
            // );

            // it('Check if there are tooltips in the points on the diagram, the tooltip contains the selected property.', () => {
            ComparisonByPropertiesDiagram.getTextInTooltipForMaterialsWithSelectedXandYaxes(
                'rgb(0, 152, 0)',
            );
            ComparisonByPropertiesDiagram.getTextInTooltipForMaterialsWithSelectedXandYaxes(
                'rgb(152, 0, 0)',
            );
            // });

            // it('In a table with materials try to deselect some property, that property will disappear as an option in the DDL above diagram.', () => {
            ComparisonByPropertiesDiagram.getAllPropertiesInDDl().then(
                (property) => {
                    expect(property.length).to.be.equal(7);
                    expect(property.eq(0).text()).to.be.equal(
                        'Charpy Notched Impact Strength (kJ/m²)',
                    );
                    expect(property.eq(1).text()).to.be.equal(
                        'Density (kg/dm³)',
                    );
                    expect(property.eq(2).text()).to.be.equal(
                        'Elongation / Strain (%)',
                    );
                    expect(property.eq(3).text()).to.be.equal('Impact (J)');
                    expect(property.eq(4).text()).to.be.equal('Impact (kJ/m²)');
                    expect(property.eq(5).text()).to.be.equal(
                        'Modulus of Elasticity (GPa)',
                    );
                    expect(property.eq(6).text()).to.be.equal(
                        'Thermal Expansion (10-6/°C)',
                    );
                },
            );
            ComparisonByPropertyPropertyTable.clickOnDisableProperty(
                'Charpy Notched Impact Strength (kJ/m²)',
            );
            ComparisonByPropertiesDiagram.getAllPropertiesInDDl().then(
                (property) => {
                    expect(property.length).to.be.equal(6);
                    expect(property.eq(0).text()).to.be.equal(
                        'Density (kg/dm³)',
                    );
                    expect(property.eq(1).text()).to.be.equal(
                        'Elongation / Strain (%)',
                    );
                    expect(property.eq(2).text()).to.be.equal('Impact (J)');
                    expect(property.eq(3).text()).to.be.equal('Impact (kJ/m²)');
                    expect(property.eq(4).text()).to.be.equal(
                        'Modulus of Elasticity (GPa)',
                    );
                    expect(property.eq(5).text()).to.be.equal(
                        'Thermal Expansion (10-6/°C)',
                    );
                },
            );
            // });

            // it('Clicking on the "RADAR CHART", the layout of the diagram will change. Check the visibility of properties on the diagram.', () => {
            ComparisonByPropertiesDiagram.selectChart('Radar chart');
            ComparisonByPropertiesDiagram.getAxisTitlesOnRadarChart().then(
                (visibleTitles) => {
                    cy.Compare_Arrays(
                        visibleTitles,
                        allSelectedPropertiesInDDLaboveDiagram,
                    );
                },
            );
            // });

            // it('Deselecting properties in the table also reduces the number of visible properties in the diagram. De-select some property and check diagram.', () => {
            ComparisonByPropertiesDiagram.getAxisTitlesOnRadarChart().then(
                (visibleTitles) => {
                    ComparisonByPropertyPropertyTable.clickOnDisableProperty(
                        'Density (kg/dm³)',
                    );

                    ComparisonByPropertiesDiagram.getAxisTitlesOnRadarChart().then(
                        (visibleTitlesAfterDeselecting) => {
                            expect(visibleTitles).not.to.equal(
                                visibleTitlesAfterDeselecting,
                            );
                        },
                    );
                },
            );
            // });

            // it('Below the diagram is a table of materials, clicking on the material leads to the page from which the diagram was added.', () => {
            ComparisonByPropertyPropertyTable.clickOnMaterialLinkForMaterial(
                '1100 (AA)',
            );
            MechanicalProperties.getSelectedView().should(
                'eq',
                ' Synthetic view ',
            );
            MaterialDetails.getMaterialNumber().should('equal', '1100');
            MaterialDetails.getMaterialInfoSecondColumnFor('1100').then(
                (infoSecondColumn) => {
                    expect(infoSecondColumn[0]).to.equal(
                        ' United States / AA ',
                    );
                },
            );
            Buttons.clickOnBackButton();
            cy.wait(1000);
            // });

            // it('Check the functionality of remove buttons for the property, click on "X" a message "Are you sure you want to remove this property from comparison view?" will appear, and the property disappear.', () => {
            cy.get('app-property-comparison');
            ComparisonByProperties.customSelectedPropertyBody().should(
                'have.length',
                '7',
            );
            ComparisonByPropertyPropertyTable.clickOnRemoveProperty(
                'Elongation / Strain (%)',
            );
            ComparisonByPropertyPropertyTable.getTextInModalAlertRemove().should(
                'equal',
                'Are you sure you want to remove this property from comparison view?',
            );
            ComparisonByPropertyPropertyTable.clickOnYesInModalAlertRemove();
            ComparisonByProperties.customSelectedPropertyBody().should(
                'have.length',
                '6',
            );
        });
    },
);
