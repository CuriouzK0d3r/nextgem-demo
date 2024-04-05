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
import { MoreDialog } from "./helpers/more-dialog";

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

const SearchMore: React.FC<any> = ({
  searchResult,
  mode,
  setMode,
  isLoggedIn,
  seletedSources,
  setSearchResults,
}) => {
  const [active, setActive] = React.useState(0);

  const TABLE_HEAD = [
    "Title",
    "Type of Study",
    "Output Type",
    "Location",
    "Status",
    " ",
  ];

  console.log(searchResult)


  return (
    <div
      className={`mx-auto mt-6 w-full table-auto border-collapse overflow-hidden text-left"`}
    >
      <h4 className="text-xxl">{searchResult.title}</h4>
      <div className="mt-10 italic"> {
        searchResult.author ? searchResult.author.map((person: any) => `${person.given} ${person.family}`).join(', ') :
          searchResult.authors.map((person: any) => `${person.firstname} ${person.lastname} @ ${person.affiliation}`).join(', ')
      }
      </div>
      <div className="mt-2">          <span className="pl-0 mr-8">Published: {(new Date(searchResult.created.timestamp).toDateString())}</span>
        DOI: <a href={"https://doi.org/" + searchResult.DOI} >{searchResult.DOI} </a></div>
      <div className="mt-10">          <h2 className="text-lg mb-2 font-bold ml-0 pl-0">Abstract</h2>
        {searchResult.abstract} </div>
      <div className="text-lg  font-bold ml-0 pl-0 mt-8">
        Files
        <div>

        </div>
      </div>
      <div className="mt-12">
        <Button
          placeholder={""}
          id="searchBtn"
          style={{background: "#3A416F"}}
          className=" ml-0 w-25 shadow-blue-gray-900/50 mr-4 h-50 rounded-lg object-cover object-center font-bold shadow-lg"
          variant="gradient"
          onClick={()=> ""}
        >
          Download Metadata
        </Button>
      </div>
    </div>
  );
};

export default SearchMore;
