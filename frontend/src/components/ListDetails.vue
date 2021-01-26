<template>
  <v-container fuild>
    <template v-if="tweetList.tweetIds.length > 0">
      <v-card
        flat
        outlined
        height="100%"
        v-for="tweet in tweets"
        :key="tweet.id"
      >
        <TwitterCard :tweet="tweet" />
      </v-card>
    </template>
    <template v-else>
      <div class="text-center pt-5">
        リストに追加されたツイートはありません
      </div>
    </template>
  </v-container>
</template>

<script lang="ts">
import TwitterCard from './TwitterCard.vue';
import firebase from '@/firebase';
import { TweetList } from '@/types/index.d';
import Vue from 'vue';

interface DataType {
  tweets: object[];
}

export default Vue.extend({
  components: {
    TwitterCard
  },
  data(): DataType {
    return {
      tweets: []
    };
  },
  props: {
    tweetList: {
      type: Object as Vue.PropType<TweetList>
    }
  },
  created() {
    for (const id in this.tweetList.tweetIds) {
      firebase
        .db()
        .collection('tweets')
        .doc(String(id))
        .get()
        .then(doc => {
          this.tweets.push({
            tweet: doc.data()?.tweet
          });
        });
    }
  }
});
</script>
