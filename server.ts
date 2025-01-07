import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const app = express();

app.use(cors());
app.use(bodyParser.json());

export const port = process.env.PORT;
const uri = process.env.MONGODB_URI!;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

app.post("/api/submit-form", async (req, res) => {
  const { formData, selectedSteps } = req.body;

  try {
      const database = client.db("FormPageDB");
      const collection = database.collection("formData");

      // const existingData = await collection.findOne({ "formData.email": formData.email });

      // if (existingData) {
      //     await collection.updateOne(
      //         { "formData.email": formData.email },
      //         {
      //             $set: {
      //                 formData,
      //                 selectedSteps,
      //             },
      //         }
      //     );
      //     res.status(200).json({ message: "Form data updated successfully!" });
      // } else {
          const result = await collection.insertOne({ formData, selectedSteps });
          res.status(201).json({ message: "Form data saved successfully", id: result.insertedId });
      // }
  } catch (error) {
      console.error("Error saving form data:", error);
      res.status(500).json({ message: "Failed to save form data" });
  }
});

app.get("/api/submit-form", async (req, res) => {
  try {
    const database = client.db("FormPageDB");
    const collection = database.collection("formData");

    const formData = await collection
      .find()
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    if (formData.length > 0) {
      res.status(200).json({
        data: formData.map(doc => ({
          formData: doc.formData,
        }))
      });
    } else {
      res.status(404).json({ message: "No form data found" });
    }
  } catch (error) {
    console.error("Error retrieving form data:", error);
    res.status(500).json({ message: "Failed to retrieve form data" });
  }
});

app.listen(port, async () => {
  console.log(`Server is running on http://localhost:${port}`);
  await connectToDatabase();
});
