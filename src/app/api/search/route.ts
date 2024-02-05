import { NextApiResponse } from 'next';
import { headers } from 'next/headers';

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const hostname = headers().get('host');
    let apiEndpoint = "https://139.91.58.16/metadata/records?";
    const params = await req.json();

    const keys = Object.keys(params["formData"]);
    const formData = params["formData"];
    const sources = params["chosenSources"];
    let results = [];

    console.log(formData)


    if (sources.includes("NextGEM")) {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = formData[key];
            if (value === '') {
                continue
            }
            apiEndpoint += `${key}=${value}&`;
        }

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
        results.push(responseJSON);
    }
    if (sources.includes("Zenodo")) {
        const response = await fetch(`http://${hostname}/api/search/zenodo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
            body: JSON.stringify({ query: formData["title"] })
        })

        const responseJSON = await response.json();
        results = results.concat(JSON.parse(responseJSON));
    }

    if (sources.includes("EMF")) {
        console.log(formData)
        const response = await fetch(`http://${hostname}/api/search/publications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
            body: JSON.stringify({ query: formData["title"], type: "title"})
        })

        const responseJSON = await response.json();
        results = results.concat(responseJSON);
    }

    return Response.json({ searchResults: results });
}