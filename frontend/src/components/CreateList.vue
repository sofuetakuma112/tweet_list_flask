<template>
  <div>
    <v-card outlined height="400px">
      <div class="float-left pt-3">
        <v-icon large @click="$emit('change-savenew', false)">
          mdi-chevron-left
        </v-icon>
      </div>
      <v-card-title class="justify-center">新規コレクション </v-card-title>
      <v-divider></v-divider>

      <p class="pt-15 text-center">新規作成ファイル表示</p>
      <div class="text-center list-name px-2">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <ValidationProvider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:10"
          >
            <v-text-field
              v-model="name"
              :counter="10"
              :error-messages="errors"
              label="Name"
              required
              @keydown.enter="saveNewList(e)"
            ></v-text-field>
          </ValidationProvider>
          <!-- <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="checkbox"
              >
                <v-checkbox
                  v-model="checkbox"
                  :error-messages="errors"
                  value="1"
                  label="Option"
                  type="checkbox"
                  required
                ></v-checkbox>
              </ValidationProvider> -->

          <v-btn
            class="mr-4"
            type="submit"
            :disabled="invalid"
            @click="saveNewList"
          >
            作成
          </v-btn>
        </ValidationObserver>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import firebase from '../firebase';
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    openCreateListForm: false,
    name: ''
  }),
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    saveNewList(e: any) {
      if (e.keyCode !== 13) return;
      firebase
        .db()
        .collection('tweet_lists')
        .add({
          uid: this.user.uid,
          listName: this.name,
          tweetIds: []
        });
      this.$emit('change-savenew', false);
    }
  }
});
</script>

<style>
.list-name {
  max-width: 800px;
  margin: 0 auto;
}
</style>
