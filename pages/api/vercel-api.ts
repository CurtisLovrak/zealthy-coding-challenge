// import { MongoClient, ServerApiVersion } from "mongodb";
// import { NextApiRequest, NextApiResponse } from "next";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" });

// const uri = process.env.MONGODB_URI!;
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log("Successfully connected to MongoDB!");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     throw new Error("Database connection error");
//   }
// }

// const handleSubmitForm = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { formData, selectedSteps } = req.body;

//     try {
//       await connectToDatabase();
//       const database = client.db("FormPageDB");
//       const collection = database.collection("formData");

//       const result = await collection.insertOne({ formData, selectedSteps });
//       res.status(201).json({ message: "Form data saved successfully", id: result.insertedId });
//     } catch (error) {
//       console.error("Error saving form data:", error);
//       res.status(500).json({ message: "Failed to save form data" });
//     }
//   } else if (req.method === "GET") {
//     try {
//       await connectToDatabase();
//       const database = client.db("FormPageDB");
//       const collection = database.collection("formData");

//       const formData = await collection.find().sort({ createdAt: -1 }).limit(100).toArray();
//       res.status(200).json({ data: formData });
//     } catch (error) {
//       console.error("Error retrieving form data:", error);
//       res.status(500).json({ message: "Failed to retrieve form data" });
//     }
//   }
// };

// export default handleSubmitForm;

import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express on Vercel");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}.`);
});

export default app;
