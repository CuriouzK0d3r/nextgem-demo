"use client"

import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Card, Typography } from "@material-tailwind/react";
import Header from '../components/header';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function LoginPage() {
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
  }
  const SelectInputComponent = ({ label, values, required, ref }: any) => {
    return (
      <div className="flex flex-row mt-4">
        <label className="mb-2 text-base text-gray-900 mr-4">{label}</label>
        <select
          className="text-sm rounded-lg  block p-2.5   w-3/4 dark:border-gray-600">
          {values.map((value: any) => (
            <option value={value}>{value}</option>
          ))
          }
        </select>
      </div>
    );
  }

  return (
    <div className='h-full w-full '>
      <Header isLoggedIn={isLoggedIn}></Header>
      <div className="w-full mt-16 ">
        <h3 className='mb-4 text-5xl .title-color text-center mx-auto'>Input Data</h3>
        <div className='form-container w-3/4 mx-auto'>
          <form className='mt-4' id="searchForm">
            {/* <h5 className='text-center text-xl mb-10'>
              Search Terms:
            </h5> */}
            <div className="grid gap-8 mb-6 md:grid-cols-2 ">
              <div>
                <div className='underline text-md mb-8'>
                  Description
                </div>
                <div>
                  <TextInputComponent label="Title" type="text" required={false} />
                  <TextInputComponent label="Description" type="text" required={false} />
                  <TextInputComponent label="Free Keywords" type="text" required={false} />
                  <TextInputComponent label="Data Source URL" type="text" required={false} />
                  {/* <TextInputComponent label="Authors" type="text" required={false} /> */}
                  <SelectInputComponent label="Type of Study" values={["--", "exVivo", "exposureAssessment", "humanStudies", "inVitro", "inVivo", "riskAssesment", "simulation"]} required={false} />
                  <SelectInputComponent label="Type of Output" values={["--", "audio", "codebook", "dataset", "deliverable", "image", "poster", "presentation", "publication", "report", "software", "video"]} required={false} />
                  <SelectInputComponent label="Frequency Ranges" values={["--", ""]} required={false} />
                <SelectInputComponent label="Modulation" values={["--", "NR", "No Modulation"]} required={false} />
                </div>
              </div>
              {/* <div>
                <div className='underline text-md mb-8'>
                  Indicative Terms
                </div>
                <SelectInputComponent label="Frequency Ranges" values={["--", ""]} required={false} />
                <SelectInputComponent label="Modulation" values={["--", "NR", "No Modulation"]} required={false} />
                <SelectInputComponent label="Exposure Conditions" values={["--", ""]} required={false} />
                <SelectInputComponent label="Exposure Sources" values={["--", ""]} required={false} />
                <SelectInputComponent label="Environment" values={["--", ""]} required={false} />
                <SelectInputComponent label="Microenvironment" values={["--", ""]} required={false} />
                <SelectInputComponent label="Biological Model" values={["--", ""]} required={false} />
                <SelectInputComponent label="BioSpecific Endpoints" values={["--", ""]} required={false} />
                <SelectInputComponent label="Methods" values={["--", ""]} required={false} />
              </div> */}
            </div>
            <div>
              <button className="clear-button font-bold w-30 mr-4" type="submit">Clear</button>
              <input type="submit" id="searchBtn" className="btn font-bold w-30" value="Search" />
            </div>
          </form>
        </div>

      </div>
    </div>);
}

export default LoginPage;