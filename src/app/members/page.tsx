"use client"

import { useRef, useState } from 'react';


import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import PageLayout from '../components/page-layout';

function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const loginUsernameRef = useRef<any>(null);
  const loginPasswordRef = useRef<any>(null);

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
    <PageLayout skipLogin={false} isLoggedIn={isLoggedIn} pageName='members'>
      {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
     
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