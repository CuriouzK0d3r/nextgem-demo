import { NextApiResponse } from 'next';

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    let apiEndpoint = "https://139.91.58.16/metadata/records?";
    const params = await req.json();

    const keys = Object.keys(params["formData"]);
    const formData = params["formData"];

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

    return Response.json({ searchResults: responseJSON });
}