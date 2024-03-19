import { Card, Chip, Typography } from "@material-tailwind/react";
import Table from "react-tailwind-table";

// import 'react-tailwind-table/dist/index.css';

// create a new component called SearchTable
const SearchTable = ({ searchResults }: { searchResults: any }) => {
  const TABLE_HEAD = [
    "Abstract",
    "Type of Study",
    "Output Type",
    "Location",
    "Status",
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
  console.log(searchResults);

  const document = searchResults.slice(0 * 1, 1);

  return (
    <Card
      placeholder={""}
      className="shadow-blue-gray-900/50 mb-4 w-full bg-[#D9D9D9]  object-cover object-center pt-6 shadow-xl hover:bg-[#eee]"
    >
      <div className="flex">
        {/* <div className="float-left w-5/6">
          <h3 className="mb-3 ml-3 text-left text-lg">{document.title}.</h3>
          <p className="mt-1 flex items-center">
            <div className=" ml-6 text-blue-500">
              {document.author?.map((auth: { given: string }, i: number) => {
                if (i < 5)
                  return (
                    <span className="p-0" key={i + " span " + index}>
                      {auth.given},{" "}
                    </span>
                  );
                else if (i == 5)
                  return (
                    <span className="p-0" key={i + " span " + index}>
                      {auth.given} et al.{" "}
                    </span>
                  );
              })}
              - {document.publisher},{" "}
              {document.created && document.created["date-time"]
                ? new Date(document.created["date-time"]).getFullYear()
                : " "}
            </div>
          </p>
          <p className="-mt-4 mb-2 flex items-center">
            <div className="ml-6 text-gray-700 dark:text-gray-400">
              {document.subject ? document.subject.join(", ") : ""}
            </div>
          </p>
          <p className="flex items-center">
            <div style={{ color: "#6359E1" }} className="ml-3 underline">
              <a href={document.URL}>{document.DOI}</a>
            </div>
          </p>
        </div>
        <div className="float-right w-1/6">
          <div className="align-right flex flex-col">
            <a href={linkMap[document.source]} target="_blank" className="">
              <div className="invisible float-right mx-auto mb-4 mr-1 w-[8rem] rounded-lg bg-[#1d3f66] p-3 text-center text-sm text-gray-100 lg:visible">
                📖 {sourceMap[document.source]}
              </div>
            </a>
            {/* {document.abstract?.length ? (
              <a
                className="cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setPaperAbstract(document.abstract);
                }}
                target="_blank"
              >
                <div className="invisible float-right mx-auto mr-1 w-[8rem] rounded-lg bg-[#1d3f66] p-3 text-center text-sm text-gray-100 lg:visible">
                  📄 Abstract
                </div>
              </a>
            ) : (
              <></>
            )} */}
        {/* </div>
    </div> * /} */}
      </div>
    </Card>
  );
};

export default SearchTable;
