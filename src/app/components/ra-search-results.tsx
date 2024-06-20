import React from "react";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Typography
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import SearchMore from "./search-more";
// import Table from 'react-tailwind-table';
import { Select, Option } from "@material-tailwind/react";

function DefaultPagination({
  searchResults,
  active,
  setActive
}: {
  searchResults: any[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index)
    } as any);

  const next = (pagesNo: number) => {
    if (active === pagesNo) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 0) return;

    setActive(active - 1);
  };

  const pagesNo = Math.ceil(searchResults.length / 5);

  return (
    <div className="mx-auto mt-4 flex items-center gap-4">
      <Button
        placeholder={""}
        variant="text"
        className="flex items-center gap-2 bg-[#eee]"
        onClick={prev}
        disabled={active === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {active >= 3 ? "..." : ""}
        {Array.from(Array(pagesNo).keys())
          .slice(
            active > 2 ? active - 2 : 0,
            active > 3 ? active + 3 : active + 5
          )
          .map((i, index) => {
            return (
              <IconButton key={index} {...getItemProps(i)}>
                {i + 1}
              </IconButton>
            );
          })}
        {active <= pagesNo - 4 ? "..." : ""}
      </div>
      <Button
        placeholder={""}
        variant="text"
        className="flex items-center gap-2"
        onClick={() => next(pagesNo)}
        disabled={active === pagesNo - 1}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

const SearchResults: React.FC<any> = ({
  searchResults,
  mode,
  setMode,
  isLoggedIn,
  selectedSources,
  setSearchResults
}) => {
  const [active, setActive] = React.useState(0);
  const [moreIdx, setMoreIdx] = React.useState(-1);

  var rows = [
    {
      id: 1,
      name: "Sadio Mane",
      country_id: 3,
      club_id: 2,
      front_end_position: {
        name: {
          full_name: "Forward",
          short_code: "FW"
        },
        id: 2
      }
    },
    {
      id: 3,
      name: "Virgil VanDijk",
      country_id: 30,
      club_id: 2,
      front_end_position: {
        name: {
          full_name: "Defence",
          short_code: "DF"
        },
        id: 2
      }
    }
  ];

  const TABLE_HEAD = [
    "Title",
    // "Type of Study",
    "Output Type",
    // "Location",
    "Status",
    "Sources",
    " "
  ];

  const studyTypeMap: any = {
    inVitro: "In Vitro",
    inVivo: "In Vivo",
    inSilico: "In Silico",
    exVivo: "Ex Vivo",
    humanStudies: "Human Studies",
    simulation: "Simulation",
    riskAssessment: "Risk Assessment",
    exposureAssessment: "Exposure Assessment"
  };

  var columns = [
    {
      field: "title",
      use: "Title",
      //Will not be used in search filtering
      use_in_search: true
    },
    {
      field: "typeOfStudy",
      use: "Type of Study"
    },
    {
      field: "outputType",
      use: "Output Type"
    },
    {
      field: "location",
      use: "Location"
    },
    {
      field: "privacyLevel",
      use: "Status"
    },
    {
      field: "source",
      use: ""
    }
    // {
    //   field: "more",
    //   use: "",
    // },
  ];

  const TABLE_ROWS = searchResults.slice(active * 5, active * 5 + 5);

  return (
    <div
      className={`mt-0 flex min-h-[68rem] w-full items-center justify-center`}
    >
      <Card
        placeholder=""
        style={{ background: "#fefefe" }}
        className="form-container bg-white shadow-[0_10px_50px_rgba(58,_65,_11,_0.8)] mx-auto mt-6 min-h-[30rem] w-3/4 object-cover object-center "
      >
        <CardHeader placeholder="" className="bg-[#D4D9DD] text-black">
          <Typography
            placeholder=""
            variant="h1"
            className="pb-4 pt-4 text-center"
          >
            {moreIdx === -1 ? "Search Results" : "More Information"}
          </Typography>
          {/* <h3 className='mb-8 text-4xl .title-color text-center mx-auto'>Search Scientific Catalogue</h3> */}
        </CardHeader>

        <CardBody placeholder={""} className=" px-0">
          <Typography
            as="a"
            placeholder=""
            onClick={() =>
              moreIdx === -1 ? setSearchResults([]) : setMoreIdx(-1)
            }
            variant="h6"
            color="blue-gray"
            className="mb-4 cursor-pointer font-medium float-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="float-left h-6 w-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            {moreIdx === -1 ? "Add a New Search" : "Back to Results"}
          </Typography>

          <div className="float-right mb-4">
            {" "}
            {moreIdx === -1 ? (
              <Select
                value={"Show current results"}
                className="w-60"
                variant="standard"
                placeholder={""}
                label=""
              >
                <Option>Show current results</Option>
                <Option>Show all session results</Option>
              </Select>
            ) : (
              ""
            )}
          </div>
          {/* <Button
                    className="float-right mt-3 p-2"
                        placeholder={""}
                    >Deduplicate</Button> */}
          {/* <Typography
                        placeholder=""
                
                        variant="h6"
                        color="blue-gray"
                        className="cursor-pointer font-medium float-right"
                    >
                      
                    </Typography> */}
          {searchResults.length ? (
            moreIdx === -1 ? (
              <table className="mx-auto mt-6 w-full table-auto border-collapse overflow-hidden text-left">
                <thead>
                  <tr className="whitespace-nowrap">
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className={`border-blue-gray-100 bg-blue-gray-50 border-b p-4 pb-4 ${
                          ["Status", "Location"].includes(head)
                            ? "hidden lg:table-cell"
                            : ["Output Type", "Type of Study"].includes(head)
                            ? "hidden xl:table-cell"
                            : ""
                        }`}
                      >
                        <Typography
                          placeholder={""}
                          variant="h6"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(
                    (
                      {
                        title,
                        description,
                        typeOfStudy,
                        outputType,
                        location,
                        source_url,
                        institution,
                        studyType,
                        output_type,
                        privacyLevel,
                        source
                      }: any,
                      index: number
                    ) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4 "
                        : "p-4 border-b border-blue-gray-50 whitespace-break-spaces";

                      let source_icons = [];

                      for (let i = 0; i < source.length; i++) {
                        switch (source[i]) {
                          case "PUBMED":
                            source_icons.push(
                              <img
                                className="w-[50px]"
                                src="https://static-00.iconduck.com/assets.00/pubmed-icon-463x512-q8ocx6xf.png"
                              />
                            );
                            break;
                          case "EMF-PORTAL":
                            source_icons.push(
                              <img
                                className="w-[50px]"
                                src="./EMF-portalicon-96x96.svg"
                              />
                            );
                            break;
                          case "ZENODO":
                            source_icons.push(
                              <img
                                className="w-[60px]"
                                src="./logozenodo.svg"
                              />
                            );
                            break;
                          case "WOS":
                            source_icons.push(
                              <img
                                className="w-[50px]"
                                src="./web-of-science.jpg"
                              />
                            );
                            break;
                          case "NEXTGEM":
                            source_icons.push(
                              <img
                                className="w-[52px]"
                                src="./cropped2-NextGEM_final_transparent 1.svg"
                              />
                            );
                            break;
                          case "SEAWAVE":
                            source_icons.push(
                              <img className="w-[52px]" src="./seawave.png" />
                            );
                            break;
                          case "GOLIAT":
                            source_icons.push(
                              <img className="w-[38px]" src="./goliat.png" />
                            );
                            break;
                        }
                      }

                      return (
                        <tr key={index} className="even:bg-blue-gray-100/50">
                          <td className={classes}>
                            <div className="flex  items-center w-max-[55rem]">
                              <Typography
                                placeholder=""
                                variant="h6"
                                color="blue-gray"
                                className="font-bold"
                              >
                                {title}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes + " hidden xl:table-cell"}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  placeholder=""
                                  variant="h6"
                                  color="blue-gray"
                                  className="hidden font-normal capitalize xl:table-cell"
                                >
                                  {outputType || output_type || "N/A"}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes + " hidden lg:table-cell"}>
                            <div className="hidden lg:table-cell">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={privacyLevel}
                                className="mb-6"
                                color={
                                  privacyLevel === "Public" ||
                                  privacyLevel === "open"
                                    ? "green"
                                    : privacyLevel === "restricted" ||
                                      privacyLevel === "sensitive"
                                    ? "orange"
                                    : "gray"
                                }
                              />
                            </div>
                          </td>
                          <td className={classes + " "}>
                            <div className="w-[8rem] flex text-center">
                              {/* <a
                                href={source_url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-0"
                              > */}
                              {/* <Chip
                                  size="sm"
                                  variant="ghost"
                                  value={                              <img className="w-[50px]" src="https://marketplace.digimind.com/hubfs/Website%20Visual%20assets%20S2/Digimind%20Website%20-%20Marketplace/Logos/Pubmed-logo-WithBG.png" ></img>
                                }
                                  className="mb-6"
                                  color={"gray"}
                                /> */}
                              {source_icons.map(icon => icon)}
                            </div>
                          </td>
                          <td>
                            <Typography
                              placeholder={""}
                              as="a"
                              onClick={() => setMoreIdx(index)}
                              variant="small"
                              color="blue-gray"
                              className="mb-4 cursor-pointer font-medium"
                            >
                              More
                            </Typography>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }}
              >
                <SearchMore
                  searchResult={searchResults[moreIdx + 5 * active]}
                />
              </motion.div>
            )
          ) : (
            <div className="text-center text-gray-900">No results found.</div>
          )}
        </CardBody>
        {moreIdx === -1 ? (
          <CardFooter
            placeholder={""}
            className=" border-blue-gray-50 w-full border-t p-4"
          >
            {searchResults.length ? (
              <div className="mx-auto flex flex-col justify-center">
                <div>
                  {searchResults.length} results found
                  <a
                    href={`data:text/json;charset=utf-8,${encodeURIComponent(
                      JSON.stringify(searchResults)
                    )}`}
                    download="results.json"
                  >
                    <Button
                      placeholder={""}
                      id="searchBtn"
                      className="float-end ml-0 w-25 shadow-blue-gray-900/50  h-10 rounded-lg object-cover object-center font-bold shadow-lg"
                      variant="gradient"
                    >
                      Download Metadata
                    </Button>
                  </a>
                </div>
                <Typography
                  placeholder={""}
                  variant="h6"
                  className="text-center text-gray-900"
                >
                  Page {active + 1} of{" "}
                  {Math.floor(searchResults.length / 5) +
                    (searchResults.length % 5 > 0 ? 1 : 0)}
                </Typography>
                <DefaultPagination
                  active={active}
                  setActive={setActive}
                  searchResults={searchResults}
                />
              </div>
            ) : (
              <></>
            )}
          </CardFooter>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

export default SearchResults;
