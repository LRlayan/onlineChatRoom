import mongoose from "mongoose";

export interface IRooms {
    name: string;
    createAt: Date;
    members: mongoose.Types.ObjectId[];
}

const rooms = new mongoose.Schema<IRooms>({
    name:String,
    createAt: { type: Date, default: Date.now },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "ContactSchema" }],
});


const RoomSchema = mongoose.model<any>("RoomSchema", rooms);
export default RoomSchema;
