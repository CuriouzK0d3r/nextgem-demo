import { NextApiRequest, NextApiResponse } from "next";

/**
 * Handles the POST request for user registration.
 *
 * @param {Request} req - The request object containing user registration data.
 * @param {NextApiResponse} res - The response object to send back the registration result.
 * @return {Promise<void>} A promise representing the registration process.
 */
export async function POST(req: Request, res: NextApiResponse) {
  const { username, password, email, organizationId } = await req.json();
  const apiEndpoint = "https://139.91.58.16/nikh-auth/registration/register";

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
      organizationId: [organizationId],
      firstName: "",
      lastName: "",
      roles: ["user"]
    })
  });

  console.log(
    JSON.stringify({
      username: username,
      password: password,
      email: email,
      organizationId: organizationId,
      firstName: "",
      roles: ["user"]
    })
  );

  if (response.ok) {
    return Response.json({ status: 200, message: "Register successful" });
    // console.log("User " + username + " successfully logged in!");
  } else {
    // Register failed
    console.log(response.status, response.statusText);
    return Response.json({ status: 400, message: "Invalid email or password" });
  }
  // Login successful
}
