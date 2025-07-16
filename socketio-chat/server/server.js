import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { socketHandler } from "./socket/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Auth endpoints
app.use("/api/auth", authRoutes);

// Create HTTP server & attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

// Socket events
io.on("connection", (socket) => socketHandler(socket, io));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));
