<template>
  <div>
    <v-app-bar app fixed height="80px">
      <SearchForm v-if="show" />
      <ListHeader v-else @change-header="ChangeSearchForm" />
    </v-app-bar>
    <v-main>
      <component
        :is="currentView"
        @change-component="ChangeDisplay"
        v-if="currentView !== 'ListDetails'"
      ></component>
      <ListDetails v-if="currentView === 'ListDetails'" :tweetList="tweetList" />
    </v-main>
  </div>
</template>

<script lang="ts">
import ListDisplay from '@/components/ListDisplay.vue';
import SearchForm from '@/components/SearchForm.vue';
import ListDetails from '@/components/ListDetails.vue';
import ListHeader from '@/components/ListHeader.vue';
import Vue from 'vue';

export default Vue.extend({
  components: {
    ListDisplay,
    SearchForm,
    ListDetails,
    ListHeader
  },
  data: () => ({
    currentView: 'ListDisplay',
    show: true,
    tweetList: null
  }),
  methods: {
    ChangeDisplay(object: any) {
      this.currentView = object.view;
      this.tweetList = object.tweetList;
      this.show = false;
    },
    ChangeSearchForm(bool: boolean) {
      this.currentView = 'ListDisplay';
      this.show = bool;
    }
  }
});
</script>
