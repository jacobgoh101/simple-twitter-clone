import { $axios } from '../util/$axios.util';

export interface CreateNewTweetPayload {
  body: string;
}

export class TWEET_API {
  static listTweet() {
    return $axios.get('tweets').then((d) => d.data);
  }

  static createNewTweet(payload: CreateNewTweetPayload) {
    return $axios.post('tweets', payload).then((d) => d.data);
  }
}
