// type NormalizeCypressCommand<TFun> = TFun extends (
//   subject: infer TSubject,
//   ...args: infer TArgs
// ) => Promise<infer TReturn>
//   ? (...args: TArgs) => Cypress.Chainable<TReturn>
//   : TFun;

// type NormalizeNonSubjectCypressCommand<TFun> = TFun extends (
//   ...args: infer TArgs
// ) => Promise<infer TReturn>
//   ? (...args: TArgs) => Cypress.Chainable<TReturn>
//   : TFun;

declare namespace Cypress {
    interface Chainable {
        /**
         * Command to explain the step in the console,
         * when the test fails,
         * the step after which the error occurred is displayed.
         * @example for step: CorrosionHome.navigateToEnviroCorrosion();
         *
         * cy.step('Go to Enviro Corrosion');
         * CorrosionHome.navigateToEnviroCorrosion();
         * --------------------------------------------------------------------------------
         * 'Check temperature value in a placeholder for DDL "Temperature"'
         *
         *  cy.step('Check temperature value in a placeholder for DDL "Temperature"');
         *  CorrosionHome.getSelectedTextInDDL('Temperature').should('equal', '< 30°C');
         *  'In the console we have:'
         *  ' AssertionError: Context: Enviro - Corrosion - test material XXXXX -'
         *   Test: After perform search, all search criteria are stored for future use when user back to appropriate search.
         *   ----------
         *   Timed out retrying after 20000ms: expected '×< 30°C××' to equal '×< 30°C×× '
         *
         *   Last steps:
         *   1. Check temperature value in a placeholder for DDL "Temperature"
         *
         *   + expected - actual
         *
         *   -'< 30°C'
         *   +'< 30°C '
         *
         *   AssertionError: Timed out retrying after 20000ms: expected '×< 30°C××' to equal '×< 30°C×× ''
         */
        // eslint-disable-next-line no-undef
        step(value: string): Chainable<Element>;

        /**
    *Compare_Results(Current results vs Expected results)
    * @example
    * it('Verify numbers of conditions ( CONDITIONS (200/10145)) ', () => {
        // ConditionsSelectorDetailsView.getNumbersOfConditions().should('eq', 'Conditions (200/10145)'); // 10158 2.3.22...10145 27.06.2022...10145 27.08.2022
        const expectedNumberOfConditions = '10145';
        ConditionsSelectorDetailsView.getNumbersOfConditions().then(numberumberOfconditions => {
            const validNumberOfconditions = (numberumberOfconditions.split('/')[1])
            cy.Compare_Results(validNumberOfconditions, expectedNumberOfConditions);
        });
    });
    */
        Compare_Results(
            currentResult: string,
            expectedResult: string,
        ): Chainable<boolean>;

        compareResultsWithDeviation(
            currentResult: string,
            expectedResult: string,
            deviation: number,
        ): Chainable<boolean>;
        /**
        *Compare_Price(Current Price vs Expected Price)
        * @example
        * cy.step('Get indicative price');
        const expectedPriceEuro = '3.88';
        MaterialDetails.getCurency().then(currentPriceEuro => { // 3.88 ± 0.92
            cy.Compare_Price(currentPriceEuro.text().split('±')[0], expectedPriceEuro);
        });
        */
        Compare_Price(
            currentPrice: string,
            expectedPrice: string,
        ): Chainable<boolean>;
        /**
     * Compare_Arrays(Current Array vs Expected Array).
    The difference between the two arrays.
    @example
    it('Check for the title "Extended Range - Fatigue Data" and for titles of filters' +
        '( Material Designation, Standard, Producer, Type, Material group, Heat Treatment, Form, Type )', () => {
           const expectedTittlesAboweFilters = ['Material Designation', 'Standard', 'Producer', 'Type', 'Material group', 'Heat Treatment', 'Form'];
            ExtendedRangeSearchFilter.getTitleExtendedRange().should('eq', ' Extended Range Fatigue Data');
            ExtendedRangeSearchFilter.getTitlesAboveFilters().then(currentTitlesAboweFilters => {
                cy.Compare_Arrays(currentTitlesAboweFilters, expectedTittlesAboweFilters);
            });
        });
     */
        Compare_Arrays(
            arrCurrent: string[],
            arrExpected: string[],
        ): Chainable<boolean>;

        login(
            loginUrl: string,
            username: string,
            password: string,
        ): Chainable<string>;

        // saveLocalStorage()

        // restoreLocalStorage()

        // saveSessionStorage()

        // restoreSessionStorage()

        // clearDataInStorage()

        // /**
        //  *
        //  * @example
        //  * cy.get("tooltip").realHover();
        //  * @param options hover options...
        //  */
        // realHover: NormalizeCypressCommand<
        //   typeof import('./realHover').realHover
        // >;

        // /**
        // *
        // * @example
        // * cy.get("button").realClick();
        // * @param options click options...
        // */
        // realClick: NormalizeCypressCommand<
        //   typeof import('./realClick').realClick
        // >;
        // /**
        //   * @example
        //   * cy.realPress("K")
        //   * @param key key to type.
        //   * @param options press options
        //   */
        // realPress: NormalizeNonSubjectCypressCommand<
        //   typeof import("./realPress").realPress
        // >;
        // /**
        //  *
        //  * @example
        //  * cy.realType("text {enter}")
        //  * @param text text to type.
        //  */
        // realType: NormalizeNonSubjectCypressCommand<
        //   typeof import("./realType").realType
        // >;
    }
}
