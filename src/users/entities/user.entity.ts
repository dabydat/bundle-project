import { Entity, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities/base.entity';

@ObjectType()
@Entity({ schema: 'security', name: 'users' })
export class User extends BaseEntity {
  @Field()
  @Column()
  first_name: string;

  @Field()
  @Column()
  last_name: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  age?: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ select: false })
  password: string;
}
