import { metadata } from "@/app/layout";
import axios from "axios";

/**
 * Filters the data based on the output type.
 * @param data - The data to filter.
 * @param outputType - The desired output type.
 * @returns The filtered data.
 */
const filterOutputType = (data: any, outputType: string) => {
  return data.filter((record: any) => {
    return (
      !outputType ||
      !outputType.length ||
      record.output_type.toLowerCase() === outputType.toLowerCase()
    );
  });
};

/**
 * Filters the data based on the privacy level.
 * @param data - The data to filter.
 * @param privacy_level - The desired privacy level.
 * @returns The filtered data.
 */
const filterPrivacyLevel = (data: any, privacy_level: string) => {
  return data.filter((record: any) => {
    return (
      !privacy_level ||
      !privacy_level.length ||
      record.privacyLevel.toLowerCase() === privacy_level.toLowerCase()
    );
  });
};

/**
 * Filters the data based on the provided parameters.
 * @param data - The data to filter.
 * @param institution - The desired institution.
 * @param output_type - The desired output type.
 * @param privacy_level - The desired privacy level.
 * @returns The filtered data.
 */
const filter = (
  data: any,
  institution: string,
  output_type: string,
  privacy_level: string,
): any[] => {
  let returnedObj: any[] = [];

  data.forEach((element: any) => {
    const picked = (({ metadata, doi_url, files, links }) => ({
      source_url: links.self_doi,
      location: "zenodo",
      privacyLevel: metadata["access_right"],
      files: files,
      creators: metadata["creators"],
      DOI: doi_url,
      title: metadata["title"],
      description: metadata["description"],
      publication_date: metadata["publication_date"],
      output_type: metadata["resource_type"]["type"],
    }))(element);

    if (institution) {
      let found = false;

      picked.creators.forEach((creator: any) => {
        if (
          creator.affiliation &&
          creator.affiliation.toLowerCase().includes(institution)
        ) {
          found = true;
          return;
        }
      });

      if (found) {
        returnedObj.push(picked);
      }
    } else returnedObj.push(picked);
  });

  returnedObj = filterOutputType(returnedObj, output_type);
  returnedObj = filterPrivacyLevel(returnedObj, privacy_level);

  return returnedObj;
};

/**
 * Handles the POST request for searching zenodo metadata records based on the given search parameters.
 * @param req - The request object containing the search parameter.
 * @returns The response object containing the filtered metadata records.
 */
export async function POST(req: Request) {
  try {
    const requestParams2 = {
      params: {
        access_token:
          "I2ZxABWJ9EsaQGJiZyqRpaY8AIwExSOm5zUrTA5ISnStDHjjCo31cM1Z9CSs",
      },
      headers: { "Content-Type": "application/json" },
    };
    let data = await req.json();

    const response = await axios.get(
      "https://zenodo.org/api/records?q=" + data.query,
      requestParams2,
    );

    console.log(data);

    let returnedObj = filter(
      response.data["hits"]["hits"],
      data.institution,
      data.output_type,
      data.privacy_level,
    );

    for (let i in returnedObj) {
      returnedObj[i].source = "zenodo";
      returnedObj[i].status = returnedObj[i]["access_right"];
    }

    // console.log(returnedObj[0])

    return Response.json(JSON.stringify(returnedObj));
  } catch (err) {
    console.error(err);
    return Response.json([]);
  } finally {
    // return Response.json({ error: 500 })
  }
}
