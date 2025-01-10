import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

// export type User = {
//   id: number;
//   username: string;
//   password: string;
// };

// const users: User[] = [
//   {
//     id: 1,
//     username: 'jon',
//     password: 'changeme',
//   },
//   {
//     id: 2,
//     username: 'chris',
//     password: 'changeme',
//   },
//   {
//     id: 3,
//     username: 'faraz',
//     password: 'changeme',
//   },
// ];

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

  async findUserByName(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findUserById(userId: number): Promise<User | undefined | void> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
