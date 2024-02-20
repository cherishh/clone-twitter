import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButtonServer from './auth-button-server';
import { redirect } from 'next/navigation';
import NewTweet from './new-tweet';
import Tweets from './tweets';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }
  const { data } = await supabase.from('tweets').select('*, author: profiles(*), likes(user_id)');
  const tweets =
    data?.map((t) => {
      return {
        ...t,
        author: t.author as Profile,
        user_has_liked_tweet: !!t.likes.find((like) => like.user_id === session.user.id),
        likes: t.likes.length,
      };
    }) ?? [];
  // console.log(tweets, 'tweets');
  // console.log('render');

  return (
    <div className='bg-blue-200 w-full max-w-xl mx-auto'>
      <div className='flex justify-between p-6 border border-gray-800 border-t-0'>
        <h1 className='text-xl font-bold'>SupaTweet</h1>
        <AuthButtonServer />
      </div>
      <div>
        <NewTweet user={session.user} />
        <Tweets tweets={tweets} user={session.user} />
      </div>
    </div>
  );
}
