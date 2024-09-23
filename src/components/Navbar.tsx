
'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './ui/button';
import { User } from 'next-auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import AppBar from '@mui/material/AppBar'
// import Toolbar from '@mui/material/Toolbar'
// import Typography from '@mui/material/Typography'

function Navbar() {
  const { data: session } = useSession();
  // const user: User = session?.user;
  // console.log(user)
  const router = useRouter();

  return (
    <nav className=" p-2 backdrop-blur-3xl shadow-background sticky top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          <Image src={"/AdroidCMTLogo.png"} alt={"Adroid CMS"} width={150} height={100} />
        </Link>
        <div className='flex gap-6'>
        <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/smart-sub" className="hover:underline">
            SmartSub
          </Link>
        <Link href="/pricing" className="hover:underline">
            Pricing
          </Link>
          <Link href="/about-us" className="hover:underline">
             About Us
          </Link>
          <Link href="/contact-us" className="hover:underline">
            Contact Us
          </Link>
        </div>
        <div className="flex gap-6">
          
          {session ? (
            <>
              {/* <span className="mr-4">
                Welcome, {user.fullname}
              </span> */}
              <div className='flex gap-3'>
                <Link href="/create-conference">
                  <Button variant={'default'}>
                    Create Conference
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={() => signOut()} variant='ghost'>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className='flex gap-4 items-center'>
            <Link href="/sign-in">
              <Button className='p-2 h-8 rounded-sm' variant={'ghost'}>
                Login
              </Button>
            </Link>
            <Link href="/sign-up"> 
            <Button className='p-2 h-8 rounded-sm' variant={'default'}>
              Sign up
            </Button>
          </Link>
          </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;



// 'use client'

// import React from 'react';
// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { Button } from './ui/button';
// import { useRouter } from 'next/navigation';

// function Navbar() {
//   const { data: session } = useSession();
//   const router = useRouter();

//   return (
//     <nav className="p-4 backdrop-blur-3xl shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
//         {/* Logo */}
//         <Link 
//           href="/" 
//           className="text-2xl font-bold hover:scale-105 transform transition-all duration-200 ease-in-out"
//         >
//           Adroid CMT
//         </Link>

//         {/* Menu Links */}
//         <div className="flex flex-col md:flex-row items-center gap-4">
//           <Link 
//             href="/" 
//             className="hover:underline hover:text-blue-500 transition-all duration-200"
//           >
//             Home
//           </Link>
//           <Link 
//             href="/smart-sub" 
//             className="hover:underline hover:text-blue-500 transition-all duration-200"
//           >
//             SmartSub
//           </Link>
//           <Link 
//             href="/pricing" 
//             className="hover:underline hover:text-blue-500 transition-all duration-200"
//           >
//             Pricing
//           </Link>
//           <Link 
//             href="/about-us" 
//             className="hover:underline hover:text-blue-500 transition-all duration-200"
//           >
//             About Us
//           </Link>
//           <Link 
//             href="/contact-us" 
//             className="hover:underline hover:text-blue-500 transition-all duration-200"
//           >
//             Contact Us
//           </Link>
//         </div>

//         {/* Authentication & Buttons */}
//         <div className="flex flex-col md:flex-row gap-4 items-center">
//           {session ? (
//             <div className="flex flex-col md:flex-row items-center gap-3">
//               <Link href="/create-conference">
//                 <Button 
//                   className="hover:scale-105 transition-transform duration-200 ease-in-out"
//                   variant="default"
//                 >
//                   Create Conference
//                 </Button>
//               </Link>
//               <Link href="/dashboard">
//                 <Button 
//                   className="w-full md:w-auto bg-slate-100 text-black hover:bg-gray-300 transition-colors duration-200"
//                   variant="outline"
//                 >
//                   Dashboard
//                 </Button>
//               </Link>
//               <Button 
//                 onClick={() => signOut()} 
//                 className="hover:opacity-75 transition-opacity duration-200"
//                 variant="ghost"
//               >
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <div className="flex flex-col md:flex-row gap-4 items-center">
//               <Link href="/sign-in">
//                 <Button 
//                   className="p-2 h-8 rounded-sm hover:bg-gray-200 transition-colors duration-200"
//                   variant="ghost"
//                 >
//                   Login
//                 </Button>
//               </Link>
//               <Link href="/sign-up">
//                 <Button 
//                   className="p-2 h-8 rounded-sm hover:scale-105 transition-transform duration-200 ease-in-out"
//                   variant="default"
//                 >
//                   Sign up
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
