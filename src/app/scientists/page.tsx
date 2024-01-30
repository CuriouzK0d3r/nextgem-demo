"use client"

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';
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
import PageLayout from '../components/page-layout';

function SearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chosenSources, setChosenSources] = useState<string[]>([]);
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
      <div className="flex flex-row mt-4 p-0">
        <Input crossOrigin={true} style={{ color: "black" }}   label={label} />
        {/* <label className="mb-2 text-sm text-leftg text-gray-900 mr-4 p-0">{label}:</label>
        <input
          className="border flex-grow border-gray-400 p-2 rounded-lg w-3/4 appearance-none focus:outline-none focus:border-gray-500"
          type={type}
          id={label}
          name={label}
          placeholder={"Insert text"}
          required={required}
        // ref={ref}
        /> */}
      </div>
    );
  }
  const SelectInputComponent = ({ label, values, required, ref }: any) => {
    return (
      <div className="flex flex-row mt-4 w-full p-0">
        <Select label={label} placeholder={label}>
          {values.map((value: any) => (
            <Option key={value} value={value}>{value}</Option>
          ))
          }
          {/* <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option> */}
        </Select>
        {/* <label className="mb-2 text-sm text-left text-gray-900 mr-4 p-0">{label}</label>
        <select
          className="text-sm rounded-lg flex-grow block p-2.5 w-3/4 dark:border-gray-600">
          {values.map((value: any) => (
            <option key={value} value={value}>{value}</option>
          ))
          }
        </select> */}
      </div>
    );
  }

  console.log(chosenSources)
  return (
    <PageLayout isLoggedIn={isLoggedIn}>
      <div className="w-full mt-16 ">
        <Card className="mt-6 w-1/2 mx-auto form-container rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50">
          <CardHeader className='bg-[#D4D9DD] text-black'>
            <Typography variant="h2" className="text-center pb-4 pt-4">
              Search Scientific Catalogue
            </Typography>
            {/* <h3 className='mb-8 text-4xl .title-color text-center mx-auto'>Search Scientific Catalogue</h3> */}
          </CardHeader>
          <CardBody placeholder={''}>
            {/* <div className='form-container w-3/4 mx-auto'> */}
            {/* <form className='flex-1 w-3/4 mx-auto mb-10' >
            <div className="flex">
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
          </form> */}
            <form className='mt-4' id="searchForm">
              {/* <h5 className='text-center text-xl mb-10'>
              Search Terms:
            </h5> */}
              <div className="grid gap-8 mb-6 md:grid-cols-2 ">
                <div>
                  {/* <div className='underline decoration-dotted decoration-2 decoration-[#1D2E66] text-md mb-8'>
                  Description
                </div> */}
                  <Typography variant="h5" placeholder={"Description"}>Description</Typography>
                  <div className='p-0'>
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
                <div className="p-0">
                  {/* <div className='underline decoration-dotted decoration-2 decoration-[#1D2E66] text-md mb-8'> */}
                  <Typography variant="h5" placeholder={"Indicative Terms"}>Indicative Terms</Typography>


                  {/* </div> */}
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
                {/* <button className="clear-button font-bold w-30 mr-4" type="submit">Clear</button> */}
                <Button className="clear-button font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Clear</Button>
                <Button id="searchBtn" type="submit" className="btn font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Search</Button>

                {/* <input type="submit" id="searchBtn" className="btn font-bold w-30" value="Search" /> */}
              </div>
            </form>
          </CardBody>
        </Card>
        <div className='flex flex-row mx-auto w-full mt-10 mb-20'>
          <div className=' flex mx-auto items-center'>
            <button className={""} onClick={() => { chosenSources.includes("NextGEM") ? setChosenSources(chosenSources.filter(function (e) { return e !== 'NextGEM' })) : setChosenSources([...chosenSources, "NextGEM"]) }}>
              <img width={100} src="./NextGEM_Button.svg" alt="NextGEM" className={chosenSources.includes("NextGEM") ? " chosen-source mr-[8px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[8px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
            </button>

            <button className={""} onClick={() => { chosenSources.includes("CLUE-H") ? setChosenSources(chosenSources.filter(function (e) { return e !== 'CLUE-H' })) : setChosenSources([...chosenSources, "CLUE-H"]) }}>
              <img width={100} src="./CLUE-H_Button.svg" alt="CLUE-H" className={chosenSources.includes("CLUE-H") ? " chosen-source mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
            </button>

            <button className={""} onClick={() => { chosenSources.includes("EMF") ? setChosenSources(chosenSources.filter(function (e) { return e !== 'EMF' })) : setChosenSources([...chosenSources, "EMF"]) }}>
              <img width={105} src="./EMF-portal_Button.svg" alt="EMF-Portal" className={chosenSources.includes("EMF") ? " chosen-source mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[4px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
            </button>

            <button className={""} onClick={() => { chosenSources.includes("Zenodo") ? setChosenSources(chosenSources.filter(function (e) { return e !== 'Zenodo' })) : setChosenSources([...chosenSources, "Zenodo"]) }}>
              <img width={100} src="./Zenodo_Button.svg" alt="Zenodo" className={chosenSources.includes("Zenodo") ? " chosen-source mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
            </button>

            <button className={""} onClick={() => { chosenSources.includes("EHDS") ? setChosenSources(chosenSources.filter(function (e) { return e !== 'EHDS' })) : setChosenSources([...chosenSources, "EHDS"]) }}>
              <img width={100} src="./EHDS_Button.svg" alt="EHDS" className={chosenSources.includes("EHDS") ? " chosen-source mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
            </button>

            <button className={""} onClick={() => { chosenSources.includes("Dataverse") ? setChosenSources(chosenSources.filter(function (e) { return e !== 'Dataverse' })) : setChosenSources([...chosenSources, "Dataverse"]) }}>
              <img width={105} src="./Dataverse.svg" alt="Dataverse" className={chosenSources.includes("Dataverse") ? " chosen-source mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "mr-[6px] p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
            </button>

            <button className={""} onClick={() => { chosenSources.includes("Yoda") ? setChosenSources(chosenSources.filter(function (e) { return e !== 'Yoda' })) : setChosenSources([...chosenSources, "Yoda"]) }}>
              <img width={100} src="./YODA.svg" alt="Yoda" className={chosenSources.includes("Yoda") ? " chosen-source p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50" : "p-0 rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"} />
            </button>
          </div>
        </div>
      </div>
    </ PageLayout>);
}

export default SearchPage;