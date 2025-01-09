import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @HttpCode(201)
  @Post('register')
  registerUser(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }
}
