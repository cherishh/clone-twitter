import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from 'next/image';

export default function NewTweet({ user }: { user: User}) {

  const handleSubmit = async (formData: FormData) => {
    'use server'
    const tweet = String(formData.get('tw'));
    const supabase = createServerActionClient<Database>( { cookies });
    await supabase.from('tweets').insert({ title: tweet, user_id: user.id });
  }

  return (
    <form className="border border-gray-800 border-t-0" action={handleSubmit}>
      <div className="flex py-8 px-4">
      <div>
        <Image className="rounded-full" src='/favicon.ico' alt='avatar' width={48} height={48} />
      </div>
      <input name="tw" className="flex-1 bg-inherit ml-4 p-1 text-2xl leading-loose placeholder-gray-500" placeholder="what's happening?" />
      </div>
    </form>
  )
}