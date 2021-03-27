<template>
  <form @submit.prevent="handleFormSubmit">
    <b-alert variant="danger" :show="!!error" fade>
      {{ error }}
    </b-alert>
    <b-form-textarea
      v-model="twtBody"
      placeholder="Enter something..."
      rows="3"
      max-rows="6"
      class="mb-3"
    />
    <div class="text-right mb-4" style="margin-top: -16px">
      <small>{{ twtBody.length }}/250</small>
    </div>
    <div class="text-right">
      <b-button
        type="submit"
        variant="primary"
        :disabled="twtBody.length < 5 || twtBody.length > 250"
      >
        <span>Post</span>
      </b-button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { useCreateNewTweet } from '@/hooks/tweet.hook.ts';
import { ref, watch } from '@vue/composition-api';

export default Vue.extend({
  setup() {
    const twtBody = ref('');
    const { createNewTwt, isSuccess, error } = useCreateNewTweet();
    const handleFormSubmit = () => {
      createNewTwt(twtBody.value);
    };
    watch(isSuccess, (v, ov) => {
      if (v && !ov) twtBody.value = '';
    });
    return { twtBody, handleFormSubmit, error };
  },
});
</script>
