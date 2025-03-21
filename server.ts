import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from 'http';
import roomRoutes from "./routes/room-routes";
import contactRoutes from "./routes/contact-routes";
import authRoutes from "./routes/auth-routes";
import {authenticateToken} from "./middleware/authenticate";

dotenv.config();
const app = express();
const server = createServer(app);

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', "x-requested-with"],
    credentials: true,
}));

//socket.io setup
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET','POST','PUT','PATCH','DELETE'],
        allowedHeaders: ['Content-Type','Authorization', "x-requested-with"],
        credentials: true,
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

app.use('/uploads', express.static('uploads'));
app.use('/api/v1/auth', authRoutes);

mongoose.connect("mongodb://localhost:27017/chatRoom")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Failed to connect to MongoDB", err);
});

app.use('/api/v1/chat',authenticateToken, roomRoutes);
app.use('/api/v1/contact',authenticateToken, contactRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server start 3000"));