import { Buttons } from '@/CommonMethods/Buttons';
import { ConditionSelectorDDLForms } from '@/CommonMethods/conditionSelectorDDLForms';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { Exporter } from '@/Exporter/Exporter';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { LoginPage } from '@/LoginPage/loginPage';
import { CommonSearch } from '@/CommonMethods/CommonSearch';

describe(
    'Smoke test(82 min): Previous Exports',
    { tags: ['@smoke', '@exporter'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
            Exporter.navigateToPreviousExports();
        });

        it(`Go to Previous Exports page and check if all filters are visible and their titles and which are preselected 'All' by default, check buttons(search, clear) also`, () => {
            ConditionSelectorHeaders.getTitle().should(
                'equal',
                'Previous Exports',
            );
            Exporter.getTitlesForDdls().then((title) => {
                expect(title.eq(0).text()).to.equal('Solver');
                expect(title.eq(1).text()).to.equal('Material Designation');
            });
            // title of ddl field
            CommonSearch.getStandardDDL()
                .parent('div')
                .siblings('label')
                .invoke('text')
                .should('equal', 'Standard');
            Exporter.getSelectedOptionInDdlForSolver().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            CommonSearch.getStandardDDL().then((status) => {
                expect(status.eq(0).text()).to.contain('All');
            });
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Solver');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
                expect(headerTitles).contain('Created date');
            });
            // check if buttons Search and Clear are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');
        });
        it(`Previous Exports-Try functionality of download button on 1st material from the list 30CrNiMo8 AFNOR with solver-Ansys`, () => {
            Buttons.clickOnButtonCloud(0);
            // tehnicki je nemoguce trenutno da se otvori donwload excel file za skinuti material
        });
        it(`Previous Exports-choose from Standard ddl- GB, perform the search, check in list of results there are only GB is in Standard column`, () => {
            CommonSearch.selectStandards([' GB ']);
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('standard').then(
                (columnValues) => {
                    expect(columnValues).to.contain('GB');
                },
            );
        });
        it(`Previous Exports-clear the search, it should clear selected item in Standard dropdown list`, () => {
            CommonSearch.clearSearchFilters();
            CommonSearch.getStandardDDL().then((status) => {
                expect(status.eq(0).text()).to.equal('--All--');
            });
        });
        it(`Previous Exports-enter in Material Designation(10330), and perform the search, check in list of results there are only(10330) is in material column`, () => {
            CommonSearch.enterMaterialDesignation('10330');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('designation').then(
                (columnValues) => {
                    const materialIndex = columnValues.indexOf('Material');
                    const valuesAfterMaterial = columnValues.substring(
                        materialIndex + 'Material'.length,
                    );
                    const cleanedValues = valuesAfterMaterial
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .trim()
                        .toUpperCase();
                    cy.wait(1500);
                    expect(cleanedValues).to.contain('330');
                },
            );
        });
        it(`Prevoius Exports-clear the search, it should clear selected item in Material Designation field box`, () => {
            CommonSearch.clearSearchFilters();
            CommonSearch.getMaterialDesignation()
                .invoke('text')
                .should('equal', '');
        });
        it(`Previous Exports-check the list of Solvers in his dropdown`, () => {
            const defaultSolverOrderedList = [
                'Abaqus',
                'ANSYS',
                'Ansys Electronics Desktop',
                'ANSYS Fluent Solid',
                'Autoform',
                'CATIA',
                'COLDFORM/FORGE',
                'COMSOL Multiphysics',
                'Deform',
                'ESI Pam-Crash',
                'ESI PAM-STAMP',
                'Excel',
                'FEMAP',
                'Hyperform',
                'HyperWorks/Optistruct',
                'HyperWorks/Radioss',
                'Inventor Nastran (.nasmat)',
                'LS-DYNA',
                'MSC Nastran',
                'nCode',
                'PTC Creo',
                'QForm',
                'Siemens NX',
                'Simufact',
                'SolidEdge',
                'Star CCM+ Solid',
                'XML',
            ];
            cy.wait(1200);
            ConditionSelectorHeaders.getSolverDdllistOptionThree().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(curentHeaders, defaultSolverOrderedList);
                },
            );
        });
        it(`Previous Exports-choose from  Solver ddl- 'ESI PAM STAMP' and perform the search, check in list of results there are only(ESI PAM-STAMP) is in Solver column`, () => {
            ConditionSelectorDDLForms.clickOnSolverInDdl('ESI PAM-STAMP');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableColumnValues('solverName').then(
                (columnValues) => {
                    const materialIndex = columnValues.indexOf('Solver');
                    const valuesAfterMaterial = columnValues.substring(
                        materialIndex + 'Solver'.length,
                    );
                    const cleanedValues = valuesAfterMaterial
                        .replace(/[^a-zA-Z0-9]/g, '')
                        .trim()
                        .toUpperCase();
                    cy.wait(1500);
                    expect(cleanedValues).to.include('PAMSTAMP');
                },
            );
        });
    },
);
