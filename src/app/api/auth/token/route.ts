import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handles the POST request for token authentication.
 *
 * @param {Request} req - The request object containing the access token.
 * @param {NextApiResponse} res - The response object to send back the authentication result.
 * @return {Promise<void>} A promise representing the authentication process.
 */
export async function POST(req: Request, res: NextApiResponse) {
    const { access_token } = await req.json();
    const apiEndpoint = "https://139.91.58.16/nikh-auth/getUser/forth-admin";
    // return Response.json({ loggedin: true });

    const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token
        },
    });

    return Response.json({ loggedin: response.ok });    
}