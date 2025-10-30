import { MaterialDetails } from '@/MaterialDetails/materialDetailsPage';
import { MaterialInfo } from '@/MaterialInfo/MaterialInfo';
import { LoginPage } from '@/LoginPage/loginPage';
import { _7075_AA } from 'cypress/fixtures/materials';
import { Helpers } from '@/HelpersMethods/helpers';
import { ModuleURLs } from 'cypress/fixtures/modules';

describe(
    `Smoke test, check data inside Module cards test Material ${_7075_AA.name}`,
    { tags: ['@smoke', '@myConsole'] },
    () => {
        beforeEach(() => {
            LoginPage.loginUser(
                Cypress.env('environmentLoginUrl'),
                Cypress.env('username'),
                Cypress.env('password'),
            );
        });
        it('Go to material 7075 AA page, check for Module cards, Mechanical should be selected by default, then switch to rest of them(Physical properties, Cross Referencing, Tracker) and check for data', () => {
            Helpers.totalMateriaNavigateTo(
                ModuleURLs.Material.MechanicalProperties,
                _7075_AA.id,
            );
            MaterialInfo.getMaterialDetailsTab(0).should(
                'equal',
                'Mechanical Properties',
            );
            MaterialInfo.getMaterialDetailsTabBody(0).should(
                'equal',
                'Yield Strength, Rp0.2≥ 104.8 MPaTensile Strength≥ 230 MPaElongation, A≥ 1 %',
            );
            MaterialDetails.clickOnPhysicalPropertiesTab();
            MaterialInfo.getMaterialDetailsTabBody(1).should(
                'equal',
                'Modulus of Elasticity69 — 72.4 GPaDensity2.8 — 2.81 kg/dm³Poisson Coefficient0.33 — 0.333 ',
            );
            MaterialDetails.clickOnTrackerTab();
            MaterialInfo.getMaterialDetailsTabBody(2).should(
                'contain',
                '4Other',
            );
            MaterialDetails.clickOnCrossRefTab();
            MaterialInfo.getMaterialDetailsTabBody(3).should(
                'contain',
                'update',
            );
        });
    },
);
