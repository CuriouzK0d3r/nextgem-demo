"use client"

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import PageLayout from '../components/page-layout';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Select,
    Option,
    Input
} from "@material-tailwind/react";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState("loginTab");

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
        setActiveTab(tabName);
        // var i, tabcontent, tablinks;
        // tabcontent = document.getElementsByClassName("tabcontent");
        // for (i = 0; i < tabcontent.length; i++) {
        //     // tabcontent[i].style.display = "none";
        // }
        // tablinks = document.getElementsByClassName("tablinks");
        // for (i = 0; i < tablinks.length; i++) {
        //     tablinks[i].className = tablinks[i].className.replace(" active", "");
        // }
        // // document.getElementById(tabName).style.display = "block";
        // evt.currentTarget.className += " active";
    }

    console.log(activeTab)
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
                    console.log(response)
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
        <PageLayout isLoggedIn={true}>
            <div className="relative min-h-[55rem] mx-auto auth-container w-[40rem] ">
                {/* */}
                <div>
                    <h4 className='text-center'>Welcome to</h4>
                    <a className='' href='/' >
                        <img
                            src="https://www.nextgem.eu/wp-content/uploads/2022/07/cropped-NextGEM_final_transparent.png"
                            alt="logo-img"
                            id="logo-img"
                        />
                    </a>
                </div>
                <Card className="form-container w-full mx-auto form-container mt-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50">
                    <CardBody placeholder={''}>
                        <div className="tab">
                            <button className={"tablinks " + (activeTab === "loginTab" ? "active" : "")} onClick={(event) => setActiveTab('loginTab')}>
                                Login
                            </button>
                            <button className={"tablinks " + (activeTab === "registerTab" ? "active" : "")} onClick={(event) => setActiveTab('registerTab')}>
                                Register
                            </button>
                        </div>

                        {/* <!-- Login Tab --> */}
                        <div id="loginTab" className={(activeTab === "loginTab" ? "block " : "tabcontent ")}>
                            {/* <h3>Login</h3> */}
                            <form className='mt-12' id="loginForm" onSubmit={(event) => submitLoginForm(event)}>
                                <Input className='object-cover object-center shadow-sm shadow-blue-gray-900/50'  size="lg" crossOrigin={false} id="loginUsername" inputRef={loginUsernameRef} required style={{ color: "black", padding: "0px" }} label={"Username"} />
     
                                <div className='h-6'></div>

                                <Input className='p-0 object-cover object-center shadow-sm shadow-blue-gray-900/50' size="lg" crossOrigin={false} id="loginPassword" inputRef={loginPasswordRef} type='password' required style={{ color: "black" }} label={"Password"} />

                                <Button id="loginBtn" type="submit" className="btn font-bold w-full h-12 mt-8 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Login</Button>
                            </form>
                        </div>

                        {/* <!-- Register Tab --> */}
                        <div id="registerTab" className={(activeTab === "registerTab" ? "block " : "tabcontent ")}>
                            <form className={'mt-4 '} id="registerForm" onSubmit={(event) => submitRegisterForm(event)}>
                                <div className='h-8'></div>

                                <Input className='p-0 object-cover object-center shadow-sm shadow-blue-gray-900/50' size="lg" crossOrigin={true} id="registerUsername" inputRef={registerUsernameRef} required style={{ color: "black" }} label={"Username"} />
                                <div className='h-6'></div>

                                <Input className='p-0 object-cover object-center shadow-sm shadow-blue-gray-900/50' size="lg" crossOrigin={true} id="registerPassword" inputRef={registerPasswordRef} required style={{ color: "black" }} type='password' label={"Password"} />
                                <div className='h-6'></div>

                                <Input className='p-0 object-cover object-center shadow-sm shadow-blue-gray-900/50' size="lg" crossOrigin={true} id="registerEmail" type='email' inputRef={registerEmailRef} required style={{ color: "black" }} label={"E-mail"} />
                                <div className='h-6'></div>

                                <Input className='p-0 object-cover object-center shadow-sm shadow-blue-gray-900/50' size="lg" crossOrigin={true} id="registerOrg" inputRef={registerOrgRef} required style={{ color: "black" }} label={"Organization"} />

                                <Button id="searchBtn" type="submit" className="btn font-bold w-full h-12 mt-8" variant="gradient">Register</Button>

                            </form>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </PageLayout>
    );
}

export default LoginPage;