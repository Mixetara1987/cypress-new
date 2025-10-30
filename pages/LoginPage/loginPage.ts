/// <reference types="cypress" />

import { TotalSearchHomePage } from '@/HelpersMethods/totalSearchHomePage';
import { CommonSearch } from '@/CommonMethods/CommonSearch';

export class LoginPage {
    static loginUser(loginUrl: string, username: string, password: string) {
        cy.login(loginUrl, username, password);
        cy.url().should('include', '/');
        TotalSearchHomePage.clickOnTotalSearch();
        CommonSearch.getMaterialDesignation().should('be.visible');
        CommonSearch.getMaterialTypeDDL().should('be.visible');
        CommonSearch.getMaterialGroupDDL().should('be.visible');
        CommonSearch.getStandardDDL().should('be.visible');
        CommonSearch.getProducer().should('be.visible');
    }
}

export default new LoginPage();
