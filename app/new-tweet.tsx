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
      <div className="bg-red-200">
        <Image src='/favicon.ico' alt='avatar' width={48} height={48} />
      </div>
      <input name="tw" className="bg-blue-200 flex-1" />
      </div>
    </form>
  )
}