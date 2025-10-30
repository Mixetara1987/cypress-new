/// <reference types="cypress" />

export class CreepDataHome {
    static clickOnCreepData() {
        cy.contains('.nav-item', 'Creep Data').click();
    }
}
export default new CreepDataHome();
