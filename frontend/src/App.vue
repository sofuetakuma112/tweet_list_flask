<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import firebase from './firebase';
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  created() {
    firebase.onAuth();
  }
});
</script>
