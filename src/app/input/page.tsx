"use client"

import { useState } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import PageLayout from '../components/page-layout';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function InputPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    const checkLoginStatus = () => {
        const apiEndpoint = "/api/auth/token";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                access_token: Cookies.get('token'),
            }),
        })
            .then(async (response) => {
                if (response.ok) {
                    let responseJSON = await response.json();
                    console.log(responseJSON)
                    if (responseJSON.loggedin) {
                        setIsLoggedIn(true);
                    }
                } else {
                    console.error("Login failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    checkLoginStatus();

    return (
        <PageLayout isLoggedIn={isLoggedIn} pageName='members'>
            {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
            <div className="w-full min-h-[58rem] mt-0 flex items-center justify-center ">
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