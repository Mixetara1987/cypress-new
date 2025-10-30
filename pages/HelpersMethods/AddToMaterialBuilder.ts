/// <reference types="cypress" />

import { ListOfMaterials } from '@/HelpersMethods/ListOfMaterials';
import { MaterialConsole } from '@/MaterialConsole/materialConsole';
import { CommonSearch } from '@/CommonMethods/CommonSearch';
import { Helpers } from './helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

export class AddToMaterialBuilder {
    static addMaterials(material: string) {
        Helpers.totalMateriaNavigateTo(ModuleURLs.Main.QuickSearch);
        CommonSearch.enterMaterialDesignation(material);
        CommonSearch.clickSearchButton();
        ListOfMaterials.getResultsFound().then((resultInlist) => {
            const numberOfResults = resultInlist.text();
            expect(
                parseInt(numberOfResults.split(': ')[1], 10),
            ).to.be.greaterThan(0);
        });
        ListOfMaterials.clickOnMaterialCheckbox(0);
        ListOfMaterials.clickOnAddToMaterialListBuilder();
        MaterialConsole.closeGreenMessage();
    }
}
