"use client"

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Option,
    Select,
    Typography
} from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from 'js-cookie';
import { createRef, useEffect, useState } from 'react';
import ExternalSources from '../components/external-sources';
import PageLayout from '../components/page-layout';
import SearchResults from '../components/search-results';

function SearchPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mode, setMode] = useState<string>("search");
    const [fieldRefs, setFieldRefs] = useState<any>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any>({});
    const [chosenSources, setChosenSources] = useState<string[]>([]);
    const [inputFields, setInputFields] = useState<any>([]);
    const [inputState, setInputState] = useState<any>([]);

    // const descriptionFields = [
    //     {
    //         label: "Title",
    //         field: 'title',
    //         type: "text",
    //         required: false
    //     },
    //     {
    //         label: "Institution",
    //         field: 'institution',
    //         type: "text",
    //         required: false
    //     },
    //     {
    //         label: "Keywords",
    //         field: 'keywords',
    //         type: "text",
    //         required: false
    //     },
    //     // {
    //     //   label: "Authors",
    //     //   field: 'authors',
    //     //   type: "text",
    //     //   required: false
    //     // },
    //     {
    //         label: "Type of Study",
    //         field: 'studyType',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //             "exVivo",
    //             "exposureAssessment",
    //             "humanStudies",
    //             "inVitro",
    //             "inVivo",
    //             "riskAssesment",
    //             "simulation"
    //         ]
    //     },
    //     {
    //         label: "Type of Output",
    //         field: 'outputType',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //             "audio",
    //             "codebook",
    //             "dataset",
    //             "deliverable",
    //             "image",
    //             "poster",
    //             "presentation",
    //             "publication",
    //             "report",
    //             "software",
    //             "video"
    //         ]
    //     },
    //     {
    //         label: "Topics",
    //         field: 'topics',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     },
    //     {
    //         label: "Publication Year",
    //         field: 'publicationYear',
    //         type: "text",
    //         required: false
    //     },
    //     {
    //         label: "Privacy Level",
    //         field: 'privacyLevel',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //             "Public",
    //             "Restricted"
    //         ]
    //     },
    //     {
    //         label: "Identifier",
    //         field: 'identifier',
    //         type: "text",
    //         required: false
    //     }];

    // const descriptionFields
    // const indicativeFields = [];
    // const indicativeFields = [
    //     {
    //         label: "Frequency Ranges",
    //         field: 'frequencyRanges',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     },
    //     {
    //         label: "Modulation",
    //         field: 'modulation',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //             "NR",
    //             "No Modulation"
    //         ]
    //     },
    //     {
    //         label: "Exposure Conditions",
    //         field: 'exposureConditions',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     },
    //     {
    //         label: "Exposure Sources",
    //         field: 'exposureSources',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     },
    //     {
    //         label: "Environment",
    //         field: 'environment',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     },
    //     {
    //         label: "Microenvironment",
    //         field: 'microenvironment',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     },
    //     {
    //         label: "Biological Model",
    //         field: 'biologicalModel',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     },
    //     {
    //         label: "BioSpecific Endpoints",
    //         field: 'bioSpecificEndpoints',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     },
    //     {
    //         label: "Methods",
    //         field: 'methods',
    //         type: "select",
    //         required: false,
    //         values: [
    //             "--",
    //         ]
    //     }
    // ];

    // descriptionFields.forEach((field) => {
    //     inputFields[field.field] = "";
    // });
    // indicativeFields.forEach((field) => {
    //     inputFields[field.field] = "";
    // });



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

    function clearState() {
        let inputs: any = {};
        for (let i = 0; i < inputFields.length; i++) {
            inputs[inputFields[i].fieldName] = "";
        }
        setInputState(inputs);
    }

    useEffect(() => {
        fetch("/api/fields", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(async (response) => {
                if (response.ok) {
                    let responseJSON = await response.json();
                    setInputFields(responseJSON.fields);
                    clearState();
                } else {
                    console.error("Request failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        // descriptionFields.forEach((field) => {
        //   fields[field.field] = createRef();
        // });
        // indicativeFields.forEach((field) => {
        //   fields[field.field] = createRef();
        // });
        checkLoginStatus();
        // setFieldRefs(fields);
    }, []);


    return (
        <PageLayout isLoggedIn={isLoggedIn} skipLogin={false} pageName={"scientists"}>
            <AnimatePresence>
                {
                    searchResults.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2 }}
                        >
                            <SearchResults mode={mode} setMode={setMode} setSearchResults={setSearchResults} searchResults={searchResults} />
                        </motion.div>
                    )
                        :
                        (
                            <div className={`w-full mt-32 min-h-[65rem]`}>
                                <Card placeholder={""} className="mt-6 w-1/2 mx-auto form-container rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50">
                                    <CardHeader placeholder={""} className='bg-[#D4D9DD] text-black'>
                                        <Typography placeholder={""} variant="h2" className="text-center pb-4 pt-4">
                                            Search Scientific Catalogue
                                        </Typography>
                                    </CardHeader>
                                    <CardBody placeholder={''}>
                                        <form className='mt-4' id="searchForm" onSubmit={(event) => { event.preventDefault(); setHasSubmitted(true); }}>
                                            <div className=" ">
                                                <div>
                                                    {/* <Typography variant="h5" placeholder={"Description"}>Description</Typography> */}
                                                    <div className='p-0 grid grid-cols-2 gap-x-12 gap-y-2 w-full mb-12'>
                                                        {
                                                            inputFields.map((field: any, index: any) => {
                                                                const words = field.fieldName.replace(/([a-z])([A-Z])/g, '$1 $2');

                                                                if (field.type == "String") {
                                                                    return (
                                                                        <div key={index} className=" mt-4 p-0">
                                                                            <Input value={inputState[field.fieldName]} onChange={(event) => { event.preventDefault(); setInputState({ ...inputState, [field.fieldName]: event.target.value }) }} name={field.fieldName}
                                                                                className='object-cover object-center shadow-sm shadow-blue-gray-900/50 bg-white' crossOrigin="true" style={{ color: "black" }} label={words.charAt(0).toUpperCase() + words.slice(1)} />
                                                                        </div>
                                                                    )
                                                                } else {
                                                                    return (<div key={index} className=" mt-4 w-full p-0">
                                                                        <Select name={field.fieldName} value={inputState[field.fieldName]} onChange={(event) => setInputState({ ...inputState, [field.fieldName]: event })}
                                                                            className='bg-white text-black ct-cover object-center shadow-sm shadow-blue-gray-900/50' label={words.charAt(0).toUpperCase() + words.slice(1)} placeholder={field.fieldName}>
                                                                            <Option key={index} value={"-"}>{"-"}</Option>
                                                                            {/* {field.values.map((value: any) => (
                                                                                <Option key={value} value={value}>{value}</Option>
                                                                            )) */}

                                                                        </Select>
                                                                    </div>);
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="p-0">
                                                    {/* <Typography variant="h5" placeholder={"Indicative Terms"}>Indicative Terms</Typography>
                                                    {
                                                        inputFields.map((field, index) => {
                                                            if (field.type == "text") {
                                                                return (
                                                                    <div key={index} className="flex flex-row mt-4 p-0">
                                                                        <Input ref={fieldRefs[field.field]} value={inputState[field.field]} onChange={(event) => { event.preventDefault(); setInputState({ ...inputState, [field.field]: event.target.value }) }} name={field.field} className='object-cover object-center shadow-sm shadow-blue-gray-900/50 bg-white' crossOrigin="true" style={{ color: "black" }} label={field.label} />
                                                                    </div>)
                                                            } else if (field.type == "select") {
                                                                return (
                                                                    <div key={index} className="flex flex-row mt-4 w-full p-0">
                                                                        <Select name={field.field} value={inputState[field.field]} onChange={(event) => setInputState({ ...inputState, [field.field]: event })}
                                                                            className='bg-white text-black ct-cover object-center shadow-sm shadow-blue-gray-900/50' label={field.label} placeholder={field.label}>
                                                                            {field.values.map((value: any) => (
                                                                                <Option key={value} value={value}>{value}</Option>
                                                                            ))
                                                                            }
                                                                        </Select>
                                                                    </div>
                                                                )
                                                            }
                                                        })
                                                    } */}
                                                </div>
                                            </div>
                                            <CardFooter placeholder={""} className="flex p-0 mt-4 justify-left">
                                                <Button placeholder={""} onClick={() => { setInputState(inputFields); setChosenSources([]); clearState() }} className="clear-button font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Clear</Button>
                                                <Button placeholder={""} id="searchBtn" type="submit" className="btn font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Search</Button>
                                            </CardFooter>
                                        </form>
                                    </CardBody>
                                </Card>
                                <ExternalSources hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} inputState={inputState} setSearchResults={setSearchResults} isLoggedIn={isLoggedIn} chosenSources={chosenSources} setChosenSources={setChosenSources} />
                            </div>
                        )}
            </AnimatePresence>
        </ PageLayout>);
}

export default SearchPage;