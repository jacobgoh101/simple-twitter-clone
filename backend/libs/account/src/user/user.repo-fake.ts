/* eslint-disable @typescript-eslint/ban-types */
import { Repository } from 'typeorm';
import { BCRYPT } from '../../../util/bcrypt.util';
import { SignUpDto } from './user.dto';
import { toUserResponseObject, UserEntity } from './user.entity';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const mockSignUpDto: SignUpDto = {
  email: 'example@gmail.com',
  username: 'example',
  password: 'password',
};

export const mockUser: Partial<UserEntity> = {
  ...mockSignUpDto,
  id: 1,
  passwordHash: BCRYPT.hashPasswordSync('password'),
  createdAt: new Date(),
  updatedAt: new Date(),
  comparePassword(password: string) {
    return BCRYPT.comparePassword(password, this.passwordHash);
  },
  toResponseObject() {
    return toUserResponseObject(this);
  },
};

export const userRepositoryMockFactory: () => MockType<
  Repository<any>
> = jest.fn(() => ({
  save: jest.fn().mockImplementation((data: Partial<UserEntity>) => {
    const user = {
      ...data,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return {
      ...user,
      toResponseObject() {
        return toUserResponseObject(this);
      },
    } as Partial<UserEntity>;
  }),
  findOne: jest.fn().mockResolvedValue(mockUser),
  create: jest.fn().mockImplementation((data: Partial<UserEntity>) => data),
}));
