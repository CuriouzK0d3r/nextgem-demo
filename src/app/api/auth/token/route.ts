import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request, res: NextApiResponse) {
    const { access_token } = await req.json();
    const apiEndpoint = "http://139.91.58.16/metadata/count";
    console.log(access_token)
    const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token
        },
    });

    return Response.json({loggedin : response.ok});
}