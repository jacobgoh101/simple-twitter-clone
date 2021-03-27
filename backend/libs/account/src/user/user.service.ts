import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BCRYPT } from '../../../util/bcrypt.util';
import { SignUpDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(data: SignUpDto) {
    const { email, username, password } = data;
    const passwordHash = await BCRYPT.hashPassword(password);
    const user = await this.userRepo.save(
      this.userRepo.create({
        email,
        username,
        passwordHash,
      }),
    );
    return user.toResponseObject();
  }

  async findOne(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
}
