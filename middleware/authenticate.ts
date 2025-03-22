import jwt, {Secret} from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request{
    user?: any;
}
export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token)res.status(401).send('No token Provided!');

    try {
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as { username: string, iat: number };
        req.body.username = payload.username;
        req.user = payload.username;
        next();
    } catch (err) {
        res.status(401).send(err);
    }
}