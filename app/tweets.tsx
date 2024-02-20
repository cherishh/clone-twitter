'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@supabase/auth-helpers-nextjs';
import LikeButton from './like';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useOptimistic from './hooks/useOptimistic';
import Image from 'next/image';

export default function Tweets({ tweets, user }: { tweets: TweetWithAuthor[]; user: User }) {
  // console.log((tweets.map((item) => ({
  //   likes: item.likes,
  // }))), 'tweets');
  const router = useRouter();
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
    const channel = supabase
      .channel('realtime tweets')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tweets',
        },
        (payload) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, router]);

  console.log(JSON.parse(JSON.stringify(optimisticTweets[0])), 'render');

  return optimisticTweets.map((tweet) => (
    <div key={tweet.id} className='border border-gray-800 border-t-0 px-4 py-8 flex'>
      <div className='h-12 w-12'>
        <Image className='rounded-full' src='/vercel.svg' alt='avatar' width={48} height={48} />
      </div>
      <div className='ml-4'>
        <p><span className=' font-bold'>{tweet.author.username}</span></p>
        <p>{tweet.title}</p>
        <LikeButton tweet={tweet} addOptimisticTweet={addOptimisticTweet} user={user} />
      </div>
    </div>
  ));
}
