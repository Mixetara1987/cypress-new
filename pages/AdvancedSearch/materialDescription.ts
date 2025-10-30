export class MaterialDescription {
    static getDataTextInRow(condition: string) {
        return cy
            .get('.material-description-table-wrapper')
            .find('.condition-data-row')
            .contains('.source-property', condition)
            .siblings('.source-value')
            .invoke('text');
    }

    static getDataTextInRowFirst(condition: string) {
        return cy
            .get('.material-description-table-wrapper')
            .find('.reference-row')
            .contains('.source-property', condition)
            .siblings('.source-value')
            .invoke('text');
    }
}
export default new MaterialDescription();
