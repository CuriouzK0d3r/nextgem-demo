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
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import SearchTable from "./search-table";
// import Table from 'react-tailwind-table';

// import 'react-tailwind-table/dist/index.css';


function DefaultPagination({
  searchResults,
  active,
  setActive,
}: {
  searchResults: any[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const getItemProps = (index: number) =>
    ({
      variant: active === index ? "filled" : "text",
      color: "gray",
      onClick: () => setActive(index),
    }) as any;

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
            active > 3 ? active + 3 : active + 5,
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
  seletedSources,
  setSearchResults,
}) => {
  const [active, setActive] = React.useState(0);
  const [moreIdx, setMoreIdx] = React.useState(-1);

  var rows  = [
    {
          id: 1,
          name: "Sadio Mane",
          country_id: 3,
          club_id: 2,
          front_end_position:{
            name:{
              full_name:"Forward",
              short_code:"FW"
            },
            id:2
          }
    },
    {
          id: 3,
          name: "Virgil VanDijk",
          country_id: 30,
          club_id: 2,
          front_end_position:{
            name:{
              full_name:"Defence",
              short_code:"DF"
            },
            id:2
          }
    }
    ]

  const TABLE_HEAD = [
    "Title",
    // "Type of Study",
    "Output Type",
    "Location",
    "Status",
    "Sources",
    " ",
  ];

  const studyTypeMap: any = {
    inVitro: "In Vitro",
    inVivo: "In Vivo",
    inSilico: "In Silico",
    exVivo: "Ex Vivo",
    humanStudies: "Human Studies",
    simulation: "Simulation",
    riskAssessment: "Risk Assessment",
    exposureAssessment: "Exposure Assessment",
  };

  var columns = [
    {
     field: "title",
     use: "Title",
     //Will not be used in search filtering
     use_in_search:true
   },
   {
     field: "typeOfStudy",
     use: "Type of Study",
   },
   {
    field: "outputType",
    use: "Output Type",
  },
  {
    field: "location",
    use: "Location",
  },
  {
    field: "privacyLevel",
    use: "Status",
  },
  {
    field: "source",
    use: "",
  },
  // {
  //   field: "more",
  //   use: "",
  // },
]

  

  const TABLE_ROWS = searchResults.slice(active * 5, active * 5 + 5);
  // const TABLE_ROWS = [
  //     {
  //         title: "Epigenetic Tests on HaCat after FR2 limited exposure ",
  //         description: "Limited Exposure of HaCat 0.1",
  //         typeOfStudy: "In Vitro",
  //         outputType: "Publication",
  //         location: "CNR",
  //         status: "Public",
  //         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
  //         name: "Spotify",
  //         amount: "$2,500",
  //         date: "Wed 3:00pm",
  //         //   status: "paid",
  //         account: "visa",
  //         accountNumber: "1234",
  //         expiry: "06/2026",
  //     },
  //     {
  //         title: "Behavioural and developmental dfferentiations in bees by 5G exposure... ",
  //         description: "Continuous Exposure of bees",
  //         typeOfStudy: "In Vivo",
  //         outputType: "Video/Audio",
  //         location: "Lorem",
  //         status: "Restricted",
  //         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
  //         name: "Spotify",
  //         amount: "$2,500",
  //         date: "Wed 3:00pm",
  //         //   status: "paid",
  //         account: "visa",
  //         accountNumber: "1234",
  //         expiry: "06/2026",
  //     },
  //     {
  //         title: "Cumulative 5G Exposure in indoor working environment",
  //         description: "Cumulative Exposure in indoor working environment",
  //         typeOfStudy: "Simulation",
  //         outputType: "Poster",
  //         location: "CIMNE",
  //         status: "Restricted",
  //         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
  //         name: "Spotify",
  //         amount: "$2,500",
  //         date: "Wed 3:00pm",
  //         //   status: "paid",
  //         account: "visa",
  //         accountNumber: "1234",
  //         expiry: "06/2026",
  //     },
  //     {
  //         title: "Combined 5G, WiFi  Exposure",
  //         description: "Lorem ipsum dolor sit amet, consectetur ",
  //         typeOfStudy: "In Silico",
  //         outputType: "Dataset",
  //         location: "Lorem",
  //         status: "Public",
  //         img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
  //         name: "Spotify",
  //         amount: "$2,500",
  //         date: "Wed 3:00pm",
  //         //   status: "paid",
  //         account: "visa",
  //         accountNumber: "1234",
  //         expiry: "06/2026",
  //     },
  // ];
  console.log(searchResults);
  return (
    <div
      className={`mt-0 flex min-h-[68rem] w-full items-center justify-center`}
    >
      <Card
        placeholder=""
        className="form-container shadow-blue-gray-900/50 mx-auto mt-6 min-h-[30rem] w-3/4 object-cover object-center shadow-xl"
      >
        <CardHeader placeholder="" className="bg-[#D4D9DD] text-black">
          <Typography
            placeholder=""
            variant="h2"
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
            className="mb-4 cursor-pointer font-medium	"
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
            {moreIdx === -1 ? "New Search" : "Back to Results"}
          </Typography>
          {searchResults.length ? (
            moreIdx === -1 ? (
              <table className="mx-auto mt-6 w-full table-auto overflow-hidden border-collapse text-left">
                <thead>
                  <tr className="whitespace-nowrap">
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className={`border-blue-gray-100 bg-blue-gray-50 border-b p-4 pb-4 ${[ "Status", "Location"].includes(head) ? "hidden lg:table-cell" : ["Output Type", "Type of Study"].includes(head) ? "hidden xl:table-cell" : ""}`}
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
                        institution,
                        studyType,
                        privacyLevel,
                        source
                      }: any,
                      index: number,
                    ) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4 "
                        : "p-4 border-b border-blue-gray-50 whitespace-break-spaces";

                      return (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                          <td className={classes}>
                            <div className="flex  items-center">
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
                          {/* <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {description}
                                                    </Typography>
                                                </td> */}
                          {/* <td className={classes + " hidden xl:table-cell "}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  placeholder=""
                                  variant="h6"
                                  color="blue-gray"
                                  className="hidden font-normal xl:table-cell"
                                >
                                  {studyType ? studyTypeMap[studyType] : "N/A"}
                                </Typography>
                              </div>
                            </div>
                          </td> */}
                          <td className={classes + " hidden xl:table-cell"}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  placeholder=""
                                  variant="h6"
                                  color="blue-gray"
                                  className="font-normal capitalize hidden xl:table-cell"
                                >
                                  {outputType || "N/A"}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes + " hidden lg:table-cell"}>
                            <div className="flex items-center gap-3">
                              <div className=" flex flex-col text-left">
                                <Typography
                                  placeholder=""
                                  variant="h6"
                                  color="blue-gray"
                                  className="text-left font-normal hidden lg:table-cell  capitalize"
                                >
                                  {institution || location}
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
                            <div className=" w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={source}
                                className="mb-6"
                                color={
                                  "gray"
                                }
                              />
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
                    },
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
                <SearchTable searchResults={searchResults} />
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
                 {searchResults.length} results found
                <Typography
                  placeholder={""}
                  variant="h6"
                  className="text-center text-gray-900"
                >
                  Page {active + 1} of { Math.floor(searchResults.length/5) + (searchResults.length%5 > 0 ? 1 : 0)}
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
