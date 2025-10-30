import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { CorrosionHome } from '@/Corosion/corrosionHome';
import { CreepData } from '@/CreepData/creepData';
import { Exporter } from '@/Exporter/Exporter';
import { StressStrain } from '@/ExtendedRange/StressStrain';
import { HeatTreatment } from '@/HeatTreatment/HeatTreatment';
import { Bookmarks } from '@/HelpersMethods/Bookmarks';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { ReferencesList } from '@/HelpersMethods/referencesList';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { ReportBuilderHome } from '@/MaterialConsole/reportBuilderHome';
import { LoginPage } from '@/LoginPage/loginPage';
import { MechanicalProperties } from '@/mechanicalProperties';
import { color } from 'cypress/fixtures/color';

describe(
    'Smoke Test Material Console/MyConsole/Bookmarks',
    { tags: ['@smoke', '@myConsole'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(`Go to Bookmarks tab, click on the material from the list(DC 05), it should lead you to bookmarked page(Mechanical Properties),
    Details view should be by default, check values for property and default selected temperature, reference tree and dropdown filters are visible, check list of conditions and check if 1st is selected by default, scroll down to check if property table is displayed, and finally list of references at the bottom`, () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Bookmarks');
            cy.wait(1000);
            MaterialConsole.colorOfSelectedTab('Bookmarks').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            Bookmarks.getDescriptionForSavedBookmarksFromRow(
                'Mechanical Properties- DC 05',
            ).should('equal', 'Mechanical Properties- DC 05');
            cy.wait(1000);
            Bookmarks.clickOnMaterialFromRow('DC 05');
            cy.wait(1000);
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                'DC 05',
            );
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            MechanicalProperties.getSelectedView().should(
                'eq',
                ' Details view ',
            );
            const temperature_0_30 = 3;
            Thermometer.getTemperature(temperature_0_30).should('be.checked');
            const all = 0;
            StressStrain.checkbox(all).should(
                'have.class',
                'jqx-checkbox-check-checked',
            );
            const expectedTitles = [
                'Heat Treatment',
                'Form',
                'Dimensions',
                'Property',
            ];
            CorrosionHome.getTitlesForDDLists().then((currentTitles) => {
                cy.Compare_Arrays(currentTitles, expectedTitles);
            });
            ConditionsSelectorDetailsView.getNumbersOfConditions().should(
                'eq',
                'Conditions (4/4)',
            );
            Exporter.getDefaultConditionInExporter(0).then(
                (defaultCondition) => {
                    expect(defaultCondition).to.equal(
                        'Cold rolled flat products; Skin passed; t >= 0.35 mm or w >= 600 mm; Reference:  EN 10130: 2006 / Cold rolled low carbon steel flat products for cold forming - Technical delivery conditions',
                    );
                },
            );
            CreepData.colorOfSelectedCondition().should(
                'have.css',
                'background-color',
                color.blue,
            );
            cy.wait(1000);
            PropertyTable.getNumberOfVisiblePropertyRows().should('be.gte', 3);
            // croll down to check if property table is displayed
            PropertyTable.getTextInHeaders().should(
                'contain',
                ' Property  T(°C)  Value  Unit  Note ',
            );
            PropertyTable.getTextInGreyGridPropertyTable(0).then(
                (properties) => {
                    expect(properties.text()).equal(
                        'Cold rolled flat products; Skin passed; t >= 0.35 mm or w >= 600 mmReference:  EN 10130: 2006 / Cold rolled low carbon steel flat products for cold forming - Technical delivery conditionsReference:  EN 10130: 2006 / Cold rolled low carbon steel flat products for cold forming - Technical delivery conditions',
                    );
                },
            );
            // Check the title for all reference for selected material
            HeatTreatment.getTitleForAllReferences().should(
                'equal',
                'All references for the selected material',
            );
            // Check the References for all selected material
            ReferencesList.getTextInForAllReferences().then((references) => {
                expect(references).equal(
                    '1 EN 10130: 2006 / Cold rolled low carbon steel flat products for cold forming - Technical delivery conditions 2 EN 10139: 2016 / Cold rolled uncoated mild steel narrow strip for cold forming - Technical delivery conditions 3 EN 10271: 1998 / Electrolytically zinc-nickel (ZN) coated steel flat products - Technical delivery conditions ',
                );
            });
        });
        it(`On the Bookmarks page, click on share link option for the 1st on the list DC 05 (AFNOR NF) Mechanical Properties, on the new page it should open the bookmarks`, () => {
            TotalSearchHomePage.clickOnMaterialConsole();
            cy.wait(1000);
            TotalSearchHomePage.clickOnMyConsoleTab();
            cy.wait(1000);
            MaterialConsole.selectMyConsoleSubTab('Bookmarks');
            cy.wait(1000);
            MaterialConsole.colorOfSelectedTab('Bookmarks').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            MaterialConsole.clickOnShareButtonFromRowOptionThree(0);
            ReportBuilderHome.getUrlInShareModal().then((urlForSharing) => {
                expect(urlForSharing).to.contains(
                    Cypress.env('environmentUrl'),
                );
                expect(urlForSharing).to.contains('/sharing/');
            });
            ReportBuilderHome.onXCloseSharingModal();
        });
    },
);
