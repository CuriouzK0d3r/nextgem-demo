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
import { useEffect, useState } from 'react';
import ExternalSources from '../components/external-sources';
import PageLayout from '../components/page-layout';
import SearchResults from '../components/search-results';
import { checkLoginStatus } from "../helpers/login";

function SearchPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mode, setMode] = useState<string>("search");
    const [fieldRefs, setFieldRefs] = useState<any>({});
    const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
    const [searchResults, setSearchResults] = useState<any>({});
    const [chosenSources, setChosenSources] = useState<string[]>([]);
    const [inputFields, setInputFields] = useState<any>([]);
    const [inputState, setInputState] = useState<any>([]);

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

        checkLoginStatus(setIsLoggedIn);
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
                                                                            {/* <Option key={index} value={"-"}>{"-"}</Option> */}
                                                                            {field.enumValues.map((value: any) => (
                                                                                <Option key={value} value={value}>{value}</Option>
                                                                            ))}
                                                                        </Select>
                                                                    </div>);
                                                                }
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="p-0">
                                                        
                                                </div>
                                            </div>
                                            <CardFooter placeholder={""} className="flex p-0 mt-4 justify-left">
                                                <Button placeholder={""} onClick={() => { setInputState(inputFields); setChosenSources([]); clearState() }} className="clear-button font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Clear</Button>
                                                <Button placeholder={""} id="searchBtn" type="submit" className="btn font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Search</Button>
                                            </CardFooter>
                                        </form>
                                    </CardBody>
                                </Card>
                                <ExternalSources hasSubmitted={hasSubmitted} setHasSubmitted={setHasSubmitted} inputState={inputState} setSearchResults={setSearchResults} chosenSources={chosenSources} setChosenSources={setChosenSources} />
                            </div>
                        )}
            </AnimatePresence>
        </ PageLayout>);
}

export default SearchPage;