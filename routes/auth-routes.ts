import dotenv from "dotenv";
import express from "express";
import {UserModel} from "../model/user-model";
import jwt, {Secret} from "jsonwebtoken";
import {verifyUserCredentialsService} from "../service/user-service";

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

export default router;