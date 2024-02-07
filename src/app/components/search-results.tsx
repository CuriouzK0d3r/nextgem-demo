import React from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    IconButton,
    Typography
} from "@material-tailwind/react";
import { MoreDialog } from './helpers/more-dialog';

function DefaultPagination({ searchResults, active, setActive }: { searchResults: any[], active: number, setActive: React.Dispatch<React.SetStateAction<number>> }) {
    const getItemProps = (index: number) =>
    ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => setActive(index),
    } as any);

    const next = (pagesNo: number) => {
        if (active === pagesNo) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 0) return;

        setActive(active - 1);
    };

    const pagesNo = Math.ceil(searchResults.length / 5);

    return (
        <div className="flex items-center gap-4 mt-4">
            <Button
                placeholder={""}
                variant="text"
                className="flex items-center gap-2 bg-[#eee]"
                onClick={prev}
                disabled={active === 0}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                {active >= 3 ? "...": ""}
                {
                    Array.from(Array(pagesNo).keys()).slice(active > 2 ? active - 2 : 0, active > 3 ? active + 3 : active + 5).map((i, index) => {
                        return <IconButton key={index} {...getItemProps(i)}>{i + 1}</IconButton>;
                    })
                }
                {active <= (pagesNo - 4) ? "...": ""}
            </div>
            <Button
                placeholder={""}
                variant="text"
                className="flex items-center gap-2"
                onClick={() => next(pagesNo)}
                disabled={active === pagesNo - 1}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}

const SearchResults: React.FC<any> = ({ searchResults, mode, setMode, seletedSources, setSearchResults }) => {
    const [active, setActive] = React.useState(0);

    const TABLE_HEAD = ["Title", "Type of Study", "Output Type", "Location", "Status", " "];

    const studyTypeMap: any = {
        inVitro: "In Vitro",
        inVivo: "In Vivo",
        inSilico: "In Silico",
        exVivo: "Ex Vivo",
        humanStudies: "Human Studies",
        simulation: "Simulation",
        riskAssessment: "Risk Assessment",
        exposureAssessment: "Exposure Assessment"
    };

    const TABLE_ROWS = searchResults.slice(active * 5, active * 5 + 5);
    // const TABLE_ROWS = [
    //     {
    //         title: "Epigenetic Tests on HaCat after FR2 limited exposure ",
    //         description: "Limited Exposure of HaCat 0.1",
    //         typeOfStudy: "In Vitro",
    //         outputType: "Publication",
    //         location: "CNR",
    //         status: "Public",
    //         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    //         name: "Spotify",
    //         amount: "$2,500",
    //         date: "Wed 3:00pm",
    //         //   status: "paid",
    //         account: "visa",
    //         accountNumber: "1234",
    //         expiry: "06/2026",
    //     },
    //     {
    //         title: "Behavioural and developmental dfferentiations in bees by 5G exposure... ",
    //         description: "Continuous Exposure of bees",
    //         typeOfStudy: "In Vivo",
    //         outputType: "Video/Audio",
    //         location: "Lorem",
    //         status: "Restricted",
    //         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    //         name: "Spotify",
    //         amount: "$2,500",
    //         date: "Wed 3:00pm",
    //         //   status: "paid",
    //         account: "visa",
    //         accountNumber: "1234",
    //         expiry: "06/2026",
    //     },
    //     {
    //         title: "Cumulative 5G Exposure in indoor working environment",
    //         description: "Cumulative Exposure in indoor working environment",
    //         typeOfStudy: "Simulation",
    //         outputType: "Poster",
    //         location: "CIMNE",
    //         status: "Restricted",
    //         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    //         name: "Spotify",
    //         amount: "$2,500",
    //         date: "Wed 3:00pm",
    //         //   status: "paid",
    //         account: "visa",
    //         accountNumber: "1234",
    //         expiry: "06/2026",
    //     },
    //     {
    //         title: "Combined 5G, WiFi  Exposure",
    //         description: "Lorem ipsum dolor sit amet, consectetur ",
    //         typeOfStudy: "In Silico",
    //         outputType: "Dataset",
    //         location: "Lorem",
    //         status: "Public",
    //         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
    //         name: "Spotify",
    //         amount: "$2,500",
    //         date: "Wed 3:00pm",
    //         //   status: "paid",
    //         account: "visa",
    //         accountNumber: "1234",
    //         expiry: "06/2026",
    //     },
    // ];
    return (
        <div className={`w-full min-h-[68rem] mt-0 flex items-center justify-center`}>
            <Card placeholder="" className="mt-6 w-3/4 min-h-[30rem] mx-auto form-container object-cover object-center shadow-xl shadow-blue-gray-900/50">
                <CardHeader placeholder="" className='bg-[#D4D9DD] text-black'>
                    <Typography placeholder="" variant="h2" className="text-center pb-4 pt-4">
                        Search Results
                    </Typography>
                    {/* <h3 className='mb-8 text-4xl .title-color text-center mx-auto'>Search Scientific Catalogue</h3> */}
                </CardHeader>

                <CardBody placeholder={""} className=" px-0">
                    <Typography as="a" placeholder="" onClick={() => (setSearchResults([]))} variant="small" color="blue-gray" className="font-medium mb-4 cursor-pointer	">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="float-left w-12 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                        New Search
                    </Typography>

                    <table className="w-full mt-6 mx-auto table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={index}
                                        className={`border-b border-blue-gray-100 bg-blue-gray-50 p-4 pb-0 ${['More', 'Status', 'Output Type', 'Type of Study'].includes(head) ? 'hidden lg:table-cell': ''}`}
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
                                        institution,
                                        studyType,
                                        privacyLevel,
                                    }: any,
                                    index: number,
                                ) => {
                                    const isLast = index === TABLE_ROWS.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={index} className="even:bg-blue-gray-50/50">
                                            <td className={classes}>
                                                <div className="flex items-center w-[15rem] md:w-[25rem] xl:w-[42rem]">

                                                    <Typography
                                                        placeholder=""
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-bold"
                                                    >
                                                        {title}
                                                    </Typography>
                                                </div>
                                            </td>
                                            {/* <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {description}
                                                    </Typography>
                                                </td> */}
                                            <td className='hidden lg:table-cell'>
                                                <Typography
                                                    placeholder=""
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal hidden lg:table-cell"
                                                >
                                                    {studyType ? studyTypeMap[studyType] : "N/A"}
                                                </Typography>
                                            </td>
                                            <td className={classes + ' hidden lg:table-cell'}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            placeholder=""
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal capitalize "
                                                        >
                                                            {outputType || "N/A"}
                                                        </Typography>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col w-30 text-left">
                                                        <Typography
                                                            placeholder=""
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal capitalize  text-left"
                                                        >
                                                            {institution || location}
                                                        </Typography>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes + ' hidden lg:table-cell'}>
                                                <div className="w-max hidden lg:table-cell">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={privacyLevel}
                                                        className='mb-6'
                                                        color={
                                                            privacyLevel === "Public" || privacyLevel === "open"
                                                                ? "green"
                                                                : privacyLevel === "restricted" || privacyLevel === "sensitive"
                                                                    ? "orange"
                                                                    : "gray"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <Typography placeholder={""} as="a" href="#" variant="small" color="blue-gray" className="font-medium mb-4 hidden lg:table-cell">
                                                    <MoreDialog description={description} />
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter placeholder={""} className="flex justify-center  border-t border-blue-gray-50 p-4">
                    <DefaultPagination active={active} setActive={setActive} searchResults={searchResults} />
                </CardFooter>
            </Card>
        </div>
    );
};

export default SearchResults;
