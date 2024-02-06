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
import ChatResults from '../components/chat-results';
import ChatForm from '../components/chat-form';
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function RASearchPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [chatMessage, setChatMessage] = useState('');
    const [searchType, setSearchType] = useState('All Fields');
    const [messageNo, setMessageNo] = useState(0);
    const [finished, setFinished] = useState<boolean>(false);

    const [submittedQuery, setSubmittedQuery] = useState('');

    /**
     * Handles the search event and sets the submitted query.
     *
     * @param {React.FormEvent<any>} e - the search event
     * @return {void} 
     */
    const handleChat = (e: React.FormEvent<any>) => {
        e.preventDefault();
        setSubmittedQuery(chatMessage);
    };


    checkLoginStatus(setIsLoggedIn);

    return (
        <PageLayout pageName='members' isLoggedIn={isLoggedIn} skipLogin={false}>
            {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
            <div className='w-full text-center place-items-center min-h-[68rem]'>
                {submittedQuery.length == 0 ?
                    <h1 className="mb-6 text-center mt-48 text-4xl">Your <AnimatedText /> <Menu placement="bottom-start">
                        <MenuHandler>
                            <Button
                                placeholder={"Search Engine"}
                                ripple={false}
                                variant="text"
                                // color="blue-gray"
                                className="rounded-lg object-cover object-center shadow-md shadow-blue-gray-900/50 h-16 items-center  border-white bg-gradient-to-r from-cyan-500 to-blue-500  inline text-gray-800  text-4xl normal-case underline-offset-4 underline "
                            >
                                AI Chat.
                            </Button>
                        </MenuHandler>
                        <MenuList placeholder={""} className="max-h-[20rem] max-w-[18rem] text-gray-800 text-lg">
                            <MenuItem placeholder={""}

                                className="flex items-center gap-2"
                            ><Link href="/ra-search">Search Engine</Link></MenuItem>
                            <MenuItem placeholder={""}

                                className="flex items-center gap-2"
                            ><Link href="/ra-chat">AI Chat</Link></MenuItem>
                        </MenuList>
                    </Menu></h1> : <></>
                }
                <ChatResults finished={finished} setFinished={setFinished} setSubmittedQuery={setSubmittedQuery} setChatMessage={setChatMessage} submittedQuery={submittedQuery} type={searchType.toLowerCase()}></ChatResults>
                <div className={classNames("relative flex mx-auto place-items-center w-full md:w-5/6", submittedQuery.length ? "mt-9" : "mt-0")}>
                    {/* create a search form with tailwindcss */}
                    <ChatForm finished={finished} setFinished={setFinished} submittedQuery={submittedQuery} handleSearch={handleChat}
                        chatMessage={chatMessage} setChatMessage={setChatMessage}></ChatForm>

                </div>
            </div>
            {/* </div> */}
        </ PageLayout >);
}

export default RASearchPage;