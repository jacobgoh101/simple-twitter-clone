import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateTweetDto } from './tweet.dto';
import { TweetEntity } from './tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(TweetEntity)
    private readonly twtRepo: Repository<TweetEntity>,
  ) {}

  create(data: CreateTweetDto, userId: number) {
    return this.twtRepo.save(this.twtRepo.create({ body: data.body, userId }));
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
      .then((arr) =>
        arr.map((t) => {
          const user = t.user?.toResponseObject();
          return { ...t, user };
        }),
      );
  }
}
