"use client"

import { useState } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import PageLayout from '../components/page-layout';
import { checkLoginStatus } from '../helpers/login';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function InputPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    checkLoginStatus(setIsLoggedIn);

    return (
        <PageLayout isLoggedIn={isLoggedIn} pageName='input' skipLogin={false}>
            {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
            <div className="w-full min-h-[48rem] mt-0 flex items-center justify-center ">
                <a href='/upload?tab=form' className=''>
                    <div className="menu-box members-cat  mr-8">
                        <div className=" w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                            <img width={90} className='mx-auto pt-8' src="./input-logo.svg" alt="" />
                            <span className='text-white'>
                                Input Scientific data
                            </span>
                        </div>
                    </div>
                </a>
                <a href='/upload?tab=file'>
                    <div className="menu-box members-cat">
                        <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                            <img width={90} className='mx-auto pt-8' src="./file-logo.svg" alt="" />
                            <span className='text-white'>
                                Input Files
                            </span>
                        </div>
                    </div>
                </a>
            </div>
            {/* </div> */}
        </ PageLayout>);
}

export default InputPage;