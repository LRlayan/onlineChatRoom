import mongoose from "mongoose";

const rooms =new mongoose.Schema({
    name:String,
    createAt: { type: Date, default: Date.now },
});


const RoomSchema = mongoose.model<any>("Rooms", rooms);
export default RoomSchema;
