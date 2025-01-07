import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await cachedClient.connect();
    console.log("Connected to MongoDB");
  }
  return cachedClient;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await connectToDatabase();
    const database = client.db("FormPageDB");
    const collection = database.collection("formData");

    if (req.method === "POST") {
      const { formData, selectedSteps } = req.body;

      const result = await collection.insertOne({ formData, selectedSteps });
      return res
        .status(201)
        .json({ message: "Form data saved successfully", id: result.insertedId });
    } else if (req.method === "GET") {
      const formData = await collection
        .find()
        .sort({ createdAt: -1 })
        .limit(100)
        .toArray();

      if (formData.length > 0) {
        return res.status(200).json({
          data: formData.map((doc) => ({
            formData: doc.formData,
          })),
        });
      } else {
        return res.status(404).json({ message: "No form data found" });
      }
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
