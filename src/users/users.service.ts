import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import {
  FindUserByIdDto,
  FindUserByUsernameDto,
} from './dto/validations-user.dto';
import { validateDto } from 'src/common/utils/validateDto.utils';
import { queryOne } from 'src/common/services/db.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    await validateDto(FindUserByUsernameDto, { username });
    return queryOne(this.usersRepository, { where: { username } });
  }

  async findUserById(userId: number): Promise<User | undefined> {
    await validateDto(FindUserByIdDto, { userId });
    return queryOne(this.usersRepository, { where: { id: userId } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
