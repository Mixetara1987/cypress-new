/// <reference types="cypress" />

import { Helpers } from '@/HelpersMethods/helpers';

export class RightMenu {
    static clickOnRightMenuModuleLinks(link: string) {
        Helpers.waitForloaderIfLoaderExist();
        return cy
            .get('.module-split-aside material-overview')
            .find('ul li')
            .contains('a', `${link}`)
            .should('be.visible')
            .click();
    }

    static clickOnRightMenuPropertyByIndex(index: number) {
        return cy
            .get('.module-split-aside')
            .find('.overview-wrapper')
            .find('.list-wrapper')
            .find('ul')
            .get('li.overview-item')
            .get('.overview-link')
            .eq(index)
            .click();
    }

    static colorORightMenuModuleLinks(link: string) {
        return cy
            .get('.module-split-aside material-overview')
            .find('ul')
            .contains('li', `${link}`);
    }

    static colorORightMenuModuleLinksCompliance(link: string) {
        return cy
            .get('.module-split-aside')
            .find('.overview-wrapper')
            .find('.list-wrapper')
            .find('ul')
            .find('li')
            .contains('.overview-item.overview-color-compliance', `${link}`);
    }

    static TryToClickOnDisabledModuleLink(link: string) {
        return cy
            .get('.module-split-aside')
            .find('.overview-wrapper')
            .find('.list-wrapper')
            .find('ul')
            .find('li.overview-item')
            .contains('a.overview-link', `${link}`)
            .parent('li')
            .invoke('prop', 'value');
    }

    static getRightMenuModuleCounter(index: number) {
        return cy
            .get('.module-split-aside')
            .find('.overview-wrapper')
            .find('.list-wrapper')
            .find('ul')
            .get('li.overview-item')
            .get('.overview-number')
            .eq(index)
            .invoke('text');
    }

    static checkRightMenuModuleCounter(index: number) {
        return cy.get('.overview-number').eq(index);
    }

    static getRightMenuTitleOfModule(index: number) {
        return cy
            .get('.module-split-aside')
            .find('.overview-wrapper')
            .find('.list-wrapper')
            .find('ul')
            .get('li.overview-item')
            .get('a.overview-title')
            .eq(index)
            .invoke('text');
    }

    static getRightMenuTitleOfProperty(index: number) {
        return cy
            .get('.module-split-aside')
            .find('.overview-wrapper')
            .find('.list-wrapper')
            .find('ul')
            .get('li.overview-item')
            .get('.overview-link')
            .eq(index)
            .invoke('text');
    }

    static getNumberOfPropertiesForModule(module: string) {
        return cy
            .contains('a', module)
            .parent('li')
            .find('span')
            .invoke('text');
    }
}
export default new RightMenu();
