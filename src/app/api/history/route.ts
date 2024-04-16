import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://kornilak:testpassdelete@nextgem.prxatax.mongodb.net/?retryWrites=true&w=majority'; // replace with your MongoDB URI
const client = new MongoClient(uri, {});

export async function POST(req: Request) {
    try {
        await client.connect();
        const database = client.db('risk_assesment'); // replace with your database name
        const collection = database.collection('search_history'); // replace with your collection name
        let filter = {};
        let json = await req.json();
        const source = json.source ? [json.source] : ["pubmed", "emf", "wos"];
        // const sources = json.sources || [source];
        let {username, query, search_results} = json;

        let results;
        let cursor;
        let appliedFilters: any[] = [];

        Object.keys(query).forEach((key: string) => {
            if (!["title", 'doi', 'abstract'].includes(key as never)) {
                return;
            }
            let filter: any = {};
            filter[key] = {
                '$regex': query[key]
            }
            appliedFilters.push(filter);
        });

        collection.insertOne({username: history, history: [{query: query, results: results}]});
        // let resultTitle = await cursorFilter.toArray();
        // results = resultTitle;


        return Response.json(results)
    } catch (err) {
        console.error(err);
        return Response.json([])
    } finally {
        await client.close();
    }
}
