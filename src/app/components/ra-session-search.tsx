"use client";

import {
  Button,
  CardFooter,
  Input,
  Option,
  Select
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ExternalSources from "../components/external-sources";
import { checkLoginStatus, parseJwt } from "../helpers/login";
const RASessionSearch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState<string>("search");
  const [fieldRefs, setFieldRefs] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>({});
  const [chosenSources, setChosenSources] = useState<string[]>([]);
  const [inputFields, setInputFields] = useState<any>([]);
  const [inputState, setInputState] = useState<any>([]);

  function clearState() {
    let inputs: any = {};
    for (let i = 0; i < inputFields.length; i++) {
      inputs[inputFields[i].fieldName] = "";
    }
    setInputState(inputs);
  }

  function saveHistory() {
    const token = Cookies.get('token');
    const jwtObj = parseJwt(token);

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
  }

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

  return (<form
    className="mt-4"
    id="searchForm"
    onSubmit={(event) => {
      event.preventDefault();
      setHasSubmitted(true);
      saveHistory();
    }}
  >
    <div className=" ">
      <div>
        {/* <Typography variant="h5" placeholder={"Description"}>Description</Typography> */}
        <div className="mb-12 ml-40 grid w-full grid-cols-1 gap-x-12 gap-y-2 p-0 lg:grid-cols-2">
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
      className="justify-left mt-4 ml-40 flex p-0"
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
      <ExternalSources
        hasSubmitted={hasSubmitted}
        setHasSubmitted={setHasSubmitted}
        inputState={inputState}
        setSearchResults={setSearchResults}
        chosenSources={chosenSources}
        setChosenSources={setChosenSources}
      />
    </CardFooter>
  </form>);
}

export default RASessionSearch;