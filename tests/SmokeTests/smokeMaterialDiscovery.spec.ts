import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialDiscoveryDiagram } from '@/MaterialDiscovery/materialDiscoveryDiagram';
import { MaterialDiscoveryHome } from '@/MaterialDiscovery/materialDiscoveryHome';
import { MaterialDiscoveryPropertyTable } from '@/MaterialDiscovery/materialDiscoveryPropertyTable';
import { LoginPage } from '@/LoginPage/loginPage';
import { Helpers } from '@/HelpersMethods/helpers';

describe('Material Discovery', { tags: ['@smoke', '@totalSearch'] }, () => {
    beforeEach(() => {
        LoginPage.loginUser(
            Cypress.env('environmentLoginUrl'),
            Cypress.env('username'),
            Cypress.env('password'),
        );
        TotalSearchHomePage.clickOnMaterialDiscovery();
    });

    it('Verify title "Material Discovery", titles ddl`s for the X axis, Y axis and ranges From - To and for default selected temperature in DDL for X and Y axis should be 0 - 30°C.', () => {
        MaterialDiscoveryHome.getTitle()
            .invoke('text')
            .should('eq', 'Material Discovery');
        MaterialDiscoveryHome.getTitlesAboveXDDLs().should(
            'equal',
            'X-axis:Y-axis:',
        );
        MaterialDiscoveryHome.getTtlesForRanges().then((titile) => {
            expect(titile.eq(0).text()).to.equal('From');
            expect(titile.eq(1).text()).to.equal('To');
            expect(titile.eq(2).text()).to.equal('From');
            expect(titile.eq(3).text()).to.equal('To');
            MaterialDiscoveryHome.getSelectedTemperatureFor('X-axis').then(
                (defaultTemperature) => {
                    expect(defaultTemperature.text()).to.equal('0 - 30°C');
                },
            );
            MaterialDiscoveryHome.getSelectedTemperatureFor('Y-axis').then(
                (defaultTemperature) => {
                    expect(defaultTemperature.text()).to.equal('0 - 30°C');
                },
            );
        });
    });

    it(`Select properties " X - Compression Modulus (GPa), Y - Density (kg/dm³)" and verify the titles on diagram`, () => {
        MaterialDiscoveryHome.getTitle()
            .invoke('text')
            .should('eq', 'Material Discovery');
        MaterialDiscoveryHome.selectXAxisProperty('Compression Modulus (GPa)');
        MaterialDiscoveryHome.selectYAxisProperty('Density (kg/dm³)');
        MaterialDiscoveryHome.clickOnShowResults();
        MaterialDiscoveryDiagram.getTitleOnX()
            .invoke('text')
            .should('eq', 'Compression Modulus (GPa)');
        MaterialDiscoveryDiagram.getTitleOnY()
            .invoke('text')
            .should('eq', 'Density (kg/dm³)');
    });

    it('Go to Material Discovery and enter the X-axis Tensile Strength, then click Show Results, check the diagram, it should be for the Y-axis Tensile Strength and the X-axis groups of materials.', () => {
        const expectedValuesOnX = [
            'Ferrous Alloys',
            'Nonferrous Alloys',
            'Polymers',
            'Ceramics',
            'Composites',
            'Honeycombs',
            'Foams',
            'Wood',
        ];
        MaterialDiscoveryHome.selectXAxisProperty('Tensile Strength (MPa)');
        MaterialDiscoveryHome.clickOnShowResults();
        MaterialDiscoveryDiagram.getAllTitlesOnX().then((currentValuesOnX) => {
            cy.Compare_Arrays(currentValuesOnX, expectedValuesOnX);
        });
        MaterialDiscoveryDiagram.getTitleOnY()
            .invoke('text')
            .should('eq', 'Tensile Strength (MPa)');
    });

    it('[BUG 17458] By clicking on any group the new diagram appears, check if the new diagram appears with the new group level of the selected material group.', () => {
        const expectedAllMaterialGroupsOnX = [
            'Ferrous Alloys',
            'Nonferrous Alloys',
            'Polymers',
            'Ceramics',
            'Composites',
            'Foams',
            'Wood',
        ];
        const expectedAllMaterialGroupsOnXAfterClickOnWood = [
            'Ferrous Alloys',
            'Nonferrous Alloys',
            'Polymers',
            'Ceramics',
            'Composites',
            'Foams',
            'Wood-based panels',
        ];
        MaterialDiscoveryHome.selectXAxisProperty(
            'Modulus of Elasticity (GPa)',
        );
        MaterialDiscoveryHome.clickOnShowResults();
        MaterialDiscoveryDiagram.getAllTitlesOnX().then(
            (currentAllMaterialGroupsOnX) => {
                cy.Compare_Arrays(
                    currentAllMaterialGroupsOnX,
                    expectedAllMaterialGroupsOnX,
                );
            },
        );
        MaterialDiscoveryPropertyTable.clickOnMaterialGroupsArrowDropdown(
            'Wood ',
        );
        cy.wait(1000);
        MaterialDiscoveryDiagram.getAllTitlesOnX().then(
            (currentAllMaterialGroupsOnXAfterClickOnWood) => {
                cy.Compare_Arrays(
                    currentAllMaterialGroupsOnXAfterClickOnWood,
                    expectedAllMaterialGroupsOnXAfterClickOnWood,
                );
            },
        );
    });
    it('[BUG 17458] Check if disabled groups can be opened.', () => {
        MaterialDiscoveryHome.selectXAxisProperty('Elongation / Strain (%)');
        MaterialDiscoveryHome.clickOnShowResults();
        MaterialDiscoveryDiagram.buttonFullScreen().should('be.visible');
        cy.wait(1800);
        MaterialDiscoveryPropertyTable.getAllDisabledMaterialGroupsBellowDiagram().should(
            'deep.equal',
            ['Wood '],
        );
        MaterialDiscoveryPropertyTable.clickOnMaterialGroupsArrowDropdown(
            'Ceramics ',
        );
        MaterialDiscoveryPropertyTable.getAllDisabledMaterialGroupsBellowDiagram().should(
            'deep.equal',
            ['Wood ', 'Refractories '],
        );
    });
    it('Check for the "Tooltip for Materials Groups on the diagram".', () => {
        MaterialDiscoveryHome.selectXAxisProperty('Elongation / Strain (%)');
        MaterialDiscoveryHome.clickOnShowResults();
        MaterialDiscoveryDiagram.getAllTitlesOnX().should('deep.equal', [
            'Ferrous Alloys',
            'Nonferrous Alloys',
            'Polymers',
            'Ceramics',
            'Composites',
            'Foams',
        ]);
        MaterialDiscoveryDiagram.getTextInTooltipForMaterialGroups(0).should(
            'equal',
            'Ferrous Alloys●Elongation / Strain (%): 0.1 – 93●',
        );
        MaterialDiscoveryDiagram.getTextInTooltipForMaterialGroups(1).should(
            'equal',
            'Nonferrous Alloys●Elongation / Strain (%): 0 – 95●',
        );
        MaterialDiscoveryDiagram.getTextInTooltipForMaterialGroups(2).should(
            'equal',
            'Polymers●Elongation / Strain (%): 0 – 3319.12●',
        );
        MaterialDiscoveryDiagram.getTextInTooltipForMaterialGroups(3).should(
            'equal',
            'Ceramics●Elongation / Strain (%): 0.7 – 1.2●',
        );
        MaterialDiscoveryDiagram.getTextInTooltipForMaterialGroups(4).should(
            'equal',
            'Composites●Elongation / Strain (%): 0.012 – 400●',
        );
        // });

        // it('Check for the "Full screen" button.', () => {
        MaterialDiscoveryHome.selectXAxisProperty('Elongation / Strain (%)');
        MaterialDiscoveryHome.clickOnShowResults();
        MaterialDiscoveryDiagram.buttonFullScreen().should('be.visible');
    });

    it('Check the functionality of the "Log" button, diagram will change.', () => {
        MaterialDiscoveryHome.selectXAxisProperty('Rockwell Hardness (HR)');
        MaterialDiscoveryHome.clickOnShowResults();
        MaterialDiscoveryDiagram.getHeightOfRectangle().then(
            (rectangleFirst) => {
                MaterialDiscoveryHome.clickOnLogSwitch(0);
                MaterialDiscoveryHome.clickOnShowResults();
                cy.wait(800);
                MaterialDiscoveryDiagram.getHeightOfRectangle().then(
                    (rectangleSecond) => {
                        expect(rectangleFirst).not.to.equal(rectangleSecond);
                    },
                );
            },
        );
    });

    it('[BUG 17458] Select property "Modulus of Elasticity (GPa)" then go to results check only wood materials and forward to Advanced, in list will appear only materials with classification wood.', () => {
        MaterialDiscoveryHome.selectXAxisProperty(
            'Modulus of Elasticity (GPa)',
        );
        MaterialDiscoveryHome.clickOnShowResults();
        MaterialDiscoveryPropertyTable.clickOnMaterialGroupsArrowDropdown(
            'Wood ',
        );
        MaterialDiscoveryPropertyTable.clickOnSelectMaterialGroupCheckbox(
            'Wood-based panels ',
        );
        Helpers.clickOnFilterOption(
            'Forward to...',
            [''],
            [' Advanced Search '],
        );
        ListOfMaterials.getTableColumnValueByIndex('classification', 1).then(
            (classification) => {
                expect(classification.text()).to.be.equal(
                    'Wood / Wood-based panels / Plywood',
                );
            },
        );
    });
});
