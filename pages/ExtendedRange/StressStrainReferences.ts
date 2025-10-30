export class StressStrainReferences {
    static getTitleForReferences(index: number) {
        return cy
            .get('.reference-list-wrapper.selected-list')
            .find('h4')
            .eq(index)
            .invoke('text');
    }
}
export default new StressStrainReferences();
