import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import {
  TweetEventEmitter,
  TweetService,
  TWEET_EVENTS,
} from '../../../../libs/tweet/src';
import { TweetEntity } from '../../../../libs/tweet/src/tweet.entity';

enum TWEET_ROOMS {
  generalTweetChannel = 'general-tweet-channel',
}

@WebSocketGateway({ path: '/api/v1/socket.io' })
export class TweetGateway implements OnGatewayInit {
  constructor(private readonly tweetService: TweetService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('join-tweet-channel')
  handleJoinTweetChannel(socket: Socket) {
    console.log('debug123');
    socket.join(TWEET_ROOMS.generalTweetChannel);
    return this.tweetService.list();
  }

  afterInit() {
    TweetEventEmitter.addListener(
      TWEET_EVENTS.new,
      async (_newTwt: TweetEntity) => {
        this.server
          .to(TWEET_ROOMS.generalTweetChannel)
          .emit('new-twt-list', await this.tweetService.list());
      },
    );
  }
}
