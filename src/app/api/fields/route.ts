import { NextApiResponse } from 'next';
import { headers } from 'next/headers';

export async function GET(req: Request, res: NextApiResponse) {
    const eValuesHard: any = {
        "privacyLevel": [
            "--",
            "Public",
            "Open",
            "Sensitive"
        ]
    };

    const hostname = headers().get('host');
    let apiEndpoint = "http://139.91.58.16/metadata/searchable/fields";
    let apiEndpoint2 = "http://139.91.58.16/metadata/enum";


    const response = await fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
        }
    });

    const response2 = await fetch(apiEndpoint2, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-TOKEN',
        }
    })

    const eValues = await response2.json();

    const responseFIELDS = await response.json();

    let fields = [];

    for (let i = 0; i < responseFIELDS.length; i++) {
        let field = responseFIELDS[i];
        for (let j = 0; j < eValues.length; j++) {
            if (eValues[j].name === field.fieldName) {
                field.enumValues = eValues[j].values;
            } else if (eValuesHard[field.fieldName]) {
                field.enumValues = eValuesHard[field.fieldName];
            }
        }
       
        fields.push(field);
    }

    // console.log(fields)

    return Response.json({ fields: fields });
}