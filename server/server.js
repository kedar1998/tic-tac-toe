import express from "express";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import "express-async-errors";
dotenv.config();
const app = express();

// Database Connection
import connect from "./db/connect.js";

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1", auth);

const PORT = 3000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log("Server is listning");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
