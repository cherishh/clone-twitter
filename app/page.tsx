import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthForm from './auth-form';
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
  const tweets = data?.map((t) => {
    return {
      ...t, 
      author: t.author as Profile, 
      user_has_liked_tweet: !!t.likes.find((like) => like.user_id === session.user.id),
      likes: t.likes.length,
    }
  }) ?? []; 
  // console.log(tweets, 'tweets');
  // console.log('render');

  return (
    <div style={{ height: '100%', padding: '60px' }}>
      <div className='m-8'>
        <AuthButtonServer />
      </div>
      <div className='m-8'>
        <NewTweet />
        <Tweets tweets={tweets} user={session.user} />
      </div>
    </div>
  );
}
