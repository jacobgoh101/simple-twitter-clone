import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import {
  mockSignUpDto,
  userRepositoryMockFactory,
} from '../user/user.repo-fake';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: userRepositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can validate valid username & password', async () => {
    const user = await service.validateUser(
      mockSignUpDto.username,
      mockSignUpDto.password,
    );
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
  });

  it('can validate invalid username & password', async () => {
    const user = await service.validateUser(
      mockSignUpDto.username,
      'wrongpassword',
    );
    expect(user).toBeNull();
  });
});
