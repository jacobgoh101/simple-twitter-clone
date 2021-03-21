import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../../../../libs/account/src/auth/authenticated.guard';
import { UserEntity } from '../../../../libs/account/src/user/user.entity';
import { TweetService } from '../../../../libs/tweet/src';
import { CreateTweetDto } from '../../../../libs/tweet/src/tweet.dto';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(AuthenticatedGuard)
  @Post()
  createTweet(@Body(new ValidationPipe()) body: CreateTweetDto, @Req() req) {
    const user: UserEntity = req.user;
    console.log(user, 'debug2');
    return this.tweetService.create(body, user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  listTweet() {
    return this.tweetService.list();
  }
}
