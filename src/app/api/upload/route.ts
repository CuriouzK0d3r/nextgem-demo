import { NextApiResponse } from 'next';

async function postRecords(formData: any, access_token: string) {
    let url = 'https://139.91.58.16/metadata/record';
    let data = {
        "address": "",
        "contactName": "",
        "dataOwners": [
            formData['authors']
        ],
        "description": formData['description'],
        "doi": '',
        "email": '',
        "externalId": "",
        "frequency": "fiveGFR1",
        "institution": '',
        "keywords": formData['freeKeywords'],
        "language": "english",
        "modulation": formData['modulation'],
        "outputType": formData['typeOfOutput'],
        "privacyLevel": "Public",
        "publicationDate": "",
        "studyType": formData['typeOfStudy'],
        "termsOfAccess": "",
        "title": formData['title'],
        "url": formData['dataSourceURL']
      };

      console.log(JSON.stringify(data))

    const resp = await fetch(url, {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
                'Bearer': access_token,
            },
            body: JSON.stringify(data)
    })
    const respp = await resp.text();

    return respp;
}

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    const data = await req.json();
    const formData = data['formData'];
    const access_token = data['access_token'];

    if (!formData['files']) {
        return Response.json({ message: await postRecords(formData, access_token)});
    } else {
        const files = formData['files'];
        files.forEach((file: any) => {
            const reader = new FileReader();

            reader.readAsText(file);
            reader.onload = async () => {
                if (typeof reader.result !== 'string') {
                    return;
                }
                await postRecords(JSON.parse(reader.result));
            }
        });
        return Response.json({ message: "success" });
    }
}