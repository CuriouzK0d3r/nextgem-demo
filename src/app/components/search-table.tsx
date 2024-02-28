import { Chip, Typography } from '@material-tailwind/react';
import Table from 'react-tailwind-table';

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

  const TABLE_ROWS = searchResults.slice(0 * 1, 1);

  return (
    <table className="mx-auto mt-6 w-full table-auto overflow-hidden border-collapse text-left">
                <thead>
                  <tr className="whitespace-nowrap">
                    {TABLE_HEAD.map((head, index) => (
                      <th
                        key={index}
                        className={`border-blue-gray-100 bg-blue-gray-50 border-b p-4 pb-4 ${[ "Status", "Location"].includes(head) ? "hidden lg:table-cell" : ["Output Type", "Type of Study"].includes(head) ? "hidden xl:table-cell" : ""}`}
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
                  {TABLE_ROWS.map(
                    (
                      {
                        title,
                        abstract,
                        description,
                        typeOfStudy,
                        outputType,
                        location,
                        institution,
                        studyType,
                        privacyLevel,
                        source
                      }: any,
                      index: number,
                    ) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4 "
                        : "p-4 border-b border-blue-gray-50 whitespace-break-spaces";

                      return (
                        <tr key={index} className="even:bg-blue-gray-50/50">
                          <td className={classes}>
                            <div className="flex  items-center">
                              <Typography
                                placeholder=""
                                variant="h6"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {abstract}
                              </Typography>
                            </div>
                          </td>
                          {/* <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {description}
                                                    </Typography>
                                                </td> */}
                          <td className={classes + " hidden xl:table-cell "}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  placeholder=""
                                  variant="h6"
                                  color="blue-gray"
                                  className="hidden font-normal xl:table-cell"
                                >
                                  {studyType ? studyTypeMap[studyType] : "N/A"}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes + " hidden xl:table-cell"}>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-col">
                                <Typography
                                  placeholder=""
                                  variant="h6"
                                  color="blue-gray"
                                  className="font-normal capitalize hidden xl:table-cell"
                                >
                                  {outputType || "N/A"}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td className={classes + " hidden lg:table-cell"}>
                            <div className="flex items-center gap-3">
                              <div className=" flex flex-col text-left">
                                <Typography
                                  placeholder=""
                                  variant="h6"
                                  color="blue-gray"
                                  className="text-left font-normal hidden lg:table-cell  capitalize"
                                >
                                  {institution || location}
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
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={source}
                                className="mb-6"
                                color={
                                  "gray"
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <Typography
                              placeholder={""}
                              as="a"
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

  );
};

export default SearchTable;
