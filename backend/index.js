import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import quizzesRouter from "./routes/quizzes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
// {
//     origin: "http://localhost:5173", // your frontend URL
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   }
app.use(express.json());

app.use("/api/quizzes", quizzesRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

if (MONGO_URI) {
  connectDB(MONGO_URI);
} else {
  console.warn(
    "No MONGO_URI provided - server will run but DB features will fail."
  );
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
