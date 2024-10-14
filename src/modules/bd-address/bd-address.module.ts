import { Module } from '@nestjs/common';
import { BdAddressService } from './bd-address.service';
import { BdAddressController } from './bd-address.controller';
import { bdAddressProviders } from './bd-address.providers'

@Module({
  providers: [BdAddressService, ...bdAddressProviders],
  controllers: [BdAddressController]
})
export class BdAddressModule {}
