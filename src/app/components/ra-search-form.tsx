
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import React, { Fragment } from 'react';

interface SearchFormProps {
    handleSearch: (searchTerm: React.FormEvent<HTMLFormElement>) => void;
    searchType: string;
    setSearchType: (searchType: string) => void;
    setCurrentPage: (currentPage: number) => void;
    currentPage: number;
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const SearchForm: React.FC<SearchFormProps> = ({ handleSearch, searchType, setSearchType, setCurrentPage, currentPage, searchQuery, setSearchQuery }) => {

    return (
        <form className='flex-1' onSubmit={handleSearch}>
            <div className="flex">
                {/* <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label> */}
                <Menu as="div" className="relative flex-none text-left w-[138px]">
                    <div>
                        <Menu.Button style={{ borderWidth: "2px", borderColor: "#6359E1", borderTopLeftRadius: "8px" }} id="dropdown-button" data-dropdown-toggle="dropdown" className=" w-[150px]  h-[70px] flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center 
            text-gray-900 bg-[#D9D9D9] border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none
             focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700
              dark:text-white dark:border-gray-600 pl-9">
                            {searchType}
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 divide-y">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            onClick={() => { setSearchType('All Fields'); setCurrentPage(1); }}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm font-bold'
                                            )}
                                        >
                                            All Fields
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            onClick={() => { setSearchType('Title'); setCurrentPage(1); }}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm font-bold'
                                            )}
                                        >
                                            Title
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            onClick={() => { setSearchType('Author'); setCurrentPage(1); }}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm font-bold'
                                            )}
                                        >
                                            Author
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => { setSearchType('Abstract'); setCurrentPage(1); }}
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm font-bold'
                                            )}
                                        >
                                            Abstract
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => { setSearchType('Subject'); setCurrentPage(1); }}
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm font-bold'
                                            )}
                                        >
                                            Subject
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            onClick={() => { setSearchType('DOI'); setCurrentPage(1); }}
                                            href="#"
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block px-4 py-2 text-sm font-bold'
                                            )}
                                        >
                                            DOI
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
                <div className="relative inline-block flex-1">
                    <input
                        style={{ borderWidth: "2px", borderColor: "#6359E1" }}
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); }}
                        type="search" id="search-dropdown" className="bg-[#D9D9D9] w-full h-[70px] block p-2.5 z-20 text-sm text-gray-800 
                 rounded-r-lg border-l-gray-50 border-l-2 border placeholder-gray-800 border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                " placeholder="Search Titles, DOIs, Authors, Subjects" required />
                </div>
                <div className='flex-none'>
                    <button style={{ borderWidth: "2px", borderColor: "#6359E1", borderTopLeftRadius: "8px" }} type="submit" className="w-[100px] absolute top-0 right-0 pl-6 text-sm font-medium h-full text-white bg-[#1D2E66] rounded-r-lg border border-blue-500 hover:bg-[#1d3f66] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-[#1d3f66] dark:focus:ring-blue-700">
                        <svg className="w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;
