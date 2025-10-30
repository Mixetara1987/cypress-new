export class OldPAge {
    static checkTryForFreeButtonOnOldSite(index: number) {
        return cy
            .get('.carousel-inner')
            .get('.item.slider-item')
            .eq(index)
            .get('.big-light-blue-slider-btn')
            .invoke('text');
    }
}
export default new OldPAge();
