import React from "react";

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography
} from "@material-tailwind/react";

const SearchModal: React.FC<any> = ({ showModal, setShowModal }) => {
  const handleOpen = () => setShowModal(!showModal);

  return (
    <>
      <Dialog
        placeholder={""}
        open={showModal}
        handler={handleOpen}
        className=""
      >
        <DialogBody
          placeholder={""}
          className="grid place-items-center gap-4 w-full p-10"
        >
          <div className="grid grid-cols-2 gap-4 mt-20 mx-auto ">
            <a href="/literature-search" className="mb-12">
              <div className="search-menu-box members-cat">
                <div className=" w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                  <img
                    width={90}
                    className="mx-auto pt-10 mb-2"
                    src="./input-logo.svg"
                    alt=""
                  />
                  <span className="text-white text-xl">New Session</span>
                </div>
              </div>
            </a>
            <a href="/literature-search-history">
              <div className="search-menu-box members-cat">
                <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mx-auto mb-2 pt-12 w-20 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                    />
                  </svg>

                  <span className="text-white text-xl">Last Session</span>
                </div>
              </div>
            </a>
          </div>
        </DialogBody>
        <DialogFooter placeholder={""} className="space-x-2">
          <Button
            placeholder={""}
            className="mr-8 text-lg"
            variant="text"
            color="blue-gray"
            onClick={handleOpen}
          >
            close
          </Button>
          {/* <Button variant="gradient" onClick={handleOpen}>
                                                Ok, Got it
                                            </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SearchModal;
