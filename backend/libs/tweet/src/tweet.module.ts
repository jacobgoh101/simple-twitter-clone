import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetEntity } from './tweet.entity';
import { TweetService } from './tweet.service';

@Module({
  imports: [TypeOrmModule.forFeature([TweetEntity])],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetModule {}
