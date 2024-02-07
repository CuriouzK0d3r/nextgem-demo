import { MongoClient } from 'mongodb';

const uri = 'mongodb://admin:pass@localhost:27017/?authMechanism=DEFAULT'; // replace with your MongoDB URI
const client = new MongoClient(uri, {});

export async function POST(req: Request) {
    try {
        await client.connect();
        const database = client.db('risk_assesment'); // replace with your database name
        const collection = database.collection('pub_metadata'); // replace with your collection name
        let filter = {};
        let data = await req.json();
        // console.log(data)
        // data = data[0];

        let results;
        let cursor;

        const filters = [
            {
                'title': {
                    '$regex': data.query
                }
            },
            {
                'author.given': {
                    '$regex': data.query
                }
            },
            {
                'DOI': {
                    '$regex': data.query
                }
            },
            {
                'subject.': {
                    '$regex': data.query
                }
            },
            {
                'abstract': {
                    '$regex': data.query
                }
            }
        ];

        switch (data.type) {
            case "title":
                let cursorTitle = collection.find(filters[0]);
                let resultTitle = await cursorTitle.toArray();
                results = resultTitle;
                break;
            case "author":
                let cursorAuthor = collection.find(filters[1]);
                let resultAuthor = await cursorAuthor.toArray();
                results = resultAuthor;
                break;
            case "doi":
                let cursorDOI = collection.find(filters[2]);
                let resultDOI = await cursorDOI.toArray();
                results = resultDOI;
                break;
            case "subject":
                let cursorSubject = collection.find(filters[3]);
                let resultSubject = await cursorSubject.toArray();
                results = resultSubject;
                break;
            case "abstract":
                let cursorAbstract = collection.find(filters[4]);
                let resultAbstract = await cursorAbstract.toArray();
                results = resultAbstract;
                break;
            case "all fields":
                const filter = {
                    $or: filters
                };
                const cursor = collection.find(filter);
                results = await cursor.toArray();
                break;
        }
        results = results?.map((result) => {
            return {
                ...result,
                location: result.source.toUpperCase(),
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
