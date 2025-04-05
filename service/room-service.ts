import {RoomModel} from "../model/room-model";
import mongoose from "mongoose";
import Contacts from "../schema/contacts";
import Rooms from "../schema/room";
import {saveRoomRepository} from "../repository/room-repository";
import {getSelectedContacts, updateRoomsOfContacts} from "../repository/contact-repository";

export async function saveRoomService (roomData: RoomModel) {
    try {
        let contactRefObjectId: mongoose.Types.ObjectId[] = [];
        let contactRefEmails: string[] = [];

        const contactDocs = await Contacts.find({ code: { $in: roomData.members }}).lean<{ _id: mongoose.Types.ObjectId }[]>();
        contactRefObjectId = contactDocs.map((contact) => contact._id);

        const newRoom = new Rooms({
            code: roomData.code,
            name: roomData.name,
            createAt: roomData.createAt,
            members: contactRefObjectId
        });

        const res = await saveRoomRepository(newRoom);
        await updateRoomsOfContacts(roomData.code, roomData);

        const getContacts = await getSelectedContacts(res.members);
        contactRefEmails = getContacts.map((contact) => contact.email);

        const modifyResponse = {
            ...res.toObject(),
            members: contactRefEmails
        }
        return modifyResponse;
    } catch (e) {
        console.error("Service layer error: Failed to create room!", e);
        throw new Error("Failed to create room. Please try again.");
    }
}