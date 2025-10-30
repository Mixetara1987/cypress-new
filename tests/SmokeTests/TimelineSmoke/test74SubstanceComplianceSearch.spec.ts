import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { PropertyTable } from '@/HelpersMethods/propertyTable';
import { ComplianceAssessor } from '@/MaterialConsole/compilanceAssessor';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { SearchSuppliers } from '@/Suppliers/SearchSuppliers';
import { LoginPage } from '@/LoginPage/loginPage';
import { color } from 'cypress/fixtures/color';

describe(
    'Smoke Test ( 74:00 min ), Compliance Substances search: perform seacrh',
    {
        defaultCommandTimeout: 28000,
        tags: ['@smoke', '@greenLine', '@substances', '@compliance'],
    },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('usernameComp'),
                Cypress.env('passwordComp'),
            );
            ComplianceAssessor.navigateToSubstancesSearchPage();
        });

        it('Check the page for Compliance/Substances tab search-check if all filters are visible and their titles and which are preselected `All` by default, buttons(search, clear), direct data slider', () => {
            ConditionSelectorHeaders.getTitle().should('equal', ' Substances ');
            SearchSuppliers.colorOfSelectedSupplierTab('Substances').then(
                (background) => {
                    expect(background).to.equal(color.greenLight);
                },
            );

            // Check if DDL filters 'Substances, Substance Group, Substance Number' are visible
            for (let i = 0; i < 3; i++) {
                ComplianceAssessor.visibleDDLFilters(0, i).should('exist');
            }
            // Check if DDL filters 'Country of Regulation' and 'According to' are visible
            for (let i = 0; i < 2; i++) {
                ComplianceAssessor.visibleDDLFilters(1, i).should('exist');
            }
            // Check if radiobuttons 'All', 'CAS' , 'EC', 'MITI' , 'KE' are visible
            for (let i = 0; i < 5; i++) {
                ComplianceAssessor.visibleRadioButtons(0, i).should('exist');
            }
            // check if Search and Clear buttons are visible
            CommonSearch.searchButton().should('be.visible');
            CommonSearch.clearButton().should('be.visible');
            // check titles for search filters DDL and all radiobuttons on the Substances search page
            ComplianceAssessor.getConditionDDlFiltersTitlesSubstances().then(
                (title) => {
                    expect(title.eq(0).text()).to.equal('Substance Name');
                    expect(title.eq(1).text()).to.equal('Substance Group');
                    expect(title.eq(2).text()).to.equal('Substance Number');
                    expect(title.eq(3).text()).to.equal('All');
                    expect(title.eq(4).text()).to.equal('CAS');
                    expect(title.eq(5).text()).to.equal('EC');
                    expect(title.eq(6).text()).to.equal('MITI');
                    expect(title.eq(7).text()).to.equal('KE');
                    expect(title.eq(8).text()).to.equal(
                        'Country of Regulation',
                    );
                    expect(title.eq(9).text()).to.equal('According to');
                    expect(title.eq(10).text()).to.equal('List of Substances');
                    expect(title.eq(11).text()).to.equal('All');
                    expect(title.eq(12).text()).to.equal(
                        'Substances of Very High Concern (SVHC)',
                    );
                    expect(title.eq(13).text()).to.equal(
                        'Global Automotive Declarable Substance List (GADSL)',
                    );
                    expect(title.eq(14).text()).to.equal(
                        'Critical Raw Materials (CRM)',
                    );
                    expect(title.eq(15).text()).to.equal('Conflict Minerals');
                },
            );
            // check if the 1st 'All' radiobuttons is selected as default
            ComplianceAssessor.getDefaultRadioButton(0, 0).should('be.true');
            // check if the 1st 'All' radiobuttons form List of Substances is selected as default
            ComplianceAssessor.getDefaultRadioButtonListOfSubstances(1).should(
                'be.true',
            );
            // Verify if condition filters (Substances group, Country of Regulation, According to) are selected "all" by default`
            ConditionSelectorHeaders.getSelectedOptionInDdl().each(
                ($status) => {
                    const textContent = $status.text();
                    expect(textContent).to.contain('All');
                },
            );
        });
        it('Compliance Substance search- Substance Name search field enter `Fe`, perform the search, All radio buttons al selected by default, it should show some results', () => {
            ComplianceAssessor.enterSubstanceName('Fe');
            ComplianceAssessor.getDefaultRadioButton(0, 0).should('be.true');
            ComplianceAssessor.getDefaultRadioButtonListOfSubstances(1).should(
                'be.true',
            );
            // get unique FE by CAS num
            ComplianceAssessor.enterSubstanceNumber('7439-89-6');
            CommonSearch.clickSearchButton();
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Substance Name: Fe )  AND  (  Substance Number: 7439-89-6 ) ',
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Substance Name');
                expect(headerTitles).contain('Synonym');
                expect(headerTitles).contain('CAS Number');
                expect(headerTitles).contain('EC Number');
                expect(headerTitles).contain('MITI Number');
            });
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.contain('Result(s) found:');
            });
            // });
            // it('Compliance Substance search-click on 1st substance from the list, it should lead you to Substances page for selected material', () => {
            cy.step(
                'Compliance Substance search-click on 1st substance from the list, it should lead you to Substances page for selected material',
            );
            const defaultHeaders = ['Status', 'According to', ''];
            // TODO find FE with pagination

            ListOfMaterials.clickColumnFromRowByIndex(0, 'designation');
            ConditionSelectorHeaders.getTitle().should('equal', 'Substances');
            SearchSuppliers.colorOfSelectedSupplierTab('Substances').then(
                (background) => {
                    expect(background).to.equal(color.greenLight);
                },
            );
            MaterialInfo.findMaterialInfoType(' Substance Name ');
            MaterialInfo.findMaterialInfoValue('Fe');
            ComplianceAssessor.getColumnHeadersOptionThree().then(
                (curentHeaders) => {
                    cy.Compare_Arrays(curentHeaders, defaultHeaders);
                },
            );
            // });
            // it('Compliance Substance search-turn back to Substances search page, is should be still in Substance Name search box', () => {
            cy.step(
                'Compliance Substance search-turn back to Substances search page, is should be still in Substance Name search box',
            );
            TabButtons.clickOnTheTabs('Substances');
            SearchSuppliers.colorOfSelectedSupplierTab('Substances').then(
                (background) => {
                    expect(background).to.equal(color.greenLight);
                },
            );
            ConditionSelectorHeaders.getSearchCriteriaBox().should(
                'equal',
                'Selected search criteria (  Substance Name: Fe )  AND  (  Substance Number: 7439-89-6 ) ',
            );
        });

        it(
            'Compliance Substance search-in List of Substances switch from All to Substances of Very High Concern(SVHC) radio button,' +
                ' second All button is still selected by default, in Substance Name field enter-Bis(2-methoxyethyl) phthalate, and perform the search again, ' +
                ' click on searched substance from the list and check on Inventory Lists tab/ property table in Status column if there is SVHC',
            () => {
                ComplianceAssessor.enterSubstanceName(
                    'Bis(2-methoxyethyl) phthalate',
                );
                ComplianceAssessor.getDefaultRadioButton(0, 0).should(
                    'be.true',
                );
                ComplianceAssessor.clickOnRadioButtonListOfSubstances(2);
                ComplianceAssessor.colorOfSelectedRadioButtonSubstances(
                    'Substances of Very High Concern (SVHC)',
                ).should('have.css', 'color', 'rgb(109, 169, 47)');
                cy.wait(1000);
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Substance Name: Bis(2-methoxyethyl) phthalate )  AND  (  List of Substances: Substances of Very High Concern (SVHC) ) ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Substance Name');
                    expect(headerTitles).contain('Synonym');
                    expect(headerTitles).contain('CAS Number');
                    expect(headerTitles).contain('EC Number');
                    expect(headerTitles).contain('MITI Number');
                });
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                cy.wait(800);
                ListOfMaterials.clickColumnFromRowByIndex(0, 'designation');
                cy.wait(1000);
                PropertyTable.findSubstancePropertyByText(
                    'ListedSVHC and included in the candidate list for authorisation; Date of inclusion: 19/12/2011; Concentration: ≤ 0.1 %',
                );
            },
        );
        it(
            'Compliance Substance search, turn back to Substances search page and in List of Substances switch to radio button, switch to GADSL button' +
                ' second All button is still selected by default, in Substance Name field enter-Perfluorononan-1-oic-acid and perform the search again, ' +
                ' click on 1st searched substance from the list and check if GADSL tab is visible and selected by default',
            () => {
                TabButtons.clickOnTheTabs('Substances');
                ComplianceAssessor.enterSubstanceName(
                    'Perfluorononan-1-oic-acid',
                );
                ComplianceAssessor.getDefaultRadioButton(0, 0).should(
                    'be.true',
                );
                ComplianceAssessor.clickOnRadioButtonListOfSubstances(3);
                ComplianceAssessor.colorOfSelectedRadioButtonSubstances(
                    'GADSL',
                ).should('have.css', 'color', 'rgb(109, 169, 47)');
                cy.wait(1000);
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Substance Name: Perfluorononan-1-oic-acid )  AND  (  List of Substances: Global Automotive Declarable Substance List (GADSL) ) ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Substance Name');
                    expect(headerTitles).contain('Synonym');
                    expect(headerTitles).contain('CAS Number');
                    expect(headerTitles).contain('EC Number');
                    expect(headerTitles).contain('MITI Number');
                });
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                cy.wait(1000);
                ListOfMaterials.clickColumnFromRowByIndex(0, 'designation');
                TabButtons.colorOfSelectedTabButton('GADSL').should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
            },
        );
        it(
            'Compliance Substance search-, turn back to Substances search page and in List of Substances switch to radio button, switch to CRM button' +
                ' second All button is still selected by default, in Substance Name field enter-Sc and perform the search again, ' +
                ' click on searched substance from the list and check if GADSL tab is visible and selected by default',
            () => {
                TabButtons.clickOnTheTabs('Substances');
                ComplianceAssessor.enterSubstanceName('Sc');
                ComplianceAssessor.getDefaultRadioButton(0, 0).should(
                    'be.true',
                );
                ComplianceAssessor.clickOnRadioButtonListOfSubstances(4);
                ComplianceAssessor.colorOfSelectedRadioButtonSubstances(
                    'Critical Raw Materials (CRM)',
                ).should('have.css', 'color', 'rgb(109, 169, 47)');
                cy.wait(1000);
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Substance Name: Sc )  AND  (  List of Substances: Critical Raw Materials (CRM) ) ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Substance Name');
                    expect(headerTitles).contain('Synonym');
                    expect(headerTitles).contain('CAS Number');
                    expect(headerTitles).contain('EC Number');
                    expect(headerTitles).contain('MITI Number');
                });
                cy.wait(1000);
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickColumnFromRowByIndex(0, 'designation');
                TabButtons.colorOfSelectedTabButton(
                    'CRM and Conflict Minerals',
                ).should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
            },
        );
        it(
            'Compliance Substance search-, turn back to Substances search page and in List of Substances switch to radio button, switch to Conflict Mineras button' +
                ' second All button is still selected by default, in Substance Name field enter-Au and perform the search again, ' +
                ' click on searched substance from the list and check if Conflict Minerals tab is visible and selected by default',
            () => {
                TabButtons.clickOnTheTabs('Substances');
                cy.wait(1000);
                ComplianceAssessor.enterSubstanceName('Au');
                ComplianceAssessor.getDefaultRadioButton(0, 0).should(
                    'be.true',
                );
                ComplianceAssessor.clickOnRadioButtonListOfSubstances(5);
                ComplianceAssessor.colorOfSelectedRadioButtonSubstances(
                    'Conflict Minerals',
                ).should('have.css', 'color', 'rgb(109, 169, 47)');
                cy.wait(1000);
                CommonSearch.clickSearchButton();
                cy.wait(1000);
                ConditionSelectorHeaders.getSearchCriteriaBox().should(
                    'equal',
                    'Selected search criteria (  Substance Name: Au )  AND  (  List of Substances: Conflict Minerals ) ',
                );
                ListOfMaterials.getTableHeaders().then((headerValues) => {
                    const headerTitles = headerValues.text();
                    expect(headerTitles).contain('Substance Name');
                    expect(headerTitles).contain('Synonym');
                    expect(headerTitles).contain('CAS Number');
                    expect(headerTitles).contain('EC Number');
                    expect(headerTitles).contain('MITI Number');
                });
                cy.wait(1000);
                ListOfMaterials.getListOfResultsFound().then((results) => {
                    expect(results).to.contain('Result(s) found:');
                });
                ListOfMaterials.clickColumnFromRowByIndex(0, 'designation');
                TabButtons.colorOfSelectedTabButton(
                    'CRM and Conflict Minerals',
                ).should(
                    'have.css',
                    'background',
                    'rgb(223, 241, 232) none repeat scroll 0% 0% / auto padding-box border-box',
                );
            },
        );
    },
);
