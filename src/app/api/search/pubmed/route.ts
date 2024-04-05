import axios from 'axios';
import xmljs from 'xml-js';

const getPubmedData = async (ids: number[]) => {
    console.log(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids[0]}&rettype=xml&retmode=json`)
    const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${ids.join(',')}&rettype=xml&retmode=json`);
    return await response.data;
}

let _requestsMade: any[] = [];

const exceedRateLimit = () => {
    let now = new Date();
    let oneSecondAgo = new Date(now.getTime() - 1000); // Subtracting 1000 milliseconds (1 second) from the current time

    let filteredRequests = _requestsMade.filter(requestTime => requestTime > oneSecondAgo);
    // Return whether we've made more requests in the last second than the rate limit
    return filteredRequests.length > 2;
}

export async function POST(req: Request) {
    try {
        let data = await req.json();

        const response = await axios.get(`http://localhost:8000/?message=${data.query}`);
        data = (await response.data)

        return Response.json(JSON.stringify(data));
    } catch (err) {
        console.error(err);
        return Response.json([]);
    } finally {
        // return Response.json({ error: 500 })
    }
}