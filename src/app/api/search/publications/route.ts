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

        let result;
        let cursor;
        console.log(data);
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
                result = resultTitle;
                break;
            case "author":
                let cursorAuthor = collection.find(filters[1]);
                let resultAuthor = await cursorAuthor.toArray();
                result = resultAuthor;
                break;
            case "doi":
                let cursorDOI = collection.find(filters[2]);
                let resultDOI = await cursorDOI.toArray();
                result = resultDOI;
                break;
            case "subject":
                let cursorSubject = collection.find(filters[3]);
                let resultSubject = await cursorSubject.toArray();
                result = resultSubject;
                break;
            case "abstract":
                let cursorAbstract = collection.find(filters[4]);
                let resultAbstract = await cursorAbstract.toArray();
                result = resultAbstract;
                break;
            case "all fields":
                const filter = {
                    $or: filters
                };
                const cursor = collection.find(filter);
                result = await cursor.toArray();
                break;
        }
        console.log(result);
        return Response.json(result)
    } catch (err) {
        console.error(err);
        return Response.json([])
    } finally {
        await client.close();
        // return Response.json({ error: 500 })
    }
}
