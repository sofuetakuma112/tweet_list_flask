export type TweetListWithThumbnailAndColor = {
  id?: string;
  uid: string;
  tweetIds: string[];
  thumbnailImg: string;
  listColor: string;
  listName: string;
}

export type TweetList = {
  listName: string;
  uid: string;
  tweetIds: string[]
}

export type Tweet = {
  user: TwitterUser;
  id: string;
  favorite_count: number;
  retweet_count: number;
  text: string;
}

type TwitterUser = {
  profile_background_color: string;
  profile_image_url: string;
  name: string;
}