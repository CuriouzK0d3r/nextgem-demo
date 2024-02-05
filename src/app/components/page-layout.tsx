import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    Dialog,
    Input,
    Typography
  } from "@material-tailwind/react";

import { useRef, useState } from 'react';


import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
  
const PageLayout = ({ isLoggedIn, skipLogin, children, pageName }: { isLoggedIn: boolean, skipLogin: boolean, children: React.ReactNode, pageName: string|undefined }) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const loginUsernameRef = useRef<any>(null);
    const loginPasswordRef = useRef<any>(null);
  
    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        if (pageName === "members" && !skipLogin && !isLoggedIn) {
          setOpen(true);
        }
      }
    , [skipLogin]);
  
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
            setOpen(false);
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
        <div className="page-layout p-0 h-full w-full bg-white">
            <div className='h-full w-full flex flex-col gap-0'>
                <Header isLoggedIn={isLoggedIn} skipLogin={skipLogin} pageName={pageName} />
                <div className='flex-grow p-0'>
                {children}
                <Footer />
                </div>
            </div>
            <Dialog
    placeholder={""}
    size="md"
    open={open}  
    dismiss={{enabled:false}}
    handler={handleOpen}
    className="bg-transparent shadow-none"
  >
    <form onSubmit={(event) => submitLoginForm(event)}>
      <Card placeholder={""} className="mx-auto w-full ">
        <CardBody className="flex flex-col gap-4" style={{ padding: "2rem" }}>
          <Typography variant="h4" color="blue-gray">
            Log In
          </Typography>
          <Typography
            className="mb-0 mt-4 font-normal"
            variant="paragraph"
            color="red"
          >
            Please login to access this page.
          </Typography>
          <div className='loginInput p-0'>
            <Input className='object-cover object-center shadow-sm shadow-blue-gray-900/50 w-full' size="lg" crossOrigin={false} id="loginUsername" required style={{ color: "black", padding: "0px" }} label={"Username"} />

            <Input className='p-0 object-cover object-center shadow-sm shadow-blue-gray-900/50' size="lg" crossOrigin={false} id="loginPassword" type='password' required style={{ color: "black", padding: "0px" }} label={"Password"} />
          </div>
        </CardBody>
        <CardFooter className="pt-0 mr-8">
          <Button variant="gradient" onClick={handleOpen} className='w-full'>
            Sign In
          </Button>
          <Typography variant="small" className="mt-4 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/login"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </form>
  </Dialog>
        </div>
    );
};

export default PageLayout;
