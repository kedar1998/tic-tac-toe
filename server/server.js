import express from "express";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import "express-async-errors";
import cors from "cors";
dotenv.config();
const app = express();

import http from "http";
import { Server } from "socket.io";

// Database Connection
import connect from "./db/connect.js";
import { log } from "console";

// Middleware
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000", //path where fontend is running
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("Join_room", (data) => {
    socket.join(data);
    console.log(`user with id: ${socket.id}, Joined room: ${data}`);
  });

  socket.on("sent_data", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Routes
app.use("/api/v1", auth);

const PORT = 3001;

const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    server.listen(PORT, () => {
      console.log("Server is listning on 3001");
    });
  } catch (err) {
    console.log(err);
  }
};

start();
