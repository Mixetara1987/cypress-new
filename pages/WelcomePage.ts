export class WelcomePage {
    static getBoxTitle() {
        return cy
            .get('#boxedTab')
            .should('be.visible')
            .find('.nav-item')
            .find('span')
            .should('be.visible');
    }

    static tabMessage() {
        return cy.get('#boxedTabContent').find('.tab-pane').invoke('text');
    }

    static getDashboardContent() {
        return cy
            .get('.dashboard-content-user')
            .find('app-welcome-tab')
            .find('.dashboard-content-user-details')
            .find('h2')
            .invoke('text');
    }

    static getDashboardAnalyticContent() {
        return cy
            .get('.dashboard-content-analytics-holder')
            .should('be.visible')
            .find('.analytic-box')
            .should('be.visible')
            .find('.analytic-box-body');
    }

    static clickOnLink(link: string) {
        return cy
            .get('.load-more')
            .contains('a', `${link}`)
            .click({ force: true });
    }

    static clickOnVideoMessageLInk(link: string) {
        return cy.get('.message-video').contains('a', `${link}`).click();
    }

    static showPopUpWindow() {
        return cy.get('.modal-content');
    }

    static closePopUpWindow() {
        return cy.get('.modal-content').find('.close').click();
    }

    static getMessage(row: number) {
        return cy.get('.px-4.py-4').find('p').eq(row).invoke('text');
    }

    static showPlayerWindow() {
        return cy.get('.player-container');
    }

    static checkGuidedTourHeadTitle() {
        return cy
            .get('.player-container')
            .find('.player-container-header-title')
            .find('h2')
            .invoke('text');
    }

    static getListOfVideos(row: number) {
        return cy
            .get('.player-container')
            .find('.player-container-body')
            .find('.player-list')
            .find('ul')
            .last()
            .find('li')
            .eq(row)
            .find('p')
            .first()
            .invoke('text');
    }

    static clickListOfVideos(row: number) {
        return cy
            .get('.player-container')
            .find('.player-container-body')
            .find('.player-list')
            .find('ul')
            .find('li')
            .eq(row)
            .click();
    }

    static clickOnGuidesToursLink(link: string) {
        return cy
            .get('.player-list')
            .find('.guided-tours-div')
            .contains('a', `${link}`)
            .click();
    }

    static clickOnViewAllGuidedToursLink(link: string) {
        return (
            cy
                .get('.view-all-wrapper')
                // .find('.guided-tours-div')
                .contains('a', `${link}`)
                .click()
        );
    }

    static closePlayerWindow() {
        return cy.get('.player-container').find('.icon-clear').click();
    }

    static bottomRightButtons(index: number) {
        return cy.get('.player-menu').find('.player-btn').eq(index).click();
    }

    static enterTextInBox(textOfCondition: string) {
        cy.get('.form-group.mt-1')
            .find('[placeholder="Message"]')
            .type(textOfCondition);
    }

    static selectLanguage(name: string) {
        return cy
            .get('#language-selection')
            .click()
            .get('.dropdown-menu.show')
            .contains('.dropdown-item', name)
            .should('be.visible')
            .scrollIntoView()
            .click({ force: true });
    }

    static hoverTooltip(index: number, text: string) {
        cy.wait(1000);
        cy.get('.player-menu')
            // .find('.player-menu')
            .find('.player-btn')
            .eq(index)
            .realClick()
            .contains('.icon', text)
            .find('.icon-play_circle_outline')
            .click();
    }

    static getResourceHubTitle() {
        return cy.get('.resource-hub-wrapper').find('h2').invoke('text');
    }

    static getListOfLinks() {
        return cy.get('#boxedTabContent').find('.tab-pane');
    }

    static colorOfLInks(index: number) {
        return cy.get('.tab-pane').eq(index).get('.link-text');
    }

    static colorOfLInk() {
        return cy.get('.tab-pane').get('.load-more');
    }

    static getImageIsDisplayed(index: number) {
        return cy.get('.webinar-box').eq(index);
    }

    static getImageIsDisplayedOptionTwo() {
        return cy.get('.tab-content').find('.webinars').should('be.visible');
    }

    static clickOnWebinarPicture(numberOfPicture: number) {
        return cy.get('.webinar-box-wrapper').eq(numberOfPicture).click();
    }

    static getResourceHubTabTitles() {
        return cy
            .get('.tm-tabs')
            .should('be.visible')
            .find('.tab-links-wrapper')
            .find('.nav-item')
            .should('be.visible');
    }

    static getTextInsideOfPicture(index: number) {
        return cy
            .get('.tab-pane.active')
            .find('.webinar-box-content')
            .eq(index)
            .find('h3')
            .invoke('text');
    }

    static getTextInsideOfProductsPicture(index: number, name: string) {
        return cy
            .get('[role="tabpanel"] ul li a img')
            .eq(index)
            .invoke('attr', 'src')
            .then((srcUrl) => {
                expect(srcUrl).to.include(name);
            });
    }

    static clickOnSavedSearcheslink(link: string) {
        return cy.get('.saved-search').contains('a', `${link}`).click();
    }

    static clickOnSavedSearchesMorelink(link: string) {
        return cy
            .get('.tab-pane')
            .find('.load-more')
            .contains('a', `${link}`)
            .click();
    }

    static getTextFooter() {
        return cy.get('.footer-component').find('footer').invoke('text');
    }

    static clickOnTermsOfUseLink(link: string) {
        return cy
            .get('.footer-component')
            .find('footer')
            .find('.container')
            .find('.footer-text')
            .contains('a', `${link}`)
            .click();
    }
}
export default new WelcomePage();
