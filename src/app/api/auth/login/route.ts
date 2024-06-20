import { NextApiRequest, NextApiResponse } from "next";

/**
 * Function to handle POST request for user login authentication.
 *
 * @param {Request} req - The request object containing user credentials.
 * @param {NextApiResponse} res - The response object to send back the authentication result.
 * @return {Promise<void>} A promise containing the access token if the login is successful, or an error message if the login fails
 */
export async function POST(req: Request, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
  // Get the email and password from the request body
  const { username, password } = await req.json();
  const apiEndpoint = "http://139.91.58.16/nikh-auth/login";

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  if (response.ok) {
    // window.location.href = "https://example.com/example-page";
    let responseJson = await response.json();
    return Response.json({
      status: 200,
      message: "Login successful",
      access_token: responseJson.access_token
    });
    // console.log("User " + username + " successfully logged in!");
  } else {
    // Login failed
    return Response.json({ status: 400, message: "Invalid email or password" });
  }
  // Login successful
}
