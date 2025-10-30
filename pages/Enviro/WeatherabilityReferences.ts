export class WeatherabilityReferences {
    static getTitleForReferences() {
        return cy.get('.reference-list-wrapper').find('h4').invoke('text');
    }

    static getTextInReferences() {
        return cy
            .get('.reference-list')
            .get('.reference-list-item')
            .get('.reference-list-text')
            .invoke('text');
    }

    static getReferencesTitle() {
        return cy.get('.reference-list-wrapper').find('h4').invoke('text');
    }
}
export default new WeatherabilityReferences();
