import dotenv from "dotenv";
import express from "express";
import {UserModel} from "../model/user-model";
import jwt, {Secret} from "jsonwebtoken";
import {saveUserService, verifyUserCredentialsService} from "../service/user-service";

dotenv.config();

const router = express.Router();

router.post("/login", async (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const user : UserModel = new UserModel(username, "",  password, [], []);
    try {
        const isVerified = await verifyUserCredentialsService(username,password);

        if (isVerified) {
            const token = jwt.sign({ username }, process.env.SECRET_KEY as Secret, {expiresIn: "1d"});
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

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const user = new UserModel(username, email, password, [], []);
    try{
        const registration = await saveUserService(user);
        res.status(201).json(registration);
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
});

router.post("/refresh-token", async (req:express.Request, res: express.Response) => {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader?.split(" ")[1];

    if (!refreshToken)res.status(401).json("No token Provided");
    try {
        const payload = jwt.verify(refreshToken as string, process.env.REFRESH_TOKEN as Secret) as {username: string, iat: number};
        const token = jwt.sign({ username: payload.username }, process.env.SECRET_KEY as Secret, {expiresIn: "10d"});
        res.json({accessToken: token});
    } catch (e) {
        console.log(e);
        res.status(401).json(e);
    }
});

export default router;