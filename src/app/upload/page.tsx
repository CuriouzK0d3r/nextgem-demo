"use client"

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Option,
    Select,
    Typography
} from "@material-tailwind/react";
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import FileUploader from '../components/file-uploader';
import PageLayout from '../components/page-layout';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

function InputPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState("");
    const router = useRouter();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const inputFields = [
        {
            label: "Title",
            field: 'title',
            type: "text",
            required: false
        },
        {
            label: "Description",
            field: 'description',
            type: "text",
            required: false
        },
        {
            label: "Free Keywords",
            field: 'freeKeywords',
            type: "text",
            required: false
        },
        {
            label: "Data Source URL",
            field: 'dataSourceURL',
            type: "text",
            required: false
        },
        {
            label: "Authors",
            field: 'authors',
            type: "text",
            required: false
        },
        {
            label: "Type of Study",
            field: 'typeOfStudy',
            type: "select",
            values: ["--", "exVivo", "exposureAssessment", "humanStudies", "inVitro", "inVivo", "riskAssesment", "simulation"],
            required: false
        },
        {
            label: "Type of Output",
            field: 'typeOfOutput',
            type: "select",
            values: ["--", "audio", "codebook", "dataset", "deliverable", "image", "poster", "presentation", "publication", "report", "software", "video"],
            required: false
        },
        // {
        //     label: "Frequency Ranges",
        //     field: 'frequencyRanges',
        //     type: "select",
        //     values: ["--", ""],
        //     required: false
        // },
        {
            label: "Modulation",
            field: 'modulation',
            type: "select",
            values: ["--", "NR", "No Modulation"],
            required: false
        },
    ];

    let fieldsNames: any={};
    inputFields.forEach((field) => {
        fieldsNames[field.field] = "";
    });

    const [inputState, setInputState] = useState<any>(fieldsNames);

    const searchParams = useSearchParams();

    const search = searchParams.get('tab');

    useEffect(() => {
        if (search === 'file') {
            setActiveTab('fileTab');
        } else
            setActiveTab('formTab');
    }, [search]);

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
                    // console.error("Login failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    checkLoginStatus();

    const clearState = () => {
        let fieldsNames: any={};
        inputFields.forEach((field) => {
            fieldsNames[field.field] = "";
        });
        setInputState(fieldsNames);
    }

    return (
        <PageLayout skipLogin={false} isLoggedIn pageName='members'>
            <div className="w-full mt-40 min-h-[60rem]">
                <Card placeholder={""} className="mt-6 w-full lg:w-1/2 xl:1/3 mx-auto form-container object-cover object-center shadow-xl shadow-blue-gray-900/50">
                    <CardHeader placeholder={""} className='bg-[#D4D9DD] text-black p-0 divide-y-2 divide-[#fff]'>
                        <Typography placeholder={""} variant="h2" className="text-center pb-4 pt-4">
                            Input Data
                        </Typography>
                        <div className="tab bt-2 object-cover object-center shadow-3xl shadow-blue-gray-900/50 ">
                            <button style={{ borderRadius: "4px 4px 0 0" }} className={"tablinks " + (activeTab === 'formTab' ? 'active' : '')} onClick={(event) => setActiveTab('formTab')}>
                                Input Scientific Data
                            </button>
                            <button style={{ borderRadius: "4px 4px 0 0" }} className={"tablinks " + (activeTab === 'fileTab' ? 'active' : '')} onClick={(event) => setActiveTab('fileTab')}>
                                Input Files
                            </button>
                        </div>
                    </CardHeader>
                    <CardBody placeholder={""}>

                        <div id="formTab" className={" " + (activeTab === 'formTab' ? 'block' : 'hidden')} >

                            <form className='mt-4' id="inputForm">
                                <div className="grid gap-8 mb-6 md:grid-cols-1 ">
                                    <div>
                                        <div>
                                            {
                                                inputFields.map((inputField, index) => {
                                                    if (inputField.type === "text") {
                                                        return (
                                                            <div key={index} className="flex flex-row mt-4 p-0">
                                                                <Input key={index} className='object-cover bg-white object-center shadow-sm shadow-blue-gray-900/50' value={inputState[inputField.field]} onChange={(event) => { event.preventDefault(); setInputState({ ...inputState, [inputField.field]: event.target.value }) }} crossOrigin="true" style={{ color: "black" }} label={inputField.label} />
                                                            </div>
                                                        );
                                                    } else if (inputField.type === "select") {
                                                        return (
                                                            <div key={index} className="flex flex-row mt-4 p-0">
                                                                <Select key={index} className='object-cover bg-white object-center shadow-sm shadow-blue-gray-900/50 text-black' label={inputField.label} placeholder={inputField.label} value={inputState[inputField.field]} onChange={(event) => setInputState({ ...inputState, [inputField.field]: event })}>
                                                                    {inputField.values?.map((value: any) => (
                                                                        <Option key={value} value={value}>{value}</Option>
                                                                    ))
                                                                    }
                                                                </Select>
                                                            </div>

                                                        );
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Button  placeholder={""}className="clear-button font-bold w-30 h-12 mr-4" variant="gradient" onClick={clearState}>Clear</Button>
                                    <Button placeholder={""} id="searchBtn" type="submit" className="btn font-bold w-30 h-12 mr-4" variant="gradient">Upload</Button>

                                    {/* <input type="submit" id="UploadBtn" className="btn font-bold w-30" value="Upload" /> */}
                                </div>
                            </form>
                        </div>
                        <div id="fileTab" className={"h-[450px] mt-12 " + (activeTab === 'fileTab' ? 'block' : 'hidden')} >
                            <Typography variant="h5" placeholder={"Description"}>Upload scientific data files</Typography>

                            {/* <h2 className='mb-8 text-xl bold underline decoration-dotted decoration-4 decoration-[#1D2E66]'>Upload scientific data files</h2> */}
                            <FileUploader
                                url={'/api/upload'}
                                acceptedFileTypes={[
                                    "application/json",
                                ]}
                                maxFileSize={100}
                                label="Max File Size: 1MB"
                            // labelAlt="Accepted File Types: png, jpeg"
                            />
                        </div>
                        {/* </div> */}
                    </CardBody>
                </Card>
            </div>
        </PageLayout>);
}

export default InputPage;