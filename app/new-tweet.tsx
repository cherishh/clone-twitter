import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweet() {

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const tweet = String(formData.get('tw'));
    const supabase = createServerActionClient<Database>( { cookies });
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { 
      return;
    }
    await supabase.from('tweets').insert({ title: tweet, user_id: user.id });
    console.log(formData.get('tw'), 'form data');

  }

  return (
    <form action={handleSubmit}>
      <input name="tw" type="textarea" max={200} />
    </form>
  )
}