import { $axios } from '../util/$axios.util';

export interface CreateNewTweetPayload {
  body: string;
}

export interface Tweet {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  user: User;
}

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export class TWEET_API {
  static listTweet() {
    return $axios.get<Tweet[]>('tweets').then((d) => d.data);
  }

  static createNewTweet(payload: CreateNewTweetPayload) {
    return $axios.post<Tweet>('tweets', payload).then((d) => d.data);
  }
}
