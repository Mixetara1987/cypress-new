import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { ComparisonViewHome } from '@/ComparisonView/comparisonViewHome';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';

describe(
    'Smoke Test Material Console/MyConsole/Favorites',
    { tags: ['@smoke', '@myConsole'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it(`On the Quick search page, enter '11' in Material designation search field and perform the search, it should show more than 2000 results, mark all and add them to Material List Builder, go to Material List Builder page, select all materials from the list and clear the list`, () => {
            CommonSearch.enterMaterialDesignation('11');
            CommonSearch.clickSearchButton();
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Material');
                expect(headerTitles).contain('Standard');
                expect(headerTitles).contain('Country / Producer');
                expect(headerTitles).contain('Classification');
            });
            ListOfMaterials.showingFirst2000Message().then((message) => {
                expect(message).to.contain('List of results too large');
            });
            ListOfMaterials.clickOnCheckboxAll();
            ListOfMaterials.clickOnAddToMaterialListBuilder();
            TotalSearchHomePage.clickOnMaterialConsole();
            ListOfMaterials.getMaterialFromRowByIndex(9).then((material) => {
                expect(material).to.include('1,1');
            });
            cy.wait(2000);
            ListOfMaterials.clickOnCheckboxAll();
            ListOfMaterials.clickOnDelete();
            ComparisonViewHome.ClickOnYesInModal();
            MaterialConsole.getAlertNoItem().should(
                'eq',
                'No item in the Material ListYou can add items from material details page or from any material list.',
            );
            // });
            // it(`Go to My Console tab, it should automatically lead you to Favorites tab, click on 2nd material from the list A 1011 HSLAS Grade 70 Class 1, it should lead you to Mechanical Properties page for this material`, () => {
            cy.step(
                'Go to My Console tab, it should automatically lead you to Favorites tab, click on 2nd material from the list A 1011 HSLAS Grade 70 Class 1, it should lead you to Mechanical Properties page for this material',
            );
            TotalSearchHomePage.clickOnMyConsoleTab();
            MaterialConsole.colorOfSelectedTab('Favorites').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            ListOfMaterials.clickOnMaterialInListString(
                'A 1011 HSLAS Grade 70 Class 1',
            );
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                'A 1011 HSLAS Grade 70 Class 1',
            );
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
        });
    },
);
