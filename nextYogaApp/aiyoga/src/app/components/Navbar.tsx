// write react js code for navbar component

import Image from 'next/image'
import React from 'react'
import foto from './sitting.jpg'
export default function Navbar() {
  return (
    <div >
      <nav className="bg-[#003914] bg-opacity-30 backdrop-blur-lg  fixed top-0 left-0 right-0 z-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Image className="h-8 w-8" src={foto} alt="Logo" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="https://www.linkedin.com/in/harmanpreetsingh0013/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=in" target='_blank' className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
                <a href="mailto:harmanpreetgirn@gmail.com" target='_blank' className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                {/* <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Services</a> */}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <button className="bg-[#00ca41] text-white px-3 py-2 rounded-md text-sm font-medium">Sign In</button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="bg-gray-800 text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
    </div>
  )
}
