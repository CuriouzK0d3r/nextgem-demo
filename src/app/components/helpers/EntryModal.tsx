import React from "react";
import { Card } from "flowbite-react";
import * as cheerio from "cheerio";

const EntryModal: React.FC<any> = ({
  showModal,
  setShowModal,
  paperAbstract,
  dataFiles
}) => {
  return showModal ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-7xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 dark:bg-gray-700 outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl pl-8 font-semibold text-gray-700 dark:text-white first-letter">
                {paperAbstract ? "Abstract" : "Publications Files"}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="text-blue-500 hover:text-blue-700 bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto text-left dark:text-gray-100 text-gray-900">
              {paperAbstract ? (
                <p className="my-4 px-4  text-lg leading-relaxed">
                  {(cheerio.load(paperAbstract, { xmlMode: true }) as any)
                    .text()
                    .includes("Abstract")
                    ? (cheerio.load(paperAbstract, { xmlMode: true }) as any)
                        .text()
                        .split("Abstract")[1]
                    : (cheerio.load(paperAbstract, {
                        xmlMode: true
                      }) as any).text()}
                </p>
              ) : (
                <ol>
                  {// make a table
                  dataFiles?.map((file: any, i: number) => (
                    <li key={i}>
                      <a
                        className="my-4 px-4 text-lg leading-relaxed"
                        href={file["links"].self}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        {file["key"]}{" "}
                      </a>
                    </li>
                  ))}{" "}
                </ol>
              )}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-blue-500 mr-8 rounded-md text-white hover:bg-blue-700 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : (
    <></>
  );
};

export default EntryModal;
