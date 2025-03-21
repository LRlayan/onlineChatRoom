import express from "express";
import {ContactModel} from "../model/contact-model";
import {saveContactService} from "../service/contact-service";
import IdGenerator from "../util/id-generator";

const contactRoutes = express.Router();

contactRoutes.post("/saveContact", async (req: express.Request, res: express.Response)=> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const idGenerator = new IdGenerator();
    const newCode = await idGenerator.generateId('CONTACT-');

    try {
        const contact = new ContactModel("", "", "", "", [], []);
        contact.code = newCode;
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.email = email;
        const response = await saveContactService(contact);
        if (response === false) {
            res.json(`${firstName+ " " + lastName} is not register our system`);
            return;
        }
        res.status(201).json(response);
    } catch (e) {
        console.log("Failed to save contact!",e);
        res.status(400).send("Failed to save contact. Please try again.");
    }
});

export default contactRoutes;