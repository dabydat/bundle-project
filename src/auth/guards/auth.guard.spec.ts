import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true for valid token', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer valid.token',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    jest
      .spyOn(jwtService, 'verifyAsync')
      .mockResolvedValue({ sub: 1, username: 'test' });

    const result = await guard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
  });

  it('should throw UnauthorizedException for invalid token', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: 'Bearer invalid.token',
          },
        }),
      }),
    } as unknown as ExecutionContext;

    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error());

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    } as unknown as ExecutionContext;

    await expect(guard.canActivate(mockExecutionContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
