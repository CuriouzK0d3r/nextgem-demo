"use client"

import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUsernameRef = useRef<any>(null);
    const loginPasswordRef = useRef<any>(null);
    const registerUsernameRef = useRef<any>(null);
    const registerPasswordRef = useRef<any>(null);
    const registerEmailRef = useRef<any>(null);
    const registerOrgRef = useRef<any>(null);

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

    function openTab(evt, tabName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
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
        <div className="container w-1/2">
             <h4 className='mb-2 text-3xl'>Search for Studies</h4>
            <div className='form-container'>
            <form className='mt-4' id="loginForm" onSubmit={(event) => submitLoginForm(event)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2 ">
                    <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Institution</label>

                        <input
                            className='rounded'
                            // ref={loginUsernameRef}
                            type="text"
                            id="institution"
                            name="institution"
                            placeholder='Institution'
                            required
                        />
                    </div>
                    <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Keywords</label>

                        <input
                            className='rounded'
                            // ref={loginPasswordRef}
                            type="text"
                            id="Keywords"
                            name="Keywords"
                            placeholder='Keywords'
                            required
                        />
                    </div>
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
                <input type="submit" id="searchBtn" className="btn font-bold" value="Search" />
            </form>
            </div>
        </div>);
}

export default LoginPage;