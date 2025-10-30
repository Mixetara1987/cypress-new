import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PhysicalPropertiesMagnetic } from '@/Magnetic/magnetic';
import { LoginPage } from '@/LoginPage/loginPage';
import { Isovac_HP_25035_A_ProprietaryY } from 'cypress/fixtures/materials';
import { color } from 'cypress/fixtures/color';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    `Smoke test, check Magnetic page test Material ${Isovac_HP_25035_A_ProprietaryY.name}`,
    { tags: ['@smoke', '@magnetic', '@totalSearch'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Go to Magnetic page for Isovac Hp 250-35 A Proprietary, check for property table with data, check also if are displayed Core Loss and Magnetic Polarization tables with data and finally if all 3 diagrams are displayed with References at the bottom of the page', () => {
            Helpers.totalMateriaNavigateTo(
                ModuleURLs.Material.PhysicalPropertiesMagnetic,
                Isovac_HP_25035_A_ProprietaryY.id,
            );
            ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
            TabButtons.clickOnButton('Magnetic');
            TabButtons.colorOfSelectedTabButton('Magnetic').should(
                'have.css',
                'background-color',
                color.blue,
            );
            PropertyTable.getTextInHeaders().should(
                'eq',
                ' Property  Value  Unit  Note ',
            );
            PropertyTable.getTextInAllGreyGridPropertyTable().then(
                (headers) => {
                    const conditionsInGrey = headers.text();
                    expect(conditionsInGrey).contain(
                        'Mean value from longitudinal and transverse measurements (Epstein test). As-delivered condition.',
                    );
                },
            );

            // Verify "Values" and "Unit" in Property Table.
            PhysicalPropertiesMagnetic.getValueInRow(1).should(
                'equal',
                '1.22 E+03501.59',
            );
            PhysicalPropertiesMagnetic.getValueInRow(2).should(
                'equal',
                '601.68',
            );

            // Verify text in the Special Table " Core Loss "
            const core_loss = 0;
            PhysicalPropertiesMagnetic.getTextInSpecialTable(core_loss).then(
                (textIntable) => {
                    expect(textIntable.text()).to.contain('Core Loss (W/kg)');
                    expect(textIntable.text()).to.contain('B (T)');
                    expect(textIntable.text()).to.contain('(Hz)');
                    expect(textIntable.text()).to.contain('(W/kg)');
                },
            );
            // Verify text in the Special Table " Magnetic Polarization "
            const magnetic_polarization = 1;
            PhysicalPropertiesMagnetic.getTextInSpecialTable(
                magnetic_polarization,
            ).then((textInTable) => {
                expect(textInTable.text()).to.contain(
                    'Magnetic Polarization, J (T)',
                );
                expect(textInTable.text()).to.contain('Hc (A/m)');
                expect(textInTable.text()).to.contain('J (T)');
            });
            // Check the title and visibility of the diagram, and then check for the diagrams changing
            PhysicalPropertiesMagnetic.diagramImg(0).should('be.visible');
            PhysicalPropertiesMagnetic.diagramImg(1).should('not.be.visible');
            PhysicalPropertiesMagnetic.diagramImg(2).should('not.be.visible');
            PhysicalPropertiesMagnetic.getDiagramName(0).should(
                'equal',
                'Ps-J loss curveTest direction: Mean value from longitudinal and transverse measurements at indicated frequencies, single-sheet test',
            );
            PhysicalPropertiesMagnetic.clickOnRightArrovForChangeDiagram();
            PhysicalPropertiesMagnetic.getDiagramName(1).should(
                'equal',
                'J-H magnetization curveTest direction: Mean value from longitudinal and transverse measurements at indicated frequencies, single-sheet test',
            );
            PhysicalPropertiesMagnetic.diagramImg(0).should('not.be.visible');
            PhysicalPropertiesMagnetic.diagramImg(1).should('be.visible');
            PhysicalPropertiesMagnetic.diagramImg(2).should('not.be.visible');
            PhysicalPropertiesMagnetic.clickOnRightArrovForChangeDiagram();
            PhysicalPropertiesMagnetic.getDiagramName(2).should(
                'equal',
                'μr-J permeability curveTest direction: Mean value from longitudinal and transverse measurements at 50 Hz, single-sheet test',
            );
            PhysicalPropertiesMagnetic.diagramImg(0).should('not.be.visible');
            PhysicalPropertiesMagnetic.diagramImg(1).should('not.be.visible');
            PhysicalPropertiesMagnetic.diagramImg(2).should('be.visible');

            // Check for the References bellow Property table
            PhysicalPropertiesMagnetic.getReferenceForSelectedMaterialTitle().should(
                'eq',
                'Reference for the selected material and condition',
            );
            PhysicalPropertiesMagnetic.getReferenceForSelectedMaterialText().should(
                'deep.include',
                ' Voestalpine, Product Data Sheets / 2023 / Available at: www.voestalpine.com, visited 2023 ',
            );
        });
    },
);
