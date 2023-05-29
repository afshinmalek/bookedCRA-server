const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", true);

// Define the schema for the data you want to store
const myDataSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  date: { type: String, required: true },
  time: { type: Number, required: [true, "Please provide the time"] },
});

myDataSchema.index({ date: 1, time: 1 }, { unique: true });

const myNewCollSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  date: { type: String, required: true },
  time: { type: Number, required: true },
  available: { type: Boolean, default: true },
});

// Create a model for the data using the schema
const MyData = mongoose.model("MyData", myDataSchema);
const MyNewCollModel = mongoose.model("MyNewCollModel", myNewCollSchema);

// Connect to your MongoDB database
async function connectToDatabase() {
  try {
    const mongoURI = `mongodb+srv://afshinmalek2:${process.env.MONGO}@appointmentcluster.pro04ls.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.once("open", async () => {
      try {
        // Get a list of the collections in the database
        const collections = await db.db.listCollections().toArray();

        // Log the names of the collections
        console.log(
          "Collections:",
          collections.map((c) => c.name)
        );

        const adminDb = db.db.admin();

        const result = await adminDb.listDatabases();

        const clusters = result.databases
          .filter(
            (db) =>
              db.name !== "admin" && db.name !== "config" && db.name !== "local"
          )
          .map((db) => db.name);

        console.log("Clusters:", clusters);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  MyData,
  MyNewCollModel,
  connectToDatabase,
};
