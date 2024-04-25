"use client"

import {
  Card,
  CardBody,
  CardHeader,
  Chip,
  List,
  ListItem,
  Select,
  Option,
  Typography
} from "@material-tailwind/react";
import React, { useState } from "react";
import PageLayout from '../components/page-layout';
import { checkLoginStatus } from '../helpers/login';
import RASessionSearch from "../components/ra-session-search";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function RASearchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('All Fields');
  const [currentPage, setCurrentPage] = useState(1);

  const saveHistory = (e: React.FormEvent<any>) => {
    e.preventDefault();
    fetch("/api/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: '',
        query: '',
        results: ''
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          let responseJSON = await response.json();

        } else {
          console.error("Request failed. Status: " + response.status);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };

  const searchResult = [
    {
      "_id": "6603f4b763ce7798f7249d04",
      "indexed": {
        "date-parts": [
          [
            2023,
            10,
            6
          ]
        ],
        "date-time": "2023-10-06T08:04:01Z",
        "timestamp": 1696579441934
      },
      "reference-count": 8,
      "publisher": "AIP Publishing",
      "issue": "7",
      "content-domain": {
        "domain": [
          "pubs.aip.org"
        ],
        "crossmark-restriction": true
      },
      "short-container-title": [],
      "published-print": {
        "date-parts": [
          [
            2011,
            4,
            1
          ]
        ]
      },
      "abstract": "<jats:p>The effects of a pulsed train magnetic field (PMF) and 10-T order of static magnetic fields on firefly bioluminescence were investigated on two species, Luciola cruciata and Luciola lateralis. Strong static magnetic field exposure experiments were carried out with a time-resolved spectroscopy, and the firefly bioluminescence spectrum showed a redshift in the range of 540–580nm when the firefly emitted pulses under the 10-T magnetic field. Separately from this effect, a transient decrease in the firefly’s emission intensity was observed right after being exposed to the static magnetic fields of up to 10 T. On the other hand, the utilized PMFs stimulated and enhanced the bioluminescence of Luciola cruciata. The PMF with 250–325 T/s at 1.3–10 Hz increased both the firefly’s pulsed density and frequency. It was speculated that the magnetically induced current inside the firefly affected its nervous system or the photochemical processes in the light producing organ, while the diamagnetic torque forces, which were induced by the 10 T order of the static field, had an inhibitory effect on the bioluminescence system.</jats:p>",
      "DOI": "10.1063/1.3556949",
      "type": "journal-article",
      "created": {
        "date-parts": [
          [
            2011,
            3,
            24
          ]
        ],
        "date-time": "2011-03-24T18:14:38Z",
        "timestamp": 1300990478000
      },
      "update-policy": "http://dx.doi.org/10.1063/aip-crossmark-policy-page",
      "source": "EMF-PORTAL",
      "is-referenced-by-count": 7,
      "title": "Changes in the bioluminescence of firefly under pulsed and static magnetic fields",
      "prefix": "10.1063",
      "volume": "109",
      "author": [
        {
          "given": "M.",
          "family": "Iwasaka",
          "sequence": "first",
          "affiliation": [
            {
              "name": "Chiba University 1 , Inage-ku, Chiba 263-8522, Japan"
            }
          ]
        },
        {
          "given": "Y.",
          "family": "Miyashita",
          "sequence": "additional",
          "affiliation": [
            {
              "name": "Chiba University 1 , Inage-ku, Chiba 263-8522, Japan"
            }
          ]
        },
        {
          "given": "A. G.",
          "family": "Barua",
          "sequence": "additional",
          "affiliation": [
            {
              "name": "Gauhati University 2 , Guwahati-781014, Assam, India"
            }
          ]
        },
        {
          "given": "S.",
          "family": "Kurita",
          "sequence": "additional",
          "affiliation": [
            {
              "name": "ABI, Co., Ltd 3 , 270-1165 Abiko, Japan"
            }
          ]
        },
        {
          "given": "N.",
          "family": "Owada",
          "sequence": "additional",
          "affiliation": [
            {
              "name": "ABI, Co., Ltd 3 , 270-1165 Abiko, Japan"
            }
          ]
        }
      ],
      "member": "317",
      "published-online": {
        "date-parts": [
          [
            2011,
            3,
            21
          ]
        ]
      },
      "reference": [
        {
          "key": "2023080505511622000_c1",
          "doi-asserted-by": "publisher",
          "first-page": "1734",
          "volume": "7",
          "year": "1968",
          "journal-title": "Biochemistry",
          "DOI": "10.1021/bi00845a017"
        },
        {
          "key": "2023080505511622000_c2",
          "doi-asserted-by": "publisher",
          "first-page": "12880",
          "volume": "130",
          "year": "2008",
          "journal-title": "J. Am. Chem. Soc.",
          "DOI": "10.1021/ja8052464"
        },
        {
          "key": "2023080505511622000_c3",
          "doi-asserted-by": "publisher",
          "first-page": "15892",
          "volume": "107",
          "year": "2010",
          "journal-title": "Proc. Natl. Acad. Sci. U.S.A.",
          "DOI": "10.1073/pnas.1007443107"
        },
        {
          "key": "2023080505511622000_c4",
          "doi-asserted-by": "publisher",
          "first-page": "372",
          "volume": "440",
          "year": "2006",
          "journal-title": "Nature (London)",
          "DOI": "10.1038/nature04542"
        },
        {
          "key": "2023080505511622000_c5",
          "doi-asserted-by": "publisher",
          "first-page": "183",
          "volume": "35",
          "year": "2010",
          "journal-title": "J. Biosci.",
          "DOI": "10.1007/s12038-010-0022-6"
        },
        {
          "key": "2023080505511622000_c6",
          "doi-asserted-by": "publisher",
          "first-page": "6456",
          "volume": "83",
          "year": "1998",
          "journal-title": "J. Appl. Phys.",
          "DOI": "10.1063/1.367736"
        },
        {
          "key": "2023080505511622000_c7",
          "doi-asserted-by": "publisher",
          "first-page": "5862",
          "volume": "64",
          "year": "1988",
          "journal-title": "J. Appl. Phys.",
          "DOI": "10.1063/1.342181"
        },
        {
          "key": "2023080505511622000_c8",
          "doi-asserted-by": "publisher",
          "first-page": "758",
          "volume": "18",
          "year": "1980",
          "journal-title": "Med. Biol. Eng. Comput.",
          "DOI": "10.1007/BF02441902"
        }
      ],
      "container-title": [
        "Journal of Applied Physics"
      ],
      "original-title": [],
      "language": "en",
      "link": [
        {
          "URL": "https://pubs.aip.org/aip/jap/article-pdf/doi/10.1063/1.3556949/13462979/07b303_1_online.pdf",
          "content-type": "application/pdf",
          "content-version": "vor",
          "intended-application": "syndication"
        },
        {
          "URL": "https://pubs.aip.org/aip/jap/article-pdf/doi/10.1063/1.3556949/13462979/07b303_1_online.pdf",
          "content-type": "unspecified",
          "content-version": "vor",
          "intended-application": "similarity-checking"
        }
      ],
      "deposited": {
        "date-parts": [
          [
            2023,
            8,
            5
          ]
        ],
        "date-time": "2023-08-05T05:51:26Z",
        "timestamp": 1691214686000
      },
      "score": 1,
      "resource": {
        "primary": {
          "URL": "https://pubs.aip.org/jap/article/109/7/07B303/988631/Changes-in-the-bioluminescence-of-firefly-under"
        }
      },
      "subtitle": [],
      "short-title": [],
      "issued": {
        "date-parts": [
          [
            2011,
            3,
            21
          ]
        ]
      },
      "references-count": 8,
      "journal-issue": {
        "issue": "7",
        "published-print": {
          "date-parts": [
            [
              2011,
              4,
              1
            ]
          ]
        }
      },
      "URL": "http://dx.doi.org/10.1063/1.3556949",
      "relation": {},
      "ISSN": [
        "0021-8979",
        "1089-7550"
      ],
      "issn-type": [
        {
          "value": "0021-8979",
          "type": "print"
        },
        {
          "value": "1089-7550",
          "type": "electronic"
        }
      ],
      "subject": [
        "General Physics and Astronomy"
      ],
      "published-other": {
        "date-parts": [
          [
            2011,
            4,
            1
          ]
        ]
      },
      "published": {
        "date-parts": [
          [
            2011,
            3,
            21
          ]
        ]
      },
      "source_url": "https://www.emf-portal.org/en/article/22953",
      "output_type": "publication",
      "location": "",
      "privacyLevel": "open"
    }
  ];

  const TABLE_HEAD = [
    "Abstract",
    "Type of Study",
    "Output Type",
    "Location",
    "Status",
    " ",
  ];

  const [submittedQuery, setSubmittedQuery] = useState('');

  checkLoginStatus(setIsLoggedIn);
  const handleSearch = (e: React.FormEvent<any>) => {
    e.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  return (
    <PageLayout pageName='members' isLoggedIn={isLoggedIn} skipLogin={false}>
      <div className={`mt-32 min-h-[65rem] w-full`}>
        <Card
          placeholder={""}
          style={{ background: "white" }}
          className="form-container shadow-[0_10px_50px_rgba(58,_65,_11,_0.8)] mx-auto mt-6 w-4/5 rounded-lg object-cover object-center lg:w-4/5"
        >
          <CardHeader placeholder={""} className="bg-[#D4D9DD] text-black">
            <Typography
              placeholder={""}
              variant="h2"
              className="pb-4 pt-4 text-center text-xl lg:text-2xl xl:text-4xl"
            >
              Literature Search History
            </Typography>
          </CardHeader>
          <CardBody placeholder={""}>
            <div className={classNames("relative  mx-auto place-items-center w-full float-left", submittedQuery.length ? "mt-9" : "mt-0")}>
              <div className=" mt-2 ml-0  w-full flex">
              Start a
                <div className="w-70 ">
                  <Typography placeholder={""} variant="h6" color="blue-gray" className="float-left pr-0 underline underline-offset-4">
                    New Session
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 pb-3 -ml-0">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                  </svg>
                </div>
                or
                <div className="float-right w-60 flex">
                  <Typography placeholder={""} variant="h6" color="blue-gray" className="float-right underline underline-offset-4"> New Search </Typography>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 -ml-2 pb-4">
                    <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="pb-6 p-4 mt-10 pt-0 ml-0 text-left w-[370px]">
                <div className="w-18 float-left">
                  <Select label="Choose Session">
                    <Option>Session 1</Option>
                    <Option>Session 2</Option>
                  </Select>
                </div>
                <div className="w-28 float-right">
                  <Select className="" label="Choose Search">
                    <Option>Search 1</Option>
                    <Option>Search 2</Option>
                  </Select>
                </div>

              </div>

              {/* <Card placeholder={""} className="max-w-[25rem] shadow-xl shadow-blue-gray-900/5 float-left">
                <div className="mb-2 p-4 ml-0 text-left">
                  <Typography placeholder={""} variant="h5" color="blue-gray" className="float-left ">
                    New RA Session
                  </Typography>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 pb-3">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                  </svg>

                </div>
                <span className="text-left">
                  History
                </span>
                <List placeholder={""}>
                  <ListItem placeholder={""} className="ml-8">
                    Sessions
                  </ListItem>
                  <ListItem placeholder={""} className="ml-12">
                    Literature Search <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                      <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <b>new search</b>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 -ml-2">
                      <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
                    </svg>
                  </ListItem>
                  <ListItem placeholder={""} className="ml-20">
                    Search 1
                  </ListItem>
                </List>
              </Card> */}
              {<div className=" pl-4 w-full">
                <table className="mx-auto mt-10 w-full table-auto border-collapse overflow-hidden text-left">
                  <thead>
                    <tr className="whitespace-nowrap">
                      {TABLE_HEAD.map((head, index) => (
                        <th
                          key={index}
                          className={`border-blue-gray-100 bg-blue-gray-50 border-b p-4 pb-4 ${["Status", "Location"].includes(head) ? "hidden lg:table-cell" : ["Output Type", "Type of Study"].includes(head) ? "hidden xl:table-cell" : ""}`}
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
                    {searchResult.map(
                      (
                        {
                          title,
                          description,
                          typeOfStudy,
                          outputType,
                          location,
                          source_url,
                          institution,
                          studyType,
                          output_type,
                          privacyLevel,
                          source,
                        }: any,
                        index: number,
                      ) => {
                        console.log(source_url)
                        const isLast = index === searchResult.length - 1;
                        const classes = isLast
                          ? "p-4 "
                          : "p-4 border-b border-blue-gray-50 whitespace-break-spaces";

                        let source_icon = <></>;
                        console.log(source)
                        switch (source) {
                          case "PUBMED":
                            source_icon = <img className="w-[50px]" src="https://static-00.iconduck.com/assets.00/pubmed-icon-463x512-q8ocx6xf.png" />;
                            break;
                          case "EMF-PORTAL":
                            source_icon = <img className="w-[50px]" src="./EMF-portalicon-96x96.svg" />;
                            break;
                          case "zenodo":
                            source_icon = <img className="w-[60px]" src="./logozenodo.svg" />;
                            break;
                          case "WOS":
                            source_icon = <img className="w-[50px]" src="./web-of-science.jpg" />;
                            break;
                          case "NEXTGEM":
                            source_icon = <img className="w-[52px]" src="./cropped2-NextGEM_final_transparent 1.svg" />;
                            break;
                        }

                        return (
                          <tr key={index} className="even:bg-blue-gray-100/50">
                            <td className={classes}>
                              <div className="flex  items-center w-max-[55rem]">
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
                            <td className={classes + " hidden xl:table-cell"}>
                              <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                  <Typography
                                    placeholder=""
                                    variant="h6"
                                    color="blue-gray"
                                    className="hidden font-normal capitalize xl:table-cell"
                                  >
                                    {outputType || output_type || "N/A"}
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
                                <a
                                  href={source_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-0"
                                >
                                  {/* <Chip
                                  size="sm"
                                  variant="ghost"
                                  value={                              <img className="w-[50px]" src="https://marketplace.digimind.com/hubfs/Website%20Visual%20assets%20S2/Digimind%20Website%20-%20Marketplace/Logos/Pubmed-logo-WithBG.png" ></img>
                                }
                                  className="mb-6"
                                  color={"gray"}
                                /> */}
                                  {source_icon}
                                </a>
                              </div>
                            </td>
                            <td>
                              <Typography
                                placeholder={""}
                                as="a"
                                // onClick={() => setMoreIdx(index)}
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
              </div>}
              {/* <RASessionSearch /> */}
            </div>

          </CardBody>
        </Card>
      </div>
    </ PageLayout>);
}

export default RASearchPage;