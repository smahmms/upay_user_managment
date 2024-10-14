import { BdDivisionModel, BdDistrictModel, BdThanaModel } from '../../models';
import { BDDIVISION_REPO, BDDISTRICT_REPO, BDTHANA_REPO } from '../../config/constants';

export const bdAddressProviders = [{
    provide: BDDIVISION_REPO,
    useValue: BdDivisionModel,
},{
    provide: BDDISTRICT_REPO,
    useValue: BdDistrictModel,
},{
    provide: BDTHANA_REPO,
    useValue: BdThanaModel,
}];