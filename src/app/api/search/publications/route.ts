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
        const source = json.source ? [json.source] : ["pubmed", "emf", "wos"];
        // const sources = json.sources || [source];
        let query = json.query;
        let type = json.type;
        let results;
        let cursor;
        let appliedFilters: any[] = [];

        let filters = [
            {
                'title': {
                    '$regex': query
                }
            },
            {
                'author.given': {
                    '$regex': query
                }
            },
            {
                'DOI': {
                    '$regex': query
                }
            },
            {
                'subject.': {
                    '$regex': query
                }
            },
            {
                'abstract': {
                    '$regex': query
                }
            }
        ];

        switch (type) {
            case "title":
                appliedFilters.push(filters[0]);
                break;
            case "author":
                appliedFilters.push(filters[1]);
                break;
            case "doi":
                appliedFilters.push(filters[2]);
                break;
            case "subject":
                appliedFilters.push(filters[3]);
                break;
            case "abstract":
                appliedFilters.push(filters[4]);
                break;
            case "all fields":
                const filter = {
                    $or: filters
                };
                appliedFilters.push(filter);
                break;
        }

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

        appliedFilters.push({source: {'$in': source}});

        let cursorFilter = collection.find({
            $and: appliedFilters
        });

        let resultTitle = await cursorFilter.toArray();
        results = resultTitle;

        results = results?.map((result) => {
            result["doi"] = typeof result["doi"] === 'string' ? result["doi"] : result["doi"]?.[1];
            result["output_type"] = "publication";

            return result;
        });

        results = results?.map((result) => {
            return {
                ...result,
                location: "",
                privacyLevel: "open",
            }
        });

        console.log(JSON.stringify(results));

        return Response.json(results)
    } catch (err) {
        console.error(err);
        return Response.json([])
    } finally {
        await client.close();
        // return Response.json({ error: 500 })
    }
}
