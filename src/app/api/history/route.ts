import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://kornilak:testpassdelete@nextgem.prxatax.mongodb.net/?retryWrites=true&w=majority"; // replace with your MongoDB URI
const client = new MongoClient(uri, {});

export async function POST(req: Request) {
  try {
    await client.connect();
    const database = await client.db("risk_assesment"); // replace with your database name
    const collection = await database.collection("search_history"); // replace with your collection name
    let filter = {};

    let json = await req.json();
    const source = json.source ? [json.source] : ["pubmed", "emf", "wos"];
    // const sources = json.sources || [source];
    const { username, query, search_results, chosenSources } = json;

    const history = await collection.find({ username: username }).toArray();
    // console.log(history)

    if (history.length > 0) {
      await collection.updateOne(
        { username: username },
        {
          $set: {
            username: username,
            history: [
              ...history[0].history,
              {
                session_id: "",
                search_id: "",
                query: query,
                results: search_results,
              },
            ],
          },
        },
      );
    } else {
      await collection.insertOne({
        username: history,
        history: [
          {
            session_id: "",
            search_id: "",
            query: query,
            results: search_results,
          },
        ],
      });
    }
  } catch (err) {
    // console.error(err);
    return Response.json([]);
  } finally {
    // await client.close();
  }
  return Response.json([]);
}

export async function GET(req: Request) {
  try {
    await client.connect();
    const database = client.db("risk_assesment"); // replace with your database name
    const collection = database.collection("search_history"); // replace with your collection name
    let json = await req.json();
    // const sources = json.sources || [source];
    console.log(json);
    const { username } = json;

    const history = await collection.find({ username: username }).toArray();
    console.log("history");
    return Response.json(history);
  } catch (err) {
    console.error(err);
    return Response.json([]);
  } finally {
    await client.close();
  }
}
