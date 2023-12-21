import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    // Get the email and password from the request body
    const { username, password } = await req.json();
    const apiEndpoint = "http://139.91.58.16/nikh-auth/login";

    const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });

    if (response.ok) {
        // window.location.href = "https://example.com/example-page";
        let responseJson = await response.json();
        return Response.json({ message: 'Login successful', access_token: responseJson.access_token });
        // console.log("User " + username + " successfully logged in!");
    } else {
        // Login failed
        return Response.json({ message: 'Invalid email or password' });
    }
    // Login successful
}