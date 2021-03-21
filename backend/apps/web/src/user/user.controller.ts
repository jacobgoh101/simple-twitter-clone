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
  signUp(@Body(new ValidationPipe()) body: SignUpDto) {
    return this.userService.create(body);
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
