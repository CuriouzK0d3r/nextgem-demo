"use client"

import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Card, Typography } from "@material-tailwind/react";
import Header from '../components/header';
import Footer from '../components/footer';
import PageLayout from '../components/page-layout';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function MembersPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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

  const openTab = (evt: any, tabName: any) => {
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
  };

  const TextInputComponent = ({ label, type, required, ref }: any) => {
    return (
      <div className="flex flex-row mt-4">
        <label className="mb-2 ttext-based text-gray-900 mr-4">{label}:</label>
        <input
          className="border border-gray-400 p-2 rounded-lg w-3/4 appearance-none focus:outline-none focus:border-gray-500"
          type={type}
          id={label}
          name={label}
          placeholder={"Insert text"}
          required={required}
        // ref={ref}
        />
      </div>
    );
  };
  
  const SelectInputComponent = ({ label, values, required, ref }: any) => {
    return (
      <div className="flex flex-row mt-4">
        <label className="mb-2 text-base text-gray-900 mr-4">{label}</label>
        <select
          className="text-sm rounded-lg  block p-2.5   w-3/4 dark:border-gray-600">
          {values.map((value: any) => (
            <option key={value} value={value}>{value}</option>
          ))
          }
        </select>
      </div>
    );
  }

  return (
    <PageLayout isLoggedIn={isLoggedIn}>
      {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
      <div className="w-full min-h-[58rem] mt-0 flex items-center justify-center">
        <a href='/input?tab=form'>
        <div className="menu-box  mr-8">
            <div className="w-full h-full text-center">
                <img width={90} className='mx-auto pt-8' src="./input-logo.svg" alt="" />
                <span className='text-white'>
                Input Scientific data
                </span>
            </div>
        </div>
        </a>
        <a href='/input?tab=file'>
        <div className="menu-box">
            <div className="w-full h-full text-center">
                <img width={90} className='mx-auto pt-8' src="./file-logo.svg" alt="" />
                <span className='text-white'>
                Input Files
                </span>
            </div>
        </div>
        </a>
      </div>
      {/* </div> */}
     </ PageLayout>);
}

export default MembersPage;