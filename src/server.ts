import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./router";

dotenv.config();
const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

connectDB().catch((err) => console.error(err));
// Use routes
app.use('/api', routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
