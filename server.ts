import cluster from "cluster";
import os from "os";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";
import contactRoutes from "./routes/contact-routes";
import authRoutes from "./routes/auth-routes";
import { authenticateToken } from "./middleware/authenticate";
import roomRoutes, {createRoomRoutes} from "./routes/room-routes";

dotenv.config();
const numCPUs = os.cpus().length;

// Primary Process: Fork Worker Processes
if (cluster.isPrimary) {
    console.log(`Primary process ${process.pid} is running`);

    // Fork worker processes for each CPU core
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Restart worker if it crashes
    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Spawning a new worker...`);
        cluster.fork();
    });

} else {
    // Worker Process
    const app = express();
    const server = createServer(app);

    app.use(express.json());

    app.use(
        cors({
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
            credentials: true,
        })
    );

    // MongoDB Connection
    mongoose
        .connect("mongodb://localhost:27017/chatRoom")
        .then(() => console.log(`Worker ${process.pid} connected to MongoDB`))
        .catch((err) => console.error("MongoDB connection error", err));

    // WebSocket Server Setup
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id} on Worker ${process.pid}`);

        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`);
        });

        socket.on("sendMessage", (data) => {
            io.to(data.room).emit("receiveMessage", data);
            console.log("server message data : ", data)
        });

        socket.on("disconnect", () => {
            console.log(`User Disconnected: ${socket.id}`);
        });
    });

    app.use("/api/v1/chat", authenticateToken, roomRoutes);

    const socketRoomRoutes  = createRoomRoutes(io);
    app.use("/api/v1/chat", authenticateToken, socketRoomRoutes);

    // Static Uploads Directory
    app.use("/uploads", express.static("uploads"));

    // Routes
    app.use("/api/v1/auth", authRoutes);
    app.use("/api/v1/contact", authenticateToken, contactRoutes);

    // Start Worker Server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => console.log(`Worker ${process.pid} running on port ${PORT}`));
}