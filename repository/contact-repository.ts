import mongoose from "mongoose";
import Contacts from "../schema/contacts";
import Rooms from "../schema/room";
import {RoomModel} from "../model/room-model";

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
    }
}

export async function getAllContacts() {
    try {
        return await Contacts.find().populate("rooms").populate("users").exec();
    } catch (e) {
        console.error("Failed to get rooms data:", e);
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

export async function updateRoomsOfContacts(code: string | null, roomData: RoomModel) {
    try {
        const roomDocs = await Rooms.findOne({ code }).lean<{ _id: mongoose.Types.ObjectId } | null>();
        if (!roomDocs) {
            throw new Error(`Field with code ${code} not found`);
        }
        const roomId = roomDocs._id;

        const existingContactDocs = await Contacts.find({ rooms: roomId }).lean<{ _id: mongoose.Types.ObjectId }[]>();
        const existingContactIds = existingContactDocs.map(room => room._id);

        const updatedContactDocs = await Contacts.find({ code: { $in: roomData.members } }).lean<{ _id: mongoose.Types.ObjectId }[]>();
        const updatedContactIds = updatedContactDocs.map(contact => contact._id);

        const contactToRemoveRoom = existingContactIds.filter(id => !updatedContactIds.includes(id));
        const contactToAddRoom = updatedContactIds.filter(id => !existingContactIds.includes(id));

        if (contactToRemoveRoom.length > 0) {
            await Contacts.updateMany(
                { _id: { $in: contactToRemoveRoom } },
                { $pull: { rooms: roomId } }
            );
        }

        if (contactToAddRoom.length > 0) {
            await Contacts.updateMany(
                { _id: { $in: contactToAddRoom } },
                { $addToSet: { rooms: roomId } }
            );
        }

        return updatedContactIds;
    } catch (e) {
        console.error("Error updating rooms of contacts:", e);
        throw e;
    }
}