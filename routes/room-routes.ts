import express from "express";
import {ImageUploader} from "../util/image-uploader"
import {RoomModel} from "../model/room-model";
import {saveRoomService} from "../service/room-service";
import IdGenerator from "../util/id-generator";

const roomRoutes = express.Router();
const imageUploader = new ImageUploader();
const upload = imageUploader.uploader('room');


//create room
roomRoutes.post("/saveRooms", upload.single('image'),async (req, res) => {
    const { name, createAt, members } = req.body;
    const image = req.file ? req.file.filename : null;
    const idGenerator = new IdGenerator();
    const newCode = await idGenerator.generateId('ROOM-');

    const room = new RoomModel("","Chat Room", new Date(), "", []);
    room.roomCode = newCode;
    room.name = name;
    room.createAt = createAt;
    room.image = image;
    room.members = members;
    const result = await saveRoomService(room);
    res.status(201).json(result);
});

roomRoutes.get("/getRoom", async (req, res) => {

});

export const createRoomRoutes = (io: any) => {
    const router = express.Router();
    router.post("/sendMessages", async (req, res) => {
        const { room, sender, message } = req.body;
        console.log("call unaa")
        if (!room || !message) {
            res.status(400).json({ error: "Room and message are required" });
        }

        io.to(room).emit("receiveMessage", {
            sender,
            message,
            room,
            time: new Date().toISOString(),
        });
        console.log("room name : " ,room);
        console.log("message sender : ", sender);
        console.log("room message : " ,message);
        res.status(200).json({ success: true, message: {message} });
    })
    return router;
};

export default roomRoutes;