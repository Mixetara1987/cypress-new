import { ComparisonByAnalytics } from '@/ComparisonView/comparisonByAnalytics';
import { ComparisonByAnalyticsDiagram } from '@/ComparisonView/comparisonByAnalyticsDiagram';
import { ComparisonViewHome } from '@/ComparisonView/comparisonViewHome';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { MaterialListBuilder } from '@/MaterialConsole/materialListBuilder';
import { LoginPage } from '@/LoginPage/loginPage';
import {
    _304_AISI,
    Zytel_101F_BKB009_Proprietary,
} from 'cypress/fixtures/materials';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

const Xproperty = 'Density (kg/dm³)';
const Yproperty = 'Yield Strength, Rp0.2 / Rp (MPa)';

const first_material = Zytel_101F_BKB009_Proprietary;
const colorForFirstMaterial = 'rgba(28,3,101,0.5)';
const second_material = _304_AISI;
const colorForSecondMaterial = 'rgba(242,5,230,0.5)';

function backToMainDiagram() {
    ComparisonByAnalyticsDiagram.clickOnBackArrow();
    ComparisonByAnalyticsDiagram.getTitleOn('y').then((title) => {
        expect(title.text()).to.be.equal(Yproperty);
    });
    ComparisonByAnalyticsDiagram.getTitleOn('x').then((title) => {
        expect(title.text()).to.be.equal(Xproperty);
    });
}

describe(
    `Comparison by Analytics - Diagrams - ${first_material.name} and ${second_material.name}`,
    { tags: ['@smoke', '@comparison'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(`Add two materials (${first_material.name} and ${second_material.name}) to the "Comparison view" by Analytics, in the comparison view the text "Analytics 2".Check for titles above DDL-s for the selecting properties.`, () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            CommonSearch.enterMaterialDesignation(first_material.name);
            CommonSearch.clickSearchButton();
            ListOfMaterials.checkRowByMaterialStandard(
                first_material.name,
                first_material.standard,
                first_material.country_producer,
            );
            ListOfMaterials.clickOnAddToMaterialListBuilder();
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            CommonSearch.enterMaterialDesignation(second_material.name);
            CommonSearch.clickSearchButton();
            ListOfMaterials.checkRowByMaterialStandard(
                second_material.name,
                second_material.standard,
                second_material.country_producer,
            );
            ListOfMaterials.clickOnAddToMaterialListBuilder();
            MaterialConsole.closeGreenMessage();
            TotalSearchHomePage.clickOnMaterialConsole();
            cy.wait(600);
            ListOfMaterials.clickOnCheckboxAll();
            ListOfMaterials.addToComparisonView('Analytics');
            MaterialListBuilder.closePopup();
            ComparisonViewHome.getTitle().then((title) => {
                expect(title).to.be.equal('Comparison View');
            });
            ComparisonViewHome.getNumberInLink('Analytics').should(
                'equal',
                ' 2 ',
            );

            ComparisonByAnalytics.getTitlesForXandYaxis().then((titles) => {
                expect(titles.text()).to.be.equal('X-axis:Y-axis:');
            });
            // });

            // it(
            //     'For the x-axis property, select Density (kg/dm³), for the y-axis Yield Strength, Rp0.2 / Rp (MPa), then click Submit, a diagram will appear that has' +
            //         ' Density (kg/dm³) on the x-axis and Yield Strength, Rp0.2 / Rp (MPa) on the y-axis and check for the tooltips in points which contain material descriptions.',
            //     () => {
            ComparisonByAnalytics.selectPropertyOnAxis('Y', Yproperty);
            cy.wait(200);
            ComparisonByAnalytics.selectPropertyOnAxis('X', Xproperty);
            cy.wait(200);
            ComparisonByAnalytics.clickOnShowResults();
            ComparisonByAnalyticsDiagram.getTitleOn('y').then((title) => {
                expect(title.text()).to.be.equal(Yproperty);
            });
            ComparisonByAnalyticsDiagram.getTitleOn('x').then((title) => {
                expect(title.text()).to.be.equal(Xproperty);
            });
            //     },
            // );
            // it('', () => {
            ComparisonByAnalyticsDiagram.getTextInTooltipForMaterialsWithSelectedXandYaxes(
                colorForFirstMaterial,
            ).should('contain', first_material.name);
            ComparisonByAnalyticsDiagram.getTextInTooltipForMaterialsWithSelectedXandYaxes(
                colorForSecondMaterial,
            ).should('contain', second_material.name);
            // });

            // it('Click on the point for Zitel in the diagram, it leads to the diagram for details where the values in the property table are the same as in the tooltip.', () => {
            ComparisonByAnalyticsDiagram.getTextInTooltipForMaterialsWithSelectedXandYaxes(
                colorForFirstMaterial,
            ).then((textInTooltip) => {
                ComparisonByAnalyticsDiagram.clickOnDataPointColor();
                ComparisonByAnalyticsDiagram.getValueInPropertyTableFor(
                    Xproperty,
                ).then((valueInPropertyTable) => {
                    expect(textInTooltip).to.contains(
                        valueInPropertyTable.trim(),
                    );
                });
            });
            backToMainDiagram();
            // });

            // it('Click on the point for 304 in the diagram, it leads to the diagram for details where the values in the property table are the same as in the tooltip.', () => {
            ComparisonByAnalyticsDiagram.getTextInTooltipForMaterialsWithSelectedXandYaxes(
                colorForSecondMaterial,
            ).then((textInTooltip) => {
                ComparisonByAnalyticsDiagram.clickOnDataPointColor();
                ComparisonByAnalyticsDiagram.getValueInPropertyTableFor(
                    Xproperty,
                ).then((valueInPropertyTable) => {
                    expect(textInTooltip).to.contains(
                        valueInPropertyTable.trim(),
                    );
                });
            });
            backToMainDiagram();
            // });

            // it('Click on the point for 304 in the diagram, it leads to the diagram for details, there are points with tooltips, check for the tooltips in diagram Yield Strength, Rp0.2 / Rp (MPa) - temperature.', () => {
            ComparisonByAnalyticsDiagram.getTextInTooltipForMaterialsWithSelectedXandYaxes(
                colorForSecondMaterial,
            );
            ComparisonByAnalyticsDiagram.clickOnDataPointColor();
            ComparisonByAnalyticsDiagram.getTextInTooltipForProperty(
                Xproperty,
                'rgba(210,152,226,0.5)',
            ).then((textInTooltip) => {
                expect(textInTooltip).to.contains(Xproperty);
            });
            backToMainDiagram();
            // });

            // it(
            //     'Click the point for 304 in the diagram, and it leads to the diagram for details, in the diagram "Density (kg/dm³) - temperature" in the condition filter, ' +
            //         'enter Annealed, then click the search button, and the number of conditions will decrease.',
            //     () => {
            ComparisonByAnalyticsDiagram.getTextInTooltipForMaterialsWithSelectedXandYaxes(
                colorForSecondMaterial,
            );
            ComparisonByAnalyticsDiagram.clickOnDataPointColor();
            ComparisonByAnalyticsDiagram.getNumberOfRowsInconditionTable(
                Xproperty,
            ).then((numberOfRowsBeforeSelection) => {
                ComparisonByAnalyticsDiagram.forDiagramInConditionEnter(
                    Xproperty,
                    'Annealed',
                );
                ComparisonByAnalyticsDiagram.clickOnSearchAboveTableFor(
                    Xproperty,
                );
                ComparisonByAnalyticsDiagram.getNumberOfRowsInconditionTable(
                    Xproperty,
                ).then((numberOfRowsAfterSelection) => {
                    expect(numberOfRowsAfterSelection).not.to.equal(
                        numberOfRowsBeforeSelection,
                    );
                });
            });
        });
    },
);
