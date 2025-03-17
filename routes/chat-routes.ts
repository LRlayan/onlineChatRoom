import express from "express";
import RoomSchema from "../models/room";

const chatRoutes = express.Router();

//create room
chatRoutes.post("/saveRoom", async (req, res) => {
    const newRoom = new RoomSchema({ name: req.body.name});
    await newRoom.save();
    res.json(newRoom);
});

export default chatRoutes;