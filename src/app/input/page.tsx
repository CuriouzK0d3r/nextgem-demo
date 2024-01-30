"use client"

import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import FileUploader from '../components/file-uploader';
import Footer from '../components/footer';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Select,
  Option,
  Input
} from "@material-tailwind/react"; import PageLayout from '../components/page-layout';

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
      <div className="flex flex-row mt-4 p-0">
        <Input crossOrigin={true} style={{ color: "black" }} label={label} />
        {/* <label className="mb-2 text-sm text-gray-900 mr-4 p-0">{label}:</label>
        <input
          className="border border-gray-400 p-2 rounded-lg w-3/4 appearance-none focus:outline-none focus:border-gray-500"
          type={type}
          id={label}
          name={label}
          placeholder={"Insert text"}
          required={required}
        // ref={ref}
        /> */}
      </div>
    );
  };

  const SelectInputComponent = ({ label, values, required, ref }: any) => {
    return (
      <div className="flex flex-row mt-4 p-0">
        {/* <label className="mb-2 text-sm text-gray-900 mr-4 p-0">{label}:</label>
        <select
          className="text-sm rounded-lg  block p-2.5   w-3/4 dark:border-gray-600">
          {values.map((value: any) => (
            <option key={value} value={value}>{value}</option>
          ))
          }
        </select> */}
        <Select label={label} placeholder={label} >
          {values.map((value: any) => (
            <Option key={value} value={value}>{value}</Option>
          ))
          }
          {/* <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option> */}
        </Select>
      </div>
    );
  }

  const handleFileChange = (event: any) => {
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
    <PageLayout isLoggedIn>
      <div className="w-full mt-16 min-h-[55rem]">
        {/* <h3 className='mb-6 text-4xl .title-color text-center mx-auto mt'>Input Data</h3> */}

        <Card className="mt-6 w-1/3 mx-auto form-container object-cover object-center shadow-xl shadow-blue-gray-900/50">
          <CardHeader className='bg-[#D4D9DD] text-black p-0 divide-y-4 divide-[#fff]'>
            <Typography variant="h2" className="text-center pb-4 pt-4">
              Input Data
            </Typography>
            <div className="tab bt-2 rounded-lg object-cover object-center shadow-3xl shadow-blue-gray-900/50 ">
              <button style={{ borderRadius: "4px 4px 0 0" }} className={"tablinks " + (activeTab === 'formTab' ? 'active' : '')} onClick={(event) => setActiveTab('formTab')}>
                Input Scientific Data
              </button>
              <button style={{ borderRadius: "4px 4px 0 0" }} className={"tablinks " + (activeTab === 'fileTab' ? 'active' : '')} onClick={(event) => setActiveTab('fileTab')}>
                Input Files
              </button>
            </div>
            {/* <h3 className='mb-8 text-4xl .title-color text-center mx-auto'>Search Scientific Catalogue</h3> */}
          </CardHeader>
          <CardBody>

            <div id="formTab" className={" " + (activeTab === 'formTab' ? 'block' : 'hidden')} >

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
                  <Button className="clear-button font-bold w-30 h-12 mr-4" variant="gradient">Clear</Button>
                  <Button id="searchBtn" type="submit" className="btn font-bold w-30 h-12 mr-4" variant="gradient">Upload</Button>

                  {/* <input type="submit" id="UploadBtn" className="btn font-bold w-30" value="Upload" /> */}
                </div>
              </form>
            </div>
            <div id="fileTab" className={"h-[450px] mt-12 " + (activeTab === 'fileTab' ? 'block' : 'hidden')} >
              <Typography variant="h5" placeholder={"Description"}>Upload scientific data files</Typography>

              {/* <h2 className='mb-8 text-xl bold underline decoration-dotted decoration-4 decoration-[#1D2E66]'>Upload scientific data files</h2> */}
              <FileUploader
                url={'/api/upload'}
                acceptedFileTypes={[
                  "application/json",
                ]}
                maxFileSize={100}
                label="Max File Size: 1MB"
              // labelAlt="Accepted File Types: png, jpeg"
              />
            </div>
            {/* </div> */}
          </CardBody>
        </Card>
      </div>
    </PageLayout>);
}

export default InputPage;