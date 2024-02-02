
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment, useEffect, useState } from 'react';

interface SearchFormProps {
  handleSearch: (searchTerm: React.FormEvent<HTMLFormElement>) => void;
  chatMessage: string;
  setChatMessage: (arg0: string) => void
  submittedQuery: string;
  finished: boolean;
  setFinished: (finished: boolean) => void
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ChatForm: React.FC<SearchFormProps> = ({ finished, setFinished, handleSearch, chatMessage, setChatMessage, submittedQuery }) => {
  const [placeholder, setPlaceholder] = useState("Chat with NextGEM AI");

  useEffect(()=> {
    if (submittedQuery.length > 0) {
      setPlaceholder("Send message");
    }
  }, [submittedQuery]);

  return (
    <div className="w-full flex flex-col left-0 ">
      <form className='flex-1' onSubmit={handleSearch}>
        <div className="flex">
          {/* <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label> */}
          <div className="relative inline-block flex-1 h-[70px]">
            <input
              style={{ borderWidth: "2px", borderColor: "#6359E1" }}
              value={chatMessage}
              onChange={(e) => { setChatMessage(e.target.value); }}
              type="search" id="search-dropdown" className="rounded-lg w-full h-[70px] block p-2.5 z-20 text-sm text-gray-900 
                bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:border-blue-500" placeholder={placeholder} required />
          </div>
          <div className='flex-none'>
            <button style={{ borderWidth: "2px", borderColor: "#6359E1", borderTopLeftRadius: "8px" }} type="submit" className=" w-[100px] absolute top-0 right-0 pl-9 text-sm font-medium h-[70px] text-white bg-blue-500 rounded-r-lg border border-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
      {submittedQuery.length > 0 && !finished &&
        <button onClick={() => { setFinished(true); }} className="btn btn-no-border ms-n2 m-0 pb-3 ps-0 btn-sm lift  text-left relative mt-4" type="button" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pb-1 w-6 h-6 mr-2 inline">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z" />
        </svg>
          Stop [Esc]
        </button>
      }
    </div>
  );
};

export default ChatForm;
