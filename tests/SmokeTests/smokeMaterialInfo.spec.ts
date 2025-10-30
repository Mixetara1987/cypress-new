import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Biax_CH10_UP2_Proprietary } from 'cypress/fixtures/materials';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { MechanicalProperties } from '@/mechanicalProperties';

const test_material = Biax_CH10_UP2_Proprietary.id;

describe(
    `Smoke test, Material info-test Material ${Biax_CH10_UP2_Proprietary.name}`,
    { tags: ['@smoke', '@totalSearch'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Go to Mechanical Properties page, check for material info beneath the material title, it should displayed(Country/Standard, Producer, Material group and Reinforcement / Filler) with proper data', () => {
            MechanicalProperties.navigateTo(test_material);
            const expectedTitles = [
                'Country/Standard',
                'Producer',
                'Material group',
                ' Reinforcement / Filler ',
            ];
            MaterialDetails.getMaterialInfoFirstColumnFor('Biax-CH10-UP2').then(
                (currentTitles) => {
                    cy.Compare_Arrays(currentTitles, expectedTitles);
                },
            );
            MaterialDetails.getMaterialInfoSecondColumnFor(
                'Biax-CH10-UP2',
            ).then((infoSecondColumn) => {
                expect(infoSecondColumn[0]).equal(' PROPRIETARY ');
                expect(infoSecondColumn[1]).includes(
                    ' Montana State University ',
                );
                expect(infoSecondColumn[2]).equal(
                    'Composites / Reinforcement / Structural composites / LaminatesComposites / Matrix / Polymer matrix / UP',
                );
                expect(infoSecondColumn[3]).equal(
                    ' E-glass woven fabric; Fabric in ±45° direction: Knytex DB240 ',
                );
            });
        });
        it('Go to Quick Search page, search for Bergamid A70 G30 U Proprietary, click on the 1st from the list, it should lead you to Mechanical Properties page by default, check for material info beneath the material title, it should displayed(Country/Standard, Producer, Material group and Reinforcement / Filler, Flame Retandants) with proper data', () => {
            TabButtons.clickOnTheTabs('Quick Search');
            CommonSearch.enterMaterialDesignation('Bergamid A70 G30 U');
            CommonSearch.clickSearchButton();
            ListOfMaterials.clickOnMaterialInListByIndex(0);

            const expectedTitles = [
                'Country/Standard',
                'Producer',
                'Material group',
                ' Reinforcement / Filler ',
                ' Flame Retardants ',
            ];
            MaterialDetails.getMaterialInfoFirstColumnFor(
                'Bergamid A70 G30 U',
            ).then((currentTitles) => {
                cy.Compare_Arrays(currentTitles, expectedTitles);
            });
            MaterialDetails.getMaterialInfoSecondColumnFor(
                'Bergamid A70 G30 U',
            ).then((infoSecondColumn) => {
                expect(infoSecondColumn[0]).equal(' PROPRIETARY ');
                expect(infoSecondColumn[1]).includes(' PolyOne Corporation ');
                expect(infoSecondColumn[2]).equal(
                    'Polymers / Plastics, thermoplasts / Polyamides (PA6, PA6T...) / PA66',
                );
                expect(infoSecondColumn[3]).equal('30% Glass fiber');
                expect(infoSecondColumn[4]).equal('halogenated compounds');
            });
        });
        it('Go to Quick Search page, search for Amperprint 1556 proprietary, click on the 1st from the list, it should lead you to Mechanical Properties page by default, check for material info beneath the material title, it should displayed(Alternative designation, Country/Standard, Producer, Material group) with proper data', () => {
            TabButtons.clickOnTheTabs('Quick Search');
            CommonSearch.enterMaterialDesignation('Amperprint 1556');
            CommonSearch.clickSearchButton();
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            //TODO duplicate code, variable

            const expectedTitles = [
                'Alternative designation',
                'Country/Standard',
                'Producer',
                'Material group',
            ];
            MaterialDetails.getMaterialInfoFirstColumnFor(
                'Amperprint 1556',
            ).then((currentTitles) => {
                cy.Compare_Arrays(currentTitles, expectedTitles);
            });
            MaterialDetails.getMaterialInfoSecondColumnFor(
                'Amperprint 1556',
            ).then((infoSecondColumn) => {
                expect(infoSecondColumn[0]).equal(' 18Ni300 ');
                expect(infoSecondColumn[1]).includes(' PROPRIETARY ');
                expect(infoSecondColumn[2]).includes(' Höganäs AB ');
                expect(infoSecondColumn[3]).equal(
                    'Ferrous Alloys / Tool steelsAdditive Manufacturing',
                );
            });
        });
        it('Go to Quick Search page, search for 1.4301 ASME, click on the 2nd from the list, it should lead you to Mechanical Properties page by default, check for material info beneath the material title, it should displayed(Material designation, Alternative designation, Country/Standard, Producer, Material group and Indicative price) with proper data', () => {
            TabButtons.clickOnTheTabs('Quick Search');
            CommonSearch.enterMaterialDesignation('1.4301');
            CommonSearch.clickSearchButton();
            ListOfMaterials.clickOnMaterialInListByIndex(1);

            const expectedTitles = [
                ' Material Designation ',
                'Alternative designation',
                'Country/Standard',
                'Material group',
                'Indicative price',
            ];
            MaterialDetails.getMaterialInfoFirstColumnFor('1.4301').then(
                (currentTitles) => {
                    cy.Compare_Arrays(currentTitles, expectedTitles);
                },
            );
            MaterialDetails.getMaterialInfoSecondColumnFor('1.4301').then(
                (infoSecondColumn) => {
                    expect(infoSecondColumn[0]).equal(' X5CrNi18-10 ');
                    expect(infoSecondColumn[1]).includes(' 18Cr-8Ni ');
                    expect(infoSecondColumn[2]).equal(' United States / ASME ');
                    expect(infoSecondColumn[3]).equal(
                        'Ferrous Alloys / Stainless steels',
                    );
                },
            );
        });
    },
);
