import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { envVarsConfig } from 'src/common/config/envs/env.config';

const JWT_SECRET = envVarsConfig.jwt.secret;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }
  async validate(payload: { sub: string; username: string }): Promise<any> {
    return { userId: payload.sub, username: payload.username };
  }
}
