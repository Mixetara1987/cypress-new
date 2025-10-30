export class FractureMechanicsDiagram {
    static getTitleOnX() {
        return cy.get('g.g-xtitle').invoke('text');
    }

    static getTitleOnY() {
        return cy.get('g.g-ytitle').invoke('text');
    }
}
export default new FractureMechanicsDiagram();
