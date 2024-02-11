'use client'

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const supabase = createClientComponentClient();
  const router = useRouter();


  const handleLogin = async () => {
    console.log(email, pass, 'login');
    const signedIn = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    console.log(1);
    if (signedIn.data.session) {
      const getCookie = () => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find((c) => c.includes('sb-'));
        return cookie;
      }
      const id = setInterval(() => {
        if (getCookie()) {
          clearInterval(id);
          router.refresh();
        }
      }, 300)

    }

  }

  const signout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  }

  return (
    <div>
      <form>
        <label htmlFor="name">name</label>
        <input id="name" type="text" onChange={(e) =>  { setEmail(e.target.value)}} />
        <label htmlFor="pass">pass</label>
        <input id="pass" type="password" onChange={(e) =>  { setPass(e.target.value)}} />
        <button onClick={handleLogin}>login</button>
      </form>
      <div>
        <button onClick={signout}>logout</button>
      </div>
    </div>
  )
}