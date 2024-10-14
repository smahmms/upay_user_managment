import { Test, TestingModule } from '@nestjs/testing';
import { BdAddressService } from './bd-address.service';

describe('BdAddressService', () => {
  let service: BdAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BdAddressService],
    }).compile();

    service = module.get<BdAddressService>(BdAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
