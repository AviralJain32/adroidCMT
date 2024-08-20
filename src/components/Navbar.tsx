'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';

function Navbar() {
  const { data: session } = useSession();
  const user : User = session?.user;
  const router = useRouter()

  // bg-blue-600 primary color
  // bg-blue-950 
  return (
    <nav className="p-4 md:p-6 shadow-md bg-blue-950 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Adroid CMT
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user.fullname}
            </span>
            <div className='flex gap-3'>
            <Link href="/create-conference">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Create Conference</Button>
            </Link>
            {/* <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button> */}
            <Link href={"/dashboard"}>
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Dashboard
            </Button>
            </Link>
          </div>
          </>
        ) : (
          <div>
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        </div>
        )}
        </div>
    </nav>
  );
}

export default Navbar;