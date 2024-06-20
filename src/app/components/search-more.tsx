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
import { MoreDialog } from "./helpers/more-dialog";

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

const SearchMore: React.FC<any> = ({
  searchResult,
  mode,
  setMode,
  isLoggedIn,
  seletedSources,
  setSearchResults
}) => {
  const [active, setActive] = React.useState(0);

  const strip_html_tags = (str: string) => {
    // Check if the input string is null or empty
    if (str === null || str === "") {
      // If so, return false
      return false;
    } else {
      // If not, convert the input string to a string type
      str = str.toString();
    }
    // Use a regular expression to replace all HTML tags with an empty string
    return str.replace(/<[^>]*>/g, "");
  };

  const TABLE_HEAD = [
    "Title",
    "Type of Study",
    "Output Type",
    "Location",
    "Status",
    " "
  ];

  return (
    <div
      className={`mx-auto mt-6 w-full table-auto border-collapse overflow-hidden text-left"`}
    >
      <h4 className="text-xxl">{searchResult.title}</h4>
      <h6 className="text-xl mt-10">
        {searchResult["subject"] && searchResult["subject"].join(", ")}
      </h6>
      <div className="mt-4 italic">
        {" "}
        {searchResult.author
          ? searchResult.author
              .map((person: any) => `${person.given} ${person.family}`)
              .join(", ")
          : searchResult.authors
          ? searchResult.authors
              .map(
                (person: any) =>
                  `${person.firstname} ${person.lastname} @ ${person.affiliation}`
              )
              .join(", ")
          : searchResult.creators
              .map(
                (person: any) =>
                  `${person.name} ${
                    person.affiliation
                      ? !person.affiliation.includes("@")
                        ? " @ " + person.affiliation
                        : person.affiliation
                      : ""
                  }`
              )
              .join(", ")}
      </div>
      <div className="mt-2">
        {(searchResult.created || searchResult.publication_date) && (
          <span className="pl-0 mr-8">
            Published {searchResult["container-title"] && "in"}:{" "}
            <b>{searchResult["container-title"]}</b>{" "}
            {searchResult.created
              ? new Date(searchResult.created.timestamp).toDateString()
              : searchResult.publication_date}
          </span>
        )}
        DOI:{" "}
        <a href={"https://doi.org/" + searchResult.DOI}>{searchResult.DOI} </a>
      </div>
      {searchResult.abstract && (
        <div className="mt-10">
          {" "}
          <h2 className="text-lg mb-2 font-bold ml-0 pl-0">Abstract</h2>
          {searchResult.abstract && strip_html_tags(searchResult.abstract)}{" "}
        </div>
      )}
      {searchResult.description && (
        <div className="mt-10">
          {" "}
          <h2 className="text-lg mb-2 font-bold ml-0 pl-0">Description</h2>
          <div
            className="Container"
            dangerouslySetInnerHTML={{ __html: searchResult.description }}
          ></div>{" "}
        </div>
      )}
      <div className="text-lg  font-bold ml-0 pl-0 mt-8">
        {searchResult.files ? (
          <>
            Files
            <div>
              <ul>
                {searchResult.files.map((file: any, idx: number) => (
                  <li key={idx}>
                    <a href={file.links.self}>{file.key}</a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}
        <div></div>
      </div>
      <div className="mt-12">
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(searchResult)
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
    </div>
  );
};

export default SearchMore;
