import express from "express";
import {ContactModel} from "../model/contact-model";
import {getAllContactService, saveContactService} from "../service/contact-service";
import IdGenerator from "../util/id-generator";
import { Request, Response } from "express";
import {AuthRequest} from "../middleware/authenticate";
import {ImageUploader} from "../util/image-uploader";

const contactRoutes = express.Router();
const imageUploader = new ImageUploader();
const upload = imageUploader.uploader('contact');

contactRoutes.post("/saveContact", upload.single('image'), async (req: AuthRequest, res: Response)=> {
    const { firstName, lastName, email } = req.body;
    const image = req.file ? req.file.filename : null;
    const idGenerator = new IdGenerator();
    const newCode = await idGenerator.generateId('CONTACT-');

    try {
        const contact = new ContactModel("", "", "", "", "", "", [], []);
        contact.code = newCode;
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.email = email;
        contact.image = image;
        const loggedInUser = req.user;
        const response = await saveContactService(loggedInUser, contact);
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

contactRoutes.get("/getAllContact", async (req, res) => {
    try {
        const response = await getAllContactService();
        if (response) {
            if (response) {
                res.status(201).json(response);
            } else {
                res.status(400).send("contact data not found");
            }
        }
    } catch (e) {
        console.log("Failed to get contact data!",e);
        res.status(400).send("Failed to get contact data.");
    }
});

export default contactRoutes;