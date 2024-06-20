import axios from "axios";
import xmljs from "xml-js";

/**
 * Retrieves PubMed data for the specified IDs.
 * @param ids - An array of PubMed IDs.
 * @returns A Promise that resolves to the retrieved PubMed data.
 */
const getPubmedData = async (ids: number[]) => {
  console.log(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids[0]}&rettype=xml&retmode=json`
  );
  const response = await axios.get(
    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids.join(
      ","
    )}&rettype=xml&retmode=json`
  );
  return await response.data;
};

let _requestsMade: any[] = [];

/**
 * Checks if the rate limit has been exceeded.
 * @returns A boolean indicating whether the rate limit has been exceeded.
 */
const exceedRateLimit = () => {
  let now = new Date();
  let oneSecondAgo = new Date(now.getTime() - 1000); // Subtracting 1000 milliseconds (1 second) from the current time

  let filteredRequests = _requestsMade.filter(
    requestTime => requestTime > oneSecondAgo
  );
  // Return whether we've made more requests in the last second than the rate limit
  return filteredRequests.length > 2;
};

/**
 * Handles the POST request.
 * @param req - The request object.
 * @returns A Promise that resolves to the response.
 */
export async function POST(req: Request) {
  try {
    let data = await req.json();
    const response = await axios.get(
      `http://localhost:8000/?message=${data.query["title"]}`
    );
    data = await response.data;

    return Response.json(JSON.stringify(data));
  } catch (err) {
    console.error(err);
    return Response.json([]);
  } finally {
    // return Response.json({ error: 500 })
  }
}
