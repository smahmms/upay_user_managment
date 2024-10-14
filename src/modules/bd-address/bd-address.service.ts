import { Injectable, Inject } from '@nestjs/common';
import { BdDivisionModel, BdDistrictModel, BdThanaModel } from '../../models';
import { BDDIVISION_REPO, BDDISTRICT_REPO, BDTHANA_REPO } from '../../config/constants';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class BdAddressService {
    constructor(
        @Inject(BDDIVISION_REPO) private readonly divisionRepo: typeof BdDivisionModel,
        @Inject(BDDISTRICT_REPO) private readonly districtRepo: typeof BdDistrictModel,
        @Inject(BDTHANA_REPO) private readonly thanaRepo: typeof BdThanaModel
    ) { }

    async list() {

        const bdaddresslist = await this.divisionRepo.findAll({
            include :[{ 
                model : BdDistrictModel,
                include :[{ model : BdThanaModel }]
            }],
            order : Sequelize.literal(' "BdDivisionModel"."name" ASC, "districts"."name" ASC, "districts->thana"."name" ASC')
        })

        return  bdaddresslist

    }
}
