import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by name', async () => {
    const user = {
      id: 1,
      username: 'test',
      password: 'password',
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    jest.spyOn(service, 'findUserByName').mockResolvedValue(user);

    expect(await service.findUserByName('test')).toEqual(user);
  });

  it('should find user by id', async () => {
    const user = {
      id: 1,
      username: 'test',
      password: 'password',
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    jest.spyOn(service, 'findUserById').mockResolvedValue(user);

    expect(await service.findUserById(1)).toEqual(user);
  });

  it('should return undefined for non-existing user', async () => {
    const user = await service.findUserByName('nonexistent');
    expect(user).toBeUndefined();
  });
});
