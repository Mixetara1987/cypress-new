/// <reference types="cypress" />

export class TabButtons {
    static getButtonTitle(buttonIndex: number) {
        return cy.get('.tab-text').eq(buttonIndex).invoke('text');
    }

    static getNumberOnButton(button: string) {
        return cy
            .contains('.tab-text', button)
            .siblings('.tab-counter')
            .invoke('text');
    }

    static clickOnButton(buttonTitle: string) {
        cy.get('.tm-tab-button-wrapper')
            .contains('button', buttonTitle)
            .click();
    }

    static clickOnButtonLubricantsCompliance(buttonTitle: string) {
        cy.get('.tm-tab-button-wrapper')
            .find('.module-header')
            .contains('ul', buttonTitle)
            .click();
    }

    static clickOnButtonLubricantsComposition(buttonTitle: string) {
        cy.get('.tm-tab-button-wrapper')
            .find('.module-header')
            .contains('li', buttonTitle)
            .click();
    }

    // dodata
    static clickOnTab(nameOfTAb: string) {
        // cy.get('.tm-tab-selected');
        cy.contains('.tab-text', nameOfTAb).click();
    }

    static getSelectedTabCounter() {
        return cy
            .get('.tm-tab-selected')
            .find('.tab-counter-selected')
            .invoke('text');
    }

    static checkIfTabDisabled(nameOfTAb: string) {
        return cy.contains('.tm-tab', nameOfTAb);
    }

    static colorOfSelectedTabButton(nameOfTAb: string) {
        return cy.contains('.tab-text', nameOfTAb).parent('.tm-tab-selected');
    }

    static colorOfSelectedTabAgeing(nameOfTAb: string) {
        return cy
            .get('.module-header-list-item')
            .contains('a', nameOfTAb)
            .should('have.class', 'selected')
            .then(($tab) => {
                const computedStyle = window.getComputedStyle(
                    $tab[0],
                    '::after',
                );
                return computedStyle.getPropertyValue('background-color');
            });
    }

    static colorOfSelectedMainTab(tabName: string) {
        return cy
            .contains('submodule-navigation nav ul li a', tabName)
            .should('have.class', 'selected')
            .then(($tab) => {
                const computedStyle = window.getComputedStyle(
                    $tab[0],
                    '::after',
                );
                return computedStyle.getPropertyValue('background-color');
            });
    }

    static colorOfSelectedMaterialConsoleTab(tabName: string) {
        return cy
            .get('.nav-item')
            .contains('.nav-link', tabName)
            .should('have.class', 'selected')
            .then(($tab) => {
                const computedStyle = window.getComputedStyle(
                    $tab[0],
                    '::after',
                );
                return computedStyle.getPropertyValue('background-color');
            });
    }

    static clickOnWelcomePageTAb(nameOfTAb: string) {
        cy.get('.tm-boxed-tabs').should('be.visible');
        cy.contains('.nav-item', nameOfTAb).should('be.visible').click();
    }

    static clickOnTheTabs(link: string) {
        return cy
            .get('.navbar-nav')
            .find('.nav-item')
            .contains('a', `${link}`)
            .click();
    }

    static colorOfSelectedBoxWelcomePage(link: string) {
        return cy
            .get('#boxedTab')
            .find('.nav-item')
            .contains('a', `${link}`)
            .should('have.class', 'active');
    }

    static colorOfSelectedResourceHubWelcomePage(nameOfTAb: string) {
        return cy
            .get('#Tab')
            .find('.nav-item')
            .contains('a', nameOfTAb)
            .should('have.class', 'active')
            .then(($tab) => {
                const computedStyle = window.getComputedStyle(
                    $tab[0],
                    '::after',
                );
                return computedStyle.getPropertyValue('background-color');
            });
    }

    static clickOnComplianceTab(nameOfTAb: string) {
        cy.get('.navbar-nav').find('li').eq(0);
        cy.contains('.list-item', nameOfTAb).click();
    }

    static clickOnTheTabsOnAgeing(link: string) {
        return cy
            .get('.module-header.enviro')
            .find('ul')
            .find('li')
            .contains('a', link)
            .click();
    }

    // dodata
    static clickOnSendButton(nameOfTAb: string) {
        return cy.get('.btn').contains('.green-button', nameOfTAb).click();
    }

    static checkSendButton(nameOfTAb: string) {
        return cy.contains('form.ng-untouched > .btn', nameOfTAb);
    }

    static clickOnResourceHubTab(nameOfTAb: string) {
        return cy
            .get('.tm-tabs')
            .find('.tab-links-wrapper')
            .find('#Tab')
            .contains('li', nameOfTAb)
            .click();
    }

    static getTrackerTabData(index: number) {
        return cy
            .get('.module-split-content-tiles')
            .find('nav')
            .find('ul')
            .find('li')
            .eq(index)
            .invoke('text');
    }

    static colorOfSelectedTabLubricants(nameOfTAb: string) {
        return cy.get('.tm-tab-button-wrapper').contains('.tm-tab', nameOfTAb);
    }

    static colorOfSelectedSubTabLubricants(nameOfTAb: string) {
        return cy
            .get('.tm-tab-button-wrapper')
            .find('.module-header')
            .contains('ul', nameOfTAb);
        // return cy.get('.module-header-list')
        //  .contains('module-header-list-item')
    }

    static getTabCounter() {
        return cy
            .get('.tm-tab-button-wrapper')
            .find('.tab-counter-selected')
            .invoke('text');
    }
}
export default new TabButtons();
