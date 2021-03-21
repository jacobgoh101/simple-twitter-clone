<template>
  <div>
    <TweetCard
      v-for="tweet in tweets"
      :key="tweet.id"
      :username="tweet.user.username"
      :postedOn="tweet.createdAt"
      :body="tweet.body"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { useListTweet } from '@/hooks/tweet.hook.ts';
import TweetCard from '@/components/TweetCard.vue';

export default Vue.extend({
  components: { TweetCard },
  setup() {
    const { data: tweets } = useListTweet();
    return { tweets };
  },
});
</script>
