import { Test, TestingModule } from '@nestjs/testing';
import { TweetGateway } from './tweet.gateway';

describe('TweetGateway', () => {
  let gateway: TweetGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetGateway],
    }).compile();

    gateway = module.get<TweetGateway>(TweetGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
