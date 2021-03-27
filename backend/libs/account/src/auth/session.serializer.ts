import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  async serializeUser(user: any, done: (err: Error, user: any) => void) {
    try {
      const u = await this.userService.findOne(user.username);
      const resp = u.toResponseObject();
      done(null, resp);
    } catch (error) {
      done(error, null);
    }
  }

  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): any {
    done(null, payload);
  }
}
