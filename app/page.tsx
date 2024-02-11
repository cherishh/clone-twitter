import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AuthButton from './auth-button';
import AuthForm from './auth-form';


export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {data: tweets } = await supabase.from('tweets').select();


  return (
    <div style={{height: '100vh' }}>
      {/* <AuthButton /> */}
      <AuthForm />
    </div>
  );
}
