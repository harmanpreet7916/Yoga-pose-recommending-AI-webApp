import React from "react";
import image from "../assets/images/home.jpg";

export default function Home() {
  return (
    <>
      <main class=" h-screen  overflow-hidden bg-white dark:bg-gray-800">
        <div class=" flex items-center overflow-hidden bg-white dark:bg-gray-800">
          <div class="container relative flex px-6 py-16 mx-auto mt-10">
            <div class="relative  flex flex-col sm:w-2/3 lg:w-2/5">
              <span class="w-20 h-2 mb-12 bg-gray-800 dark:bg-white"></span>
              <h1 class="flex flex-col text-6xl font-black leading-none text-gray-800 uppercase font-bebas-neue sm:text-8xl dark:text-white">
                Be on
                <span class="text-5xl sm:text-7xl">Time</span>
              </h1>
              <p class="text-sm text-gray-700 sm:text-base dark:text-white">
                Dimension of reality that makes change possible and
                understandable. An indefinite and homogeneous environment in
                which natural events and human existence take place.
              </p>
              <div class="flex mt-8">
                <a
                  href="/"
                  class="px-4 py-2 mr-4 text-white uppercase bg-pink-500 border-2 border-transparent rounded-lg text-md hover:bg-pink-400"
                >
                  Get started
                </a>
                <a
                  href="/"
                  class="px-4 py-2 text-pink-500 uppercase bg-transparent border-2 border-pink-500 rounded-lg dark:text-white hover:bg-pink-500 hover:text-white text-md"
                >
                  Read more
                </a>
              </div>
            </div>
            <div class="relative hidden sm:block sm:w-1/3 lg:w-3/5">
              <img src={image} alt="" class="max-w-xs m-auto md:max-w-sm" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
