import { Test, TestingModule } from '@nestjs/testing';
import { RoleModuleMappingService } from './role-module-mapping.service';

describe('RoleModuleMappingService', () => {
  let service: RoleModuleMappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleModuleMappingService],
    }).compile();

    service = module.get<RoleModuleMappingService>(RoleModuleMappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
