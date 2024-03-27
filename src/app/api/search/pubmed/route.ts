import axios from 'axios';

const getPubmedData = async (id: number) => {
    const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${id}&retmode=json`);
    return await response.data.result[id];
}

export async function POST(req: Request) {
    try {
        let data = await req.json();

        const response = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${data.query}&retmode=json&retstart=0&retmax=20`);

        let returnedIds = await response.data.esearchresult.idlist;
        // console.log(returnedIds)
        let returnedObj: any[] = [];
        for (let i = 0; i < returnedIds.length; i++) {
            console.log(returnedIds[i])
            let pubmedData = await getPubmedData(returnedIds[i]);
            console.log(pubmedData)
            returnedObj.push(pubmedData);
        }

        console.log(returnedObj);

        return Response.json(JSON.stringify(returnedObj));
    } catch (err) {
        console.error(err);
        return Response.json([]);
    } finally {
        // return Response.json({ error: 500 })
    }
}