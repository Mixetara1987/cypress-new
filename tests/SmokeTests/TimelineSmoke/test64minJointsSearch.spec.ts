import { Helpers } from '@/HelpersMethods/helpers';
import { color } from 'cypress/fixtures/color';
import { ModuleURLs } from 'cypress/fixtures/modules';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Sliders } from '@/CommonMethods/Sliders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { Joints } from '@/DataPlus/Joints';
import { JointsPropertyTable } from '@/DataPlus/JointsPropertyTable';
import { JointsSearch } from '@/DataPlus/JointsSearch';
import { Weatherability } from '@/Enviro/Weatherability';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';

describe(
    'Smoke Test ( 64:00 min ), Joints search',
    {
        tags: ['@smoke', '@dataPlus', '@joints'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.Joints);
        });

        it('Joints search-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear)', () => {
            cy.step('Navigate to Joints search page');
            // Helpers.totalMateriaNavigateTo(ModuleURLs.Main.Joints);
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                ' Data Plus Joints',
            );
            TabButtons.colorOfSelectedMainTab('Joints').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleLight);
                },
            );
            // Check for Joints type radiobuttons (Welding, Brazing, Adhesion) and check if the 1st is selected as default
            JointsSearch.getTitleForJointsType().should('equal', 'Joints Type');
            JointsSearch.getRadioButtons(0).should('equal', 'Welding');
            JointsSearch.getRadioButtons(1).should('equal', 'Brazing');
            JointsSearch.getRadioButtons(2).should('equal', 'Adhesion');
            JointsSearch.getColorForSelectedRadioButton(0).should(
                'have.css',
                'color',
                color.green,
            );

            // Check if 'Welding method' dropdopwn is visible
            JointsSearch.isDdlvisible(2).should('exist');

            // Check if 'Search for' dropdown is visible
            JointsSearch.isDdlvisible(3).should('exist');

            // Check if material designation field is visible
            CommonSearch.getMaterialDesignation().should('exist');

            // Check if Standard dropdown is visible
            CommonSearch.getStandardDDL().should('exist');

            // Check if Producer and Type field is visible
            ConditionSelectorDDLForms.visibleProduceAndType(0).should('exist');
            ConditionSelectorDDLForms.visibleProduceAndType(1).should('exist');

            // check if Material group ddl is visible
            CommonSearch.getMaterialGroupDDL().should('exist');

            // check titles for search filters
            ConditionSelectorHeaders.getConditionFiltersTitles().then(
                (title) => {
                    expect(title.eq(1).text()).to.equal('Material Designation');
                    expect(title.eq(2).text()).to.equal('Standard');
                    expect(title.eq(3).text()).to.equal('Producer');
                    expect(title.eq(4).text()).to.equal('Type');
                    expect(title.eq(5).text()).to.equal('Material group');
                    JointsSearch.getTitleForFilter(5).should(
                        'equal',
                        'Welding method',
                    );
                    JointsSearch.getTitleForFilter(6).should(
                        'equal',
                        'Search for',
                    );
                },
            );

            // check if Direct Data only slider is visible
            Sliders.IsOnDirectDataOnlySliderVisible().should('exist');
            cy.wait(1000);
            // Verify if condition filters (Welding Method and Search for) are selected "all" by default`
            ConditionSelectorHeaders.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
                expect(status.eq(1).text()).to.contain('All');
            });
            // Verify if condition filters (Standard, Type and Material group) are selected "all" by default`
            JointsSearch.getSelectedOptionInDdl().then((status) => {
                expect(status.eq(1).text()).to.contain('All');
                expect(status.eq(2).text()).to.contain('All');
                expect(status.eq(3).text()).to.contain('All');
            });
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');
        });
        it(
            'Joints search-enter material-1100, choose Welding consumable, direct data only, perform the search, it should be functional,' +
                ' it should show 29 results, click on the 2nd material from the list(Al1100 AFNOR), it should lead you to Joints page, check if property table is visible,' +
                ' turn back to Joints home page, material designation-1100, search for-Welding consumable, direct data-on should be selected',
            () => {
                JointsSearch.getColorForSelectedRadioButton(0).should(
                    'have.css',
                    'color',
                    color.green,
                );
                CommonSearch.enterMaterialDesignation('1100');
                Sliders.clickOnDirectDataOnlySlider();
                JointsSearch.clickOnDDlSearchFilters(
                    'Search for',
                    'Welding consumable',
                );
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material Designation: 1100 )  AND  (  Joints Type: Welding )  AND  (  Search for: Welding consumable )  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getTableColumnValues('designation').then(
                    (columnValues) => {
                        Helpers.waitForloaderIfLoaderExist();
                        expect(columnValues).to.contain('11');
                    },
                );
                // click on the 2nd material from the list(Al1100 AFNOR), it should lead you to Joints page, check if property table is visible
                ListOfMaterials.clickOnMaterialInListByIndex(1);
                ConditionSelectorHeaders.getTitle().should('equal', 'Joints');
                TabButtons.colorOfSelectedTabButton('Welding').should(
                    'have.css',
                    'background-color',
                    color.pinkLight,
                );
                JointsPropertyTable.getPropertyTableTitle(0).should(
                    'equal',
                    'Properties of Joint',
                );
                // turn back to Joints home page, material designation-1100, search for-Welding consumable, direct data-on should be selected
                TabButtons.clickOnTheTabs('Joints');
                JointsSearch.getColorForSelectedRadioButton(0).should(
                    'have.css',
                    'color',
                    color.green,
                );
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material Designation: 1100 )  AND  (  Joints Type: Welding )  AND  (  Search for: Welding consumable )  AND  (  Direct data only )  ',
                );
            },
        );
        it(
            'Joints search-switch in Search for dropdown to Welded Materials, perform the search for Welded Materials, it should be functional, it should show 61 results,' +
                ' click on the 13th material from the list(1.1100 NS), it should lead you to Joints page, check if the 1st condition is selected by default, check if Electrode is in condition' +
                ' check if property table is visible, switch to 2nd condition from the list, check if property table is visible, turn back to Joints home page,' +
                ' material designation-1100, search for-Welded materials, direct data-on should be still selected',
            () => {
                CommonSearch.enterMaterialDesignation('1100');
                Sliders.clickOnDirectDataOnlySlider();
                JointsSearch.clickOnDDlSearchFilters(
                    'Search for',
                    'Welding consumable',
                );
                CommonSearch.clickSearchButton();

                JointsSearch.clickOnDDlSearchFilters(
                    'Search for',
                    'Welded materials',
                );
                Weatherability.getTextForSelectedWeatherabilityType(0).should(
                    'equal',
                    'Welded materials',
                );
                // perform the search for Welded Materials, it should be functional, it should show 61 results
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material Designation: 1100 )  AND  (  Joints Type: Welding )  AND  (  Search for: Welded materials )  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getTableColumnValues('designation').then(
                    (columnValues) => {
                        expect(columnValues).to.contain('11');
                    },
                );
                // click on the 13th material from the list(1.1100 NS), it should lead you to Joints page, check if the 1st condition is selected by default, check if property table is visible
                cy.wait(1300);
                ListOfMaterials.clickOnMaterialInListByIndex(12);
                ConditionSelectorHeaders.getTitle().should('equal', 'Joints');
                TabButtons.colorOfSelectedTabButton('Welding').should(
                    'have.css',
                    'background-color',
                    color.pinkLight,
                );
                ConditionsSelectorDetailsView.getDefaultCondition().then(
                    (defaultCondition) => {
                        expect(defaultCondition).to.equal(
                            'F82 (PROPRIETARY)GMAWWelding wiresMixed gases (M); According to ISO 14175: M21 (Ar/CO₂); Gas flow rate (l/min): 12-15DC+High strength steels, fine grain construction steels, cold toughResistant to low temperature down to -60°C; Good characteristics of cold toughnessUsed for liquid gas distribution pipes, tanks, off shore, and petro-chemistry',
                        );
                    },
                );
                JointsPropertyTable.getPropertyTableTitle(0).should(
                    'equal',
                    'Properties of Joint',
                );
                // switch to 2nd condition from the list, check if property table is visible
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                    1,
                ).should('have.class', 'table-cell-radio');
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    'ElectrodeTIG F82 (PROPRIETARY)Welding MethodGTAWSymbol for the ProductFiller metalsShielding GasArgon (Ar); 6-12 l/min; Back shielding : Nitrogen / H₂ : 3-6 l/minType of CurrentDC-MaterialsHigh strength steels, fine grain construction steels, cold toughCommentResistant to low temperature down to -60°C; Good characteristics of cold toughnessUsability of the ElectrodeFor liquid gas distribution pipes, tanks, off shore, and petro-chemistry',
                );
                JointsPropertyTable.getPropertyTableTitle(0).should(
                    'equal',
                    'Properties of Joint',
                );
                // turn back again to 1st condition and click on linked material and check if in the list of materials there is 1.1100 NS
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                    1,
                ).should('have.class', 'table-cell-radio');
                Joints.clickOnMaterialLink('F82 (PROPRIETARY)');
                ConditionSelectorHeaders.getTitleOfMaterial().should(
                    'equal',
                    'TIG F82',
                );
                // turn back to Joints home page, material designation-1100, search for-Welded materials, direct data-on should be still selected
                TabButtons.clickOnTheTabs('Joints');
                JointsSearch.getColorForSelectedRadioButton(0).should(
                    'have.css',
                    'color',
                    color.green,
                );
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material Designation: 1100 )  AND  (  Joints Type: Welding )  AND  (  Search for: Welded materials )  AND  (  Direct data only )  ',
                );
                //     },
                // );
                // it(
                //     'Joints search-switch to Brazing Joints type, choose- Brazing alloys, material designation is still-1100, it was not deleted,' +
                //         ' choose from Search for dropdown-Brazing alloys, perform the search (direct data is also still-ON) for selected(Brazing Alloys),' +
                //         ' it should be functional, it should show some results, click on 1st material from the list, it should lead you to Joints/Brazing tab for this material,' +
                //         ' check if property tables are visible, turn back to Joints home page, material designation-1100, search for-Brazing Alloys, direct data-on should be still selected',
                //     () => {
                cy.step(
                    'Joints search-switch to Brazing Joints type, choose- Brazing alloys, material designation is still-1100, it was not deleted,' +
                        ' choose from Search for dropdown-Brazing alloys, perform the search (direct data is also still-ON) for selected(Brazing Alloys),' +
                        ' it should be functional, it should show some results, click on 1st material from the list, it should lead you to Joints/Brazing tab for this material,' +
                        ' check if property tables are visible, turn back to Joints home page, material designation-1100, search for-Brazing Alloys, direct data-on should be still selected',
                );
                JointsSearch.clickOnRadioButton(1);
                JointsSearch.getColorForSelectedRadioButton(1).should(
                    'have.css',
                    'color',
                    color.green,
                );
                Helpers.waitForloaderIfLoaderExist();
                CommonSearch.getEnteredValueInMaterialDesignation().should(
                    'equal',
                    '1100',
                );
                JointsSearch.clickOnDDlSearchFilters(
                    'Search for',
                    'Brazing alloys',
                );
                // perform the search (direct data is also still-ON) for selected(Brazing Alloys), it should be functional, it should show some results
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material Designation: 1100 )  AND  (  Joints Type: Brazing )  AND  (  Search for: Brazing alloys )  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getTableColumnValues('classification').then(
                    (columnValues) => {
                        expect(columnValues).to.include('Alloy');
                    },
                );
                cy.wait(2300);
                // click on 1st material from the list, it should lead you to Joints/Brazing tab for this material, check if property tables are visible
                const defaultpropertyTableColumnHeaders = [
                    ' Property ',
                    ' Value ',
                    ' Unit ',
                    ' Note ',
                    '',
                    ' Property ',
                    ' T(°C) ',
                    ' Value ',
                    ' Unit ',
                    ' Note ',
                    '',
                ];
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorHeaders.getTitle().should('equal', 'Joints');
                TabButtons.colorOfSelectedTabButton('Brazing').should(
                    'have.css',
                    'background-color',
                    color.pinkLight,
                );
                ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );
                // turn back to Joints home page, material designation-1100, search for-Brazing Alloys, direct data-on should be still selected
                TabButtons.clickOnTheTabs('Joints');
                JointsSearch.getColorForSelectedRadioButton(1).should(
                    'have.css',
                    'color',
                    color.green,
                );

                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material Designation: 1100 )  AND  (  Joints Type: Brazing )  AND  (  Search for: Brazing alloys )  AND  (  Direct data only )  ',
                );
                //     },
                // );
                // it(
                //     'Joints search-switch in Search for dropdown to Brazed materials, Joints search-perform the search (direct data is also still-ON) for selected(Brazed Materials),' +
                //         'it should be functional, it should show some results, click on 1100 AA from the list and check data for 3rd condition, turn back to Joints saerch page clear 1100 from Material Designation,' +
                //         'Brazed Materials is still selected, direct data-ON, perform the search, it should be functional, it should show some results, clear the search by clicking on Clear button, it should be functional',
                //     () => {
                cy.step(
                    'Joints search-switch in Search for dropdown to Brazed materials, Joints search-perform the search (direct data is also still-ON) for selected(Brazed Materials),' +
                        'it should be functional, it should show some results, click on 1100 AA from the list and check data for 3rd condition, turn back to Joints saerch page clear 1100 from Material Designation,' +
                        'Brazed Materials is still selected, direct data-ON, perform the search, it should be functional, it should show some results, clear the search by clicking on Clear button, it should be functional',
                );
                JointsSearch.clickOnDDlSearchFilters(
                    'Search for',
                    'Brazed materials',
                );
                Weatherability.getTextForSelectedWeatherabilityType(0).should(
                    'equal',
                    'Brazed materials',
                );
                // perform the search (direct data is also still-ON) for selected(Brazed Materials), it should be functional, it should show some results
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Material Designation: 1100 )  AND  (  Joints Type: Brazing )  AND  (  Search for: Brazed materials )  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getTableColumnValues('designation').then(
                    (columnValues) => {
                        expect(columnValues).to.contain('11');
                    },
                );
                cy.wait(2300);
                // click on 1st from the list 1100AA and check data for 3rd condition
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                TabButtons.colorOfSelectedTabButton('Brazing').should(
                    'have.css',
                    'background-color',
                    color.pinkLight,
                );
                ConditionsSelectorDetailsView.clickOnCheckboxCondition(
                    2,
                ).should('have.class', 'table-cell-radio');
                ConditionsSelectorDetailsView.getTextSelectedInCondition().should(
                    'equal',
                    'Brazing alloyBAlSi-11 (AWS)Symbol for the ProductFiller metalsBrazing TechniqueFurnaceJoint AtmosphereVacuumMaterialsAluminum and aluminum alloysFlux SolderEssential for all processes, except when brazing aluminum in a vacuum when clearances of 0 - 0.05 mm',
                );
                // turn back to Joints search page and clear 1100 from Material Designation, Brazed Materials is still selected, direct data-ON, perform the search, it should be functional, it should show some results
                TabButtons.clickOnTheTabs('Joints');
                CommonSearch.getMaterialDesignation().clear();
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Joints Type: Brazing )  AND  (  Search for: Brazed materials )  AND  (  Direct data only )  ',
                );
                cy.wait(3000);
                ListOfMaterials.getTableColumnValues('classification').then(
                    (columnValues) => {
                        expect(columnValues).to.include('Alloys');
                    },
                );
                // clear the search by clicking on Clear button, it should be functional
                cy.wait(1000);
                CommonSearch.clearSearchFilters();
                JointsSearch.getColorForSelectedRadioButton(0).should(
                    'have.css',
                    'color',
                    color.green,
                );
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria',
                );
            },
        );
        it(
            'Joints search-switch to Adhesion Joints type, choose- Adhesive, perform the search(Adhesion, Adhesive), it should be functional, it should show more than 2000 results,' +
                'switch Direct Data to ON, and perform the search again(Adhesion, Adhesive), it should show some results, click on 2nd material from the list, it should lead you to Joints/Adhesion tab for this material,' +
                ' check if property table is visible, turn back to Joints search page, switch to `Adherend`, perform the search again, it should show some results',
            () => {
                cy.wait(1000);
                JointsSearch.clickOnRadioButton(2);
                JointsSearch.getColorForSelectedRadioButton(2).should(
                    'have.css',
                    'color',
                    color.green,
                );
                JointsSearch.clickOnDDlSearchFilters('Search for', 'Adhesive');
                Weatherability.getTextForSelectedWeatherabilityType(0).should(
                    'equal',
                    'Adhesive',
                );
                // perform the search(Adhesion, Adhesive), it should be functional, it should show more than 2000 results
                CommonSearch.clickSearchButton();
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Joints Type: Adhesion )  AND  (  Search for: Adhesive ) ',
                );
                ListOfMaterials.getTableColumnValues('classification').then(
                    (columnValues) => {
                        const cleanedValues = columnValues
                            .replace(/[^a-zA-Z0-9]/g, '')
                            .trim()
                            .toLowerCase();
                        expect(cleanedValues).to.include('adhesivespolymers');
                    },
                );
                // switch Direct Data to ON, and perform the search again(Adhesion, Adhesive), it should show some results
                Sliders.clickOnDirectDataOnlySlider();
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Joints Type: Adhesion )  AND  (  Search for: Adhesive )  AND  (  Direct data only )  ',
                );
                ListOfMaterials.getTableColumnValues('classification').then(
                    (columnValues) => {
                        expect(columnValues).to.include('Adhesives');
                    },
                );
                // click on 2nd material from the list, it should lead you to Joints/Adhesion tab for this material, check if property table is visible
                const defaultpropertyTableColumnHeaders = [
                    ' Property ',
                    ' T(°C) ',
                    ' Value ',
                    ' Unit ',
                    ' Note ',
                    '',
                ];
                cy.wait(1800);
                ListOfMaterials.clickOnMaterialInListByIndex(1);
                ConditionSelectorHeaders.getTitle().should('equal', 'Joints');
                TabButtons.colorOfSelectedTabButton('Adhesion').should(
                    'have.css',
                    'background-color',
                    color.pinkLight,
                );
                ConditionSelectorHeaders.getPropertyTableHeaderColumnsOptionTwo().then(
                    (curentHeaders) => {
                        cy.Compare_Arrays(
                            curentHeaders,
                            defaultpropertyTableColumnHeaders,
                        );
                    },
                );
                // turn back to Joints search page, switch to `Adherend`, perform the search again, it should show some results
                TabButtons.clickOnTheTabs('Joints');
                cy.wait(1000);
                JointsSearch.clickOnDDlSearchFilters('Search for', 'Adherend');
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Joints Type: Adhesion )  AND  (  Search for: Adhesive )  AND  (  Direct data only )  ',
                );
                ListOfMaterials.showingFirst2000Message().then((message) => {
                    expect(message).to.contain('List of results too large');
                });
            },
        );
    },
);
