export class FractureMechanicsReferencesText {
    static getReferenceForSelectedMaterialTitle() {
        return cy
            .get('app-selected-references')
            .find('.reference-list-title')
            .eq(0)
            .invoke('text');
    }

    static getReferenceForSelectedMaterialText() {
        return cy
            .get('app-selected-references')
            .find('.reference-list')
            .find('.reference-list-text')
            .invoke('text');
    }

    static getAllReferenceForSelectedMaterialTitle() {
        return cy
            .get('app-material-references')
            .find('.reference-list-title')
            .invoke('text');
    }

    static getAllReferenceForSelectedMaterialText() {
        return cy
            .get('app-material-references')
            .find('.reference-list')
            .find('.reference-list-text')
            .invoke('text');
    }
}
export default new FractureMechanicsReferencesText();
