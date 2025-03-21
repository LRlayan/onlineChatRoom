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
    console.log("new room", name)
    console.log("image ",image);
    console.log("Create Date  ",createAt);
    console.log("members  ",members);

    if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }

    const room = new RoomModel("","Chat Room", new Date(), "", []);
    room.roomCode = newCode;
    room.name = name;
    room.createAt = createAt;
    room.members = members;
    const result = await saveRoomService(room);
    res.status(201).json(result);
});

roomRoutes.post("/getRoom", async (req, res) => {

});

export default roomRoutes;