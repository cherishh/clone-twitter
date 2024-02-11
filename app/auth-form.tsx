'use client'
import { Auth } from '@supabase/auth-ui-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthForm() {
  const supabase = createClientComponentClient()

  const logout = async () => {
    await supabase.auth.signOut(); 
  }

  return (
    <div style={{padding: '36px'}}>
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      theme="dark"
      showLinks={true}
      providers={[]}
      redirectTo="http://localhost:3000/auth/callback"
    />
    <div>
      <button onClick={logout}>logout</button>
    </div>
    </div>
    
  )
}