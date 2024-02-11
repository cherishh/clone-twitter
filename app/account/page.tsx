import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {data: tweets } = await supabase.from('tweets').select();


  return (
    <div style={{height: '100vh' }}>
      <pre>{JSON.stringify(tweets, null, 4)}</pre>
    </div>
  );
}
