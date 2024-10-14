import { Test, TestingModule } from '@nestjs/testing';
import { BdAddressController } from './bd-address.controller';

describe('BdAddressController', () => {
  let controller: BdAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BdAddressController],
    }).compile();

    controller = module.get<BdAddressController>(BdAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
