'use client'

import { startTransition } from "react";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LikeButton({tweet, addOptimisticTweet, user}: { tweet: TweetWithAuthor, addOptimisticTweet: (newTweet: TweetWithAuthor) => void, user: User }) {
  const router = useRouter();

  const handleClick = async () => {
    const supabase = createClientComponentClient<Database>();
    // const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (tweet.user_has_liked_tweet) {
      startTransition(() => {
        addOptimisticTweet({
          ...tweet,
          likes: tweet.likes - 1,
          user_has_liked_tweet: false,
        })
      })
      
      await supabase.from('likes').delete().match({'tweet_id': tweet.id, 'user_id': user.id });
      router.refresh(); 
    } else {
      startTransition(() => {
        addOptimisticTweet({
          ...tweet,
          likes: tweet.likes + 1,
          user_has_liked_tweet: true,
        })
      })
      await supabase.from('likes').insert({ tweet_id: tweet.id, user_id: user.id });
      router.refresh();
    }
  }

  return (
    <div>
      <button onClick={handleClick}>{tweet.likes} likes</button>
    </div>
  )
}