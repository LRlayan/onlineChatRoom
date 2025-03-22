import {ContactModel} from "../model/contact-model";
import Contacts from "../schema/contacts";
import {findUserByEmail, getSelectedUsers} from "../repository/user-repository";
import {saveContactRepository} from "../repository/contact-repository";
import mongoose from "mongoose";
import User from "../schema/user";

export async function saveContactService(loggedInUser: any ,contactData: ContactModel) {
    try {
        let userRefObjectId: mongoose.Types.ObjectId[] = [];
        let usernames: string[];

        const excitingUser = await findUserByEmail(contactData.email);

        if (!excitingUser) {
            return false;
        }

        const userDocs = await User.find({ code: { $in: contactData.users }}).lean<{ _id: mongoose.Types.ObjectId }[]>();
        userRefObjectId = userDocs.map((user) => user._id);

        const newContact = new Contacts({
            contactCode: contactData.code,
            firstName: contactData.firstName,
            lastName: contactData.lastName,
            email: contactData.email,
            rooms: [],
            users: [userRefObjectId]
        });
        const response = await saveContactRepository(newContact);
        const getUsers = await getSelectedUsers(response.users);
        usernames = getUsers.map((user) => user.username);

        const modifyResponse = {
            ...response.toObject(),
            users: usernames
        }
        return modifyResponse;
    } catch (e) {
        console.error("Service layer error: Failed to add to contact!", e);
    }
}