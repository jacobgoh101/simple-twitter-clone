import { pickBy } from 'lodash';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BCRYPT } from '../../../util/bcrypt.util';

export type UserResponseObject = Pick<
  UserEntity,
  Exclude<keyof UserEntity, 'passwordHash'>
>;

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  passwordHash: string;

  @BeforeInsert()
  async beforeInsert() {
    this.email = this.email?.toLowerCase().trim();
  }

  @BeforeUpdate()
  async beforeUpdate() {
    this.email = this.email?.toLowerCase().trim();
  }

  async comparePassword(password: string) {
    return BCRYPT.comparePassword(password, this.passwordHash);
  }

  // get response object, to filter out sensitive field like password
  toResponseObject(): UserResponseObject {
    return pickBy(
      this,
      (_, key) => key !== 'passwordHash',
    ) as UserResponseObject;
  }

  @Column({ unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
