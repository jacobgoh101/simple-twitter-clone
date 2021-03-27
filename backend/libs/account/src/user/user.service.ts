import { ConflictException, Injectable } from '@nestjs/common';
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
    const isUsernameExist = await this.isUsernameExist(username);
    const isEmailExist = await this.isEmailExist(email);
    if (isUsernameExist || isEmailExist)
      throw new ConflictException(
        'The email and/or username is already being used.',
      );
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

  private isUsernameExist(username: string) {
    return this.userRepo.count({ where: { username } }).then((c) => c > 0);
  }

  private isEmailExist(email: string) {
    return this.userRepo.count({ where: { email } }).then((c) => c > 0);
  }

  async findOne(username: string) {
    return this.userRepo.findOne({ where: { username } });
  }
}
