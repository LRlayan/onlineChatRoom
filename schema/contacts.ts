import mongoose from "mongoose";

export interface IContacts {
    firstName: string;
    lastName: string;
    email: string;
    rooms: mongoose.Types.ObjectId[];
    users: mongoose.Types.ObjectId[];
}

const contacts = new mongoose.Schema<IContacts>({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    rooms: [{type: mongoose.Types.ObjectId, ref: "Rooms"}],
    users: [{type: mongoose.Types.ObjectId, ref: "User"}]
});

const Contacts = mongoose.model<any>("Contacts", contacts);
export default Contacts;