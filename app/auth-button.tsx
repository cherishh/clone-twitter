'use client'

import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthButton() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    console.log('login');
    const supabase = createClientComponentClient();
    await supabase.auth.signInWithPassword({
      email,
      password: pass
    })
    
  }

  return (
    <div>
      <form>
        <label htmlFor="name">name</label>
        <input id="name" type="text" onChange={(e) =>  { setEmail(e.target.value)}} />
        <label htmlFor="pass">pass</label>
        <input id="pass" type="password" onChange={(e) =>  { setEmail(e.target.value)}} />
        <button onClick={handleLogin}>login</button>
      </form>
    </div>
  )
}