import {ContactModel} from "../model/contact-model";
import Contacts from "../schema/contacts";
import {findUserByEmail} from "../repository/user-repository";
import {saveContactRepository} from "../repository/contact-repository";

export async function saveContactService(contactData: ContactModel) {
    try {
        const excitingUser = await findUserByEmail(contactData.email);

        if (!excitingUser) {
            return false;
        }

        const newContact = new Contacts({
            contactCode: contactData.code,
            firstName: contactData.firstName,
            lastName: contactData.lastName,
            email: contactData.email,
            rooms: [],
            users: []
        });
        return await saveContactRepository(newContact);
    } catch (e) {
        console.error("Service layer error: Failed to add to contact!", e);
    }
}