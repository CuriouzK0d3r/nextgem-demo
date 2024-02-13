import axios from "axios";

const filter = (data: any): any[] => {
    let returnedObj: any[] = [];

    data.forEach((element: any) => {
        const picked = (({ metadata, doi_url, files }) => ({ location: 'zenodo', privacyLevel: "open", files: files, creators: metadata["creators"], DOI: doi_url, title: metadata["title"], description: metadata["description"], publication_date: metadata["publication_date"] }))(element);
        returnedObj.push(picked);
    });
    return returnedObj;
}

export async function POST(req: Request) {
    try {
        const requestParams2 = { params: { 'access_token': 'I2ZxABWJ9EsaQGJiZyqRpaY8AIwExSOm5zUrTA5ISnStDHjjCo31cM1Z9CSs' }, headers: { "Content-Type": "application/json" } }
        let data = await req.json();

        const response = await axios.get("https://zenodo.org/api/records?q=" + data.query, requestParams2);
        let returnedObj = filter(response.data["hits"]["hits"]);

        for (let i in returnedObj) {
            returnedObj[i].location = "zenodo";
            returnedObj[i].status = returnedObj[i]['access_right'];
        }

        return Response.json(JSON.stringify(returnedObj));
    } catch (err) {
        console.error(err);
        return Response.json([])
    } finally {
        // return Response.json({ error: 500 })
    }
}