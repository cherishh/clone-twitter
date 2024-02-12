import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButton from './auth-button-client';
import AuthForm from './auth-form';
import AuthButtonServer from './auth-button-server';
import { redirect } from 'next/navigation';
import NewTweet from './new-tweet';

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }
  const { data: tweets } = await supabase.from('tweets').select('*, profiles(*)');
  // console.log(tweets, 'tweets');

  return (
    <div style={{ height: '100%', padding: '60px' }}>
      <div className='m-8'>
        <AuthButtonServer />
      </div>
      <div className='m-8'>
        <NewTweet />
      </div>
      <div>
        {tweets?.map((tweet) => (
          <div key={tweet.id} className='m-8'>
            <p>{tweet.profiles?.username}</p>
            <p>{tweet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
