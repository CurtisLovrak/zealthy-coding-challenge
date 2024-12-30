import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// const uri = process.env.MONGODB_URI;

const uri = "mongodb+srv://admin:yOH9GivculoxOVzP@form-page-db.xzkqp.mongodb.net/?retryWrites=true&w=majority&appName=Form-page-DB"

// if (!process.env.MONGODB_URI) {
//     throw new Error ('missing db uri')
// }

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

      // Check if there's existing data for this user (can use email or other unique fields)
      const existingData = await collection.findOne({ "formData.email": formData.email });

      if (existingData) {
          // Update the existing form data
          await collection.updateOne(
              { "formData.email": formData.email },
              {
                  $set: {
                      formData,
                      selectedSteps,
                  },
              }
          );
          res.status(200).json({ message: "Form data updated successfully!" });
      } else {
          // Insert new form data
          const result = await collection.insertOne({ formData, selectedSteps });
          res.status(201).json({ message: "Form data saved successfully", id: result.insertedId });
      }
  } catch (error) {
      console.error("Error saving form data:", error);
      res.status(500).json({ message: "Failed to save form data" });
  }
});

app.get("/api/submit-form", async (req, res) => {
  try {
    const database = client.db("FormPageDB"); // Your database name
    const collection = database.collection("formData"); // Your collection name

    // Query the most recent 100 records and sort by 'createdAt'
    const formData = await collection
      .find() // You can add a query filter here if needed (e.g., { status: 'submitted' })
      .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order (most recent first)
      .limit(100) // Limit the results to 100
      .toArray();

    if (formData.length > 0) {
      // Format the response by extracting 'formData' and other fields as needed
      res.status(200).json({
        data: formData.map(doc => ({
          formData: doc.formData, // Ensure 'formData' exists in your MongoDB document
          // selectedSteps: doc.selectedSteps, // Uncomment if needed
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
