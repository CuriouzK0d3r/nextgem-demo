"use client"

import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import Header from '../components/header';
import Footer from '../components/footer';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUsernameRef = useRef<any>(null);
    const loginPasswordRef = useRef<any>(null);
    const registerUsernameRef = useRef<any>(null);
    const registerPasswordRef = useRef<any>(null);
    const registerEmailRef = useRef<any>(null);
    const registerOrgRef = useRef<any>(null);

    const router = useRouter();

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
                        router.push('/search');
                    }
                    // window.location.href = "https://example.com/example-page";
                    Cookies.set('token', responseJSON.access_token, { expires: 1, secure: false });
                } else {
                    // alert("Login failed. Status: " + response.status);
                    console.error("Login failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    isLoggedIn();

    function openTab(evt: any, tabName: any) {
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
                    router.push('/search');
                } else {
                    alert("Registration failed. Status: " + response.status);
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

        <div className="">
            <div className='h-full w-full '>
                <Header isLoggedIn={true}></Header>
                <div className="container w-[40rem] ">
                    <h4>Welcome to</h4>
                    <a href='/' >
                        <img
                            src="https://www.nextgem.eu/wp-content/uploads/2022/07/cropped-NextGEM_final_transparent.png"
                            alt="logo-img"
                            id="logo-img"
                        />
                    </a>
                    <div className="form-container w-full">
                        <div className="tab">
                            <button className="tablinks active" onClick={(event) => openTab(event, 'loginTab')}>
                                Login
                            </button>
                            <button className="tablinks" onClick={(event) => openTab(event, 'registerTab')}>
                                Register
                            </button>
                        </div>

                        {/* <!-- Login Tab --> */}
                        <div id="loginTab" className="tabcontent" style={{ display: "block" }}>
                            {/* <h3>Login</h3> */}
                            <form className='mt-4' id="loginForm" onSubmit={(event) => submitLoginForm(event)}>
                                <label htmlFor="loginUsername">Username:</label>
                                <input
                                    className='rounded'
                                    ref={loginUsernameRef}
                                    type="text"
                                    id="loginUsername"
                                    name="loginUsername"
                                    required
                                />

                                <label htmlFor="loginPassword">Password:</label>
                                <input
                                    className='rounded'
                                    ref={loginPasswordRef}
                                    type="password"
                                    id="loginPassword"
                                    name="loginPassword"
                                    required
                                />

                                <input type="submit" id="loginBtn" className="btn font-bold" value="Login" />
                            </form>
                        </div>

                        {/* <!-- Register Tab --> */}
                        <div id="registerTab" className="tabcontent">
                            <form className='mt-4' id="registerForm" onSubmit={(event) => submitRegisterForm(event)}>
                                <label htmlFor="registerUsername">Username:</label>
                                <input
                                    className='rounded'
                                    ref={registerUsernameRef}
                                    type="text"
                                    id="registerUsername"
                                    name="registerUsername"
                                    required
                                />

                                <label htmlFor="registerPassword">Password:</label>
                                <input
                                    className='rounded'
                                    ref={registerPasswordRef}
                                    type="password"
                                    id="registerPassword"
                                    name="registerPassword"
                                    required
                                />

                                <label htmlFor="registerEmail">Email:</label>
                                <input
                                    className='rounded'
                                    ref={registerEmailRef}
                                    type="email"
                                    id="registerEmail"
                                    name="registerEmail"
                                    required
                                />

                                <label htmlFor="registerOrg">Organization:</label>
                                <input
                                    className='rounded'
                                    ref={registerOrgRef}
                                    type="text"
                                    id="registerOrg"
                                    name="registerOrg"
                                    required
                                />

                                <input
                                    type="submit"
                                    id="registerBtn"
                                    className="btn font-bold"
                                    value="Register"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default LoginPage;