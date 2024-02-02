"use client"

import { useState } from 'react';

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
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import PageLayout from '../components/page-layout';

function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

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
          console.log(responseJSON)
          if (responseJSON.loggedin) {
            setIsLoggedIn(true);
          } else {
            // router.push('/login');
            setOpen(true);
          }
        } else {
          console.error("Login failed. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  checkLoginStatus();
  

  return (
    <PageLayout isLoggedIn={isLoggedIn} pageName='members'>
      {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input label="Email" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Your Password
            </Typography>
            <Input label="Password" size="lg" />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
      <div className="w-full min-h-[65rem] mt-0 flex items-center justify-center ">
        <div className="grid grid-cols-2 gap-4">
        <a href='/input' className='mb-12'>
        <div className="menu-box members-cat  mr-8">
            <div className=" w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img width={90} className='mx-auto pt-8' src="./input-logo.svg" alt="" />
                <span className='text-white'>
                Input Data
                </span>
            </div>
        </div>
        </a>
        <a href='#'>
        <div className="menu-box members-cat">
            <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img width={93} className='mx-auto pt-8' src="./modeling-logo.svg" alt="" />
                <span className='text-white'>
                Modeling
                </span>
            </div>
        </div>
        </a>
        <a href='/ra-search'>
        <div className="menu-box members-cat">
            <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img width={88} className='mx-auto pt-10' src="./ra-logo.svg" alt="" />
                <span className='text-white'>
                Risk Assessment Tool
                </span>
            </div>
        </div>
        </a>
        <a href='#'>
        <div className="menu-box members-cat">
            <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img width={93} className='mx-auto pt-8' src="./ecosystem-logo.svg" alt="" />
                <span className='text-white'>
                Ecosystem
                </span>
            </div>
        </div>
        </a>
        </div>
      </div>
      {/* </div> */}
     </ PageLayout>);
}

export default DashboardPage;