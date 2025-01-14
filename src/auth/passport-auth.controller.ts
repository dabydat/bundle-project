import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt-auth.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @HttpCode(200)
  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  getUserInfo(@Request() request) {
    return {
      message: 'You are authenticated as user',
      user: request.user,
    };
  }

  @HttpCode(200)
  @Post('refresh')
  refreshToken(@Body() input: { token: string }) {
    return this.authService.refreshToken(input.token);
  }
}
