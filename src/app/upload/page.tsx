"use client"

import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUsernameRef = useRef<any>(null);
    const loginPasswordRef = useRef<any>(null);
    const registerUsernameRef = useRef<any>(null);
    const registerPasswordRef = useRef<any>(null);
    const registerEmailRef = useRef<any>(null);
    const registerOrgRef = useRef<any>(null);

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const ref = useRef<HTMLInputElement>(null);


    const handleClick = () => {
        ref.current?.click();
    };

    // 3. convert FileList to File[]
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.currentTarget.files ?? []);
        setSelectedFiles(files);
    };
    const router = useRouter()

    function isLoggedIn() {
        let apiEndpoint = "/api/auth/token";

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
                        router.push('/login');
                    }
                    // window.location.href = "https://example.com/example-page";
                    // Cookies.set('token', responseJSON.access_token, { expires: 1, secure: false });
                } else {
                    // alert("Login failed. Status: " + response.status);
                    console.error("Login failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function submitRegisterForm(event: any) {
        event.preventDefault();
        const username = registerUsernameRef.current?.value;
        const password = registerPasswordRef.current?.value;
        const email = registerEmailRef.current?.value;
        const organization = registerOrgRef?.current?.value;
        const apiEndpoint = "http://139.91.58.16/nikh-auth/register";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                organizationId: [organization],
                firstName: "Random",
                roles: ["user"]
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // window.location.href = "https://example.com/example-page";
                    router.push('/register');
                } else {
                    alert("Login failed. Status: " + response.status);
                    console.error("Registration failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    function submitLoginForm(event: any) {
        event.preventDefault();
        const username = loginUsernameRef.current?.value;
        const password = loginPasswordRef.current?.value;
        const apiEndpoint = "/api/auth/login";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then(async (response) => {
                if (response.ok) {
                    let responseJSON = await response.json();
                    Cookies.set('token', responseJSON.access_token, { expires: 1, secure: false });
                    router.push('/search');
                } else {
                    alert("Login failed. Status: " + response.status);
                    console.error("Login failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    // Add

    return (
        <div className='h-full w-full'>
            <header>
                <nav className="bg-gray-200 bg-opacity-90 border-gray-200 px-4 lg:px-6 py-4">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-[100rem]">
                        <a href="" className="flex items-center">
                            <img
                                className="mr-3 h-18"
                                src="https://www.nextgem.eu/wp-content/uploads/2022/07/cropped-NextGEM_final_transparent.png"
                                alt="logo-img"
                                id="logo-img"
                            />
                            {/* <!-- <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Search</span> --> */}
                        </a>
                        {/* <a href="/upload.html" className="mt-2" style="text-decoration: underline;">Upload</a> */}

                    </div>
                </nav>
            </header>
            <div className="container w-full mt-28">
                <h4 className='mb-2 text-3xl '>Upload Experimental Data</h4>
                <div className='form-container'>
                    <form className='mt-4' id="loginForm" onSubmit={(event) => submitLoginForm(event)}>
                        <div className="grid gap-6 mb-6 md:grid-cols-3 ">
                            <div className="col-span-1	">
                                <input type="text"
                                    id="title" x-model="title" placeholder="Title" />
                            </div>
                            <div className="col-span-1	 ">
                                <input type="text"
                                    id="url" x-model="url" placeholder="URL" />
                            </div>
                            <div className=" col-span-1	">
                                <input type="text"
                                    id="address" x-model="address" placeholder="Address" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="contactName" x-model="contactName" placeholder="Contact Name" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="dataOwners" x-model="dataOwners" placeholder="Data Owners" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="description" x-model="description" placeholder="Description" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="doi" x-model="doi" placeholder="DOI" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="email" x-model="email" placeholder="Email" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="externalId" x-model="externalId" placeholder="External ID" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="frequency" x-model="frequency" placeholder="Frequency" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="institution" x-model="institution" placeholder="Institution" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="keywords" x-model="keywords" placeholder="Keywords" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="language" x-model="language" placeholder="Language" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="privacyLevel" x-model="privacyLevel" placeholder="Privacy Level" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="publicationDate" x-model="publicationDate" placeholder="Publication Date" />
                            </div>
                            <div className=" ">
                                <input type="text"
                                    id="termsOfAccess" x-model="termsOfAccess" placeholder="Terms of Access" />
                            </div>
                            <div />
                            <div />
                            <div className="">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Modulation</label>
                                <select
                                    className="text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600 ">
                                    <option value="">--</option>
                                    <option value="NR">NR</option>
                                    <option value="noModulation">No Modulation</option>
                                </select>
                            </div>
                            <div className=" ">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Output type</label>
                                <select
                                    className="text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600">
                                    <option value="">--</option>
                                    <option value="audio">audio</option>
                                    <option value="codebook">codebook</option>
                                    <option value="dataset">dataset</option>
                                    <option value="deliverable">deliverable</option>
                                    <option value="image">image</option>
                                    <option value="poster">poster</option>
                                    <option value="presentation">presentation</option>
                                    <option value="publication">publication</option>
                                    <option value="report">report</option>
                                    <option value="software">software</option>
                                    <option value="video">video</option>
                                </select>
                            </div>
                            <div className=" ">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Study type</label>
                                <select
                                    className="text-sm rounded-lg  block w-full p-2.5  dark:border-gray-600">
                                    <option value="">--</option>
                                    <option value="exVivo">exVivo</option>
                                    <option value="exposureAssessment">exposureAssessment</option>
                                    <option value="humanStudies">humanStudies</option>
                                    <option value="inVitro">inVitro</option>
                                    <option value="inVivo">inVivo</option>
                                    <option value="riskAssessment">riskAssessment</option>
                                    <option value="simulation">simulation</option>
                                </select>
                            </div>
                        </div>
                        <input type="submit" id="searchBtn" className="btn font-bold" value="Upload" />
                    </form>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", width: "100%", height: "42px", flex: "0 0 auto" }}>
                        <div role="separator" style={{ width: "45%", height: '1px', visibility: 'visible', borderBottom: '1px solid rgba(55, 53, 47, 0.16)' }}>
                        </div>
                        <span className='w-16 mx-auto ml-10'>OR</span>

                        <div role="separator" style={{ width: "45%", height: '1px', visibility: 'visible', borderBottom: '1px solid rgba(55, 53, 47, 0.16)' }}>
                        </div>
                    </div>
                    {/* <h4>File Upload</h4> */}
                    <form className='w-full mt-6'>
                        <div className="grid gap-6 mb-6 md:grid-cols-2 w-full">
                            <div id='uploadButton' onClick={handleClick} className="p-4 flex flex-col items-center  rounded-lg  cursor-pointer">
                                <CloudArrowUpIcon className="w-6 h-6" />
                                <span>Choose some files to upload</span>
                                <input
                                    type="file"
                                    ref={ref}
                                    className="hidden"
                                    // 5. add onChange handler
                                    onChange={handleChange}
                                    multiple
                                />
                            </div>
                            {!!selectedFiles.length && (
                            <input type="submit" id="uploadFilesBtn" className="btn font-bold flex h-19" style={{ background: "#29946b" }} value="Upload Files" />
                            )}
                        </div>
                        {!!selectedFiles.length && (
                            <div className="p-4 mt-4 bg-[#eee] overflow-hidden text-ellipsis">
                                <p>Selected Files:</p>
                                {selectedFiles.map((file, i) => {
                                    return (
                                        <span key={i} className="text-[#29946b] whitespace-nowrap mr-2">
                                            {file.name}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </form>
                </div>
            </div></div>);
}

export default LoginPage;