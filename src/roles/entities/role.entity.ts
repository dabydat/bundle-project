import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ schema: 'security', name: 'roles' })
export class Role extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
