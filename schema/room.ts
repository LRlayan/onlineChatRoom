import mongoose from "mongoose";

export interface IRooms {
    code: string | null;
    name: string;
    createAt: Date;
    image: string | null;
    members: mongoose.Types.ObjectId[];
}

const rooms = new mongoose.Schema<IRooms>({
    code: String,
    name: String,
    createAt: { type: Date, default: Date.now },
    image: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Contacts" }],
});

const Rooms = mongoose.model<any>("Rooms", rooms);
export default Rooms;
