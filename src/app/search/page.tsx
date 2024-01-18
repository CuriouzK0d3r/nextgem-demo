"use client"

import React, { useEffect, useRef, useState, Fragment } from 'react';
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { Card, Typography } from "@material-tailwind/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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

  const TABLE_HEAD = ["Name", "Job", "Employed", ""];

  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      job: "Developer",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
  ];


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
      <header>
        <nav className="bg-niki-blue bg-opacity-90 border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-[100rem]">
            <a href="" className="flex items-center">
              <img
                className="mr-3 h-18"
                src="https://subra.ics.forth.gr/wp-content/uploads/2024/01/NIKH-logoname.png"
                alt="logo-img"
                id="logo-img"
              />
            </a>
            <div>
              <a href="" className="text-base font-medium text-white hover:text-gray-200"> </a>
            </div>
          </div>
        </nav>
      </header>
      <div className="w-full mt-16 h-full ">
        <h3 className='mb-4 text-5xl .title-color text-center mx-auto'>Search Scientific Catalogue</h3>
        <div className='form-container w-3/4 mx-auto'>
          <form className='flex-1 w-3/4 mx-auto mb-10' >
            <div className="flex">
              {/* <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label> */}
              <Menu as="div" className="relative flex-none text-left w-[150px] h-[74px] bottom-[2px]">
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
              </Menu>
              <div className="relative inline-block flex-1 h-full">
                <input
                  style={{ borderWidth: "2px", borderColor: "#6359E1" }}
                  // value={searchQuery}
                  onChange={(e) => { }}
                  type="search" id="search-dropdown" className="w-full h-[70px] block p-2.5 z-20 text-sm text-gray-900 
                bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 
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
                <div className='underline text-md mb-8'>
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

              </div>
              {/* <div>
                <label className="block mb-2  font-medium text-gray-900 ">Institution</label>

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
                <label className="block mb-2 font-medium text-gray-900 ">Keywords</label>
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
                <label className="block mb-2  font-medium text-gray-900 ">Modulation</label>
                <select
                  className=" rounded-lg  block w-full p-2.5  dark:border-gray-600 ">
                  <option value="">--</option>
                  <option value="NR">NR</option>
                  <option value="noModulation">No Modulation</option>
                </select>
              </div>
              <div className=" ">
                <label className="block mb-2  font-medium text-gray-900 ">Output type</label>
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
                <label className="block mb-2  font-medium text-gray-900 ">Study type</label>
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
              </div> */}
            </div>
            <div>
              <button className="clear-button font-bold w-30 mr-4" type="submit">Clear</button>
              <input type="submit" id="searchBtn" className="btn font-bold w-30" value="Search" />
            </div>
          </form>
        </div>
        <div className='flex flex-row mx-auto w-full mt-10 mb-20'>
          <div className='w-1/2 flex mx-auto items-center'>
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
        <Card className="h-full w-full overflow-scroll hidden">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, job, date }, index) => (
                <tr key={name} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {job}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {date}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                      Edit
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>);
}

export default LoginPage;