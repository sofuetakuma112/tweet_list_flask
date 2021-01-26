<template>
  <v-container class="pa-0" fluid>
    <div class="light-blue lighten-2" align="center">
      <div justify="center" style="position: relative">
        <h1
          class="font-weight-black pt-10 brown--text text--darken-4"
          style="font-size: 40px"
        >
          Welcome to this application!
        </h1>
        <h3 class="pt-10">
          Twitterで見つけた自分のお気に入りのツイートをまとめてコレクションしよう！
        </h3>
        <v-img
          :src="require('@/assets/image/LpTopImage2.png')"
          :aspect-ratio="1 / 1"
          width="200"
          style="position: absolute; top: 12px; right: 30px"
        ></v-img>
      </div>
      <v-btn class="ma-5" elevation="2" @click="doLogin">Login</v-btn>
      <v-img
        :src="require('@/assets/image/LpTopImage1.png')"
        :aspect-ratio="16 / 9"
        width="500"
        class="pa-8"
      >
      </v-img>
    </div>
    <div style="background-color: #4e454a; height: 80px"></div>
    <div align="center" style="background-color: #f8f5e9">
      <h2
        class="font-weight-bold pa-7 brown--text text--darken-4"
        style="font-size: 35px"
      >
        works
      </h2>
      <v-row justify="center">
        <v-col cols="6" v-for="(work, index) in works" :key="index">
          <v-img
            :src="work.img"
            :aspect-ratio="1 / 1"
            width="250"
            class="mx-auto"
            style="background-color: white; border-radius: 50%"
          ></v-img>
          <p class="my-4" style="font-size: 20px">
            {{ work.detail }}
          </p>
        </v-col>
      </v-row>
      <v-avatar> </v-avatar>
    </div>
  </v-container>
</template>

<script lang="ts">
import firebase from "../firebase";
import router from "../router";
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    works: [
      {
        img: require("@/assets/image/LpWorkIcon1.png"),
        detail: "お気に入りのツイートをまとめたリストを作ることができます",
      },
      {
        img: require("@/assets/image/LpWorkIcon2.png"),
        detail: "自分で作ったお気に入りのツイートリストを公開できます",
      },
    ],
  }),
  methods: {
    doLogin() {
      firebase.login().then(() => {router.push('top');});
    },
  },
});
</script>
