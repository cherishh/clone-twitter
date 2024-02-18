'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@supabase/auth-helpers-nextjs';
import LikeButton from './like';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useOptimistic from './hooks/useOptimistic';

export default function Tweets({ tweets, user }: { tweets: TweetWithAuthor[]; user: User }) {
  // console.log((tweets.map((item) => ({
  //   likes: item.likes,
  // }))), 'tweets');
  const router = useRouter()
  const supabase = createClientComponentClient<Database>();
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<TweetWithAuthor[], TweetWithAuthor>(
    tweets,
    (currOptimisticTweets, newTweet) => {
      const newOptimisticTweets = [...currOptimisticTweets];
      const index = newOptimisticTweets.findIndex((t) => t.id === newTweet.id);
      newOptimisticTweets[index] = newTweet;
      return newOptimisticTweets;
    }
  );

  useEffect(() => {
    const channel = supabase.channel('realtime tweets').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'tweets'
    }, (payload) => {
      router.refresh()
    }).subscribe(); 

    return () => {
      channel.unsubscribe();
    }
  }, [supabase, router]);

  console.log(JSON.parse(JSON.stringify(optimisticTweets[0])), 'render');

  return optimisticTweets.map((tweet) => (
    <div key={tweet.id} className='m-8'>
      <p>{tweet.author.username}</p>
      <p>{tweet.title}</p>
      <LikeButton tweet={tweet} addOptimisticTweet={addOptimisticTweet} user={user} />
    </div>
  ));
}
