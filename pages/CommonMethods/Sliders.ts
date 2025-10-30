export class Sliders {
    static clickOnDirectDataOnlySlider() {
        return cy
            .get('.column-4')
            .find('.search-switches')
            .find('.tm-switch')
            .find('.tm-switch-thumb')
            .click();
    }

    static IsOnDirectDataOnlySliderVisible() {
        return cy
            .get('.column-4')
            .find('.search-switches')
            .find('.tm-switch')
            .find('.tm-switch-thumb');
    }

    static ClickOnGLSlider() {
        cy.get('.view-switcher').find('label').eq(1).click();
    }
}
export default new Sliders();
