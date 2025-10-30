import { AdvancedGeneralInformation } from '@/AdvancedSearch/advancedGeneralInformation';
import { AdvancedHome } from '@/AdvancedSearch/advancedSearchHome';
import { AdvancedMechanicalPhysicalProperty } from '@/AdvancedSearch/advancedSearchMechanicalPhysical';
import { AdvancedSpecialSearch } from '@/AdvancedSearch/advancedSpecialSearch';
import { MaterialDescription } from '@/AdvancedSearch/materialDescription';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionsSelectorDetailsView } from '@/CommonMethods/conditionSelectorDetailsView';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { ConditionSelectorReferenceTree } from '@/CommonMethods/conditionSelectorReferencesTree';
import { Thermometer } from '@/CommonMethods/conditionSelectorThermometer';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { ConditionSelectorSyntheticView } from '@/HelpersMethods/conditionSelectorSyntheticView';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { LoginPage } from '@/LoginPage/loginPage';
import { MechanicalProperties } from '@/mechanicalProperties';
import { Helpers } from '@/HelpersMethods/helpers';

describe(
    `Advanced Search - Special Search`,
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
            'Add search criteria: Heat Treatment Diagram - Tempering, Magnetic properties, All of selecting (radio Button) then click on Search,\n' +
                ' go to first material in list, in Physical Properties apear Magnetic tab and Tempering in Conditions.',
            () => {
                TotalSearchHomePage.clickOnAdvancedSearch();
                let property = ['Tempering', 'Magnetic Properties']; // , 'Magnetic Properties', 'All of selected'
                Helpers.clickOnFilterOption('', [''], ['Special Search']);
                AdvancedSpecialSearch.getHeatTreatmentDiagramTitle().should(
                    'eq',
                    'Heat Treatment Diagram',
                );
                AdvancedSpecialSearch.clickOnCheckboxes(property);
                AdvancedHome.clickOnAddToSearchModal();
                CommonSearch.clickSearchButton();
                ListOfMaterials.getResultsFound().then((results) => {
                    expect(results.text()).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                RightMenu.clickOnRightMenuModuleLinks(' Heat Treatment ');
                MaterialDetails.clickOnPhysicalPropertiesTab();
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
                TabButtons.clickOnButton('Magnetic');
                cy.wait(2000);
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.getMaterialDesignation().should('be.visible');
            },
        );

        it(
            'Add search criteria: Heat Treatment Diagram - Hardenability and Tempering, "All of selecting" (radio Button) then click on Search,\n' +
                ' go to the first material in the list (1.2842), go to Heat Treatment there will appear diagrams with titles that contain Hardenability and Tempering.',
            () => {
                const property = [
                    'Tempering',
                    'Hardenability',
                    'All of selected',
                ];
                TotalSearchHomePage.clickOnTotalSearch();
                TotalSearchHomePage.clickOnAdvancedSearch();
                Helpers.clickOnFilterOption('', [''], ['Special Search']);
                AdvancedSpecialSearch.clickOnCheckboxes(property);
                AdvancedHome.clickOnAddToSearchModal();
                CommonSearch.clickSearchButton();
                ListOfMaterials.getResultsFound().then((results) => {
                    expect(results.text()).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                MechanicalProperties.getSelectedView().should(
                    'eq',
                    ' Synthetic view ',
                );
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                cy.wait(1500);
                RightMenu.clickOnRightMenuModuleLinks(' Heat Treatment ');
                AdvancedHome.getImageTitle()
                    .should('contain', 'Hardenability')
                    .and('contain', 'Tempering');
                //  cy.visit(`en/search/advanced`);
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnAdvancedSearch();
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.getMaterialDesignation().should('be.visible');
            },
        );

        it(
            'In Heat Treatment select all properties (Hardenability, Hardness Tempering, CCT, Tempering, TTT, CCT Modified) , "All of selected" (radio Button) then click on Search,' +
                ' select the first material in the list, then go to Heat Treatment, on the page will appear images with all selected diagrams.',
            () => {
                const property = [
                    'Hardenability',
                    'Hardness Tempering',
                    'CCT',
                    'Tempering',
                    'TTT',
                    'CCT Modified',
                    'All of selected',
                ];
                TotalSearchHomePage.clickOnTotalSearch();
                TotalSearchHomePage.clickOnAdvancedSearch();
                Helpers.clickOnFilterOption('', [''], ['Special Search']);
                AdvancedSpecialSearch.clickOnCheckboxes(property);
                AdvancedHome.clickOnAddToSearchModal();
                CommonSearch.clickSearchButton();
                ListOfMaterials.getResultsFound().then((results) => {
                    expect(results.text()).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                RightMenu.clickOnRightMenuModuleLinks(' Heat Treatment ');
                AdvancedHome.getImageTitle()
                    .should('contain', 'Hardenability')
                    .and('contain', 'Hardness-Tempering')
                    .and('contain', 'CCT')
                    .and('contain', 'Tempering')
                    .and('contain', 'TTT')
                    .and('contain', 'CCT modified');
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnAdvancedSearch();
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.getMaterialDesignation().should('be.visible');
            },
        );

        it('Add search criteria: Metallography Data, Machinability data and Magnetic properties, then Search for material, in the right menu all selected properties are available for the selected material.', () => {
            const property = [
                'Metallography Data',
                'Machinability Data',
                'Magnetic Properties',
            ];
            TotalSearchHomePage.clickOnTotalSearch();
            TotalSearchHomePage.clickOnAdvancedSearch();
            Helpers.clickOnFilterOption(
                ' Advanced Search - Add criteria ',
                [''],
                ['Special Search'],
            );
            AdvancedSpecialSearch.clickOnCheckboxes(property);
            AdvancedHome.clickOnAddToSearchModal();
            CommonSearch.clickSearchButton();
            ListOfMaterials.getResultsFound().then((results) => {
                expect(results.text()).to.contain('Result(s) found:');
            });
            ListOfMaterials.clickOnMaterialInListByIndex(0);
            RightMenu.clickOnRightMenuModuleLinks(' Physical Properties ');
            ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
            TabButtons.clickOnButton('Magnetic');
            ConditionsSelectorDetailsView.getConditionInRow(1).should(
                'contains',
                'tempered',
            );
            RightMenu.clickOnRightMenuModuleLinks(' Machinability ');
            ConditionSelectorHeaders.getTitle().should('eq', 'Machinability');
            RightMenu.clickOnRightMenuModuleLinks(' Metallography ');
            ConditionSelectorHeaders.getTitle().should('eq', 'Metallography');
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.getMaterialDesignation().should('be.visible');
            TotalSearchHomePage.clickOnAdvancedSearch();
            AdvancedHome.clickOnClearButton();
            TotalSearchHomePage.clickOnTotalSearch();
            CommonSearch.getMaterialDesignation().should('be.visible');
        });

        it(
            'In General Information in Material designation enter 1.0332, standard - European Union/EN, Stndard Number - 10111, Standard Description - hot-rolled carbon,' +
                ' Full text Search enter text "continuosly hot-rolled", and select Exact phrase. Click on ADD TO SEARCH, the selected criteria will appear linked with "AND".' +
                'Clik on Search, then check for material. In material description, the standard and description are the same as in the requested criteria.',
            () => {
                TotalSearchHomePage.clickOnTotalSearch();
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnRadioButton('Exact phrase');
                AdvancedGeneralInformation.enterTextInFullTextSearch(
                    'hot-rolled low carbon',
                );
                CommonSearch.selectStandards([' EN ']);
                // CommonSearch.enterMaterialDesignation('1.0332');
                CommonSearch.enterMaterialDesignation('1.0332');
                AdvancedGeneralInformation.enterStandardNumber('10111');
                AdvancedGeneralInformation.enterStandardDescription(
                    'hot-rolled low carbon',
                );
                AdvancedHome.clickOnAddToSearchModal();
                AdvancedHome.getSearchCriteria(0).should(
                    'equal',
                    'Country/Standard: European Union/EN',
                );
                AdvancedHome.getSearchCriteria(1).should(
                    'equal',
                    'Material Designation: 1.0332',
                );
                AdvancedHome.getSearchCriteria(2).should(
                    'equal',
                    'Standard Number: 10111',
                );
                AdvancedHome.getSearchCriteria(3).should(
                    'equal',
                    'Standard Description: hot-rolled low carbon',
                );
                AdvancedHome.getSearchCriteria(4).should(
                    'equal',
                    'Full text search: hot-rolled low carbon',
                );
                CommonSearch.clickSearchButton();
                ListOfMaterials.getResultsFound().then((results) => {
                    expect(results.text()).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                MaterialInfo.getMaterialInfoFor('Material group').should(
                    'contains',
                    'Ferrous Alloys / Structural and constructional steels',
                );
                MaterialInfo.getMaterialInfoFor('Country/Standard').should(
                    'contain',
                    'EN',
                );
                RightMenu.clickOnRightMenuModuleLinks(' Material Description ');
                MaterialDescription.getDataTextInRowFirst(' Source ')
                    .should('contain', 'EN 10111')
                    .and('contain', 'hot-rolled low carbon');

                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.getMaterialDesignation().should('be.visible');
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnClearButton();
            },
        );

        it(
            'In Mechanical Properties select Impact, for Unit select kJ/m², in Type select Min (1000), Max(2000) Add to search criteria and select a first material from the list,' +
                ' in the property table for property Impact there are value selected by criteria from Advanced.',
            () => {
                TotalSearchHomePage.clickOnTotalSearch();
                TotalSearchHomePage.clickOnAdvancedSearch();
                Helpers.clickOnFilterOption(
                    '',
                    [''],
                    ['Mechanical Properties'],
                );
                AdvancedMechanicalPhysicalProperty.selectProperty('Impact');
                AdvancedMechanicalPhysicalProperty.selectUnit('kJ/m²');

                AdvancedMechanicalPhysicalProperty.typeInFirstMinValue('1000');
                AdvancedMechanicalPhysicalProperty.typeInFirstMaxValue('2000');

                AdvancedHome.clickOnAddToSearchModal();
                CommonSearch.clickSearchButton();
                ListOfMaterials.getResultsFound().then((results) => {
                    expect(results.text()).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                ConditionSelectorSyntheticView.getValueProperty(
                    ' Impact Strength ',
                ).should('equal', '1400 — 3200 kJ/m²');
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.getMaterialDesignation().should('be.visible');
            },
        );

        it(
            'Search by "Full text search" - enter "Cold reduced tinmill products" (by default "All terms") then search for material, lists with material will apear.\n' +
                'Click on the first material, App lead to Mechanical Property with References that contains of the search text.',
            () => {
                TotalSearchHomePage.clickOnTotalSearch();
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedGeneralInformation.enterTextInFullTextSearch(
                    'Cold reduced tinmill products',
                );
                AdvancedHome.clickOnAddToSearchModal();
                AdvancedHome.clickOnSearchCriteria(0); // Cold reduced tinmill products
                AdvancedHome.clickOnSubmit();
                CommonSearch.clickSearchButton();
                ListOfMaterials.clickOnMaterialInListByIndex(0); // 1.0351 EN  30.03.2022
                Thermometer.getTemperatureState('0 - 30°C').should(
                    'be.checked',
                );
                MechanicalProperties.getSelectedView().should(
                    'eq',
                    ' Synthetic view ',
                );
                ConditionSelectorHeaders.clickOnSyntheticViewDetailsViewSlider();
                ConditionSelectorReferenceTree.getSelectedReferences().then(
                    (references) => {
                        expect(references.text()).to.contains(
                            'Cold reduced tinmill products',
                        );
                    },
                );
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.getMaterialDesignation().should('be.visible');
            },
        );

        it(
            'Select in Material Groups "Polymers" and check "Biodegradable" then click on Search and click on first material.' +
                ' The app leads to Mechanical Property for material that is from the specified group',
            () => {
                TotalSearchHomePage.clickOnTotalSearch();
                TotalSearchHomePage.clickOnAdvancedSearch();
                CommonSearch.selectMaterialGroups([''], ['Polymers']);
                AdvancedGeneralInformation.clickOnCheckbox('Biodegradable');
                AdvancedHome.clickOnAddToSearchModal();
                AdvancedHome.getSearchCriteria(0).should(
                    'equal',
                    'Group: Polymers',
                );
                AdvancedHome.getSearchCriteria(1).should(
                    'equal',
                    'Biopolymer Type: Biodegradable',
                );
                CommonSearch.clickSearchButton();
                ListOfMaterials.clickOnMaterialInListByIndex(0);
                MaterialInfo.getMaterialInfoFor('Material group').should(
                    'contain',
                    'Polymers',
                );
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.getMaterialDesignation().should('be.visible');
            },
        );

        it(
            'Select in Material Groups "Polymers" and check "Biodegradable", "Bio-based", "Recycled", "Recyclable" then click on Search,' +
                ' a list of materials with the classification selected in the search criteria will appear, go to the first material, the criteria are in the description of the material.',
            () => {
                let property = [
                    'Biodegradable',
                    'Bio-based',
                    'Recycled',
                    'Recyclable',
                ];
                TotalSearchHomePage.clickOnTotalSearch();
                TotalSearchHomePage.clickOnAdvancedSearch();
                CommonSearch.selectMaterialGroups([''], ['Polymers']);
                AdvancedGeneralInformation.clickOnCheckboxes(property);
                AdvancedHome.clickOnAddToSearchModal();
                AdvancedHome.getSearchCriteria(0).should(
                    'equal',
                    'Group: Polymers',
                );
                AdvancedHome.getSearchCriteria(1).should(
                    'equal',
                    'Biopolymer Type: Biodegradable; Bio-based; Recycled; Recyclable',
                );
                CommonSearch.clickSearchButton();
                ListOfMaterials.getTableColumnValueByIndex(
                    'classification',
                    0,
                ).then((classification) => {
                    expect(classification.text()).to.contain('Polymers');
                    expect(classification.text()).to.contain('Biopolymers');
                });
                TotalSearchHomePage.clickOnAdvancedSearch();
                AdvancedHome.clickOnClearButton();
                TotalSearchHomePage.clickOnTotalSearch();
                CommonSearch.getMaterialDesignation().should('be.visible');
            },
        );
    },
);
