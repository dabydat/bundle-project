import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

/**
 * Abstract base entity class that includes common properties for all entities.
 *
 * @property {number} id - The primary key: id.
 * @property {boolean} isActive - A boolean to identify if a row is active.
 * @property {Date} createdAt - The creation date of the row.
 * @property {Date} updatedAt - The update date of the row.
 * @property {Date} deletedAt - The deletion date of the row.
 */
@ObjectType()
export abstract class BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('boolean', { default: true })
  is_active: boolean;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  created_at: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_at: Date;

  @Field({ nullable: true })
  @DeleteDateColumn({ type: 'timestamp', default: null })
  deleted_at: Date;
}
