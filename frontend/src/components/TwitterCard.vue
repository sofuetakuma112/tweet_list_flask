<template>
  <v-card class="mx-auto" :color="tweet.user.profile_background_color" dark>
    <v-card-title>
      <v-icon large left>
        mdi-twitter
      </v-icon>
      <span class="title font-weight-light">Twitter</span>
    </v-card-title>

    <v-card-text class="text-md-body-1 text-caption font-weight-bold">
      {{ tweetText }}
      <TwitterImg :tweet="tweet" :key="tweet.id" />
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            :src="tweet.user.profile_image_url"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="text-md-body-1 text-caption font-weight-bold"
            >{{ tweet.user.name }}</v-list-item-title
          >
        </v-list-item-content>

        <v-row
          align="center"
          class="text-md-body-1 text-caption font-weight-bold "
        >
          <v-icon class="ml-2 mr-1" @click="saveList">
            mdi-plus
          </v-icon>
          <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-1">{{ tweet.favorite_count }}</span>
          <v-icon class="mr-1">
            mdi-share-variant
          </v-icon>
          <span class="subheading ">{{ tweet.retweet_count }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import TwitterImg from './TwitterImg.vue';
import { Tweet } from '@/types/index.d';

export default Vue.extend({
  components: {
    TwitterImg
  },
  props: {
    tweet: {
      type: Object as Vue.PropType<Tweet>,
      required: true
    }
  },
  computed: {
    tweetText(): string {
      const del = this.tweet.text.substr(this.tweet.text.lastIndexOf('http'));
      return this.tweet.text.replace(del, '');
    }
  },
  methods: {
    saveList(): void {
      this.$emit('save-list', this.tweet);
    }
  }
});
</script>
