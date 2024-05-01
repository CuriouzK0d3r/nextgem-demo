"use client"
import Cookies from "js-cookie";

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
import React, { useEffect, useState } from "react";
import ExternalSources from "../components/external-sources";
import PageLayout from '../components/page-layout';
import SearchResults from "../components/ra-search-results";
import { checkLoginStatus, parseJwt } from '../helpers/login';
import SearchModal from "../components/helpers/SearchModal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function RASearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<string>("search");
  const [fieldRefs, setFieldRefs] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>({});
  const [chosenSources, setChosenSources] = useState<string[]>([]);
  const [inputFields, setInputFields] = useState<any>([]);
  const [inputState, setInputState] = useState<any>([]);
  const [open, setOpen] = useState(true);


  function clearState() {
    let inputs: any = {};
    for (let i = 0; i < inputFields.length; i++) {
      inputs[inputFields[i].fieldName] = "";
    }
    setInputState(inputs);
  }
  const saveHistory = (

  ) => {
    const token = Cookies.get('token');
    const jwtObj = parseJwt(token);

    console.log('fdsfsd')

    fetch("/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: JSON.stringify(inputState),
        username: jwtObj["preferred_username"],
        search_results: searchResults,
        chosenSources: chosenSources
      })
    })
      .then(async (response) => {
        if (response.ok) {
          let responseJSON = await response.json();
          // setInputFields(responseJSON.fields);
          // clearState();
        } else {
          console.error("Request failed. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  useEffect(() => {
    if (searchResults.length !== 0) {
      saveHistory();
    }
  }, [searchResults]);

  useEffect(() => {
    fetch("/api/fields", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          let responseJSON = await response.json();
          setInputFields(responseJSON.fields);
          clearState();
        } else {
          console.error("Request failed. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    checkLoginStatus(setIsLoggedIn);
  }, []);

  return (
    <PageLayout pageName='members' isLoggedIn={isLoggedIn} skipLogin={false}>
      <AnimatePresence>
        {searchResults.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <SearchResults
              mode={mode}
              setMode={setMode}
              setSearchResults={setSearchResults}
              searchResults={searchResults}
            />
          </motion.div>
        ) : (
          <div className={`mt-32 min-h-[65rem] w-full`}>
            <Card
              placeholder={""}
              style={{ background: "white" }}
              className="form-container shadow-[0_10px_50px_rgba(58,_65,_11,_0.8)] mx-auto mt-6 w-4/5 rounded-lg object-cover object-center lg:w-1/2"
            >
              <CardHeader placeholder={""} className="bg-[#D4D9DD] text-black">
                <Typography
                  placeholder={""}
                  variant="h2"
                  className="pb-4 pt-4 text-center text-xl lg:text-2xl xl:text-4xl"
                >
                  Search Literature
                </Typography>
              </CardHeader>
              <CardBody placeholder={""}>
                <Typography
                  placeholder={""}
                  variant="h2"
                  className="text-center text-lg lg:text-xl xl:text-2xl"
                >
                  Session 1 (0 search queries submitted)
                </Typography>
                <form
                  className="mt-4"
                  id="searchForm"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setHasSubmitted(true);
                  }}
                >
                  <div className=" ">
                    <div>
                      {/* <Typography variant="h5" placeholder={"Description"}>Description</Typography> */}
                      <div className="mb-12 grid w-full grid-cols-1 gap-x-12 gap-y-2 p-0 lg:grid-cols-2">
                        {inputFields.map((field: any, index: any) => {
                          const words = field.fieldName.replace(
                            /([a-z])([A-Z])/g,
                            "$1 $2",
                          );
                          if (field.type == "String") {
                            return (
                              <div key={index} className=" mt-4 p-0">
                                <Input
                                  value={inputState[field.fieldName]}
                                  onChange={(event) => {
                                    event.preventDefault();
                                    setInputState({
                                      ...inputState,
                                      [field.fieldName]: event.target.value,
                                    });
                                  }}
                                  name={field.fieldName}
                                  className="shadow-blue-gray-900/50 bg-white object-cover object-center shadow-inner"
                                  crossOrigin="true"
                                  style={{ color: "black" }}
                                  label={
                                    words.charAt(0).toUpperCase() +
                                    words.slice(1)
                                  }
                                />
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={index}
                                className=" select-input mt-4 w-full p-0"
                              >
                                <Select
                                  name={field.fieldName}
                                  value={inputState[field.fieldName]}
                                  onChange={(event) =>
                                    setInputState({
                                      ...inputState,
                                      [field.fieldName]: event,
                                    })
                                  }
                                  className=" ct-cover shadow-blue-gray-900/50 bg-white object-center text-black shadow-inner"
                                  label={
                                    words.charAt(0).toUpperCase() +
                                    words.slice(1)
                                  }
                                  placeholder={field.fieldName}
                                >
                                  {/* <Option key={index} value={"-"}>{"-"}</Option> */}
                                  {field.enumValues.map((value: any) => (
                                    <Option key={value} value={value}>
                                      {value}
                                    </Option>
                                  ))}
                                </Select>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                    <div className="p-0"></div>
                  </div>
                  <CardFooter
                    placeholder={""}
                    className="justify-left mt-4 flex p-0"
                  >
                    <Button
                      placeholder={""}
                      onClick={() => {
                        setInputState(inputFields);
                        setChosenSources([]);
                        clearState();
                      }}
                      className="clear-button w-30 shadow-blue-gray-900/50 mr-4 h-12 rounded-lg object-cover object-center font-bold shadow-lg"
                      variant="gradient"
                    >
                      Clear
                    </Button>
                    {hasSubmitted ? (
                      <div
                        className="ml-8 mt-2 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      >
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                          Loading...
                        </span>
                      </div>
                    ) : (
                      <Button
                        placeholder={""}
                        id="searchBtn"
                        type="submit"
                        className="btn w-30 shadow-blue-gray-900/50 mr-4 h-12 rounded-lg object-cover object-center font-bold shadow-lg"
                        variant="gradient"
                      >
                        Search
                      </Button>
                    )}
                  </CardFooter>
                </form>
              </CardBody>
            </Card>
            <ExternalSources
              hasSubmitted={hasSubmitted}
              setHasSubmitted={setHasSubmitted}
              inputState={inputState}
              setSearchResults={setSearchResults}
              chosenSources={chosenSources}
              setChosenSources={setChosenSources}
            />
          </div>
        )}
      </AnimatePresence>
      <SearchModal showModal={open} setShowModal={setOpen} />
    </ PageLayout>);
}

export default RASearchPage;