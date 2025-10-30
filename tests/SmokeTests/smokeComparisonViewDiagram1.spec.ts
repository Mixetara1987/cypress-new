import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { ComparisonByAnalytics } from '@/ComparisonView/comparisonByAnalytics';
import { ComparisonDiagrams } from '@/ComparisonView/comparisonDiagrams';
import { ComparisonViewHome } from '@/ComparisonView/comparisonViewHome';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { LoginPage } from '@/LoginPage/loginPage';
import { MechanicalProperties } from '@/mechanicalProperties';
import {
    _1100_AA,
    Zytel_101_NC010_PROPRIETARY,
} from 'cypress/fixtures/materials';

describe(
    'Smoke test - Diagram Comparison - Add To Diagram Comparison, test material 1100 (AA), Zytel 101 NC010 (PROPRIETARY).',
    { tags: ['@smoke', '@comparison'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(
            'In Mechanical Properties go to Details, select temperature > 300°C then open diagrams "Yield Strength, Rp0.2" and "Tensile Strength",and add diagrams to comparison.' +
                'Check for the functionality of button Add to Diagram Comparison (tooltip) then go to Mechanical Properties for material Zytel  select "Impact Strength",and add diagram to comparison,' +
                ' select temperature < 0°C, select second condition, open diagram "Impact Strength", and add to comparison diagram.' +
                'Check for message "You have successfully added the curve to Diagram Comparison!Search and add more curves to compare, ' +
                'or click on the link below to go to Diagram Comparison. Go to Diagram Comparison. "',
            () => {
                // 1100
                const form = 1;
                MechanicalProperties.navigateTo(_1100_AA.id);
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
                Thermometer.getTemperatureState('≥ 300°C').should(
                    'not.be.checked',
                );
                Thermometer.clickOnCheckboxForTemperature(['≥ 300°C']);
                Thermometer.getTemperatureState('≥ 300°C').should('be.checked');
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'be.above',
                    0,
                );
                ConditionSelectorDDLForms.clickOnOptionDDL(form, 'Bars');
                PropertyTable.getTextInFirstGreyGridPropertyTable();
                PropertyTable.clickOnViewDiagramLink('Yield Strength, Rp0.2');
                PropertyTableDiagram.getTooltipInAddToDiagramComparison().should(
                    'eq',
                    ' Add To Diagram Comparison ',
                );
                PropertyTableDiagram.clickOnAddToDiagramComparison();
                ComparisonByAnalytics.getTextInPopup().then((alert) => {
                    expect(alert).to.be.equal(
                        'You have successfully added the curve to Diagram Comparison!Search and add more curves to compare, ' +
                            'or click on the link below to go to Diagram Comparison. Go to Diagram Comparison. ',
                    );
                });
                MaterialConsole.closeGreenMessage();
                PropertyTableDiagram.closeDiagram();
                PropertyTable.getTextInFirstGreyGridPropertyTable();
                PropertyTable.clickOnViewDiagramLink('Tensile Strength');
                PropertyTableDiagram.clickOnAddToDiagramComparison();
                ComparisonByAnalytics.getTextInPopup().then((alert) => {
                    expect(alert).to.be.equal(
                        'You have successfully added the curve to Diagram Comparison!Search and add more curves to compare, ' +
                            'or click on the link below to go to Diagram Comparison. Go to Diagram Comparison. ',
                    );
                });
                MaterialConsole.closeGreenMessage();
                PropertyTableDiagram.closeDiagram();

                // Zytel***********************************************************************************************************************************************
                MechanicalProperties.navigateTo(Zytel_101_NC010_PROPRIETARY.id);
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
                Thermometer.getTemperatureState('≤ 0°C').should(
                    'not.be.checked',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                // Thermometer.getTemperature(temperature_0).should('not.be.checked');
                // Thermometer.getTemperature(temperature_0_30).should('be.checked');
                PropertyTable.getNumberOfVisiblePropertyRows().should(
                    'be.above',
                    0,
                );
                PropertyTable.getTextInFirstGreyGridPropertyTable();
                cy.wait(1000);
                PropertyTable.clickOnViewDiagramLink('Impact Strength');
                PropertyTableDiagram.clickOnAddToDiagramComparison();
                ComparisonByAnalytics.getTextInPopup().then((alert) => {
                    expect(alert).to.be.equal(
                        'You have successfully added the curve to Diagram Comparison!Search and add more curves to compare, ' +
                            'or click on the link below to go to Diagram Comparison. Go to Diagram Comparison. ',
                    );
                });
                MaterialConsole.closeGreenMessage();
                PropertyTableDiagram.closeDiagram();
                PropertyTable.getTextInFirstGreyGridPropertyTable();
                Thermometer.clickOnCheckboxForTemperature(['≤ 0°C']);
                // ConditionSelectorDDLForms.clickOnOptionDDL(form, 'Films');
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(0); // deselect first (default) condition
                ConditionsSelectorDetailsView.clickOnCheckboxConditionWithText(
                    'Dry; ',
                );
                PropertyTable.clickOnViewDiagramLink('Impact Strength');
                PropertyTable.getTextInFirstGreyGridPropertyTable();
                PropertyTableDiagram.clickOnAddToDiagramComparison();
                ComparisonByAnalytics.getTextInPopup().then((alert) => {
                    expect(alert).to.be.equal(
                        'You have successfully added the curve to Diagram Comparison!Search and add more curves to compare, ' +
                            'or click on the link below to go to Diagram Comparison. Go to Diagram Comparison. ',
                    );
                });
                ComparisonViewHome.cllickOnGoToDiagramComparisonInGreenPopup();
                cy.wait(3000);
                //     },
                // );

                // it('', () => {
                ComparisonViewHome.getNumberInLink('Diagrams').should(
                    'equal',
                    ' 4 ',
                );
                // });

                // it(
                //     'Go to - Comparison View Diagrams check the diagrams added for comparison from Mechanical Properties. ' +
                //         'By default, Impact Strength (kJ/m²) is selected, and on the "X" button there is a tooltip "Remove all curves for Impact Strength (kJ/m²) from comparison",' +
                //         ' check the titles of the x and y coordinates, the data in the table below diagram, and the table with material.',
                //     () => {
                // ComparisonViewHome.getNumberInLink('Diagrams').should('equal', ' 4 ');
                ComparisonDiagrams.getSelectedTextInSelectPropertyDDL().should(
                    'equal',
                    'Impact Strength (kJ/m²)',
                );
                ComparisonDiagrams.getTooltipOnClearPropertybutton().should(
                    'equal',
                    'Remove all curves for Impact Strength (kJ/m²) from comparison',
                );
                ComparisonDiagrams.getTitleOnX().should(
                    'equal',
                    'Temperature (°C)',
                );
                ComparisonDiagrams.getTitleOnY().should(
                    'equal',
                    'Impact Strength (kJ/m²)',
                );
                ComparisonDiagrams.gettextInConditionTableRowForMaterial(
                    1,
                ).should('contain', 'Reference');
                PropertyTableDiagram.getHeaderTextInPointTable().should(
                    'eq',
                    'Temperature (°C)Impact Strength (kJ/m²)Temperature (°C)Impact Strength (kJ/m²)',
                );
                //     },
                // );

                // it('Go to - Comparison View Diagrams check the diagrams added for comparison from Mechanical Properties, select Yield Strength, Rp0.2 then check if the diagram and the table with material changed.', () => {
                ComparisonDiagrams.inSelectPropertyDDLSelect(
                    'Yield Strength, Rp0.2',
                );
                ComparisonDiagrams.getTitleOnX().should(
                    'equal',
                    'Temperature (°C)',
                );
                ComparisonDiagrams.getTitleOnY().should(
                    'equal',
                    'Yield Strength, Rp0.2 / Rp (MPa)',
                );
                ComparisonDiagrams.gettextInConditionTableRowForMaterial(
                    1,
                ).should('contain', 'Reference');
                PropertyTableDiagram.getHeaderTextInPointTable().should(
                    'eq',
                    'Temperature (°C)Yield Strength, Rp0.2 (MPa)',
                );
                // });

                // it(
                //     'Go to - Comparison View Diagrams check the diagrams added for comparison from Mechanical Properties. By clicking on Clear on "X" ' +
                //         'Yield Strength, the curve for Yield Strength, Rp0.2 / Rp (MPa) should disappear, then cllick on "Clear all" and the message "No items in Diagram Comparison" should appear.',
                //     () => {
                PropertyTableDiagram.getLegendText().should('deep.equal', [
                    '1',
                ]);
                PropertyTableDiagram.getHeaderTextInPointTable().should(
                    'eq',
                    'Temperature (°C)Yield Strength, Rp0.2 (MPa)',
                );
                ComparisonDiagrams.clickOnClearPropertyButton();
                ComparisonDiagrams.inConfirmModalClickOn('Yes');
                PropertyTableDiagram.getLegendText().should('deep.equal', [
                    '1',
                    '2',
                ]);
                PropertyTableDiagram.getHeaderTextInPointTable().should(
                    'eq',
                    'Temperature (°C)Impact Strength (kJ/m²)Temperature (°C)Impact Strength (kJ/m²)',
                );
                ComparisonDiagrams.clickOnClearall();
                ComparisonDiagrams.inConfirmModalClickOn('Yes');
                ComparisonDiagrams.getMessageInBlueRibbon()
                    .should('contain', 'No items in Diagram Comparison')
                    .and('contain', 'To add curves to Diagrams Comparison');
            },
        );
    },
);
