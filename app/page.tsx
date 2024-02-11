import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButton from './auth-button';
import AuthForm from './auth-form';

export default async function Home() {
  // console.log(cookies(), 'cookies');
  const supabase = createServerComponentClient({ cookies });
  const { data: tweets } = await supabase.from('tweets').select();

  console.log(tweets, 'tweets');

  return (
    <div style={{ height: '100%', padding: '60px' }}> 
      <AuthButton />
      {/* <AuthForm /> */}

      <div>
        <pre>{JSON.stringify(tweets, null, 4)}</pre>
      </div>
    </div>
  );
}
