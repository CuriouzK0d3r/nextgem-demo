import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://kornilak:testpassdelete@nextgem.prxatax.mongodb.net/?retryWrites=true&w=majority'; // replace with your MongoDB URI
const client = new MongoClient(uri, {});

export async function POST(req: Request) {
    try {
        await client.connect();
        const database = await client.db('risk_assesment'); // replace with your database name
        const collection = await database.collection('search_history'); // replace with your collection name
        let filter = {};

        let json = await req.json();
        const source = json.source ? [json.source] : ["pubmed", "emf", "wos"];
        // const sources = json.sources || [source];
        const { username, query, search_results, chosenSources } = json;

        console.log("elaaaa      ");

        // const history = await collection.find({ username: username }).toArray();
        // console.log(history)

        collection.updateOne({username: username}, {
            "username": username, "history":
                []
        });

        // return Response.json([]);
    } catch (err) {
        // console.error(err);
        return Response.json([]);
    } finally {
        // await client.close();
    }
    return Response.json([])
}

export async function GET(req: Request) {
    try {
        await client.connect();
        const database = client.db('risk_assesment'); // replace with your database name
        const collection = database.collection('search_history'); // replace with your collection name
        let filter = {};
        let json = await req.json();
        const source = json.source ? [json.source] : ["pubmed", "emf", "wos"];
        // const sources = json.sources || [source];
        const { username, query, search_results, chosenSources } = json;

        const history = collection.find({ username: username }).toArray();
        // let resultTitle = await cursorFilter.toArray();
        // results = resultTitle;

        return Response.json(history)
    } catch (err) {
        console.error(err);
        return Response.json([])
    } finally {
        await client.close();
    }
}
