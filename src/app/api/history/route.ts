import { MongoClient } from "mongodb";
import { NextRequest } from "next/server";

const uri =
  "mongodb+srv://kornilak:testpassdelete@nextgem.prxatax.mongodb.net/?retryWrites=true&w=majority"; // replace with your MongoDB URI
const client = new MongoClient(uri, {});

/**
 * Handles the POST request for saving search history.
 * @param req - The NextRequest object containing username, search query and search results.
 * @returns A Promise that resolves to an empty JSON response.
 */
export async function POST(req: NextRequest) {
  try {
    await client.connect();
    const database = await client.db("risk_assesment"); // replace with your database name
    const collection = await database.collection("search_history"); // replace with your collection name
    let filter = {};

    let json = await req.json();
    const source = json.source ? [json.source] : ["pubmed", "emf", "wos"];
    // const sources = json.sources || [source];
    const { username, query, search_results, chosenSources } = json;
    console.log(username);
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
                results: search_results
              }
            ]
          }
        }
      );
    } else {
      await collection.insertOne({
        username: username,
        history: [
          {
            session_id: "",
            search_id: "",
            query: query,
            results: search_results
          }
        ]
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

export async function GET(req: NextRequest) {
  let history = {};
  try {
    await client.connect();
    const database = client.db("risk_assesment"); // replace with your database name
    const collection = database.collection("search_history"); // replace with your collection name
    const username = req.nextUrl.searchParams.get("username");
    // let json = await  json.sources || [source];
    // // console.log(json);req.json();
    // // // const sources =
    // // const { username } = json;

    history = await collection.find({ username: username }).toArray();
    // // console.log("history");
  } catch (err) {
    console.error(err);
    await client.close();

    return Response.json([]);
  } finally {
    await client.close();
    return Response.json(history);
  }
}
