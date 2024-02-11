'use client'

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthButton() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    console.log(email, pass, 'login');
    const supabase = createClientComponentClient();
    const signedIn = await supabase.auth.signInWithPassword({
      email,
      password: pass
    })
    console.log(signedIn, 'signedIn');
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
    </div>
  )
}