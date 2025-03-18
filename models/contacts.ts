import mongoose from "mongoose";

export interface IContacts {
    firstName: string;
    lastName: string;
    email: string;
}

const contacts = new mongoose.Schema<IContacts>({
    firstName: String,
    lastName: String,
    email: String,
});

const ContactSchema = mongoose.model<any>("ContactSchema", contacts);
export default ContactSchema;