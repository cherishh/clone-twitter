import LikeButton from "./like"

export default function Tweets({ tweets} : { tweets: TweetWithAuthor[] }) {

  return tweets.map((tweet) => (
    <div key={tweet.id} className='m-8'>
      <p>{tweet.author.username}</p>
      <p>{tweet.title}</p>
      <LikeButton tweet={tweet} />
    </div>
  ))
}