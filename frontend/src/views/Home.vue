<template>
  <b-container class="pt-5">
    <b-row>
      <b-col>
        <TweetList />
      </b-col>
      <b-col>
        <CreateTweetForm />
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import TweetList from '@/components/TweetList.vue';
import CreateTweetForm from '@/components/CreateTweetForm.vue';

export default Vue.extend({
  components: { TweetList, CreateTweetForm },
});
</script>
