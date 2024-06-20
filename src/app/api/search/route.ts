import { NextApiResponse } from "next";
import { headers } from "next/headers";

/**
 * Checks if the record's title matches the given title.
 * @param record - The record object.
 * @param title - The title to match.
 * @returns True if the record's title matches the given title, false otherwise.
 */
const matchTitle = (record: any, title: string) => {
  return (
    !title.length || record.title.toLowerCase().includes(title.toLowerCase())
  );
};

/**
 * Checks if the record's institution matches the given institution.
 * @param record - The record object.
 * @param institution - The institution to match.
 * @returns True if the record's institution matches the given institution, false otherwise.
 */
const matchInstitution = (record: any, institution: string) => {
  return (
    !institution.length ||
    record.institution.toLowerCase() === institution.toLowerCase()
  );
};

/**
 * Checks if the record's output type matches the given output type.
 * @param record - The record object.
 * @param outputType - The output type to match.
 * @returns True if the record's output type matches the given output type, false otherwise.
 */
const matchOutputType = (record: any, outputType: string) => {
  return (
    !outputType.length ||
    record.institution.toLowerCase() === outputType.toLowerCase()
  );
};

/**
 * Checks if the record's study type matches the given study type.
 * @param record - The record object.
 * @param studyType - The study type to match.
 * @returns True if the record's study type matches the given study type, false otherwise.
 */
const matchStudyType = (record: any, studyType: string) => {
  return (
    !studyType.length ||
    record.studyType.toLowerCase() === studyType.toLowerCase()
  );
};

/**
 * Checks if the record's modulation matches the given modulation.
 * @param record - The record object.
 * @param modulation - The modulation to match.
 * @returns True if the record's modulation matches the given modulation, false otherwise.
 */
const matchModulation = (record: any, modulation: string) => {
  return (
    !modulation.length ||
    record.modulation.toLowerCase() === modulation.toLowerCase()
  );
};

/**
 * Checks if the record's privacy level matches the given privacy level.
 * @param record - The record object.
 * @param privacyLevel - The privacy level to match.
 * @returns True if the record's privacy level matches the given privacy level, false otherwise.
 */
const matchPrivacyLevel = (record: any, privacyLevel: string) => {
  return (
    !privacyLevel.length ||
    record.privacyLevel.toLowerCase() === privacyLevel.toLowerCase()
  );
};

/**
 * Removes duplicate records based on the 'doi' property.
 * @param data - The array of records.
 */
const deDublicate = (data: any) => {
  let seen = new Map();
  let distinct: any = [];
  // console.log(data)
  data.forEach((record: any) => {
    const doi = record.DOI ? record.DOI : record.doi;
    if (!seen.has(doi)) {
      seen.set(doi, [record]);
    } else {
      const prev = seen.get(doi);
      seen.set(doi, [...prev, record]);
    }
  });

  seen.forEach((value, key) => {
    let tmp = [];
    for (let i = 0; i < value.length; i++) {
      tmp.push(value[i].source[0]);
    }
    let t = value[0];
    t.source = tmp;
    distinct.push(t);
  });
  // console.log(JSON.stringify(seen))
  // console.log(JSON.stringify(distinct))
  return distinct;
};

/**
 * Handles the POST request for searching metadata records based on the given search parameters.
 * @param req - The request object containing the search parameters.
 * @param res - The response object.
 * @returns The search results as a JSON response.
 */
export async function POST(req: Request, res: NextApiResponse) {
  const hostname = headers().get("host");
  let apiEndpoint = "https://139.91.58.16/metadata/records?";
  const params = await req.json();

  const keys = Object.keys(params["formData"]);
  const formData = params["formData"];
  const sources = params["chosenSources"];
  let results: any[] = [];

  if (sources.includes("NextGEM")) {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN"
      }
    });

    let resJ: any[] = [];
    let inputData: any = {};
    [
      "title",
      "institution",
      "outputType",
      "modulation",
      "studyType",
      "privacyLevel"
    ].forEach(key => {
      formData[key] ? (inputData[key] = formData[key]) : (inputData[key] = "");
    });

    const responseJSON = await response.json();
    responseJSON.forEach((record: any) => {
      if (
        matchTitle(record, inputData["title"]) &&
        matchPrivacyLevel(record, inputData["privacyLevel"]) &&
        matchStudyType(record, inputData["studyType"]) &&
        matchModulation(record, inputData["modulation"]) &&
        matchInstitution(record, inputData["institution"]) &&
        matchOutputType(record, inputData["outputType"])
      ) {
        resJ.push(record);
      }
    });

    results = results.concat(addSource(resJ, "nextgem"));
  }

  if (sources.includes("Zenodo")) {
    let query = "";

    for (let i = 0; i < Object.keys(formData).length; i++) {
      if (
        Object.keys(formData)[i] !== undefined &&
        Object.keys(formData)[i] !== "title" &&
        formData[Object.keys(formData)[i]] !== ""
      ) {
        query += ` ${formData[Object.keys(formData)[i]]} `;
      }
    }

    const response = await fetch(`http://${hostname}/api/search/zenodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN"
      },
      body: JSON.stringify({
        query: `(title: ${formData["title"]}) ${
          query.length > 0 ? ` OR (description:${query})` : ""
        }`,
        institution: formData["institution"],
        output_type: formData["outputType"],
        privacy_level: formData["privacyLevel"]
      })
    });

    const responseJSON = await response.json();
    results = results.concat(addSource(responseJSON, "zenodo"));
  }

  if (sources.includes("SEAWave")) {
    let query = "";

    for (let i = 0; i < Object.keys(formData).length; i++) {
      if (
        Object.keys(formData)[i] !== undefined &&
        Object.keys(formData)[i] !== "title" &&
        formData[Object.keys(formData)[i]] !== ""
      ) {
        query += ` ${formData[Object.keys(formData)[i]]} `;
      }
    }

    const response = await fetch(`http://${hostname}/api/search/seawave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN"
      },
      body: JSON.stringify({
        query: `(title: ${formData["title"]}) ${
          query.length > 0 ? ` OR (description:${query})` : ""
        }`,
        institution: formData["institution"],
        output_type: formData["outputType"],
        privacy_level: formData["privacyLevel"]
      })
    });

    const responseJSON = await response.json();
    results = results.concat(addSource(responseJSON, "seawave"));
  }

  if (sources.includes("GOLIAT")) {
    const response = await fetch(`http://${hostname}/api/search/goliat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN"
      },
      body: JSON.stringify({ query: formData })
    });

    const responseJSON = await response.json();
    results = results.concat(addSource(responseJSON, "goliat"));
  }

  if (sources.includes("EMF")) {
    const response = await fetch(`http://${hostname}/api/search/publications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN"
      },
      body: JSON.stringify({ query: formData, source: "emf" })
    });

    const responseJSON = await response.json();
    results = results.concat(addSource(responseJSON, "emf-portal"));
  }

  if (sources.includes("WOS")) {
    const response = await fetch(`http://${hostname}/api/search/publications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN"
      },
      body: JSON.stringify({ query: formData, source: "wos" })
    });

    const responseJSON = await response.json();
    results = results.concat(addSource(responseJSON, "wos"));
  }

  if (sources.includes("PubMed")) {
    const response = await fetch(`http://${hostname}/api/search/pubmed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN"
      },
      body: JSON.stringify({ query: formData, source: "pubmed" })
    });

    const responseJSON = await response.json();

    results = results.concat(addSource(responseJSON, "pubmed"));
  }

  return Response.json({ searchResults: deDublicate(results) });
}

function addSource(responseJSON: any, arg1: string): string {
  return JSON.parse(responseJSON).map((result: any) => {
    return {
      ...result,
      source: [arg1.toUpperCase()]
    };
  });
}
