
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src="/AdroidCMTLogo2.png" height={32} width={30} className="h-8 mr-3" alt="Adroid CMS Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Adroid CMS</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 pl-6 sm:gap-6 sm:grid-cols-4">
            <div className='sm:text-center'>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white ">Conference Management</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/create-conference" className="hover:underline">Create Conference</Link>
                </li>
                <li className="mb-4">
                  <Link href="/dashboard" className="hover:underline">Manage Conference</Link>
                </li>
              </ul>
            </div>
            <div className='sm:text-center'>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow Us</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="https://www.linkedin.com/in/adroid-connectz-44b65527b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:underline">LinkedIn</Link>
                </li>
                <li>
                  <Link href="https://www.facebook.com/profile.php?id=61565882447804&mibextid=LQQJ4d" className="hover:underline">Facebook</Link>
                </li>
              </ul>
            </div>
            <div className='sm:text-center'>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">About Us</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/about-us" className="hover:underline">About Us</Link>
                </li>
                <li>
                  <Link href="contact-us" className="hover:underline">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className='sm:text-center '>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms-conditions" className="hover:underline">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <Link href="/" className="hover:underline">Adroid CMS™</Link>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-6">
            <Link href="https://www.facebook.com/profile.php?id=61565882447804&mibextid=LQQJ4d" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Facebook page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
