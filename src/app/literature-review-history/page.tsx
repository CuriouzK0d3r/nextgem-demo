"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Option,
  Select,
  Typography
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import PageLayout from "../components/page-layout";
import SearchTable from "../components/search-table";
import { checkLoginStatus } from "../helpers/login";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function RASearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("All Fields");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentHistory, setCurrentHistory] = useState<any[]>([]);
  const [mode, setMode] = useState<string>("search");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [sessionIndex, setSessionIndex] = useState(0);

  const getHistory = () => {
    fetch("/api/history?username=" + "forth-admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async response => {
        if (response.ok) {
          let responseJSON = await response.json();
          setCurrentHistory(responseJSON);
        } else {
          console.error("Request failed. Status: " + response.status);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  checkLoginStatus(setIsLoggedIn);
  const handleSearch = (e: React.FormEvent<any>) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  const handleSearchChoice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    // setSearchIndex(e.target.value);
  };

  return (
    <PageLayout
      pageName="Literature Review History"
      isLoggedIn={isLoggedIn}
      checkLogin={true}
    >
      <div className={`mt-32 min-h-[65rem] w-full`}>
        <Card
          placeholder={""}
          style={{ background: "white" }}
          className="form-container shadow-[0_10px_50px_rgba(58,_65,_11,_0.8)] mx-auto mt-6 w-4/5 rounded-lg object-cover object-center lg:w-4/5"
        >
          <CardHeader placeholder={""} className="bg-[#D4D9DD] text-black">
            <Typography
              placeholder={""}
              variant="h2"
              className="pb-4 pt-4 text-center text-xl lg:text-2xl xl:text-4xl"
            >
              Literature Review History
            </Typography>
          </CardHeader>
          <CardBody placeholder={""}>
            <div
              className={classNames(
                "relative  mx-auto place-items-center w-full float-left",
                submittedQuery.length ? "mt-9" : "mt-0"
              )}
            >
              <div className=" mt-2 ml-0  w-full flex">
                Start a
                <div className="w-70 ">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="float-left pr-0 underline underline-offset-4"
                  >
                    New Review
                  </Typography>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 pb-3 -ml-0"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                or
                <div className="float-right w-60 flex">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="float-right underline underline-offset-4"
                  >
                    {" "}
                    New Search{" "}
                  </Typography>{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10 -ml-2 pb-4"
                  >
                    <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div className="pb-6 p-4 mt-10 pt-0 ml-0 text-left w-[370px]">
                <div className="w-18 float-left">
                  {currentHistory.length > 0 && (
                    <Select
                      placeholder={"Choose Review"}
                      label="Choose Review"
                      onChange={value => setSessionIndex(Number(value))}
                    >
                      {currentHistory.map((session, idx: number) => {
                        return (
                          <Option key={idx} value={String(idx)}>
                            Review {idx + 1}
                          </Option>
                        );
                      })}
                    </Select>
                  )}
                </div>
                <div className="w-28 float-right">
                  {currentHistory.length > 0 && (
                    <Select
                      placeholder={"Choose Search"}
                      className=""
                      label="Choose Search"
                      onChange={value => setSearchIndex(Number(value))}
                    >
                      {currentHistory[sessionIndex].history.map(
                        (_: any, idx: any) => {
                          return (
                            <Option key={idx} value={idx}>
                              Search {idx + 1}
                            </Option>
                          );
                        }
                      )}
                    </Select>
                  )}
                </div>
              </div>

              {/* <Card placeholder={""} className="max-w-[25rem] shadow-xl shadow-blue-gray-900/5 float-left">
                <div className="mb-2 p-4 ml-0 text-left">
                  <Typography placeholder={""} variant="h5" color="blue-gray" className="float-left ">
                    New RA Session
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 pb-3">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                  </svg>

                </div>
                <span className="text-left">
                  History
                </span>
                <List placeholder={""}>
                  <ListItem placeholder={""} className="ml-8">
                    Sessions
                  </ListItem>
                  <ListItem placeholder={""} className="ml-12">
                    Literature Search <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                      <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <b>new search</b>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 -ml-2">
                      <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
                    </svg>
                  </ListItem>
                  <ListItem placeholder={""} className="ml-20">
                    Search 1
                  </ListItem>
                </List>
              </Card> */}
              {
                <div className=" pl-4 w-full">
                  {currentHistory.length > 0 ? (
                    <SearchTable
                      searchResults={
                        currentHistory[currentHistory.length - 1].history[
                          searchIndex
                        ].results
                      }
                    />
                  ) : (
                    <></>
                  )}
                  {(!currentHistory || currentHistory.length === 0) && (
                    <>No searches in history</>
                  )}
                </div>
              }
              {/* <RASessionSearch /> */}
            </div>
          </CardBody>
        </Card>
      </div>
    </PageLayout>
  );
}

export default RASearchPage;
