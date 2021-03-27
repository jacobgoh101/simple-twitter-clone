import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEmitter } from 'events';
import { MoreThan, Repository } from 'typeorm';
import { CreateTweetDto } from './tweet.dto';
import { TweetEntity } from './tweet.entity';

export const TweetEventEmitter = new EventEmitter();
export enum TWEET_EVENTS {
  new = 'new',
}

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetEntity)
    private readonly twtRepo: Repository<TweetEntity>,
  ) {}

  async create(data: CreateTweetDto, userId: number) {
    const insertResp = await this.twtRepo.insert({ body: data.body, userId });
    const id = Number(insertResp.identifiers?.[0]?.id);
    if (!id) throw new InternalServerErrorException('Tweet ID missing');
    const twt = await this.twtRepo.findOne(id, {
      relations: ['user'],
    });
    const formattedTwt = this.toTwtResponse(twt);
    TweetEventEmitter.emit(TWEET_EVENTS.new, formattedTwt);
    return formattedTwt;
  }

  list(minId = 0) {
    return this.twtRepo
      .find({
        where: { id: MoreThan(minId) },
        order: {
          id: 'DESC',
        },
        take: 10,
        relations: ['user'],
      })
      .then((arr) => arr.map(this.toTwtResponse));
  }

  private toTwtResponse(t: TweetEntity) {
    const user = t.user?.toResponseObject();
    return { ...t, user };
  }
}
