/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import {
  mockSignUpDto,
  mockUser,
  userRepositoryMockFactory,
} from './user.repo-fake';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: userRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can create user', async () => {
    const user = await service.create(mockSignUpDto);
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    //@ts-ignore
    expect(user.password).toBeUndefined();
    //@ts-ignore
    expect(user.passwordHash).toBeUndefined();
  });

  it('can fine user by username', async () => {
    const user = await service.findOne(mockUser.username);
    expect(user.id).toBeDefined();
  });
});
