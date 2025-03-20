import mongoose from "mongoose";

export interface IContacts {
    firstName: string;
    lastName: string;
    email: string;
    rooms: mongoose.Types.ObjectId[];
}

const contacts = new mongoose.Schema<IContacts>({
    firstName: String,
    lastName: String,
    email: String,
    rooms: [{type: mongoose.Types.ObjectId, ref: "Rooms"}],
});

const Contacts = mongoose.model<any>("Contacts", contacts);
export default Contacts;