'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LikeButton({tweet}: { tweet: TweetWithAuthor }) {
  const router = useRouter();
  console.log(tweet, 'tweet'); 

  const handleClick = async () => {
    const supabase = createClientComponentClient<Database>();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    if (tweet.user_has_liked_tweet) {
      await supabase.from('likes').delete().match({'tweet_id': tweet.id, 'user_id': user.id });
      router.refresh(); 
      return;
    }
    await supabase.from('likes').insert({ tweet_id: tweet.id, user_id: user.id });
    router.refresh();
  }

  return (
    <div>
      <button onClick={handleClick}>{tweet.likes} likes</button>
    </div>
  )
}