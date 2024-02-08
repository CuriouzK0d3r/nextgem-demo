import { NextApiResponse } from 'next';
import { headers } from 'next/headers';

export async function GET(req: Request, res: NextApiResponse) {
    const hostname = headers().get('host');
    let apiEndpoint = "https://139.91.58.16/metadata/searchable/fields";

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
    return Response.json({ fields: responseJSON });
}