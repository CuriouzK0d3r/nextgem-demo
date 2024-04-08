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
        let apiEndpoint = "http://subra.ics.forth.gr:3000/api/auth/token";

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
                        router.push('/scientists');
                    }
                    // window.location.href = "https://example.com/example-page";
                    // Cookies.set('token', responseJSON.access_token, { expires: 1, secure: false });
                } else {
                    // alert("Login failed. Status: " + response.status);
                    // console.error("Login failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    isLoggedIn();

    function submitRegisterForm(event: any) {
        event.preventDefault();
        const username = registerUsernameRef.current?.value;
        const password = registerPasswordRef.current?.value;
        const email = registerEmailRef.current?.value;
        const organization = registerOrgRef?.current?.value;
        const apiEndpoint = "/api/auth/register";

        fetch(apiEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                organizationId: organization,
                firstName: "",
                roles: ["user"]
            }),
        })
            .then((response) => {
                if (response.ok && response.status === 200) {
                    alert('Registration successful!');
                    router.push('/login');
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
                    if (responseJSON.status !== 200) 
                        alert('Wrong Credentials!');
                    else {
                        Cookies.set('token', responseJSON.access_token, { expires: 1, secure: false, sameSite: "Lax"});
                        router.push('/scientists');
                    }
                } else {
                    alert("Login failed. Status: " + response.status);
                    console.error("Login failed. Status: " + response.status);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <PageLayout pageName='login' isLoggedIn={true} skipLogin={true}>
            <div className="relative min-h-[48rem] mx-auto auth-container w-[40rem] ">
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
                <Card style={{background: "white"}} placeholder={""} className="form-container w-full mx-auto form-container mt-0 rounded-lg object-cover object-center shadow-[0_10px_50px_rgba(58,_65,_11,_0.8)]">
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
                                <Input className='object-cover bg-white p-0 object-center shadow-inner shadow-blue-gray-900/50 ' size="lg" crossOrigin="true" id="loginUsername" inputRef={loginUsernameRef} required style={{ color: "black" }} label={"Username"} />

                                <div className='h-6'></div>

                                <Input className='bg-white p-0 object-cover object-center shadow-inner shadow-blue-gray-900/50' size="lg" crossOrigin="true" id="loginPassword" inputRef={loginPasswordRef} type='password' required style={{ color: "black" }} label={"Password"} />

                                <Button placeholder={""} id="loginBtn" type="submit" className="clear-button text-md font-bold w-full h-12 mt-8 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Login</Button>
                            </form>
                        </div>

                        {/* <!-- Register Tab --> */}
                        <div id="registerTab" className={(activeTab === "registerTab" ? "block " : "tabcontent ")}>
                            <form className={'mt-4 '} id="registerForm" onSubmit={(event) => submitRegisterForm(event)}>
                                <div className='h-8'></div>

                                <Input className=' bg-white p-0 object-cover object-center shadow-inner shadow-blue-gray-900/50' size="lg" crossOrigin="true" id="registerUsername" inputRef={registerUsernameRef} required style={{ color: "black" }} label={"Username"} />
                                <div className='h-6'></div>

                                <Input className='bg-white p-0 object-cover object-center shadow-inner shadow-blue-gray-900/50' size="lg" crossOrigin="true" id="registerPassword" inputRef={registerPasswordRef} required style={{ color: "black" }} type='password' label={"Password"} />
                                <div className='h-6'></div>

                                <Input className='bg-white p-0 object-cover object-center shadow-inner shadow-blue-gray-900/50' size="lg" crossOrigin="true" id="registerEmail" type='email' inputRef={registerEmailRef} required style={{ color: "black" }} label={"E-mail"} />
                                <div className='h-6'></div>

                                <Input className='bg-white p-0 object-cover object-center shadow-inner shadow-blue-gray-900/50' size="lg" crossOrigin="true" id="registerOrg" inputRef={registerOrgRef} required style={{ color: "black" }} label={"Organization"} />

                                <Button placeholder={""} id="searchBtn" type="submit" className="clear-button text-md font-bold w-full h-12 mt-8" variant="gradient">Register</Button>

                            </form>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </PageLayout>
    );
}

export default LoginPage;