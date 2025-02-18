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
import { AuthGuard } from './guards/auth.guard';
import { AuthInput } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  login(@Body() input: AuthInput) {
    return this.authService.authenticate(input);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Get('me')
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
