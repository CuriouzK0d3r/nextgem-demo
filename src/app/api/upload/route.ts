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
        "institution": formData['institution'],
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
                "Authorization": "Bearer " + access_token
            },
            body: JSON.stringify(data)
    })
    const respp = await resp.text();
    console.log(resp.status)
    return respp;
}

/**
 * Handles the POST request for uploading data.
 *
 * @param {Request} req - The request object containing the form data and access token.
 * @param {NextApiResponse} res - The response object to send back the result.
 * @return {Promise<void>} A promise including a success message if the data is uploaded successfully, or an error message if the upload fails
 */
export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    const data = await req.json();
    const formData = data['formData'];
    const access_token = data['access_token'];
    console.log(access_token)

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
                await postRecords(JSON.parse(reader.result), access_token);
            }
        });
        return Response.json({ message: "success" });
    }
}