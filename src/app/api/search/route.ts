import { NextApiResponse } from "next";
import { headers } from "next/headers";

const matchTitle = (record: any, title: string) => {
  return (
    !title.length || record.title.toLowerCase().includes(title.toLowerCase())
  );
};

const matchInstitution = (record: any, institution: string) => {
  return (
    !institution.length ||
    record.institution.toLowerCase() === institution.toLowerCase()
  );
};

const matchOutputType = (record: any, outputType: string) => {
  return (
    !outputType.length ||
    record.institution.toLowerCase() === outputType.toLowerCase()
  );
};

const matchStudyType = (record: any, studyType: string) => {
  return (
    !studyType.length ||
    record.studyType.toLowerCase() === studyType.toLowerCase()
  );
};

const matchModulation = (record: any, modulation: string) => {
  return (
    !modulation.length ||
    record.modulation.toLowerCase() === modulation.toLowerCase()
  );
};

const matchPrivacyLevel = (record: any, privacyLevel: string) => {
  return (
    !privacyLevel.length ||
    record.privacyLevel.toLowerCase() === privacyLevel.toLowerCase()
  );
};

const deDublicate = (data: any) => {
  let seen = new Map();
  let distinct = [];
  data.forEach((record: any) => {
    if (!seen.has(record.doi)) {
      seen.set(record.doi, [record]);
    } else {
      const prev = seen.get(record.doi);
      seen.set(record.doi, [...prev, record]);
    }
  });

  seen.forEach((value, key) => {
    let tmp = [];
    for (let i = 0; i < value.length; i++) {
      tmp.push(value[i].source);
    }
    let t = value[0];
    t.source = tmp;
    distinct.push(t);
  });
};

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
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN",
      },
    });

    let resJ: any[] = [];
    let inputData: any = {};
    [
      "title",
      "institution",
      "outputType",
      "modulation",
      "studyType",
      "privacyLevel",
    ].forEach((key) => {
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
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN",
      },
      body: JSON.stringify({
        query: `(title: ${formData["title"]}) ${query.length > 0 ? ` OR (description:${query})` : ""}`,
        institution: formData["institution"],
        output_type: formData["outputType"],
        privacy_level: formData["privacyLevel"],
      }),
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
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN",
      },
      body: JSON.stringify({
        query: `(title: ${formData["title"]}) ${query.length > 0 ? ` OR (description:${query})` : ""}`,
        institution: formData["institution"],
        output_type: formData["outputType"],
        privacy_level: formData["privacyLevel"],
      }),
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
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN",
      },
      body: JSON.stringify({ query: formData }),
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
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN",
      },
      body: JSON.stringify({ query: formData, source: "emf" }),
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
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN",
      },
      body: JSON.stringify({ query: formData, source: "wos" }),
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
        "Access-Control-Allow-Headers": "Content-Type, X-CSRF-TOKEN",
      },
      body: JSON.stringify({ query: formData, source: "pubmed" }),
    });

    const responseJSON = await response.json();
    results = results.concat(addSource(JSON.parse(responseJSON), "pubmed"));
  }

  let distinct: any = [];
  
  results.forEach((result) => {
  // console.log(results[1])
    if (!distinct.some((r: any) => r.doi === result.doi)) {
      distinct.push(result);
    } else {
      
    }
  });

  return Response.json({ searchResults: results });
}

function addSource(responseJSON: any, arg1: string): string {
  return responseJSON.map((result: any) => {
    return {
      ...result,
      source: [arg1.toUpperCase()],
    };
  });
}
