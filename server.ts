import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
const { Server } = require("socket.io");
import { createServer } from 'http';
import chatRoutes from "./routes/chat-routes";

dotenv.config();
const app = express();
const server = createServer(app);

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

//socket.io setup
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET','POST','PUT','PATCH','DELETE']
    }
});

io.on("connection", (socket: any) => {
    console.log(`User connected: ${socket.id}`);

    //join a room
    socket.on("joinRoom", (room: any) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
    });

    //send message
    socket.on("sendMessage", (data: any) => {
        io.to(data.room).emit("receiveMessage", data);
    });

    //disconnect
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

mongoose.connect("mongodb://localhost:27017/chatRoom")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
});

app.use('/api/v1/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server start 5000"))