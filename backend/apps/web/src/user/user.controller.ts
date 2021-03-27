import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../../../../libs/account/src/auth/authenticated.guard';
import { LoginGuard } from '../../../../libs/account/src/auth/login.guard';
import { SignUpDto } from '../../../../libs/account/src/user/user.dto';
import { UserEntity } from '../../../../libs/account/src/user/user.entity';
import { UserService } from '../../../../libs/account/src/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/users')
  async signUp(@Body(new ValidationPipe()) body: SignUpDto, @Req() req) {
    const user = await this.userService.create(body);
    return new Promise((resolve, reject) => {
      req.login({ username: body.username, password: body.password }, (err) => {
        if (err) reject(err);
        resolve(user);
      });
    });
  }

  @UseGuards(LoginGuard)
  @Post('/sessions')
  login() {
    return;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  getProfile(@Req() req) {
    return req.user as UserEntity;
  }

  @Delete('/sessions')
  logout(@Req() req) {
    req.logout();
    return;
  }
}
