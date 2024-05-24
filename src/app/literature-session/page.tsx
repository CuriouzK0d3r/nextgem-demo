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

function LiteratureSearchPage() {
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
        <PageLayout pageName='Literature Review' isLoggedIn={isLoggedIn} checkLogin={true}>
            {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
            <div className="w-full min-h-[45rem] mt-0 flex items-center justify-center ">
                <div className="grid grid-cols-2 gap-4">
                    <a href='/literature-review?new=true' className='mb-12'>
                        <div className="menu-box members-cat mr-8">
                            <div className=" w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                                <img width={90} className='mx-auto pt-8' src="./input-logo.svg" alt="" />
                                <span className='text-white'>
                                    New Review
                                </span>
                            </div>
                        </div>
                    </a>
                    <a href='/literature-review'>
                        <div className="menu-box members-cat">
                            <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                                <img width={93} className='mx-auto pt-8' src="./modeling-logo.svg" alt="" />
                                <span className='text-white'>
                                    Last Review
                                </span>
                            </div>
                        </div>
                    </a>
                    <a href='/literature-review-history'>
                        <div className="menu-box members-cat">
                            <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                                <img width={93} className='mx-auto pt-8' src="./modeling-logo.svg" alt="" />
                                <span className='text-white'>
                                    Review History
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* </div> */}
        </ PageLayout>);
}

export default LiteratureSearchPage;