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
        {
            title: "Behavioural and developmental dfferentiations in bees by 5G exposure... ",
            description: "Continuous Exposure of bees",
            typeOfStudy: "In Vivo",
            outputType: "Video/Audio",
            location: "Lorem",
            status: "Restricted",
            img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
            name: "Spotify",
            amount: "$2,500",
            date: "Wed 3:00pm",
            //   status: "paid",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            title: "Cumulative 5G Exposure in indoor working environment",
            description: "Cumulative Exposure in indoor working environment",
            typeOfStudy: "Simulation",
            outputType: "Poster",
            location: "CIMNE",
            status: "Restricted",
            img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
            name: "Spotify",
            amount: "$2,500",
            date: "Wed 3:00pm",
            //   status: "paid",
            account: "visa",
            accountNumber: "1234",
            expiry: "06/2026",
        },
        {
            title: "Combined 5G, WiFi  Exposure",
            description: "Lorem ipsum dolor sit amet, consectetur ",
            typeOfStudy: "In Silico",
            outputType: "Dataset",
            location: "Lorem",
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

                    <CardBody placeholder={""} className=" px-0">
                        <table className="w-full mt-12 mx-auto table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                placeholder={""}
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
                                                            className='mb-6'
                                                            color={
                                                                status === "Public"
                                                                    ? "green"
                                                                    : status === "Restricted"
                                                                        ? "orange"
                                                                        : ""
                                                            }
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
                    <CardFooter className="flex justify-center  border-t border-blue-gray-50 p-4">
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