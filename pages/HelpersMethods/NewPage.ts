export class NewPAge {
    static checkTitleOnTheNewPageForGuidedTour() {
        return cy.get('body').get('title').invoke('text');
    }

    static checkTitleOnNewRegistrationPageForWebinar() {
        return (
            cy
                .get('#header')
                // .get('h1')
                .invoke('text')
        );
    }
}
export default new NewPAge();
