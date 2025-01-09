import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = { username: string; password: string };
type SignInData = { userId: number; username: string };
type AuthResult = {
  accessToken: string;
  refreshToken: string;
  userId: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) throw new UnauthorizedException();
    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByName(input.username);
    if (user && user.password === input.password) {
      return {
        userId: user.id,
        username: user.username,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const payload = { username: user.username, sub: user.userId };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '2d',
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      userId: user.userId,
      username: user.username,
    };
  }

  async refreshToken(token: string): Promise<AuthResult> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findUserById(payload.sub);

      if (!user) {
        throw new UnauthorizedException();
      }

      return this.signIn({ userId: user.id, username: user.username });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
