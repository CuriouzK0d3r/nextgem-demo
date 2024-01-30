"use client"

import { useState } from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import PageLayout from '../components/page-layout';

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function SearchResultsPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const TABLE_HEAD = ["Title", "Description", "Type of Study", "Output Type", "Location", "Status"];

    const TABLE_ROWS = [
        {
            title: "Epigenetic Tests on HaCat after FR2 limited exposure ",
            description: "Limited Exposure of HaCat 0.1",
            typeOfStudy: "In Vitro",
            outputType: "Publication",
            location: "CNR",
            status: "Public",
            img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
            name: "Spotify",
            amount: "$2,500",
            date: "Wed 3:00pm",
            //   status: "paid",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        // {
        //     img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
        //     name: "Amazon",
        //     amount: "$5,000",
        //     date: "Wed 1:00pm",
        //     status: "paid",
        //     account: "master-card",
        //     accountNumber: "1234",
        //     expiry: "06/2026",
        // },
        // {
        //     img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
        //     name: "Pinterest",
        //     amount: "$3,400",
        //     date: "Mon 7:40pm",
        //     status: "pending",
        //     account: "master-card",
        //     accountNumber: "1234",
        //     expiry: "06/2026",
        // },
        // {
        //     img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
        //     name: "Google",
        //     amount: "$1,000",
        //     date: "Wed 5:00pm",
        //     status: "paid",
        //     account: "visa",
        //     accountNumber: "1234",
        //     expiry: "06/2026",
        // },
        // {
        //     img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
        //     name: "netflix",
        //     amount: "$14,000",
        //     date: "Wed 3:30am",
        //     status: "cancelled",
        //     account: "visa",
        //     accountNumber: "1234",
        //     expiry: "06/2026",
        // },
    ];

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

    const openTab = (evt: any, tabName: any) => {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            // tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        // document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
    };

    const TextInputComponent = ({ label, type, required, ref }: any) => {
        return (
            <div className="flex flex-row mt-4">
                <label className="mb-2 ttext-based text-gray-900 mr-4">{label}:</label>
                <input
                    className="border border-gray-400 p-2 rounded-lg w-3/4 appearance-none focus:outline-none focus:border-gray-500"
                    type={type}
                    id={label}
                    name={label}
                    placeholder={"Insert text"}
                    required={required}
                // ref={ref}
                />
            </div>
        );
    };

    const SelectInputComponent = ({ label, values, required, ref }: any) => {
        return (
            <div className="flex flex-row mt-4">
                <label className="mb-2 text-base text-gray-900 mr-4">{label}</label>
                <select
                    className="text-sm rounded-lg  block p-2.5   w-3/4 dark:border-gray-600">
                    {values.map((value: any) => (
                        <option key={value} value={value}>{value}</option>
                    ))
                    }
                </select>
            </div>
        );
    }

    return (
        <PageLayout isLoggedIn={isLoggedIn}>
            {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
            <div className="w-full min-h-[68rem] mt-0 flex items-center justify-center ">
                <Card className="mt-6 w-1/2 min-h-[30rem] mx-auto form-container object-cover object-center shadow-xl shadow-blue-gray-900/50">
                    <CardHeader className='bg-[#D4D9DD] text-black'>
                        <Typography variant="h2" className="text-center pb-4 pt-4">
                            Search Results
                        </Typography>
                        {/* <h3 className='mb-8 text-4xl .title-color text-center mx-auto'>Search Scientific Catalogue</h3> */}
                    </CardHeader>

                    <CardBody className="overflow-scroll px-0">
                        <table className="w-full mt-12 mx-auto table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {TABLE_ROWS.map(
                                    (
                                        {
                                            title,
                                            description,
                                            typeOfStudy,
                                            outputType,
                                            location,
                                            img,
                                            name,
                                            amount,
                                            date,
                                            status,
                                            account,
                                            accountNumber,
                                            expiry,
                                        },
                                        index,
                                    ) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast
                                            ? "p-4"
                                            : "p-4 border-b border-blue-gray-50";

                                        return (
                                            <tr key={name}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">

                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-bold"
                                                        >
                                                            {title}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {description}
                                                    </Typography>
                                                </td>
                                                <td >
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {typeOfStudy}
                                                    </Typography>
                                                </td>

                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">

                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal capitalize"
                                                            >
                                                                {outputType}
                                                            </Typography>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">

                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal capitalize"
                                                            >
                                                                {location}
                                                            </Typography>

                                                        </div>
                                                    </div>
                                                </td>

                                                <td className={classes}>
                                                    <div className="w-max">
                                                        <Chip
                                                            size="sm"
                                                            variant="ghost"
                                                            value={status}
                                                        // color={
                                                        //     status === "paid"
                                                        //         ? "green"
                                                        //         : status === "pending"
                                                        //             ? "amber"
                                                        //             : "red"
                                                        // }
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <div className="flex items-center gap-2">
                            <IconButton variant="outlined" size="sm">
                                1
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                2
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                3
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                ...
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                8
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                9
                            </IconButton>
                            <IconButton variant="text" size="sm">
                                10
                            </IconButton>
                        </div>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            {/* </div> */}
        </ PageLayout>);
}

export default SearchResultsPage;