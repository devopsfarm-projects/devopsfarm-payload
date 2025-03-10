// import { NextApiRequest, NextApiResponse } from "next";
// import { getPayload } from "payload";
// import config from "@payload-config";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const payload = await getPayload({ config });
//     const data = await payload.find({ collection: "pages", limit: 200 });

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// }



import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParam = searchParams.get("query");

    const query = queryParam ? JSON.parse(queryParam) : {}; 

    const payload = await getPayload({ config });
    const data = await payload.find({ collection: "pages", limit: 200, where: query });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
