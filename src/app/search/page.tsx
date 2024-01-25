"use client"

import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Card, Typography } from "@material-tailwind/react";
import Header from '../components/header';

function SearchPage() {
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
        <h3 className='mb-4 text-5xl .title-color text-center mx-auto'>Search Scientific Catalogue</h3>
        <div className='form-container w-3/4 mx-auto'>
          <form className='flex-1 w-3/4 mx-auto mb-10' >
            <div className="flex">
              {/* <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label> */}
              {/* <Menu as="div" className="relative flex-none text-left w-[150px] h-[74px] bottom-[2px]">
                <div>
                  <Menu.Button style={{ borderWidth: "2px", borderTopLeftRadius: "8px" }} id="dropdown-button" data-dropdown-toggle="dropdown"
                    className=" w-[150px]  h-[74px] flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center 
            text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none
             focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700
              dark:text-white dark:border-gray-600 ">
                    { }
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 divide-y">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={() => { }}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm font-bold'
                            )}
                          >
                            All Fields
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={() => { }}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm font-bold'
                            )}
                          >
                            Title
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            onClick={() => { }}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm font-bold'
                            )}
                          >
                            Author
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => { }}
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm font-bold'
                            )}
                          >
                            Abstract
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => { setSearchType('Subject'); setCurrentPage(1); }}
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm font-bold'
                            )}
                          >
                            Subject
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => { setSearchType('DOI'); setCurrentPage(1); }}
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm font-bold'
                            )}
                          >
                            DOI
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */}
              <div className="relative inline-block flex-1 h-full">
                <input
                  style={{ borderWidth: "2px", borderColor: "#6359E1" }}
                  // value={searchQuery}
                  onChange={(e) => { }}
                  type="search" id="search-dropdown" className="w-full h-[70px] block p-2.5 pl-9 z-20 text-sm text-gray-900 
                bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
                dark:bg-gray-700 dark:border-l-gray-700 mb-0  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                dark:focus:border-blue-500" placeholder="Search Titles, DOIs, Authors, Subjects" required />
                <div className='h-full'>
                  <button style={{ borderWidth: "2px", borderColor: "#6359E1" }} type="submit" className="w-[100px] absolute top-0 right-0 pl-9 text-sm font-medium h-[70px] text-white bg-niki-blue rounded-r-lg border border-blue-500 hover:bg-niki-blue focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700">
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <form className='mt-4' id="searchForm">
            {/* <h5 className='text-center text-xl mb-10'>
              Search Terms:
            </h5> */}
            <div className="grid gap-8 mb-6 md:grid-cols-2 ">
              <div>
                <div className='underline decoration-dotted decoration-2 decoration-[#1D2E66] text-lg mb-8'>
                  Description
                </div>
                <div>
                  <TextInputComponent label="Title" type="text" required={false} />
                  <TextInputComponent label="Authors" type="text" required={false} />
                  <SelectInputComponent label="Type of Study" values={["--", "exVivo", "exposureAssessment", "humanStudies", "inVitro", "inVivo", "riskAssesment", "simulation"]} required={false} />
                  <SelectInputComponent label="Type of Output" values={["--", "audio", "codebook", "dataset", "deliverable", "image", "poster", "presentation", "publication", "report", "software", "video"]} required={false} />
                  <SelectInputComponent label="Topics" values={["--", ""]} required={false} />

                  <TextInputComponent label="Publication Year" type="text" required={false} />
                  <SelectInputComponent label="Privacy Level" values={["--", ""]} required={false} />

                  <TextInputComponent label="Identifier" type="text" required={false} />
                </div>
              </div>
              <div>
                <div className='underline decoration-dotted decoration-2 decoration-[#1D2E66] text-lg mb-8'>
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
              </div>
            </div>
            <div>
              <button className="clear-button font-bold w-30 mr-4" type="submit">Clear</button>
              <input type="submit" id="searchBtn" className="btn font-bold w-30" value="Search" />
            </div>
          </form>
        </div>
        <div className='flex flex-row mx-auto w-full mt-10 mb-20'>
          <div className=' flex mx-auto items-center'>
          <button className={""} onClick={() => { }}>
            <img width={100} src="./NextGEM_Button.svg" alt="NextGEM" className="mr-[9px] chosen-source" />
          </button>
          <img width={100} src="./CLUE-H_Button.svg" alt="CLUE-H" className="mr-[0px]" />
          <img width={115} src="./EMF-portal_Button.svg" alt="EMF-Portal" className="mr-[2px]" />
          <img width={100} src="./Zenodo_Button.svg" alt="Zenodo" className="mr-[9px]" />
          <img width={100} src="./EHDS_Button.svg" alt="EHDS" className="mr-[8px]" />
          <img width={105} src="./Dataverse.svg" alt="Dataverse" className="mr-[8px]" />
          <img width={100} src="./YODA.svg" alt="Yoda" className="" />
          </div>
        </div>
      </div>
    </div>);
}

export default SearchPage;