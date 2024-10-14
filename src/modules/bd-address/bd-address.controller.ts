import { Controller, Get } from '@nestjs/common';
import { BdAddressService} from './bd-address.service'

@Controller('bd-address')
export class BdAddressController {

    constructor(
        private bdAddressService: BdAddressService,
    ) {}

    @Get('/list')
    async list( ) {

        return await this.bdAddressService.list()
    }
}
