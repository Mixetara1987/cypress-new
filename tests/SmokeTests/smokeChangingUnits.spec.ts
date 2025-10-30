import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { ConditionSelectorSyntheticView } from '@/HelpersMethods/conditionSelectorSyntheticView';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { LoginPage } from '@/LoginPage/loginPage';
import { MechanicalProperties } from '@/mechanicalProperties';
import { _304_SAE } from 'cypress/fixtures/materials';

const test_material = _304_SAE.id;

const expectedTemperaturesC = [
    '≥ 300°C',
    '100 - 300°C',
    '30 - 100°C',
    '0 - 30°C',
    '≤ 0°C',
];
const expectedTemperaturesF = [
    '≥ 572°F',
    '212 - 572°F',
    '86 - 212°F',
    '32 - 86°F',
    '≤ 32°F',
];

describe(
    'Checking the change of units from metric to imperial',
    { tags: ['@smoke'], defaultCommandTimeout: 15000 },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(
            'Go to mechanical properties and check all units for proprieties, thermometer units and' +
                ' currency for Indicative price, then change to imperial units and check if there is a change of units.',
            () => {
                MechanicalProperties.navigateTo(test_material);
                Thermometer.getAllTemperatures().then(
                    (currentTemperaturesC) => {
                        cy.Compare_Arrays(
                            currentTemperaturesC,
                            expectedTemperaturesC,
                        );
                    },
                );
                ConditionSelectorSyntheticView.getSyntheticViewPropertyUnits().then(
                    (propertyUnits) => {
                        expect(propertyUnits)
                            .to.contain('MPa')
                            .and.contain('J');
                    },
                );
                MaterialDetails.getCurencySymbol().should('equal', '€/kg');
                TotalSearchHomePage.clickOnMetricImperialUnits();
                Thermometer.getAllTemperatures().then(
                    (currentTemperaturesF) => {
                        cy.Compare_Arrays(
                            currentTemperaturesF,
                            expectedTemperaturesF,
                        );
                    },
                );
                ConditionSelectorSyntheticView.getSyntheticViewPropertyUnits().then(
                    (propertyUnits) => {
                        expect(propertyUnits)
                            .to.contain('ksi')
                            .and.contain('ft·lb');
                    },
                );
                MaterialDetails.getCurencySymbol().should('equal', '$/kg');
                TotalSearchHomePage.clickOnMetricImperialUnits();
            },
        );
    },
);
