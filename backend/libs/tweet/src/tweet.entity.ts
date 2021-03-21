import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../account/src/user/user.entity';

@Entity('tweets')
export class TweetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: '320' })
  body: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.tweets)
  user: UserEntity;

  @Column()
  userId: number;
}
