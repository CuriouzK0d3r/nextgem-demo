import axios from "axios";

/**
 * Filters the data based on the output type.
 * @param data - The data to filter.
 * @param outputType - The output type to filter by.
 * @returns The filtered data.
 */
const filterOutputType = (data: any, outputType: string) => {
  return data.filter((record: any) => {
    return (
      !outputType ||
      !outputType.length ||
      record.output_type.toLowerCase() === outputType.toLowerCase()
    );
  });
};

/**
 * Filters the data based on the privacy level.
 * @param data - The data to filter.
 * @param privacy_level - The privacy level to filter by.
 * @returns The filtered data.
 */
const filterPrivacyLevel = (data: any, privacy_level: string) => {
  return data.filter((record: any) => {
    return (
      !privacy_level ||
      !privacy_level.length ||
      record.privacyLevel.toLowerCase() === privacy_level.toLowerCase()
    );
  });
};

/**
 * Filters the data based on the institution, output type, and privacy level.
 * @param data - The data to filter.
 * @param institution - The institution to filter by.
 * @param output_type - The output type to filter by.
 * @param privacy_level - The privacy level to filter by.
 * @returns The filtered data.
 */
const filter = (
  data: any,
  institution: string,
  output_type: string,
  privacy_level: string,
): any[] => {
  let returnedObj: any[] = [];

  data.forEach((element: any) => {
    const picked = (({ url, authors, name, description, published_at, type }) => ({
      source_url: url,
      location: "",
      privacyLevel: "public",
      // files: files,
      creators: authors,
      DOI: url,
      title: name,
      description: description,
      publication_date: published_at,
      output_type: type,
    }))(element);

    if (institution) {
      let found = false;

      picked.creators.forEach((creator: any) => {
        if (
          creator.affiliation &&
          creator.affiliation.toLowerCase().includes(institution)
        ) {
          found = true;
          return;
        }
      });

      if (found) {
        returnedObj.push(picked);
      }
    } else returnedObj.push(picked);
  });

  returnedObj = filterOutputType(returnedObj, output_type);
  returnedObj = filterPrivacyLevel(returnedObj, privacy_level);

  return returnedObj;
};

/**
 * Handles the POST request for searching goliat project metadata records based on the given search parameters.
 * @param req - The request object containing the search parameters.
 * @returns The response object containing the filtered metadata records.
 */
export async function POST(req: Request) {
  try {
    const requestParams2 = {
      // params: {
      //   access_token:
      //     "I2ZxABWJ9EsaQGJiZyqRpaY8AIwExSOm5zUrTA5ISnStDHjjCo31cM1Z9CSs",
      // },
      headers: { "Content-Type": "application/json" },
    };

    let data = await req.json();

    const response = await axios.get(
      "https://dataverse.csuc.cat/api/search?q=" + data.query.title,
      requestParams2,
    );

    console.log(response.data.data["items"])
    let returnedObj = filter(
      response.data.data["items"],
      data.institution,
      data.output_type,
      data.privacy_level,
    );

    for (let i in returnedObj) {
      returnedObj[i].source = "GOLIAT";
      returnedObj[i].status = returnedObj[i]["access_right"];
    }

    return Response.json(JSON.stringify(returnedObj));
  } catch (err) {
    console.error(err);
    return Response.json([]);
  } finally {
    // return Response.json({ error: 500 })
  }
}