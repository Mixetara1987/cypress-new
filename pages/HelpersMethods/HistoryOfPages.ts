export class HistoryOfPages {
    static mouseOverOnHistoryDots() {
        cy.get('.history-list-wrapper')
            .find('.btn.btn-link')
            .trigger('mouseenter')
            .find('.icon-keyboard_control.rounded');
    }
}
export default new HistoryOfPages();
