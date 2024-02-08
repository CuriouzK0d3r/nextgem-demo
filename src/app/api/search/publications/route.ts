import { MongoClient } from 'mongodb';

const uri = 'mongodb://admin:pass@localhost:27017/?authMechanism=DEFAULT'; // replace with your MongoDB URI
const client = new MongoClient(uri, {});

export async function POST(req: Request) {
    try {
        await client.connect();
        const database = client.db('risk_assesment'); // replace with your database name
        const collection = database.collection('pub_metadata'); // replace with your collection name
        let filter = {};
        let json = await req.json();
        const source = json.source;
        let data = json.query;
        let results;
        let cursor;
        let filters: any[] = [];

        // const filters = [
        //     {
        //         'title': {
        //             '$regex': data.query
        //         }
        //     },
        //     {
        //         'author.given': {
        //             '$regex': data.query
        //         }
        //     },
        //     {
        //         'DOI': {
        //             '$regex': data.query
        //         }
        //     },
        //     {
        //         'subject.': {
        //             '$regex': data.query
        //         }
        //     },
        //     {
        //         'abstract': {
        //             '$regex': data.query
        //         }
        //     }
        // ];

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

        let cursorTitle = collection.find({
            $and: filters
        });
        let resultTitle = await cursorTitle.toArray();
        results = resultTitle;

        results = results?.map((result) => {
            return {
                ...result,
                location: result.source.toUpperCase(),
                privacyLevel: "open",
            }
        });
        console.log(results)
        return Response.json(results)
    } catch (err) {
        console.error(err);
        return Response.json([])
    } finally {
        await client.close();
        // return Response.json({ error: 500 })
    }
}
