import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isValid = await user.comparePassword(pass);
    if (isValid) {
      return user.toResponseObject();
    }
    return null;
  }
}
