import dotenv from "dotenv";
import express from "express";
import {UserModel} from "../model/user-model";
import jwt, {Secret} from "jsonwebtoken";
import {saveUserService, verifyUserCredentialsService} from "../service/user-service";

dotenv.config();

const router =express.Router();

router.post("/login", async (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const user : UserModel = new UserModel(username, "", password);
    try {
        const isVerified = await verifyUserCredentialsService(username,password);

        if (isVerified) {
            const token = jwt.sign({ username }, process.env.SECRET_KEY as Secret, {expiresIn: "10d"});
            const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "10d"});
            res.json({ accessToken : token, refreshToken: refreshToken });
        } else {
            res.status(403).json({ message: "Invalid Credentials" });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.post("/register", async (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new UserModel(username, email, password);
    try {
        const registration = await saveUserService(user);
        res.status(201).json(registration);
    } catch (e) {
        console.log(e);
        res.status(401).json(e);
    }
});

export default router;