import { Test, TestingModule } from '@nestjs/testing';
import { UserManagementController } from './role-management.controller';

describe('UserManagementController', () => {
  let controller: UserManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserManagementController],
    }).compile();

    controller = module.get<UserManagementController>(UserManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
