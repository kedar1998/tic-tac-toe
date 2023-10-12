import "express-async-errors";
// Import required modules
import express from "express";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connect from "./db/connect.js"; // Database Connection
import ErrorHandlerMiddleware from "./errors/error-handler.js";

// Initialize Express app
dotenv.config();
const app = express();

// Configure middleware
app.use(express.json());
app.use(cors());

// Create an HTTP server for Express
const server = http.createServer(app);

// Initialize Socket.IO with server
const io = new Server(server, {
  cors: {
    origin: "*", // frontend origin here
    methods: ["GET", "POST"],
  },
});

// Handle socket.io connections and events
io.on("connection", (socket) => {
  socket.on("Join_room", (data) => {
    // Join a room
    socket.join(data);
    // console.log(`User with id: ${socket.id} joined room: ${data}`);

    // Check the number of players in the room.
    const clients = io.sockets.adapter.rooms.get(data);
    console.log(clients);
    if (clients && clients.size === 2) {
      // Start the game when two players have joined.
      io.to(data).emit("game_start");
    }
  });

  socket.on("sent_data", (data) => {
    // Send game data to other players in the room
    socket.to(data.room).emit("receive_data", {
      board: data.board,
      currentPlayer: data.currentPlayer,
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Define API routes
app.use("/api/v1", auth);

app.use(ErrorHandlerMiddleware);

// Define the server's port
const PORT = 3001;

// Start the server
const start = async () => {
  try {
    await connect(process.env.MONGO_URL); // Connect to the database
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
