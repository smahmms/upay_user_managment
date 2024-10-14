import { Test, TestingModule } from '@nestjs/testing';
import { RoleModuleMappingController } from './role-module-mapping.controller';

describe('RoleModuleMappingController', () => {
  let controller: RoleModuleMappingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleModuleMappingController],
    }).compile();

    controller = module.get<RoleModuleMappingController>(RoleModuleMappingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
