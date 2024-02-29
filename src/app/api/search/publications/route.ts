import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://kornilak:testpassdelete@nextgem.prxatax.mongodb.net/?retryWrites=true&w=majority'; // replace with your MongoDB URI
const client = new MongoClient(uri, {});

export async function POST(req: Request) {
    try {
        await client.connect();
        const database = client.db('test'); // replace with your database name
        const collection = database.collection('pub_metadata'); // replace with your collection name
        let filter = {};
        let json = await req.json();
        const source = json.source;
        let data = json.query;
        let results;
        let cursor;
        let filters: any[] = [];

        Object.keys(data).forEach((key: string) => {
            if (!["title", 'doi', 'abstract'].includes(key as never)) {
                return;
            }
            let filter: any = {};
            filter[key] = {
                '$regex': data[key]
            }
            filters.push(filter);
        });
        filters.push({source: source});

        let cursorFilter = collection.find({
            $and: filters
        });
        let resultTitle = await cursorFilter.toArray();
        results = resultTitle;

        results = results?.map((result) => {
            result["doi"] = typeof result["doi"] === 'string' ? result["doi"] : result["doi"]?.[1];
            return result;
        });

        results = results?.map((result) => {
            return {
                ...result,
                location: "",
                privacyLevel: "open",
            }
        });

        return Response.json(results)
    } catch (err) {
        console.error(err);
        return Response.json([])
    } finally {
        await client.close();
        // return Response.json({ error: 500 })
    }
}
