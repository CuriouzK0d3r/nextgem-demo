"use client"

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Option,
  Select,
  Typography
} from "@material-tailwind/react";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from 'js-cookie';
import { createRef, useEffect, useState } from 'react';
import ExternalSources from '../components/external-sources';
import PageLayout from '../components/page-layout';
import SearchResults from '../components/search-results';

function SearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let chosenSources: string[] = [];
  const [mode, setMode] = useState<string>("search");
  const [inputState, setInputState] = useState<any>({});
  const [fieldRefs, setFieldRefs] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>({});

  const descriptionFields = [
    {
      label: "Title",
      field: 'title',
      type: "text",
      required: false
    },
    {
      label: "Institution",
      field: 'institution',
      type: "text",
      required: false
    },
    {
      label: "Keywords",
      field: 'keywords',
      type: "text",
      required: false
    },
    // {
    //   label: "Authors",
    //   field: 'authors',
    //   type: "text",
    //   required: false
    // },
    {
      label: "Type of Study",
      field: 'studyType',
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
      field: 'outputType',
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

  const TextInputComponent = ({ label, type, required, name }: any) => {
    return (
      <div className="flex flex-row mt-4 p-0">
        <Input inputRef={fieldRefs[name]} name={name} value={inputState[name]} className='object-cover object-center shadow-sm shadow-blue-gray-900/50 bg-white' crossOrigin={true} style={{ color: "black" }} label={label} />
      </div>
    );
  }
  
  const SelectInputComponent = ({ label, values, required, ref, name }: any) => {
    return (
      <div className="flex flex-row mt-4 w-full p-0">
        <Select ref={fieldRefs[name]} name={name} className='bg-white text-black ct-cover object-center shadow-sm shadow-blue-gray-900/50' label={label} placeholder={label}>
          {values.map((value: any) => (
            <Option key={value} value={value}>{value}</Option>
          ))
          }
        </Select>
      </div>
    );
  }


  useEffect(() => {
    let fields: any = {};
    descriptionFields.forEach((field) => {
      fields[field.field] = createRef();
    });
    indicativeFields.forEach((field) => {
      fields[field.field] = createRef();
    });
    checkLoginStatus();
    setFieldRefs(fields);
  }, []);

  return (
    <PageLayout isLoggedIn={isLoggedIn} skipLogin={false}>
      <AnimatePresence>
        {
          searchResults.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <SearchResults mode={mode} setMode={setMode} setSearchResults={setSearchResults} searchResults={searchResults} />
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

                    <form className='mt-4' id="searchForm" onSubmit={(event) => {event.preventDefault(); setHasSubmitted(true);}}>
                      <div className="grid gap-8 mb-6 md:grid-cols-2 ">
                        <div>
                          <Typography variant="h5" placeholder={"Description"}>Description</Typography>
                          <div className='p-0'>
                            {
                              descriptionFields.map((field) => {
                                if (field.type == "text") {
                                  return (
                                    <TextInputComponent name={field.field} classes="object-cover object-center shadow-xl shadow-blue-gray-900/50" label={field.label} type={field.type} required={field.required} />
                                  )
                                } else if (field.type == "select") {
                                  return (
                                    <SelectInputComponent name={field.field} label={field.label} values={field.values} required={field.required} />
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
                                  <TextInputComponent name={field.field} label={field.label} type={field.type} required={field.required} />
                                )
                              } else if (field.type == "select") {
                                return (
                                  <SelectInputComponent name={field.field} label={field.label} values={field.values} required={field.required} />
                                )
                              }
                            })
                          }
                        </div>
                      </div>
                      <CardFooter className="flex p-0 mt-4 justify-left">
                        <Button placeholder={""} className="clear-button font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Clear</Button>
                        <Button placeholder={""} id="searchBtn" type="submit" className="btn font-bold w-30 h-12 mr-4 rounded-lg object-cover object-center shadow-lg shadow-blue-gray-900/50" variant="gradient">Search</Button>
                      </CardFooter>
                    </form>
                  </CardBody>
                </Card>
                <ExternalSources hasSubmitted={hasSubmitted} fieldRefs={fieldRefs} setHasSubmitted={setHasSubmitted} setSearchResults={setSearchResults}  />
              </div>
            )}
      </AnimatePresence>
    </ PageLayout>);
}

export default SearchPage;