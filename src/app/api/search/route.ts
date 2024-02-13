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
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = formData[key];
            if (value === '') {
                continue
            }
            apiEndpoint += `${key}=${value}&`;
        }
        console.log(apiEndpoint)
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            }
        })

        const responseJSON = await response.json();

        results = results.concat(responseJSON);
    }
    if (sources.includes("Zenodo")) {
        let query = "";

        for (let i = 0; i < Object.keys(formData).length; i++) {
            if (Object.keys(formData)[i] !== undefined && formData[Object.keys(formData)[i]] !== "") {
                query += `+AND+${formData[Object.keys(formData)[i]]}`;
            }
        }

        console.log(query)
        const response = await fetch(`http://${hostname}/api/search/zenodo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
            body: JSON.stringify({ query: query })
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
        results = results.concat(responseJSON);
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
        results = results.concat(responseJSON);
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
        })

        const responseJSON = await response.json();
        results = results.concat(responseJSON);
    }

    return Response.json({ searchResults: results });
}