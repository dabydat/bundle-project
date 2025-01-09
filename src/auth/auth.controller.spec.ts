import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            authenticate: jest.fn(),
            refreshToken: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login successfully', async () => {
    const input = { username: 'test', password: 'password' };
    const result = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      userId: 1,
      username: 'test',
    };

    jest.spyOn(authService, 'authenticate').mockResolvedValue(result);

    expect(await controller.login(input)).toEqual(result);
  });

  it('should refresh token successfully', async () => {
    const input = { token: 'refresh-token' };
    const result = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
      userId: 1,
      username: 'test',
    };

    jest.spyOn(authService, 'refreshToken').mockResolvedValue(result);

    expect(await controller.refreshToken(input)).toEqual(result);
  });

  it('should get user info successfully', async () => {
    const request = {
      user: {
        userId: 1,
        username: 'test',
      },
    };

    const result = {
      message: 'You are authenticated as user',
      user: request.user,
    };

    expect(controller.getUserInfo(request)).toEqual(result);
  });
});
