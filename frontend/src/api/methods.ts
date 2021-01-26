import Api from './index';

export default {
  fetchTweet (id: string) {
    const query = { id }
    return Api().post('/fetchTweet', query);
  }
}