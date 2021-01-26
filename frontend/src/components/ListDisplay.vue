<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="4"
        md="3"
        v-for="(list, index) in listWithThumbnail"
        :key="index"
      >
        <v-hover v-slot="{ hover }">
          <v-card
            class="tweet-list mx-md-10 my-md-2 rounded-lg"
            height="256"
            :color="`#${list.listColor}`"
            outlined
            :elevation="hover ? 12 : 4"
            style="cursor: pointer"
          >
            <v-img
              v-if="list.thumbnailImg != null"
              :src="list.thumbnailImg"
              height="254px"
              class="rounded-lg"
            ></v-img>
            <v-overlay v-if="hover" absolute color="#1f1f1f">
              <v-btn
                @click="showListDetails(list)"
                text
                class="font-weight-bold text-md-body-1 text-caption"
                >See more list</v-btn
              >
            </v-overlay>
          </v-card>
        </v-hover>
        <p class="text-center font-weight-medium my-md-4">
          {{ list.listName }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from '../firebase';
import { TweetList, TweetListWithThumbnailAndColor } from '@/types/index.d.ts';

interface DataType {
  isShowListDetails: boolean;
  dialog: boolean;
  isFound: boolean;
  listWithThumbnail: TweetListWithThumbnailAndColor[];
  filteredTweetLists: TweetList[];
  tweetLists: TweetList[];
}

export default Vue.extend({
  data(): DataType {
    return {
      filteredTweetLists: [],
      isShowListDetails: false,
      dialog: false,
      listWithThumbnail: [], // ごちゃまぜ
      tweetLists: [],
      isFound: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    firebase
      .db()
      .collection('tweet_lists')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // 自分が作ったリストのみ取得
          if (doc.data().uid === this.user.uid) {
            this.filteredTweetLists.push({
              listName: doc.data().listName,
              uid: doc.data().uid,
              tweetIds: doc.data().tweetIds
            });
          }
          this.tweetLists.push({
            listName: doc.data().listName,
            uid: doc.data().uid,
            tweetIds: doc.data().tweetIds
          });
        });

        this.fetchList();
      });
  },
  methods: {
    showListDetails(list: TweetListWithThumbnailAndColor) {
      // this.isShowListDetails = true
      this.$emit('change-component', {
        view: 'ListDetails',
        tweetList: list
      });
    },
    changeDialogState(bool: boolean) {
      this.dialog = bool;
    },
    async fetchList() {
      for (const list of this.tweetLists) {
        this.isFound = false;
        if (list.tweetIds.length > 0) {
          for (const id of list.tweetIds) {
            if (!this.isFound) {
              await firebase
                .db()
                .collection('tweets')
                .doc(String(id))
                .get()
                .then(doc => {
                  if (
                    (doc.data()?.tweet.entities.media &&
                      doc.data()?.tweet.entities.media.length > 0) ||
                    list.tweetIds.length === list.tweetIds.indexOf(id) + 1
                  ) {
                    const tweetData = doc.data()?.tweet;
                    this.listWithThumbnail.push({
                      ...list,
                      thumbnailImg:
                        tweetData.entities.media &&
                        tweetData.entities.media.length > 0
                          ? tweetData.entities.media[0].media_url
                          : null,
                      listColor: tweetData.user.profile_background_color
                    });
                    this.isFound = true;
                  }
                });
            }
          }
        }
      }
    }
  }
});
</script>
