import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findUserByName: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should authenticate successfully', async () => {
    const input = { username: 'test', password: 'password' };
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
      deleted_at: new Date(),
    };
    const signInData = { userId: 1, username: 'test' };
    const accessToken = 'access-token';
    const refreshToken = 'refresh-token';

    jest.spyOn(usersService, 'findUserByName').mockResolvedValue(user);
    jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValueOnce(accessToken) // First call returns accessToken
      .mockResolvedValueOnce(refreshToken); // Second call returns refreshToken

    const result = await service.authenticate(input);

    expect(result).toEqual({
      accessToken,
      refreshToken,
      userId: signInData.userId,
      username: signInData.username,
    });
  });

  it('should throw UnauthorizedException for invalid credentials', async () => {
    const input = { username: 'test', password: 'wrong-password' };

    jest.spyOn(usersService, 'findUserByName').mockResolvedValue(null);

    await expect(service.authenticate(input)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
