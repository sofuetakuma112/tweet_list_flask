<template>
  <v-container>
    <v-text-field
      class="pt-8"
      v-model="message"
      label="TwitterURLを入力"
      type="text"
      filled
      rounded
      append-outer-icon="mdi-magnify"
      @click:append-outer="searchTweet()"
      @keyup.enter="searchTweet()"
    ></v-text-field>

    <v-dialog v-model="search" width="80%">
      <v-card v-if="messagecheck" class="text-center title py-5"
        >該当なし</v-card
      >

      <template v-for="tweet in tweets">
        <TwitterCard :tweet="tweet" :key="tweet.id" @save-list="openSaveList" />
      </template>
    </v-dialog>
    <SaveList v-model="savelist" :tweetAddList="tweetAddList" />
  </v-container>
</template>

<script lang="ts">
import SaveList from '@/components/SaveList.vue';
import TwitterCard from '@/components/TwitterCard.vue';
import Methods from '@/api/methods';
import Vue from 'vue';

interface DataType {
  message: string;
  messagecheck: boolean;
  search: boolean;
  savelist: boolean;
  tweets: object[];
  tweetAddList: object;
}

export default Vue.extend({
  components: {
    SaveList,
    TwitterCard
  },
  data(): DataType {
    return {
      message: '',
      messagecheck: false,
      search: false,
      savelist: false,
      tweets: [],
      tweetAddList: {}
    };
  },
  methods: {
    openSaveList(tweet: object) {
      this.search = false;
      this.savelist = true;
      this.tweetAddList = tweet;
    },
    searchTweet() {
      let url = this.message;
      if (url.length > 0) {
        this.search = true;
        url = url.substr(url.lastIndexOf('/') + 1, 19);
        if (url.length == 19 && !isNaN(Number(url))) {
          this.messagecheck = false;
        } else {
          this.messagecheck = true;
        }
        this.post().then(tweetData => {
          this.tweets = tweetData.data.tweets;
        });
      }
    },

    async post() {
      const response = await Methods.fetchTweet(this.message);
      return response;
    }
  }
});
</script>
