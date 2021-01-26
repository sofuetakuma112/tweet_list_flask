<template>
  <v-dialog
    width="100%"
    :value="savelist"
    @click:outside="$emit('change-savelist', false)"
    content-class="list-item"
    persistent
  >
    <v-card v-if="savenew">
      <CreateList @change-savenew="savenew = $event" />
    </v-card>
    <v-card outlined v-else>
      <div class="float-right pt-3">
        <v-icon large @click="savenew = true"> mdi-plus </v-icon>
      </div>
      <div class="float-left pt-3">
        <v-icon large @click="$emit('change-savelist', false)">
          mdi-chevron-left
        </v-icon>
      </div>
      <v-card-title class="justify-center">保存先 </v-card-title>

      <v-divider></v-divider>

      <v-container>
        <v-row no-gutters class="flex-row flex-nowrap overflow-auto">
          <v-col cols="4" v-for="list in filteredTweetLists" :key="list.id">
            <v-card height="100px" @click="addTweetToList(list)">{{ list.listName }}</v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import CreateList from '@/components/CreateList.vue';
import firebase from '@/firebase';
import { TweetListWithThumbnailAndColor } from '@/types/index.d.ts';
import Vue from 'vue';

type Tweet = {
  id: string;
}

interface DataType {
  savenew: boolean;
  filteredTweetLists: TweetListWithThumbnailAndColor[]
}

export default Vue.extend({
  model: {
    prop: 'savelist',
    event: 'change-savelist'
  },
  data(): DataType {
    return {
      savenew: false,
      filteredTweetLists: []
    }
  },
  props: {
    savelist: {
      type: Boolean,
      default: false
    },
    tweetAddList: {
      type: Object as Vue.PropType<Tweet>,
    },
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  // created() {
  //   const that = this
  //   firebase.db().collection('tweet_lists').onSnapshot((querySnapshot) => {
  //       this.filteredTweetLists = [];
  //       querySnapshot.forEach((doc) => {
  //         const tweet_lists_doc = doc
  //         const list = doc.data()
  //         // 既にツイートをリストに追加している
  //         if (list.tweetIds.length > 0 && list.uid === this.user.uid) {
  //           for (const id of list.tweetIds) {
  //             // console.log(id)
  //             firebase.db()
  //               .collection('tweets')
  //               .doc(String(id))
  //               .get()
  //               .then(doc => {
  //                 const tweetData = doc.data().tweet
  //                 that.filteredTweetLists.push({
  //                   ...list,
  //                   id: tweet_lists_doc.id,
  //                   thumbnailImg: tweetData.entities.media && tweetData.entities.media.length > 0
  //                     ? tweetData.entities.media[0].media_url
  //                     : null,
  //                   listColor: tweetData.user.profile_background_color
  //                   })
  //               })
  //               break;
  //           }
  //         } else if (list.tweetIds.length === 0 && list.uid === this.user.uid) {
  //           that.filteredTweetLists.push({
  //             ...list,
  //             id: tweet_lists_doc.id,
  //             thumbnailImg: '',
  //             listColor: ''
  //           });
  //         }
  //       });
  //     });
  // },
  methods: {
    // リストにツイートのIDを格納
    addTweetToList(list: TweetListWithThumbnailAndColor) {
      firebase.db()
        .collection('tweet_lists')
        .doc(list.id)
        .update({ // リストに追加するツイートのIDを配列に追加
          tweetIds: firebase.arrayUnion(this.tweetAddList.id)
        });
      this.saveTweet()
    },
    // ツイートの保存
    saveTweet() {
      firebase.db().collection('tweets')
        .doc(String(this.tweetAddList.id))
        .set({
          tweet: this.tweetAddList,
          tweetId: this.tweetAddList.id
        });
    },
  },
  components: {
    CreateList
  }
});
</script>

<style>
.list-item {
  bottom: 0 !important;
  position: absolute !important;
  margin-bottom: 0 !important;
}
</style>
