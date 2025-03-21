import express from "express";
import {ContactModel} from "../model/contact-model";
import {saveContactService} from "../service/contact-service";

const contactRoutes = express.Router();

contactRoutes.post("/saveContact", async (req: express.Request, res: express.Response)=> {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    try {
        const contact = new ContactModel("", "", "", "", [], []);
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.email = email;
        const response = await saveContactService(contact);
        res.status(201).json(response);
    } catch (e) {

    }
});

export default contactRoutes;