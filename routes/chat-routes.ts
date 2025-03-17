import express from "express";
import RoomSchema from "../models/room";

const chatRoutes = express.Router();

//create room
chatRoutes.post("/saveRoom", async (req, res) => {
    const newRoom = new RoomSchema({ name: req.body.name});
    await newRoom.save();
    res.json(newRoom);
});

chatRoutes.post("/getRoom", async (req,res) => {
    const rooms = await RoomSchema.find();
    res.json(rooms);
});

export default chatRoutes;