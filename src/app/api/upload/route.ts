import { NextApiResponse } from 'next';

async function postRecords(formData: any) {
    const apiEndpoint = `http://${location.hostname}:5000/upload?${new URLSearchParams(formData)}`;

        const resp = await (await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
            },
        })).json();

        if (resp.status == 200) {
            console.log('success');
            return Response.json({ message: "success" });
        } else {
            return Response.json({ message: "failure" });
        }
}

export async function POST(req: Request, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }


    const formData = await req.json();

    if (!formData['files']) {
        return await postRecords(formData);
    } else {
        const files = formData['files'];
        files.forEach((file: any) => {
            const reader = new FileReader();
        
            reader.readAsText(file);
            reader.onload = async () => {
                await postRecords(JSON.parse(reader.result));
            }
        });
        return Response.json({ message: "success" });
    }
}