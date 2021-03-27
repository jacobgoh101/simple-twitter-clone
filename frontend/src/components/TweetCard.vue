<template>
  <b-card class="mb-4">
    <b-media>
      <template #aside>
        <b-img
          blank
          blank-color="#ccc"
          width="64"
          alt="avatar"
          src="https://i.ibb.co/qdzJznG/68.png"
        ></b-img>
      </template>

      <h5 class="mt-0">{{ username }}</h5>
      <p class="mb-0">
        {{ body }}
      </p>
      <small>
        <i>Posted on {{ formattedPostedOn }}</i>
      </small>
    </b-media>
  </b-card>
  <!-- <div class="media border p-3 mb-4">
    <img
      src="https://i.ibb.co/qdzJznG/68.png"
      alt="avatar"
      class="mr-3 mt-3 rounded-circle"
      style="width: 60px"
    />
    <div class="media-body">
      <h4>
        {{ username }}
      </h4>
      <p>{{ body }}</p>
    </div>
  </div> -->
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';

export default Vue.extend({
  components: {},
  props: {
    username: { type: String, required: true },
    postedOn: { type: String, required: true },
    body: { type: String, required: true },
  },
  computed: {
    formattedPostedOn() {
      return dayjs(this.postedOn, 'MMMM d, YYYY');
    },
  },
});
</script>
