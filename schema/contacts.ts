import mongoose from "mongoose";

export interface IContacts {
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    image: string | null;
    rooms: mongoose.Types.ObjectId[];
    users: mongoose.Types.ObjectId[];
}

const contacts = new mongoose.Schema<IContacts>({
    code: {type: String, unique: true},
    firstName: String,
    lastName: String,
    email: { type: String, required: true },
    bio: { type: String, required: false },
    image: { type: String, required: false },
    rooms: [{type: mongoose.Types.ObjectId, ref: "Rooms"}],
    users: [{type: mongoose.Types.ObjectId, ref: "User"}]
});

const Contacts = mongoose.model<any>("Contacts", contacts);
export default Contacts;