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
import SearchResults from '../components/search-results';
import { motion, AnimatePresence } from "framer-motion"

function SearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [chosenSources, setChosenSources] = useState<string[]>([]);
  const [mode, setMode] = useState<string>("search");
  const [inputState, setInputState] = useState<any>({});

  const descriptionFields = [
    {
      label: "Title",
      field: 'title',
      type: "text",
      required: false
    },
    {
      label: "Authors",
      field: 'authors',
      type: "text",
      required: false
    },
    {
      label: "Type of Study",
      field: 'typeOfStudy',
      type: "select",
      required: false,
      values: [
        "--",
        "exVivo",
        "exposureAssessment",
        "humanStudies",
        "inVitro",
        "inVivo",
        "riskAssesment",
        "simulation"
      ]
    },
    {
      label: "Type of Output",
      field: 'typeOfOutput',
      type: "select",
      required: false,
      values: [
        "--",
        "audio",
        "codebook",
        "dataset",
        "deliverable",
        "image",
        "poster",
        "presentation",
        "publication",
        "report",
        "software",
        "video"
      ]
    },
    {
      label: "Topics",
      field: 'topics',
      type: "select",
      required: false,
      values: [
        "--",
      ]
    },
    {
      label: "Publication Year",
      field: 'publicationYear',
      type: "text",
      required: false
    },
    {
      label: "Privacy Level",
      field: 'privacyLevel',
      type: "select",
      required: false,
      values: [
        "--",
        "Public",
        "Restricted"
      ]
    },
    {
      label: "Identifier",
      field: 'identifier',
      type: "text",
      required: false
    }];

    const indicativeFields = [
      {
        label: "Frequency Ranges",
        field: 'frequencyRanges',
        type: "select",
        required: false,
        values: [
          "--",
        ]
      },
      {
        label: "Modulation",
        field: 'modulation',
        type: "select",
        required: false,
        values: [
          "--",
          "NR",
          "No Modulation"
        ]
      },
      {
        label: "Exposure Conditions",
        field: 'exposureConditions',
        type: "select",
        required: false,
        values: [
          "--",
        ]
      },
      {
        label: "Exposure Sources",
        field: 'exposureSources',
        type: "select",
        required: false,
        values: [
          "--",
        ]
      },
      {
        label: "Environment",
        field: 'environment',
        type: "select",
        required: false,
        values: [
          "--",
        ]
      },
      {
        label: "Microenvironment",
        field: 'microenvironment',
        type: "select",
        required: false,
        values: [
          "--",
        ]
      },
      {
        label: "Biological Model",
        field: 'biologicalModel',
        type: "select",
        required: false,
        values: [
          "--",
        ]
      },
      {
        label: "BioSpecific Endpoints",
        field: 'bioSpecificEndpoints',
        type: "select",
        required: false,
        values: [
          "--",
        ]
      },
      {
        label: "Methods",
        field: 'methods',
        type: "select",
        required: false,
        values: [
          "--",
        ]
      }
    ];

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
        console.log(response)
        console.log('yolo')
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
        <Input className='object-cover object-center shadow-sm shadow-blue-gray-900/50' crossOrigin={true} style={{ color: "black" }} label={label} />
      </div>
    );
  }
  const SelectInputComponent = ({ label, values, required, ref }: any) => {
    return (
      <div className="flex flex-row mt-4 w-full p-0">
        <Select className='ct-cover object-center shadow-sm shadow-blue-gray-900/50' label={label} placeholder={label}>
          {values.map((value: any) => (
            <Option key={value} value={value}>{value}</Option>
          ))
          }
        </Select>
      </div>
    );
  }

  return (
    <PageLayout isLoggedIn={isLoggedIn}>
      <AnimatePresence>
        {
          mode == "results" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <SearchResults mode={mode} setMode={setMode} chosenSources={chosenSources} />
            </motion.div>
          )
            :
            (
              <div className={`w-full mt-28 min-h-[65rem]`}>
                <Card className="mt-6 w-1/2 mx-auto form-container rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50">
                  <CardHeader className='bg-[#D4D9DD] text-black'>
                    <Typography variant="h2" className="text-center pb-4 pt-4">
                      Search Scientific Catalogue
                    </Typography>
                  </CardHeader>
                  <CardBody placeholder={''}>

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
                            {
                              descriptionFields.map((field) => {
                                if (field.type == "text") {
                                  return (
                                    <TextInputComponent classes="object-cover object-center shadow-xl shadow-blue-gray-900/50"  label={field.label} type={field.type} required={field.required} />
                                  )
                                } else if (field.type == "select") {
                                  return (
                                    <SelectInputComponent label={field.label} values={field.values} required={field.required} />
                                  )
                                }
                              })
                            }
                          </div>
                        </div>
                        <div className="p-0">
                          <Typography variant="h5" placeholder={"Indicative Terms"}>Indicative Terms</Typography>
                          {
                            indicativeFields.map((field) => {
                              if (field.type == "text") {
                                return (
                                  <TextInputComponent label={field.label} type={field.type} required={field.required} />
                                )
                              } else if (field.type == "select") {
                                return (
                                  <SelectInputComponent label={field.label} values={field.values} required={field.required} />
                                )
                              }
                            })
                          }
                        </div>
                      </div>
                        <CardFooter className="flex p-0 justify-left">
                        <Button placeholder={""} className="clear-button font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Clear</Button>
                        <Button placeholder={""} onClick={() => setMode('results')} id="searchBtn" type="submit" className="btn font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Search</Button>
                          </CardFooter>
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
            )}
      </AnimatePresence>
    </ PageLayout>);
}

export default SearchPage;