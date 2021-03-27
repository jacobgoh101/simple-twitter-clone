import { Injectable } from '@nestjs/common';
import { UserResponseObject } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserResponseObject | null> {
    const user = await this.usersService.findOne(username);
    const isValid = await user.comparePassword(pass);
    if (isValid) {
      return user.toResponseObject();
    }
    return null;
  }
}
