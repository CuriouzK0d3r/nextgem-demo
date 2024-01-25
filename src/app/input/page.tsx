"use client"

import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../components/header';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function InputPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const searchParams = useSearchParams();
 
  const search = searchParams.get('tab');

  useEffect(() => {
    if (search === 'file') {
      setActiveTab('fileTab');
    } else 
      setActiveTab('formTab');
  }, [search]);

  const checkLoginStatus = () => {
    const apiEndpoint = "/api/auth/token";

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: Cookies.get('token'),
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          let responseJSON = await response.json();
          console.log(responseJSON)
          if (responseJSON.loggedin) {
            setIsLoggedIn(true);
          }
        } else {
          // console.error("Login failed. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  checkLoginStatus();

  const TextInputComponent = ({ label, type, required, ref }: any) => {
    return (
      <div className="flex flex-row mt-4">
        <label className="mb-2 ttext-based text-gray-900 mr-4">{label}:</label>
        <input
          className="border border-gray-400 p-2 rounded-lg w-3/4 appearance-none focus:outline-none focus:border-gray-500"
          type={type}
          id={label}
          name={label}
          placeholder={"Insert text"}
          required={required}
        // ref={ref}
        />
      </div>
    );
  };
  
  const SelectInputComponent = ({ label, values, required, ref }: any) => {
    return (
      <div className="flex flex-row mt-4">
        <label className="mb-2 text-base text-gray-900 mr-4">{label}</label>
        <select
          className="text-sm rounded-lg  block p-2.5   w-3/4 dark:border-gray-600">
          {values.map((value: any) => (
            <option value={value}>{value}</option>
          ))
          }
        </select>
      </div>
    );
  }

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`file${i}`, selectedFiles[i]);
    }
    // Now you can send the formData to your server
  };

  return (
    <div className='h-full w-full '>
      <Header isLoggedIn={isLoggedIn}></Header>
      {/* <div id="formTab" className="tabcontent " style={{ display: "block" }}> */}
      <div className="w-full mt-16 ">
        <h3 className='mb-6 text-5xl .title-color text-center mx-auto mt'>Input Data</h3>
        <div className='form-container w-3/4 mx-auto'>
          <div className="tab">
            <button className={"tablinks " + (activeTab === 'formTab' ? 'active' : '')} onClick={(event) => setActiveTab('formTab')}>
              Input Scientific Data
            </button>
            <button className={"tablinks " + (activeTab === 'fileTab' ? 'active' : '')} onClick={(event) => setActiveTab('fileTab')}>
              Input Files
            </button>
          </div>
          <div id="formTab" className={ " mt-12 " + (activeTab === 'formTab' ? 'block' : 'hidden')} >
            <form className='mt-4' id="inputForm">
              {/* <h5 className='text-center text-xl mb-10'>
              Search Terms:
            </h5> */}
              <div className="grid gap-8 mb-6 md:grid-cols-1 ">
                <div>
                  <div>
                    <TextInputComponent label="Title" type="text" required={false} />
                    <TextInputComponent label="Description" type="text" required={false} />
                    <TextInputComponent label="Free Keywords" type="text" required={false} />
                    <TextInputComponent label="Data Source URL" type="text" required={false} />
                    {/* <TextInputComponent label="Authors" type="text" required={false} /> */}
                    <SelectInputComponent label="Type of Study" values={["--", "exVivo", "exposureAssessment", "humanStudies", "inVitro", "inVivo", "riskAssesment", "simulation"]} required={false} />
                    <SelectInputComponent label="Type of Output" values={["--", "audio", "codebook", "dataset", "deliverable", "image", "poster", "presentation", "publication", "report", "software", "video"]} required={false} />
                    <SelectInputComponent label="Frequency Ranges" values={["--", ""]} required={false} />
                    <SelectInputComponent label="Modulation" values={["--", "NR", "No Modulation"]} required={false} />
                  </div>
                </div>
              </div>
              <div>
                <button className="clear-button font-bold w-30 mr-4" type="submit">Clear</button>
                <input type="submit" id="UploadBtn" className="btn font-bold w-30" value="Upload" />
              </div>
            </form>
          </div>
          <div id="fileTab" className={ " mt-12 " + (activeTab === 'fileTab' ? 'block' : 'hidden')} >
          <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
          </div>
        </div>

      </div>
      {/* </div> */}
    </div>);
}

export default InputPage;