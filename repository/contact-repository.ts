import mongoose from "mongoose";
import Contacts from "../schema/contacts";

interface Contacts {
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    rooms: string[];
    users: string[];
}

export async function saveContactRepository(contactData: Contacts) {
    try {
        const newContact = new Contacts(contactData);
        const response = newContact.save();
        if (response) {
            return response;
        } else {
            return { message: "Failed to add to contact. Please try again."}
            throw new Error("Failed to add to contact. Please try again.");
        }
    } catch (e) {
        console.error("Failed to add to contact:", e);
        throw e;
    }
}

export async function getSelectedContacts(_ids: mongoose.Types.ObjectId[]) {
    try {
        return await Contacts.find({ _id: { $in: _ids }});
    } catch (e) {
        console.error("Error fetching selected contact:", e);
        throw new Error("Failed to fetch selected contact. Please try again.");
    }
}