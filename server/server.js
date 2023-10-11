import express from "express";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
dotenv.config();
const app = express();

// Database Connection
import connect from "./db/connect.js";

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1", auth);

const PORT = 3001;

const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log("Server is listning on 3001");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
