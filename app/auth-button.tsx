'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogin = async () => {
    const signedIn = await supabase.auth.signInWithPassword({
      email: 'wzx1991@gmail.com',
      password: '1111111',
    });
    if (signedIn.data.session) {
      router.push('/auth/callback');
    }
  };

  const signout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <>
      <div>

      <button onClick={handleLogin}>login</button>
      </div>
      <div>

      <button onClick={signout}>logout</button>
      </div>
    </>
  );
}
