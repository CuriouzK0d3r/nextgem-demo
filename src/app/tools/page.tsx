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
    <PageLayout checkLogin={true} isLoggedIn={isLoggedIn} pageName="members">
      {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}

      <div className="w-full min-h-[45rem] mt-0 flex items-center justify-center ">
        <div className="grid grid-cols-2 gap-4 mt-8">
          <a href="/literature-session" className="mb-6">
            <div className="menu-box members-cat  mr-8">
              <div className=" w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img
                  width={90}
                  className="mx-auto pt-8"
                  src="./input-logo.svg"
                  alt=""
                />
                <span className="text-white">Literature Review</span>
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
                <span className="text-white">Modeling</span>
              </div>
            </div>
          </a>
          <a href="/ra-search" className=" mb-6">
            <div className="menu-box members-cat">
              <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img
                  width={88}
                  className="mx-auto pt-10"
                  src="./ra-logo.svg"
                  alt=""
                />
                <span className="text-white">Risk Assessment</span>
              </div>
            </div>
          </a>
          <a href="/data-management">
            <div className="menu-box members-cat">
              <div className="w-full h-full text-center rounded-lg object-cover object-center shadow-2xl shadow-blue-gray-900/50">
                <img
                  width={93}
                  className="mx-auto pt-8"
                  src="./ecosystem-logo.svg"
                  alt=""
                />
                <span className="text-white">Data Management</span>
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
