import { Entity, Column } from 'typeorm';
// import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ schema: 'security', name: 'users' })
export class User extends BaseEntity {
  //   @ApiProperty({ description: 'First name of the user' })
  @Column()
  first_name: string;

  //   @ApiProperty({ description: 'Last name of the user' })
  @Column()
  last_name: string;

  //   @ApiProperty({ description: 'Age of the user', required: false })
  @Column({ nullable: true })
  age?: number;

  //   @ApiProperty({ description: 'Email of the user' })
  @Column({ unique: true })
  email: string;

  //   @ApiProperty({ description: 'Username of the user' })
  @Column({ unique: true })
  username: string;

  //   @ApiProperty({ description: 'Password of the user' })
  @Column({ select: false })
  password: string;
}
