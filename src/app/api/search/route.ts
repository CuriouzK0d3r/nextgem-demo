import { NextApiResponse } from 'next';
import { headers } from 'next/headers';

const matchTitle = (record: any, title: string) => {
    return !title.length || record.title.toLowerCase().includes(title.toLowerCase());
}

const matchInstitution = (record: any, institution: string) => {
    return !institution.length || (record.institution.toLowerCase() === institution.toLowerCase());
}

const matchOutputType = (record: any, outputType: string) => {
    return !outputType.length || (record.institution.toLowerCase() === outputType.toLowerCase());
}

const matchStudyType = (record: any, studyType: string) => {
    return !studyType.length || (record.studyType.toLowerCase() === studyType.toLowerCase());
}

const matchModulation = (record: any, modulation: string) => {
    return !modulation.length || (record.modulation.toLowerCase() === modulation.toLowerCase());
}

const matchPrivacyLevel = (record: any, privacyLevel: string) => {
    return !privacyLevel.length || (record.privacyLevel.toLowerCase() === privacyLevel.toLowerCase());
}

export async function POST(req: Request, res: NextApiResponse) {
    const hostname = headers().get('host');
    let apiEndpoint = "https://139.91.58.16/metadata/records?";
    const params = await req.json();

    const keys = Object.keys(params["formData"]);
    const formData = params["formData"];
    const sources = params["chosenSources"];
    let results: any[] = [];

    if (sources.includes("NextGEM")) {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
        });

        let resJ: any[] = [];
        let inputData: any = {};
        ['title', 'institution', 'outputType', 'modulation', 'studyType', 'privacyLevel'].forEach((key) => {
            formData[key] ? inputData[key] = formData[key] : inputData[key] = "";
        });

        const responseJSON = await response.json();
        responseJSON.forEach((record: any) => {
            if (matchTitle(record, inputData['title']) && matchPrivacyLevel(record, inputData['privacyLevel']) && matchStudyType(record, inputData['studyType']) && matchModulation(record, inputData['modulation']) && matchInstitution(record, inputData['institution']) && matchOutputType(record, inputData['outputType'])) {
                resJ.push(record);
            }
        });

        results = results.concat(addSource(resJ, "NextGEM"));
    }

    if (sources.includes("Zenodo")) {
        let query = "";

        for (let i = 0; i < Object.keys(formData).length; i++) {
            if (Object.keys(formData)[i] !== undefined && Object.keys(formData)[i] !== 'title' && formData[Object.keys(formData)[i]] !== "") {
                query += ` ${formData[Object.keys(formData)[i]]} `;
            }
        }

        const response = await fetch(`http://${hostname}/api/search/zenodo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
            body: JSON.stringify({ query: `(title: ${formData['title']}) ${query.length > 0 ? ` OR (description:${query})` : ""}` })
        })

        const responseJSON = await response.json();
        results = results.concat(JSON.parse(responseJSON));
    }

    if (sources.includes("EMF")) {
        const response = await fetch(`http://${hostname}/api/search/publications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
            body: JSON.stringify({ query: formData, source: "emf" })
        })

        const responseJSON = await response.json();
        results = results.concat(addSource(responseJSON, "EMF-Portal"));
    }

    if (sources.includes("WOS")) {
        const response = await fetch(`http://${hostname}/api/search/publications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
            body: JSON.stringify({ query: formData, source: "wos" })
        })

        const responseJSON = await response.json();
        results = results.concat(addSource(responseJSON, "WOS"));
    }

    if (sources.includes("PubMed")) {
        const response = await fetch(`http://${hostname}/api/search/publications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
            body: JSON.stringify({ query: formData, source: "pubmed" })
        });

        const responseJSON = await response.json();
        results = results.concat(addSource(responseJSON, "PubMed"));
    }

    let distinct: any = []
    for (var i = 0; i < results.length; i++)
        if (!(results[i].title in distinct))
            distinct.push(results[i].title)
        else
            console.log(results[i].title)

    results = results.sort((a, b) => {
        let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    // console.log(results[1])


    return Response.json({ searchResults: results });
}

function addSource(responseJSON: any, arg1: string): string {
    return responseJSON.map((result: any) => {
        return {
            ...result,
            source: arg1.toUpperCase(),
        }
    });
}
