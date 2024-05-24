"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../components/page-layout';
import { checkLoginStatus } from '../helpers/login';
import AnimatedText from '../components/helpers/AnimatedText';
import SearchForm from '../components/ra-search-form';
import SearchResultsTable from '../components/ra-search-results';
import {
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import Link from 'next/link';
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function RASearchPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('All Fields');
    const [currentPage, setCurrentPage] = useState(1);

    const [submittedQuery, setSubmittedQuery] = useState('');

    checkLoginStatus(setIsLoggedIn);
    const handleSearch = (e: React.FormEvent<any>) => {
        e.preventDefault();
        setSubmittedQuery(searchQuery);
    };

    return (
        <PageLayout pageName='Risk Assesment' isLoggedIn={isLoggedIn} checkLogin={true}>
            {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
            <div className="w-full min-h-[45rem] mt-0 flex items-center justify-center ">
                <div className="grid grid-cols-2 gap-4">
                    <a href='/literature-search' className='mb-12'>
                        <div className="menu-box members-cat mr-8">
                            <div className=" w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                                <img width={90} className='mx-auto pt-8' src="./input-logo.svg" alt="" />
                                <span className='text-white'>
                                    Literature Search
                                </span>
                            </div>
                        </div>
                    </a>
                    <a href='/literature-search-history'>
                        <div className="menu-box members-cat">
                            <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto pt-10 w-20 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                </svg>

                                <span className='text-white'>
                                    Search History
                                </span>
                            </div>
                        </div>
                    </a>

                    <a href='ra-chat'>
                        <div className="menu-box members-cat">
                            <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                                <img width={93} className='mx-auto pt-8' src="./chatbot.svg" alt="" />
                                <span className='text-white'>
                                    AI Chat
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* </div> */}
        </ PageLayout>);
}

export default RASearchPage;