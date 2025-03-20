import mongoose from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    contacts: mongoose.Types.ObjectId[];
    rooms: mongoose.Types.ObjectId[];
}

const User = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rooms" }],
});

export default mongoose.model("User", User);
