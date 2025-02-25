"use client"
import { Loader2 } from 'lucide-react'
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import Image from 'next/image';
import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    document.title = "Monetize - SignIn Page";
  }, []);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex bg-slate-100 flex-col items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Welcome Back!
          </h1>
          <p className="text-base font-semibold text-[#7E8CA0]">
            Log in or Create account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path='/sign-in' />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='animate-spin text-muted-foreground' />
          </ClerkLoading>
        </div>
      </div>
      <div className='h-full bg-[#097969] hidden lg:flex items-center justify-center'>
        <Image src="/logo.svg" height={200} width={200} alt='Logo' />
      </div>
    </div>
  )
}