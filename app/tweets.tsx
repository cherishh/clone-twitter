'use client';

import type { User } from '@supabase/auth-helpers-nextjs';
import LikeButton from './like';
import { useOptimistic } from 'react';

export default function Tweets({ tweets, user }: { tweets: TweetWithAuthor[],  user: User }) {
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
    tweets,
    (currOptimisticTweets, newTweet) => {
      const newOptimisticTweets = [...currOptimisticTweets];
      const index = newOptimisticTweets.findIndex((t) => t.id === newTweet.id);
      newOptimisticTweets[index] = newTweet;
      return newOptimisticTweets;
    }
  );

  console.log(JSON.parse(JSON.stringify(optimisticTweets[0])), 'render');

  return optimisticTweets.map((tweet) => (
    <div key={tweet.id} className='m-8'>
      <p>{tweet.author.username}</p>
      <p>{tweet.title}</p>
      <LikeButton tweet={tweet} addOptimisticTweet={addOptimisticTweet} user={user} />
    </div>
  ));
}
