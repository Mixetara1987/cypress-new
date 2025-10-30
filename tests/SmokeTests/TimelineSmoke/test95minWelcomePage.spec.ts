import { color } from 'cypress/fixtures/color';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { ConditionSelectorHeaders } from '@/CommonMethods/conditionSelectorHeaders';
import { RightMenu } from '@/CommonMethods/rightMenu';
import { TabButtons } from '@/CommonMethods/tabButtons';
import { FavoriteMaterials } from '@/HelpersMethods/FavoriteMaterials';
import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { NewPAge } from '@/HelpersMethods/NewPage';
import { OldPAge } from '@/HelpersMethods/OldPage';
import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { LoginPage } from '@/LoginPage/loginPage';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { WelcomePage } from '@/WelcomePage';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    'Smoke test 95 min, Welcome page',
    { tags: ['@smoke', '@welcomePage'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });

        it('Go to Welcome page, check weclome text for user, check 3 boxes(Message,Saved searches and Favorites), check analytics boxes, check Resource Hubs tabs(Products, Recordings, Guided Tours) with images', () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            WelcomePage.getDashboardContent().should(
                'equal',
                'Welcome Mihajlo Lazovic',
            );
            // check message box titles
            WelcomePage.getBoxTitle().then((title) => {
                expect(title.eq(0).text()).to.equal('Message');
                expect(title.eq(1).text()).to.equal('Saved Searches');
                expect(title.eq(2).text()).to.equal('Favorites');
            });
            // check date for expiring subscription and link to go to the old site
            WelcomePage.tabMessage().should(
                'equal',
                'Subscription expires: 12/31/2100 (mm/dd/yy)',
            );
            // check analytics boxes
            WelcomePage.getDashboardAnalyticContent().then((text) => {
                expect(text.eq(0).text()).to.equal('Number ofMaterials');
                expect(text.eq(1).text()).to.equal('Standard organizations');
                expect(text.eq(2).text()).to.equal('Data Sources');
                expect(text.eq(3).text()).to.equal(' DATA POINTS ');
            });
            // Check Resource Hub, all 3 tabs(Upocming Webinars, Recordings, Guided Tours), is all images displayed
            WelcomePage.getResourceHubTitle().should('equal', 'Resource Hub');
            WelcomePage.getResourceHubTabTitles().then((title) => {
                expect(title.eq(0).text()).to.equal('Products');
                expect(title.eq(1).text()).to.equal('Recordings');
                expect(title.eq(2).text()).to.equal('Guided tours');
            });
            TabButtons.colorOfSelectedResourceHubWelcomePage('Products').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.seablue);
                },
            );
            // check if images for Resource Hub are visible
            WelcomePage.getImageIsDisplayedOptionTwo().should('be.visible');
            cy.wait(5000);
        });
        it('Welcome Page-click on the 2nd box(Saved Searches), list of links should be displayed', () => {
            // Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            cy.wait(1000);
            TabButtons.clickOnWelcomePageTAb('Saved Searches');
            TabButtons.colorOfSelectedBoxWelcomePage('Saved Searches')
                .should('have.css', 'background')
                .and('include', color.seablue);
            cy.wait(1000);
            WelcomePage.getListOfLinks().should('be.visible');
        });
        it('Welcome Page-on the 2nd box(Saved Searches), click on the link `more` on the bottom of the tab, it should lead you to My ConsoleSaved Searches tab, check if the list is visible', () => {
            cy.wait(2000);
            TabButtons.clickOnWelcomePageTAb('Saved Searches');
            WelcomePage.clickOnSavedSearchesMorelink('more');
            MaterialConsole.colorOfSelectedTab('Saved Searches').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.purpleConsole);
                },
            );
            ListOfMaterials.getTableHeaders().then((headerValues) => {
                const headerTitles = headerValues.text();
                expect(headerTitles).contain('Title');
                expect(headerTitles).contain('Search type');
                expect(headerTitles).contain('Created date');
            });
        });
        it('Welcome Page-turn back to Home page, Message box should be selected by default', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            TabButtons.colorOfSelectedBoxWelcomePage('Message')
                .should('have.css', 'background')
                .and('include', color.seablue);
        });
        it('Welcome Page-switch to Favorites box, click on 1st link from the list, it should lead you to Mechanical Properties page for this favorite material and check if material is marked as favorite', () => {
            cy.wait(1000);
            TabButtons.clickOnWelcomePageTAb('Favorites');
            TabButtons.colorOfSelectedBoxWelcomePage('Favorites')
                .should('have.css', 'background')
                .and('include', color.seablue);

            WelcomePage.getListOfLinks().should('be.visible');
            cy.wait(1000);
            WelcomePage.clickOnSavedSearcheslink(
                'A 1011 HSLAS Grade 70 Class 1',
            );
            ConditionSelectorHeaders.getTitleOfMaterial().should(
                'equal',
                'A 1011 HSLAS Grade 70 Class 1',
            );
            RightMenu.colorORightMenuModuleLinks(
                ' Mechanical Properties ',
            ).should('have.css', 'background-color', color.seablue);
            FavoriteMaterials.colorOfFavoriteMaterial().should(
                'have.css',
                'color',
                color.yellowFavourite,
            );
        });
        it('Welcome Page-click on Total Search menu button again, Message box should be selected by default and Products in Resource Hub, check also images for this tab', () => {
            TotalSearchHomePage.clickOnTotalSearch();
            cy.wait(1000);
            TabButtons.colorOfSelectedBoxWelcomePage('Message')
                .should('have.css', 'background')
                .and('include', color.seablue);
            TabButtons.colorOfSelectedResourceHubWelcomePage('Products').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.seablue);
                },
            );
            WelcomePage.getTextInsideOfProductsPicture(0, 'horizon');
            WelcomePage.getTextInsideOfProductsPicture(1, 'integrator');
            WelcomePage.getTextInsideOfProductsPicture(2, 'predictor');
            WelcomePage.getTextInsideOfProductsPicture(3, 'green-line');
        });
        it('Welcome Page-switch to Recordings tab in Resoruce Hub, images should also be displayed for this tab', () => {
            // Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            cy.wait(1000);
            TabButtons.clickOnWelcomePageTAb('Recordings');
            TabButtons.colorOfSelectedResourceHubWelcomePage('Recordings').then(
                (backgroundColor) => {
                    expect(backgroundColor).to.equal(color.seablue);
                },
            );
            WelcomePage.getTextInsideOfPicture(0).should(
                'include',
                'New Interface\r',
            );
            WelcomePage.getTextInsideOfPicture(1).should(
                'include',
                'Nueva Interfaz de Total Materia\r',
            );
            WelcomePage.getTextInsideOfPicture(2).should(
                'include',
                'Total Materia come soluzione\r',
            );
            WelcomePage.getTextInsideOfPicture(3).should(
                'include',
                'Total Materia\r',
            );
        });
        xit('Welcome Page-click on 2nd image from the list on Recordings tab, it should download zipped webinar file', () => {
            Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            WelcomePage.clickOnWebinarPicture(1).should(
                'have.class',
                'webinar-box-wrapper',
            );
        });
        it('Welcome Page-switch to Guided tours tab in Resoruce Hub, images should also be displayed for this tab', () => {
            // Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            TabButtons.clickOnWelcomePageTAb('Guided tours');
            TabButtons.colorOfSelectedResourceHubWelcomePage(
                'Guided tours',
            ).then((backgroundColor) => {
                expect(backgroundColor).to.equal(color.seablue);
            });
            WelcomePage.getTextInsideOfPicture(0).should(
                'include',
                'Chemical Composition\r',
            );
            WelcomePage.getTextInsideOfPicture(1).should(
                'include',
                'Mechanical Properties\r',
            );
            WelcomePage.getTextInsideOfPicture(2).should(
                'include',
                'Stress Strain\r',
            );
            WelcomePage.getTextInsideOfPicture(3).should(
                'include',
                'Cross-Reference Table\r',
            );
        });
        xit('Welcome Page-click on 4th image(Cross ref Table) on Guided Tours tab, it should open a video player and play the video, on the video player for Guided Tour-Cross Reff should be linked text`See all Guided Tours`, click on it, it should lead you to new page with list of videos(Guided Tour Library)', () => {
            // Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
            WelcomePage.clickOnWebinarPicture(3).should(
                'have.class',
                'webinar-box-wrapper',
            );
            WelcomePage.clickListOfVideos(0);
            WelcomePage.checkGuidedTourHeadTitle().should(
                'equal',
                'Guided Tour - Cross-Reference Table',
            );
            WelcomePage.showPlayerWindow().should('be.visible');
            cy.wait(1000);
            // Welcome Page-on the video player for Guided Tour-Cross Reff should be linked text`See all Guided Tours`, click on it
            WelcomePage.clickOnGuidesToursLink('See all Guided Tours').should(
                'be.visible',
            );
            cy.visit(
                'http://www.totalmat.pri/GuidedTour/en/GuidedTourLibrary.html',
            );
            NewPAge.checkTitleOnTheNewPageForGuidedTour().should(
                'contain',
                'Guided Tour Library',
            );
        });
        xit('Welcome Page-try to click on link `Click here to go back` to go on the old site', () => {
            cy.wait(1000);
            WelcomePage.clickOnLink('Click here to go back');
            OldPAge.checkTryForFreeButtonOnOldSite(1).should(
                'contain',
                'Try for free',
            );
        });
        it('Welcome Page-Try to change to Italian language, and Italian language should be seen', () => {
            cy.intercept('GET', '**/labels/it').as('languageIT');
            WelcomePage.selectLanguage('Italiano');
            cy.wait('@languageIT', { timeout: 20000 }).then(() => {
                WelcomePage.getDashboardContent().should(
                    'equal',
                    'Benvenuto Mihajlo Lazovic',
                );
            });

            cy.wait(3000);

            const searchedMaterial = '1100';
            CommonSearch.enterMaterialDesignation(searchedMaterial);
            CommonSearch.clickSearchButton();
            ListOfMaterials.getListOfResultsFound().then((results) => {
                expect(results).to.include('Risultati trovati: ');
            });

            cy.step(
                'Welcome Page-check for the text above the list of materials(link for possible matches), click on the linked message(click here), it should lead you to Quick search page(Riverca Base)',
            );
            ListOfMaterials.getMessageForPossibleMaches().should(
                'equal',
                'Si stanno visualizzando i risultati in base alla designazione del materiale cercato ( esatta o che inizia con).Per visualizzare ulteriori corrispondenze,  cliccare qui.',
            );
            ListOfMaterials.clickOnLinkedMessage(' cliccare qui.');
            ConditionSelectorHeaders.getTitle().should('equal', 'Ricerca Base');

            // back to English language
            cy.intercept('GET', '**/labels/en').as('languageEN');
            WelcomePage.selectLanguage('English');
            cy.wait('@languageEN').then(() => {
                WelcomePage.getDashboardContent().should(
                    'equal',
                    'Welcome Mihajlo Lazovic',
                );
            });
        });
    },
);
