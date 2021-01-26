<template>
  <v-container>
    <v-row justify="center">
      <v-col
        :cols="cols"
        v-for="count in tweet.extended_entities.media.length"
        :key="count"
        style="height: 300px;"
      >
        <v-img
          width="100%"
          height="100%"
          :src="tweet.extended_entities.media[count - 1].media_url_https"
          @click="enlargeImage(count - 1)"
        ></v-img>
        <v-dialog v-model="dialog" fullscreen hide-overlay scrollable>
          <v-card tile>
            <v-img
              :src="tweet.extended_entities.media[currentCount].media_url_https"
              @click="dialog = false"
            ></v-img>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    cols: '6',
    selectedImage: null,
    dialog: false,
    currentCount: 0
  }),
  props: {
    tweet: {
      type: Object,
      required: true
    }
  },
  methods: {
    enlargeImage(num: number) {
      this.dialog = true;
      this.currentCount = num;
    }
  },
  created() {
    if (this.tweet.extended_entities.media.length == 1) {
      this.cols = '9';
    }
  }
});
</script>
