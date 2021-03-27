import { ref, watch } from '@vue/composition-api';
import { mutate } from 'swrv';
import { CreateNewTweetPayload, TWEET_API } from '../api/tweet.api';
import { SWR_KEYS } from '../constants/swrv.constant';
import { useSwrvExtra } from '../util/swrv.util';

export const useListTweet = () => {
  const { data, error, mutate } = useSwrvExtra(
    SWR_KEYS.LIST_TWEET,
    () => TWEET_API.listTweet(),
    { shouldRetryOnError: false }
  );
  return { data, error, mutate };
};

export const useCreateNewTweet = () => {
  const payload = ref<CreateNewTweetPayload | null>(null);
  const {
    data,
    error,
    mutate: mutateCreateNewTweet,
    isSuccess,
    isPending,
  } = useSwrvExtra(
    () => (payload.value ? SWR_KEYS.POST_TWEET : null),
    () => TWEET_API.createNewTweet(payload.value!),
    { shouldRetryOnError: false, revalidateOnFocus: false }
  );
  const createNewTwt = (body: CreateNewTweetPayload['body']) => {
    payload.value = { body };
    mutateCreateNewTweet();
  };
  watch(
    isSuccess,
    (v, ov) => v && !ov && mutate(SWR_KEYS.LIST_TWEET, TWEET_API.listTweet())
  );
  return { data, error, createNewTwt, isSuccess, isPending };
};
