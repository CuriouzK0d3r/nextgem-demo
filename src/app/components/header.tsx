import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
const Header = ({isLoggedIn}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-niki-blue p-6 z-10">
      <div className="flex flex-shrink-0 text-white ml-[8%]">
        <span className="font-semibold text-xl tracking-tight">
          <a href="/">
          <img
          className="mr-3"
          src="https://subra.ics.forth.gr/wp-content/uploads/2024/01/NIKH-logoname.png"
          alt="logo-img"
          id="logo-img"
        />
        </a></span>
      </div>
      <div className="block lg:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" /></svg>
        </button>
      </div>
      <div className={`${isOpen ? `block` : `hidden`} w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-28`}>
        <div className="text-sm w-full ml-10 items-end">
          <div className="box inline-block mr-8">
            {/* <div className="rectangle" > */}
            <div className="w-6/7 flex justify-end items-center relative">
            <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5 -mr-8 w-10 z-10">
                      <path
                          fillRule="evenodd"
                          d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                          clipRule="evenodd" />
                  </svg>
            <input
          type="search"
          className="relative m-0 block w-full min-w-0 pl-12 flex-auto rounded-xl border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          id="nav-search"
          placeholder="Search for EMF studies, papers, journal articles..." />
          </div>
            {/* <div className="label">
      <p className="text-wrapper">Search for EMF studies, papers, journal articles...</p>
    </div> */}
              {/* </div> */}
          </div>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12 ml-12 text-lg">
            Authorities
          </a>
          <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12 text-lg">
            Citizens
          </a>
          <a href="/search" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-12 text-lg">
            Scientists
          </a>
          <a href="/members" className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-20 text-lg">
            Members
          </a>
        </div>
        {!isLoggedIn &&
        <button className="login-button font-bold w-30 mr-[15%]"><a href='/login'>Login</a></button>
        }
      </div>
    </nav>
  );
};

export default Header;