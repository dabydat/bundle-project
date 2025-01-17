import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthInput, AuthResult, SignInData } from './auth.types';

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
    const user = await this.usersService.findUserByUsername(input.username);
    const verifyPassword = await bcrypt.compare(input.password, user.password);
    if (user && verifyPassword) {
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
      if (!user) throw new UnauthorizedException();
      return this.signIn({ userId: user.id, username: user.username });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Refresh token has expired');
      }
      throw new UnauthorizedException();
    }
  }
}
