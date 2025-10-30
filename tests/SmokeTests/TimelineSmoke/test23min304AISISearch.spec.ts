import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { CreepData } from '@/CreepData/creepData';
import { Formability } from '@/ExtendedRange/Formability';
import { Similar } from '@/Helpers/Similar';
import { Helpers } from '@/HelpersMethods/helpers';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { PropertyTableDiagram } from '@/HelpersMethods/propertyTableDiagram';
import { LoginPage } from '@/LoginPage/loginPage';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke test 23 min, added Irradiation column, searched material-304, check Irradiation, Heat Treatment, Ageing, Metallography, Machinability',
    { tags: ['@smoke', '@totalSearch'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(
            'Home page-enter material-`304`, perform the search, add Irradiation column, click on the value inside Irradiation column for the 1st material 304 AISI, it should lead you to Irradiation page for selected material,' +
                '1st condition should be selected by default, check tooltip for Comment in text for selected Condition. Check if property table with diagram link are displayed,' +
                'click on the 1st diagram link,it should open a diagram with table data, close the diagram',
            () => {
                Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
                CommonSearch.enterMaterialDesignation('304');
                CommonSearch.clickSearchButton();
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });
                ListOfMaterials.clickOnAddPropertyCheckbox('Irradiation');
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Material');
                    expect(headerTitles).contain('Standard');
                    expect(headerTitles).contain('Country / Producer');
                    expect(headerTitles).contain('Classification');
                });

                ListOfMaterials.findSpecificItemByColumnNameAndValue(
                    'standard',
                    'AISI',
                    'irradiationProperty',
                )
                    .invoke('text')
                    .should('equal', '41');
                ListOfMaterials.findSpecificItemByColumnNameAndValue(
                    'standard',
                    'AISI',
                    'irradiationProperty',
                ).click();

                ConditionSelectorHeaders.getTitle().should(
                    'equal',
                    'Irradiation',
                );
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.golden,
                );
                Helpers.mouseHoverToltipAndGetText().then((tooltipText) => {
                    expect(tooltipText).to.contain(
                        'Chemical composition criteria according to UNS S30400 /AISI Type 304 (%): C: ≤ 0.08, Cr: 18 - 20, Ni: 8 - 12, Si: ≤ 1, Mn: ≤ 2, Fe: Balance',
                    );
                });
                // Check if property table with diagram link are displayed, click on the diagram link,it should open a diagram with table data
                const defaultpropertyTableColumnHeader = [
                    ' Property ',
                    ' T(°C) ',
                    ' Value ',
                    ' Unit ',
                    ' Note ',
                    '',
                ];
                ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeader,
                        );
                    },
                );
                PropertyTableDiagram.clickOnDiagramByName(
                    'Yield Strength (MPa) - Si content in Alloy (wt%)',
                );
                PropertyTableDiagram.getDiagramName().should(
                    'equal',
                    'Yield Strength (MPa) - Si content in Alloy (wt%)',
                );
                Formability.diagramAndTableDataExist().should('exist');
                // close the diagram
                PropertyTableDiagram.closeDiagram();
                PropertyTableDiagram.visibilityOfDiagram().should('not.exist');
                // },
                // );
                // it(
                // 'Switch to Ageing page, Time-Temperature dependency tab should be selected by default, check if condition filters are visible(Exposure Time, Form..)' +
                //     ', check if 1st condition is selecteb by default, switch to 5th condition, check if tooltip in comment for selected condition is working',
                // () => {
                RightMenu.clickOnRightMenuPropertyByIndex(19);
                RightMenu.colorORightMenuModuleLinks(' Ageing ').should(
                    'have.css',
                    'background-color',
                    color.beige,
                );
                TabButtons.colorOfSelectedTabButton(
                    'Time-Temperature dependency',
                ).should('have.css', 'background-color', color.golden);
                const defConditionFilters = [
                    'Exposure Time',
                    'Exposure Temperature',
                    'Heat Treatment',
                    'Form',
                ];
                Similar.getTitleOfConditionFilters().should(
                    'deep.equal',
                    defConditionFilters,
                );
                ConditionsSelectorDetailsView.getDefaultCondition().then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.equal(
                            'Heat treatment: Annealed; General comment: Unexposed',
                        );
                    },
                );
                CreepData.colorOfSelectedCondition().should(
                    'have.css',
                    'background-color',
                    color.golden,
                );
                ConditionsSelectorDetailsView.getSelectedTextInConditions().then(
                    (defaultConditions) => {
                        PropertyTable.getPropertyValuesInTableRow('600 ');
                        ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                            4,
                        );
                        ConditionsSelectorDetailsView.getSelectedTextInConditions().then(
                            (fifthConditions) => {
                                expect(defaultConditions.text()).not.to.equal(
                                    fifthConditions.text(),
                                );
                            },
                        );
                        cy.wait(1000);
                        CreepData.colorOfSelectedCondition().should(
                            'have.css',
                            'background-color',
                            color.golden,
                        );
                        PropertyTable.getPropertyValuesInTableRow('587 ');
                    },
                );
                PropertyTable.mouseHoverToltipAndGetTextOptionThree().then(
                    (tooltipText) => {
                        expect(tooltipText).to.contain(
                            'Chemical composition criteria according to UNS S30400 /AISI Type 304 (%): C: ≤ 0.08, Cr: 18 - 20, Ni: 8 - 12, Si: ≤ 1, Mn: ≤ 2, Fe: Balance',
                        );
                    },
                );
            },
        );
    },
);
