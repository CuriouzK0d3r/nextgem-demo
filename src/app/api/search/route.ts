import { NextApiResponse } from 'next';
import { headers } from 'next/headers';

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

        const responseJSON = await response.json();
        responseJSON.forEach((record: any) => {
            if (record.title && formData['title'] && record.title.toLowerCase().includes(formData['title'].toLowerCase()))
                resJ.push(record);

            if (record.institution && formData['institution'] && record.institution.toLowerCase().includes(formData['institution'].toLowerCase()))
                resJ.push(record);
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
            body: JSON.stringify({ query: `(title: ${formData['title']}) ${query.length > 0 ? ` OR (description:${query})` : ""}`})
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
            body: JSON.stringify({ query: formData, source: "emf"})
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
            body: JSON.stringify({ query: formData, source: "wos"})
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
            body: JSON.stringify({ query: formData, source: "pubmed"})
        });

        const responseJSON = await response.json();
        results = results.concat(addSource(responseJSON, "PubMed"));
    }

    let titles: any[] = [];

    titles = results.map((result) => {
        return result.title;
    });

    let uniqueTitles = titles.filter((v, i, a) => a.indexOf(v) === i);
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
