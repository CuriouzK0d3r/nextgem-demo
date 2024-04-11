"use client"

import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Card,
    Chip,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import PageLayout from '../components/page-layout';
import { checkLoginStatus } from '../helpers/login';

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
        <PageLayout pageName='members' isLoggedIn={isLoggedIn} skipLogin={false}>
            <div className='w-full text-center place-items-center min-h-[48rem]'>
                <div className={classNames("relative flex mx-auto place-items-center w-full md:w-5/6", submittedQuery.length ? "mt-9" : "mt-0")}>
                <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4 ml-0 text-left">
        <Typography variant="h5" color="blue-gray">
          New RA Session
        </Typography>
      </div>
      <span className="text-left">
      History
      </span>
      <List>
        <ListItem className="ml-8">
          Sessions
        </ListItem>
        <ListItem className="ml-12">
          
          Literature Search
        </ListItem>
        <ListItem className="ml-20">
          Search 1
        </ListItem>
      </List>
    </Card>
                </div>
            </div>
        </ PageLayout>);
}

export default RASearchPage;