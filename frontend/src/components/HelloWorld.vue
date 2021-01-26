<template>
  <div class="hello">
    <!-- ごちゃごちゃしていたのを全て消して、ボタンを配置 -->
    <p>テスト</p>
    <button @click='post'>click me</button>
  </div>
</template>

<script>
import Methods from '../api/methods'

export default {
  name: 'HelloWorld',
  methods: {
    // サーバーから返ってくる値をログに出力したいのでasyncとawaitを行う
    async post() {
      let response = await Methods.fetchTweet('1352543093774376960');
      console.log(response);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>