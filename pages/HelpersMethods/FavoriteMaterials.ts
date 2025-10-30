export class FavoriteMaterials {
    static checkIfMaterialIsSelected() {
        return cy.get('.favorites.star.pointer');
    }

    static colorOfFavoriteMaterial() {
        return cy.get('.favorites.star.pointer').find('.icon-star');
    }

    static clickOnAddToFavorite() {
        return cy
            .get('.module-split')
            .find('.module-split-content')
            .find('.module-split-content-info')
            .find('.material-title-wrapper')
            .find('.number-and-status-wrapper')
            .find('.favorites.star.pointer')
            .click();
    }

    static getAddToFAvoritesWindow() {
        return cy
            .get('.modal-content')
            .find('app-non-mmc-user-modal')
            .invoke('text');
    }
}
export default new FavoriteMaterials();
