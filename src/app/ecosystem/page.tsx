"use client";

import { useRef, useState } from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import PageLayout from "../components/page-layout";

function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const loginUsernameRef = useRef<any>(null);
  const loginPasswordRef = useRef<any>(null);

  const handleOpen = () => setOpen(cur => !cur);

  return (
    <PageLayout checkLogin={true} isLoggedIn={isLoggedIn} pageName="Ecosystem">
      {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}

      <div className="w-full min-h-[45rem] mt-0 flex items-center justify-center ">
        <div className="grid grid-cols-2 gap-4 mt-12">
          <a href="/input" className="mb-4">
            <div className="menu-box members-cat  mr-8">
              <div className=" w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img
                  width={90}
                  className="mx-auto pt-8"
                  src="./input-logo.svg"
                  alt=""
                />
                <span className="text-white">Assets</span>
              </div>
            </div>
          </a>
          <a href="#">
            <div className="menu-box members-cat">
              <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img
                  width={93}
                  className="mx-auto pt-8"
                  src="./modeling-logo.svg"
                  alt=""
                />
                <span className="text-white">Premises</span>
              </div>
            </div>
          </a>
          <a href="/ra-search" className="mb-4">
            <div className="menu-box members-cat">
              <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mx-auto mt-2 pt-8 w-24 h-24 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                  />
                </svg>

                <span className="text-white">Contracts</span>
              </div>
            </div>
          </a>
          <a href="#">
            <div className="menu-box members-cat">
              <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                {/* <img width={93} className='mx-auto pt-8' src="./ecosystem-logo.svg" alt="" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mx-auto mt-2 pt-8 w-24 h-24 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>

                <span className="text-white">Users</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      {/* </div> */}
    </PageLayout>
  );
}

export default DashboardPage;
