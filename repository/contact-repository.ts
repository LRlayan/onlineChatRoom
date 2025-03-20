import mongoose from "mongoose";
import Contacts from "../schema/contacts";

export async function getSelectedContacts(_ids: mongoose.Types.ObjectId[]) {
    try {
        return await Contacts.find({ _id: { $in: _ids }});
    } catch (e) {
        console.error("Error fetching selected contact:", e);
        throw new Error("Failed to fetch selected contact. Please try again.");
    }
}